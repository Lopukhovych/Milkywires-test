import * as Router from 'koa-router';
import post from '../post.router';

describe('Post router ', () => {
	test('is instance of routes', () => {
		let router = new Router();
		const postRouter = post(router);
		expect(postRouter).toBeInstanceOf(Router);
	});
});
