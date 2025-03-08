module.exports = {
    ACCESS_LEVEL_GUEST: 0,
    ACCESS_LEVEL_NORMAL_USER: 1,
    ACCESS_LEVEL_ADMIN: 2,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    SERVER_HOST: process.env.SERVER_HOST || `http://localhost:4000`,
}