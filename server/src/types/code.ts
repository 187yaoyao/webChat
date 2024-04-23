import { Model } from "sequelize";

export interface MailboxCode extends Model {
    mailbox: string;
    code: string;
    failureTime: number;
}