import {setBadRequest} from 'src/common/middleware/exception.middleware';
import {
	getPostById,
	getPostList,
	getImpacterPostList,
	updatePost,
	deletePost,
	createNewPost
} from './post.service';
import {uploadFile} from 'src/file/file.service';

export async function postList(ctx): Promise<void> {
	try {
		const {query} = ctx.request;
		const postList = await getPostList(query);
		ctx.status = 200;
		ctx.body = {...postList};
	} catch (error) {
		console.error('Error_controller postList:', error.message);
		await setBadRequest(ctx, error);
	}
}

export async function impacterPostList(ctx) {
	try {
		const {id} = ctx.params;
		const {query} = ctx.request;
		const postList = await getImpacterPostList(id, query);
		
		ctx.status = 200;
		ctx.body = {...postList};
	} catch (error) {
		console.error('Error_controller postDetail:', error.message);
		await setBadRequest(ctx, error);
	}
}

export async function postDetails(ctx) {
	try {
		const {id} = ctx.params;
		
		const post = await getPostById(id);
		
		ctx.status = 200;
		ctx.body = {post};
	} catch (error) {
		console.error('Error_controller postDetail:', error.message);
		await setBadRequest(ctx, error);
	}
}

export async function postCreate(ctx) {
	try {
		const {
			title,
			content,
			impacterId,
		} = ctx.request.body;
		
		let imagePath = ctx.request.body.imagePath;
		if (!imagePath) {
			const {file} = ctx.request.files;
			imagePath = await uploadFile(file);
		}
		
		const post = await createNewPost({
			title,
			content,
			imagePath,
			impacterId,
		});
		
		ctx.status = 201;
		ctx.body = {post};
	} catch (error) {
		console.error('Error_controller postCreate:', error.message);
		await setBadRequest(ctx, error);
	}
}

export async function postUpdate(ctx) {
	try {
		console.log('postUpdate: ',);
		const {id} = ctx.params;
		const {
			title, content, impacterId
		} = ctx.request.body;
		console.log('title: ', title);

		let imagePath = ctx.request.body.imagePath;
		if (!imagePath) {
			const {file} = ctx.request.files;
			imagePath = await uploadFile(file);
		}

		const post = await getPostById(id);
		// TODO Add removing images
		const updatedPost = await updatePost({
			title, content, imagePath, impacterId
		}, post);
		
		ctx.status = 200;
		ctx.body = { post: updatedPost };
	} catch (error) {
		console.error('Error_controller postUpdate:', error.message);
		await setBadRequest(ctx, error);
	}
}

export async function postDelete(ctx) {
	try {
		const {id} = ctx.params;
		
		const post = await getPostById(id);
		
		await deletePost(post);
		
		ctx.status = 200;
		ctx.body = {
			deleted: true,
		};
	} catch (error) {
		console.error('Error_controller postDelete:', error.message);
		await setBadRequest(ctx, error);
	}
}
