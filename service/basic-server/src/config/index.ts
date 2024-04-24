import { Secret } from "jsonwebtoken";

require('dotenv').config();

const allowNotLogin = ['/user/login', '/user/register', '/user/get-code'];

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
    tokenSecret: process.env.TOKEN_SECRET_KEY as Secret,
    allowNotLogin,
}