module.exports = {
    apps: [
      {
        name: "express-postgres-api",
        script: "src/server.js",
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          NODE_ENV: "production",
          PORT: 3000,
        },
      },
    ],
  };
  