'use strict'

import * as KoaRouter from 'koa-router'
import {Blockchain} from './Blockchain'

const blockchain = new Blockchain()

const router = new KoaRouter()
export default router


router.use('/', async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err)
  }
})

router.post('/newTransaction', (ctx) => {
  let {author, content} = ctx.request.body
  if (!author || !content) {
    return ctx.body = {code: 1, msg: '参数错误'}
  }
  let transaction = {author, content, timestamp: new Date().getTime()}

  blockchain.addNewTransaction(transaction)
  ctx.body = {code: 0}
})


router.get('/chain', (ctx) => {
  let chainData = []
  for (let block in blockchain.chain) {
    chainData.push(block)
  }
  return ctx.body = {code: 1, data: {length: chainData.length, chain: chainData}}
})

router.get('/mine', (ctx) => {
  let result = blockchain.mime()
  if (result === -1) {
    return ctx.body = {code: 1, msg: '没有挖掘到区块'}
  }
  return ctx.body = {code: 0, data: {mime: result}}
})

router.get('/pendingTx', (ctx) => {
  return ctx.body = {code: 0, data: {unconfirmedTransactions: blockchain.unconfirmedTransactions}}
})