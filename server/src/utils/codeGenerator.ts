import nodemailer from 'nodemailer';
import randomstring from 'randomstring'

import config from '../config/index'
import User from '../model/user.model';
import MailboxCode from '../model/code.model';
import { MailboxCode as IMailboxCode } from '../types/code';

const historyCodeContainer: Map<string,{
    code: string,
    expire: number
}> = new Map();

// 创建邮件传输对象
const transporter = nodemailer.createTransport({
    host: config.smtpServer, // 使用内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: Number(config.smtpPort), // SMTP 端口
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: config.emailUser, // 发送方邮箱账号
        pass: config.emailPass, // 授权码
    },
});

/**
 * 生成验证码
 * @returns string
 */
const generateCode = () => {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

/**
 * 校验邮箱是否合法、是否注册过
 * @param mailbox 
 */
const mailboxCheck = async (mailbox: string) => {
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailRegex.test(mailbox)){
        return Promise.reject('邮箱格式不正确');
    }
    const user = await User.findOne({
        where: {
            mailbox
        }
    })
    if(user){
        return Promise.reject('邮箱已注册');
    }
}

async function sendMail(mailbox: string){
    const {dataValues} = await MailboxCode.findOne({
        where: {
            mailbox
        }
    }) as {dataValues: IMailboxCode};
    if(dataValues && Date.now() < dataValues.failureTime){
        return Promise.reject('验证码已发送，请稍后再试');
    }
    if(dataValues && Date.now() >= dataValues.failureTime){
        historyCodeContainer.delete(mailbox);
    }
    const code = generateCode();
    const mailOptions = {
        from: config.emailUser, // 发送方
        to: mailbox, // 接收方
        subject: '验证码', // 标题
        text: `您的验证码是${code}，有效期5分钟。` // 文本内容
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(JSON.stringify(error));
                reject('验证码发送失败');
            } else {
                MailboxCode.create({
                    mailbox,
                    code,
                    failureTime: Date.now() + 5 * 60 * 1000
                })
                resolve(info);
            }
        });
    });
}

export {
    historyCodeContainer,
    sendMail,
    mailboxCheck
}