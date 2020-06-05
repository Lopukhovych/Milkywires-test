import * as Router from 'koa-router';
import post from 'src/post/post.router';
let router = new Router();
router = post(router);

export default router;