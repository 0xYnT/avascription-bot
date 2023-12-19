"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOrders = exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    id: zod_1.z.string(),
    listId: zod_1.z.string(),
    maker: zod_1.z.string(),
    taker: zod_1.z.string(),
    tick: zod_1.z.string(),
    number: zod_1.z.string(),
    side: zod_1.z.number(),
    price: zod_1.z.string(),
    amount: zod_1.z.string(),
    listingAt: zod_1.z.number(),
    expirationAt: zod_1.z.number(),
    dealAt: zod_1.z.number(),
    cancelAt: zod_1.z.number(),
    trxId: zod_1.z.string(),
    sellHash: zod_1.z.string(),
    status: zod_1.z.number(),
    input: zod_1.z.string(),
    precision: zod_1.z.number(),
});
exports.listOrders = zod_1.z.array(exports.orderSchema);
