import { DataTypes} from 'sequelize';
import seq from "../db";

const MailboxCode = seq.define("mailbox_code", {
    mailbox: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "邮箱"
    },
    code: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "验证码"
    },
    failureTime: {
        type: DataTypes.BIGINT,
        allowNull: true,
        comment: "失效时间"
    }
})

MailboxCode.sync({force: false}).then(() => {
    console.log("MailboxCode表模型同步成功")
});

export default MailboxCode;