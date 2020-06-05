import * as request from 'supertest';
import app from 'src/app';

describe('Test App', () => {
	
	test('', async () => {
		const response = await request(app.callback()).get('/');
		expect(response.status).toBe(200);
		expect(response.text).toBe('Hello on Milkywires');
		expect(response.text).toMatchSnapshot();
	});
});
