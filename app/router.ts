'use strict'

import * as KoaRouter from 'koa-router'
import {Blockchain} from './Blockchain'
import {NetWork} from './NetWork'
import {Block} from './Block'

/**
 * 启动服务器时创建一条链
 * @type {Blockchain}
 */
const blockchain = new Blockchain()


/**
 * 区块链网络
 * @type {Set<any>}
 */
const network = new NetWork(blockchain)

const router = new KoaRouter()
export default router


/**
 * 全局捕获错误
 */
router.use('/', async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err)
  }
})

/**
 * 创建新的事务, 对应的数据会添加到链的末端
 */
router.post('/newTransaction', (ctx) => {
  let {author, content} = ctx.request.body
  if (!author || !content) {
    return ctx.body = {code: 1, msg: '参数错误'}
  }
  let transaction = {author, content, timestamp: new Date().getTime()}

  blockchain.addNewTransaction(transaction)
  ctx.body = {code: 0}
})

/**
 * 获取到整个区块链数据
 */
router.get('/chain', (ctx) => {
  let chainData = []
  for (let block of blockchain.chain) {
    chainData.push(block)
  }
  return ctx.body = {code: 1, data: {length: chainData.length, chain: chainData}}
})

/**
 * 获取待挖掘的事务
 */
router.get('/pendingTx', (ctx) => {
  return ctx.body = {code: 0, data: {unconfirmedTransactions: blockchain.unconfirmedTransactions}}
})

/**
 * 挖矿, 挖掘未确认的事务.
 */
router.get('/mine', (ctx) => {
  let result = blockchain.mime()
  if (result === -1) {
    return ctx.body = {code: 1, msg: '没有待挖掘区块'}
  }

  return ctx.body = {code: 0, data: {mime: result}}
})

/**
 * 添加别人申明的区块到自己的链中
 */
router.post('/addBlock', ctx => {
  let blockData = ctx.request.body
  let block = new Block(blockData.index, blockData.transations, blockData.timestamp, blockData.previousHash)
  let proof = blockData.hash
  let added = blockchain.addBlock(block, proof)
  if (!added) {
    return ctx.body = {code: 1, msg: '无效的区块'}
  }
  ctx.body = {code: 0, msg: '成功添加区块'}
})

/**
 * 添加节点, 构建区块链网络
 */
router.post('/addNodes', ctx => {
  let {nodes} = ctx.request.body
  if (!nodes) {
    return ctx.body = {code: 1, msg: '参数错误'}
  }
  for (let node in nodes) {
    // node: {address: 'localhost: 4000'}
    network.addPeer(node)
  }
  ctx.body = {code: 0}
})


