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
      DB_NAME: "xl_retro_db",
      SECRET: "yathindraKodithuwakkuXL",
      SECRET2: "UnHackAble100"
    },
    env_production: {
      NODE_ENV: 'production',
      DB_HOST: "localhost",
      DB_USER: "yathindra1",
      DB_PASSWORD: "yathindra1",
      DB_NAME: "xl_retro_db",
      SECRET: "yathindraKodithuwakkuXL",
      SECRET2: "UnHackAble100"
    }
  }]
};
