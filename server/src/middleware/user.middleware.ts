import {Next,ParameterizedContext} from 'koa';
import { mailboxCheck, sendMail } from '../utils/codeGenerator';
import ErrorCode from "../config/errorCode";

export const validateParams = (ctx:ParameterizedContext ,next: Next) => {

};

export const generateCode = async (ctx: ParameterizedContext,next: Next) => {
    const {mailbox} = ctx.request.body;
    try {
        await mailboxCheck(mailbox);
        await sendMail(mailbox)
        ctx.body = {
            code: 0,
            msg: "发送成功",
        };
    } catch (error) {
        ctx.app.emit('error',{
            ...ErrorCode[400],
            message: error
        },ctx);
    }
}