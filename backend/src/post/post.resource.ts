import * as models from 'models';

export async function findPostById(id): Promise<any> {
	return models.Post.findByPk(id);
}

export async function findPostListWithOptions(whereOptions: object, options: object): Promise<any> {
	return models.Post
		.findAndCountAll({
			where: {...whereOptions},
			include: [],
			...options,
		});
}

export async function createPost(post): Promise<any> {
	return models.Post.create(post);
}
