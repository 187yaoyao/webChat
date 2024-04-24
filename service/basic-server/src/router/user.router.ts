import Router from '@koa/router';
import { generateCode, validateParams } from '../middleware/user.middleware';
import userController from '../controller/user.controller';

const userRouter = new Router({prefix: '/user'});

/**
 * 注册流程
 * 1. 校验参数（参数是否合法、参数是否缺失）
 * 2. 校验邮箱是否已经注册
 * 3. 保存用户信息
 */
userRouter.post('/register', validateParams.bind(null,'register'), userController.registeredUser)
/**
 * 登录流程
 * 1. 校验参数（参数是否合法、参数是否缺失）
 * 2. 校验用户是否存在
 * 3. 生成token
 */
userRouter.post('/login', validateParams.bind(null,'login'), userController.userLogin);
/**
 * 获取邮箱验证码
 * 1. 校验邮箱是否已经注册
 * 2. 发送验证码
 * 3. 保存验证码
 */
userRouter.post('/get-code',generateCode)

export default userRouter;