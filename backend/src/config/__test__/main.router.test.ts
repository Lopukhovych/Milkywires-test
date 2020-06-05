import * as Router from 'koa-router';
import router from '../main.router';

describe('Main router', () => {
	jest.mock('src/post/post.router');
	test('created router is instance of Router object', function (done) {
		expect(router).toBeInstanceOf(Router);
		done();
	});
});
