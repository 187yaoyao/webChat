import codeMapper from "../mapper/code.mapper";
import userMapper from "../mapper/user.mapper";

export interface IRegisterParamsCheck {
    mailbox: string;
    nick_name: string;
    password: string;
    code: string;
}

export interface ILoginParamsCheck {
    mailbox?: string;
    password: string;
    nick_name?: string;
}

export const registerParamsCheck = async (params: IRegisterParamsCheck) => {
    const requestParamsName = ["nick_name", "password", "mailbox", "code"];
    if (requestParamsName.some((name) => !params[name as keyof IRegisterParamsCheck])) {
        Promise.reject('参数缺失')
        return;
    }
    const user = await userMapper.findUser({
        mailbox: params.mailbox,
    })
    if (user) {
        Promise.reject('邮箱已注册')
        return;
    }
    const mailInfo = await codeMapper.findCode({ mailbox: params.mailbox })
    if (!mailInfo || Date.now() >= mailInfo.failureTime || mailInfo.code !== params.code) {
        Promise.reject('无效验证码')
        return;
    }
    Promise.resolve()
}

export const loginParamsCheck = async (params: ILoginParamsCheck) => {
    const { mailbox, password, nick_name } = params;
    if((!mailbox && !nick_name) || !password) {
        Promise.reject('参数缺失')
        return;
    }
}