import * as postController from './post.controller';

export default (router) => {
	router.get('/post', postController.postList);
	router.get('/post-impacter/:id', postController.impacterPostList);
	router.post('/post', postController.postCreate);
	router.get('/post/:id', postController.postDetails);
	router.put('/post/:id', postController.postUpdate);
	router.del('/post/:id', postController.postDelete);
	return router;
};
