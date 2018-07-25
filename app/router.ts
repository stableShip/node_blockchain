'use strict'

import * as KoaRouter from 'koa-router'
import {Blockchain} from './Blockchain'

const blockchain = new Blockchain()

const router = new KoaRouter()


router.post('/newTransaction', (ctx) => {


  blockchain.addNewTransaction({})
  ctx.body = {code: 0}
})