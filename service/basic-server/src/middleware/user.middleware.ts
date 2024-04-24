import { Next, ParameterizedContext } from "koa";
import { mailboxCheck, sendMail } from "../utils/codeGenerator";
import ErrorCode from "../config/errorCode";
import { loginParamsCheck, registerParamsCheck } from "../utils/paramsCheck";

/**
 * 校验注册参数是否合法
 * nick_name: 用户名
 * password: 密码
 * mailbox: 邮箱
 * code: 验证码
 * @param ctx
 * @param next
 */
export const validateParams = async (
    type: 'register' | 'login',
    ctx: ParameterizedContext,
    next: Next
) => {
    try {
        switch (type) {
            case 'register':
                await registerParamsCheck(ctx.request.body);
                break;
            case 'login':
                await loginParamsCheck(ctx.request.body);
                break;
        }
        await next();
    } catch (error) {
        ctx.app.emit(
            "error",
            {
                ...ErrorCode[400],
                message: error
            },
            ctx
        );

    }
};


/**
 * 发送邮箱验证码
 * @param ctx 
 * @param next 
 */
export const generateCode = async (ctx: ParameterizedContext, next: Next) => {
    const { mailbox } = ctx.request.body;
    try {
        await mailboxCheck(mailbox);
        await sendMail(mailbox);
        ctx.body = {
            code: 0,
            msg: "发送成功",
        };
    } catch (error) {
        ctx.app.emit(
            "error",
            {
                ...ErrorCode[400],
                message: error,
            },
            ctx
        );
    }
};
