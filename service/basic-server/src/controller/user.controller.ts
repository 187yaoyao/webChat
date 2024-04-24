import { Next, ParameterizedContext } from "koa";
import User from "../model/user.model";
import ErrorCode from "../config/errorCode";
import { IUser } from "../types/user";
import userMapper from "../mapper/user.mapper";
import { generateToken } from "../utils/tokenUtils";

class UserController {
    async registeredUser(ctx: ParameterizedContext, next: Next) {
        try {
            const { nick_name, mailbox, password } = ctx.request.body;
            await User.create({
                nick_name,
                mailbox,
                password,
            });
            ctx.body = {
                code: 0,
                msg: "注册成功",
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
    }

    /**
     * 用户登录
     * nick_name: 用户名
     * mailbox: 邮箱
     * password: 密码
     * @param ctx
     * @param next
     */
    async userLogin(ctx: ParameterizedContext, next: Next) {
        const { mailbox, password, nick_name } = ctx.request.body;
        let user: IUser | null;
        if (mailbox && password) {
            user = await userMapper.findUser({
                mailbox,
                password,
            });
        } else if (nick_name && password) {
            user = await userMapper.findUser({
                nick_name,
                password,
            });
        } else {
            ctx.app.emit(
                "error",
                {
                    ...ErrorCode[400],
                    message: "参数缺失",
                },
                ctx
            );
            return;
        }
        if (user) {
            const token = await generateToken({
                user_id: user.user_id,
                nick_name: user.nick_name,
                mailbox: user.mailbox,
            });
            ctx.cookies.set("web_token", token, {
                maxAge: 12 * 60 * 60 * 1000,
            });
            ctx.body = {
                code: 0,
                msg: "登录成功",
            };
        } else {
            ctx.app.emit(
                "error",
                {
                    ...ErrorCode[400],
                    message: "用户名或密码错误",
                },
                ctx
            );
        }
    }
}

export default new UserController();
