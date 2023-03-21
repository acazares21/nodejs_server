module.exports = {
    port: process.env.PORT || 8080,
    deb: process.env.MYSQL || "mysql://localhost:8080",
    SECRET_TOKEN: 'miclavedetokens'
}