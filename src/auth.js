import jwt from 'jsonwebtoken';
import _ from 'lodash';
import "babel-polyfill";

export const createTokens = async (user, secret, secret2) => {
    const createToken = jwt.sign(
        {
            user: _.pick(user, ['useridentity']),
        },
        secret,
        {
            expiresIn: '1h',
        },
    );

    const createRefreshToken = jwt.sign(
        {
            user: _.pick(user, 'useridentity'),
        },
        secret2,
        {
            expiresIn: '7d',
        },
    );

    return [createToken, createRefreshToken];
};

export const refreshTokens = async (token, refreshToken, models, SECRET, SECRET2) => {
    let userId = 0;
    try {
        const {
            user: { useridentity },
        } = jwt.decode(refreshToken);
        userId = useridentity;
    } catch (err) {
        return {};
    }

    if (!userId) {
        return {};
    }

    const user = await models.User.findOne({ where: { useridentity: userId }, raw: true });
    if (!user) {
        return {};
    }

    const refreshSecret = user.useridentity + SECRET2;
    try {
        jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
        return {};
    }

    const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret);
    return {
        token: newToken,
        refreshToken: newRefreshToken,
        user,
    };
};

export const tryLogin = async (useridentity, models, SECRET, SECRET2) => {
    let user = await models.User.findOne({ where: { useridentity }, raw: true });
    if (!user) {
        user = await models.User.create({
            useridentity: useridentity,
        });
    }

    const refreshTokenSecret = user.useridentity + SECRET2;

    const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

    return {
        ok: true,
        token,
        refreshToken,
    };
};
