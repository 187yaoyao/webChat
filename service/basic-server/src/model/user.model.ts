import { DataTypes} from 'sequelize';
import seq from "../db";

const User = seq.define('user', {
    nick_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "昵称"
    },
    gender: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 3,
        comment: "性别: 1 男 2 女 3 保密"
    },
    mailbox: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "邮箱",
    },
    effective: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "用户是否有效"
    },
    registration_date: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: new Date().getTime(),
        comment: "注册日期"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "密码"
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "头像"
    },
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    friend_list: {
        type: DataTypes.STRING(10000),
        allowNull: true,
        comment: "好友列表"
    },
})

User.sync({force: false}).then(() => {
    console.log("User表模型同步成功")
});

export default User;