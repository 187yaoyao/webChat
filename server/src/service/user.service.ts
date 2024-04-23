import { UserRegisterParams } from "../types/user";
import User from "../model/user.model";

export default class UserService {
    /**
     * 注册
     * @param user
     */
    public static async register(user: UserRegisterParams) {
        return await User.create({
            ...user
        });
    }

    /**
     * 获取邮箱验证码
     * @param mailbox
     */
    public static async getCode(mailbox: string) {
        
    }
}