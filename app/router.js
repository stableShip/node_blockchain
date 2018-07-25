'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var KoaRouter = require("koa-router");
var Blockchain_1 = require("./Blockchain");
var blockchain = new Blockchain_1.Blockchain();
var router = new KoaRouter();
router.post('/newTransaction', function (ctx) {
    blockchain.addNewTransaction({});
    ctx.body = { code: 0 };
});
