import {postList, impacterPostList, postDetails, postCreate} from '../post.controller';
import {getPostList, getImpacterPostList, getPostById, createNewPost} from '../post.service';
import {uploadFile} from 'src/file/file.service';


jest.mock('../post.service');
jest.mock('src/file/file.service');

const postInfo = {
	posts: [{id: 1, impacterId: 1}, {id: 2, impacterId: 2}],
	details: {}
};

function getImpacterPostsMock(impacterId, postData) {
	const newPostList = postData.posts.filter((post => post.impacterId === impacterId));
	return {
		...postData,
		posts: [...newPostList],
	}
}
function getPostByIdMock(id, postInfo) {
	const post =  postInfo.posts.find((post) => post.id === id);
	return {post};
}

function uploadFileMock (file) {
	return `/static/${file.name}`;
}

describe('Post controller ', () => {
	let ctx = {
		request: {query: '', body: undefined},
		body: {},
		params: {id: undefined}
	};
	beforeAll(() => {
		(getPostList as jest.Mock).mockImplementation(
			(): Promise<object> => {
				return new Promise((res, rej) => {
					res(postInfo)
				});
			});
		(getImpacterPostList as jest.Mock).mockImplementation(
			(id): Promise<object> => {
				return new Promise((res, rej) => {
					res(getImpacterPostsMock(id, postInfo));
				});
			});
		(getPostById as jest.Mock).mockImplementation(
			(id): Promise<object> => {
				return new Promise((res, rej) => {
					res(getPostByIdMock(id, postInfo));
				});
			});
		(uploadFile as jest.Mock).mockImplementation(
			(file): Promise<string> => {
				return new Promise((res, rej) => {
					res(uploadFileMock(file));
				});
			});
		(createNewPost as jest.Mock).mockImplementation(
			(post): Promise<object> => {
				return new Promise((res, rej) => {
					res(post);
				});
			});
	});
	
	afterAll(() => {
		(getPostById as jest.Mock).mockReset();
	});
	
	test('execute postList function', async () => {
		await postList(ctx);
		expect(ctx.body).toEqual(postInfo);
	});
	
	test('execute impacterPostList function', async () => {
		ctx.params.id = 1;
		await impacterPostList(ctx);
		expect(ctx.body).toEqual(getImpacterPostsMock(ctx.params.id, postInfo));
	});
	
	test('execute postDetails function', async () => {
		ctx.params.id = 1;
		await postDetails(ctx);
		console.log('ctx.body: ', ctx.body);
		expect(ctx.body).toEqual({post: getPostByIdMock(ctx.params.id, postInfo)});
	});
	test('execute postCreate function with imagePath in body', async () => {
		ctx.request.body = {
			title: 'title1',
			content: "content1",
			imagePath: 'image1',
			impacterId: 1
		};
		await postCreate(ctx);
		expect(ctx.body).toEqual({post: ctx.request.body});
	});
	test('execute postCreate function with image in file', async () => {
		const ctx = {
			request: {
				body: {
					title: 'title1',
					content: "content1",
					impacterId: 1
				},
				files: {
					file: {
						name: 'image2'
					}
				}
			},
			body: {}
		};
		await postCreate(ctx);
		
		const newPost = {
			...ctx.request.body,
			imagePath: uploadFileMock(ctx.request.files.file)
		};
		expect(ctx.body).toEqual({post: newPost});
	});
	test('execute postUpdate function', async () => {
		const ctx = {
			request: {
				body: {
					title: 'title1',
					content: "content1",
					impacterId: 1
				},
				files: {
					file: {
						name: 'image2'
					}
				}
			},
			body: {}
		};
		await postCreate(ctx);
		
		const newPost = {
			...ctx.request.body,
			imagePath: uploadFileMock(ctx.request.files.file)
		};
		expect(ctx.body).toEqual({post: newPost});
	});
});


