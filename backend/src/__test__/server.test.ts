import {sequelize} from '../../models';
import app from 'src/app';

describe('', () => {
	const mockListen = jest.fn();
	
	beforeEach(() => {
		app.listen = mockListen;
		sequelize.sync = function () {
			return new Promise((res) => res())
		};
	});
	afterAll(() => {
		mockListen.mockReset();
	});
	
	test('Server works', async () => {
		await require('src/server');
		expect(mockListen).toHaveBeenCalled();
	});
});



