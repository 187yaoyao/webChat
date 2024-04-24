import { Model } from "sequelize";

export interface IMailboxCode extends Model {
    mailbox: string;
    code: string;
    failureTime: number;
}

export interface ICode {
    mailbox: string;
    code: string;
    failureTime: number;
}