import Router from '@koa/router'
  
export const router = new Router()

router.get('/tweets', function(ctx){
  
  ctx.body = 'tweets'
})