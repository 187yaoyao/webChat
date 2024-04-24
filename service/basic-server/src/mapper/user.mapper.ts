import User from "../model/user.model";
import { IUser } from "../types/user";

class UserMapper {
    async findUser(filterData: {
        mailbox?: string;
        password?: string;
        nick_name?: string;
    }): Promise<IUser | null>{
        const user = await User.findOne({
            where: {
                ...filterData
            },
        })
        return user ? user.dataValues : null;
    }

}

export default new UserMapper();