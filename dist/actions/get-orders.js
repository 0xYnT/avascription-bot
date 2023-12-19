"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheapestOrders = void 0;
const order_1 = require("@/models/order");
async function getCheapestOrders() {
    try {
        const response = await fetch('https://avascriptions.com/api/order/list', {
            method: 'POST',
            body: JSON.stringify({
                page: 1,
                pageSize: 12,
                tick: 'asct',
                status: [2],
                orderId: '',
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        const { status, data } = await response.json();
        order_1.listOrders.parse(data.list);
        if (status !== 200)
            throw new Error('Failed to fetch orders');
        return data.list;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
exports.getCheapestOrders = getCheapestOrders;
