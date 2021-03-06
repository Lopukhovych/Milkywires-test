export async function notFound(ctx) {
	ctx.status = 404;
	switch (ctx.accepts('json', 'html')) {
		case 'json':
			ctx.body = {
				message: 'Page Not Found',
			};
			break;
		case 'html':
			ctx.type = 'html';
			ctx.body = '<p>Page Not Found</p>';
			break;
		default:
			ctx.type = 'text';
			ctx.body = 'Page Not Found';
	}
}

export async function unauthorized(ctx, next) {
	try {
		await next();
	} catch (err) {
		if (err.status === 401) {
			ctx.status = 401;
			const errMessage = err.originalError
				? err.originalError.message
				: err.message;
			ctx.body = {
				error: errMessage,
			};
			ctx.set('X-Status-Reason', errMessage);
		} else {
			throw err;
		}
	}
}
