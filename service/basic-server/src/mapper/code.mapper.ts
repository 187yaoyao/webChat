import MailboxCode from "../model/code.model";
import { ICode } from "../types/code";


class CodeMapper {
    async findCode(filterData: {
        mailbox?: string;
    }): Promise<ICode | null>{
        const code = await MailboxCode.findOne({
            where: {
                ...filterData
            },
        })
        return code ? code.dataValues : null;
    }
}

export default new CodeMapper();