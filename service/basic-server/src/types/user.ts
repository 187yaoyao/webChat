export interface UserRegisterParams {
    nick_name: string;
    mailbox: string;
    password: string;
}

export interface IUser {
    user_id: number;
    nick_name: string;
    mailbox: string;
    password: string;
    
}