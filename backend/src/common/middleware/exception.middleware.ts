export async function handleException(ctx, next): Promise<any> {
	return next().catch((err) => {
		const { statusCode, message } = err;
		
		ctx.type = 'json';
		ctx.status = statusCode || 500;
		ctx.body = {
			status: 'error',
			message,
		};
		
		ctx.app.emit('error', err, ctx);
	});
}

export async function setUnauthorized(ctx): Promise<any> {
	return ctx.throw(
		401,
		'Unauthorized',
		{ headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' } },
	);
}

export async function setForbidden(ctx): Promise<any> {
	return ctx.throw(
		403,
		'Forbidden',
		{ headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' } },
	);
}

export async function setBadRequest(ctx, error): Promise<any> {
	return ctx.throw(
		400,
		'Bad Request',
		error,
	);
}


