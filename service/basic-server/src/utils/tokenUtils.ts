import jwt from 'jsonwebtoken';
import config from '../config';

const generateToken = (data: {
    nick_name: string;
    user_id: number;
    mailbox: string;
}) => {
    const payload = {
        data,
    }
    const token = jwt.sign(payload, config.tokenSecret, { expiresIn: '12h' })
    return token;
}

// 验证token
const verifyToken = async (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.tokenSecret, (err, data) => {
            if (err) {
                // token失效
                reject('无效token')
            }
            resolve(data)
        });
    })
}

export {
    generateToken,
    verifyToken
}