import Koa from 'koa';
import {koaBody} from 'koa-body';
import userRouter from '../router/user.router';

const app = new Koa();

/**
 * 跨域配置
 */
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
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