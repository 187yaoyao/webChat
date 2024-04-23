import Router from '@koa/router';
import { generateCode } from '../middleware/user.middleware';

const userRouter = new Router({prefix: '/user'});

/**
 * 注册流程
 * 1. 校验参数（参数是否合法、参数是否缺失）
 */
userRouter.post('/register',)
/**
 * 获取邮箱验证码
 * 1. 校验邮箱是否已经注册
 * 2. 发送验证码
 * 3. 保存验证码
 */
userRouter.post('/get-code',generateCode)

export default userRouter;