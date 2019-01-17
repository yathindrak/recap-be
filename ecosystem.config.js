module.exports = {
  apps : [{
    name: 'Server',
    script: 'dist/server.js',
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: "development",
      DB_HOST: "localhost",
      DB_USER: "yathindra1",
      DB_PASSWORD: "yathindra1",
      DB_NAME: "retro_db",
      SECRET: "add_secret_here",
      SECRET2: "add_secret2_here"
    },
    env_production: {
      NODE_ENV: 'production',
      DB_HOST: "localhost",
      DB_USER: "yathindra1",
      DB_PASSWORD: "yathindra1",
      DB_NAME: "retro_db",
      SECRET: "add_secret_here",
      SECRET2: "add_secret2_here"
    }
  }]
};
