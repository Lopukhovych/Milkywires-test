const {
	findPostById,
	findPostListWithOptions,
	createPost,
} = require('./post.resource');

const DefaultPostLimit = 5;

export async function getPostById(id) {
	try {
		const post = await findPostById(id);
		if (!post) { throw new Error(`No post with id: ${id}`); }
		return post;
	} catch (error) {
		console.error('Error_service getPostById:', error);
		throw new Error('Cannot find post');
	}
}

export async function getPostList( {limit = DefaultPostLimit, page = 1}): Promise<object> {
	try {
		const loadPage = page > 0 ? page : 1;
		const offset = (page - 1) * limit;
		const order = [];
		console.log('getPostList: ');
		
		const {rows: posts, count} = await findPostListWithOptions({}, {order, offset, limit});
		
		return {
			posts,
			details: {
				pages: Math.ceil(count / limit),
				current: +loadPage,
			},
		};
	} catch (error) {
		console.error('Error_service getPostList:', error);
		throw new Error('Cannot find post list');
	}
}

export async function getImpacterPostList(impacterId, {limit = DefaultPostLimit, page = 1}) {
	try {
		const loadPage = page > 0 ? page : 1;
		const offset = (page - 1) * limit;
		const order = [];
		
		const {rows: posts, count} = await findPostListWithOptions({impacterId},{order, offset, limit});
		
		return {
			posts,
			details: {
				pages: Math.ceil(count / limit),
				current: +loadPage,
			},
		};
	} catch (error) {
		console.error('Error_service getImpacterPostList:', error);
		throw new Error('Cannot find impacter post list');
	}
}

export async function createNewPost({
	 title,
	 content,
	 imagePath,
	 impacterId
 }) {
	try {
		const newPost = {
			title: title.trim(),
			content,
			imagePath,
			impacterId,
		};
		const post = await createPost(newPost);
		if (!post) {
			throw new Error();
		}
		return post;
	} catch (error) {
		console.error('Error_service createNewPost:', error);
		throw new Error('Cannot create new post');
	}
}

export async function updatePost({
	title, content, imagePath, impacterId
}, post) {
	try {
		const updatedPost = {
			title: title && title.trim(),
			content,
			imagePath,
			impacterId,
		};
		return post.update(updatedPost);
	} catch (error) {
		console.error('Error_service updatePost:', error.message);
		throw new Error('Cannot update new post');
	}
}

export async function deletePost(post) {
	try {
		await post.destroy();
	} catch (error) {
		console.error('Error_service deletePost:', error.message);
		throw new Error('Cannot delete new post');
	}
}


