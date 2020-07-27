import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';

import { router as choreRouter } from './chore_router';

export const router: Router = new Router({
  prefix: '/api',
});
router.use(bodyParser());
router.use(choreRouter.routes());
