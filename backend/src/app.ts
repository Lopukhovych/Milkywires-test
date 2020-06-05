import * as Koa from 'koa';
import * as logger from 'koa-morgan';
import * as bodyParser from 'koa-bodyparser';
import * as koaBody from 'koa-body';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';


import router from 'src/config/main.router';

const {notFound, unauthorized} = require('src/common/middleware/notFound.middleware');
const {handleException} = require('src/common/middleware/exception.middleware');

const app = new Koa();

app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
	ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	await next();
});

app.use(logger('tiny'));

app.use(handleException);

app.use(koaBody({ multipart: true }));
app.use(bodyParser({
	enableTypes: ['json', 'form'],
	extendTypes: {
		json: ['application/json'], // will parse application/x-javascript type body as a JSON string
	},
	onerror(err, ctx) {
		ctx.throw('body parse error', 422);
	},
}));


app.use(unauthorized);

app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', async (ctx) => {
	ctx.body = 'Hello on Milkywires';
});

app.use(mount('/static', serve('./static')));

app.use(notFound);

app.on('error', (err) => {
	console.error('Error server', err);
});

export default app;
