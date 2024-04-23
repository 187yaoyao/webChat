require('dotenv').config();

export default {
    ...process.env,
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_NAME || 'koa',
    },
    emailUser: process.env.EMAIL_USER,
    smtpPort: process.env.SMTP_PORT,
    smtpServer: process.env.SMTP_SERVER,
    emailPass: process.env.EMAIL_PASS,
}