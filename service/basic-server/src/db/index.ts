import { Sequelize } from 'sequelize'

const seq = new Sequelize('web_chat', 'root', '187Nitian@', {
    host: 'localhost',
    port: 3306,
    dialect: "mysql"
});

export default seq