import Koa from 'koa';
import { koaBody } from 'koa-body';
import userRouter from '../router/user.router';
import config from '../config';
import { verifyToken } from '../utils/tokenUtils';

const app = new Koa();

/**
 * 跨域配置
 */
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
});

app.use(async (ctx, next) => {
  if (config.allowNotLogin.includes(ctx.url)) {
    await next();
  } else {
    const token = ctx.header.cookie?.split(';')
      .map(item => item.trim())
      .find(item => item.startsWith('web_token='))
      ?.split('=')[1] || '';
    if (token) {
      try {
        const userInfo = await verifyToken(token);
        ctx.userInfo = userInfo;
        await next();
      } catch (err) {
        ctx.app.emit('error', {
          code: 401,
          message: 'token失效'
        }, ctx)
      }
    } else {
      ctx.app.emit('error', {
        code: 401,
        message: '未登录'
      }, ctx)
    }
  }
});

app.use(koaBody());

app.use(userRouter.routes())

app.on('error', (err: {
  code: number;
  message: string;
}, ctx: Koa.ParameterizedContext) => {
  console.log('error', err);
  ctx.body = err;
});

export default app;