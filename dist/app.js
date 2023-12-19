"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const ethers_1 = require("ethers");
const get_orders_1 = require("./actions/get-orders");
const prices_1 = require("./utils/prices");
const buy_order_1 = require("./actions/buy-order");
const MAX_PRICE_TO_PAY = ethers_1.ethers.parseEther('2');
let checkInterval = null, onGoingBuyProcess = false;
async function main() {
    checkInterval = setInterval(() => {
        checkOpportunity();
    }, 7000);
}
async function checkOpportunity() {
    if (onGoingBuyProcess)
        return;
    const orderList = await (0, get_orders_1.getCheapestOrders)();
    const order = (0, prices_1.checkPriceOpportunity)(orderList);
    if (order) {
        await onOpportunityFound(order);
    }
}
async function onOpportunityFound(order) {
    console.log('Opportunity found', order);
    if (order.prices.total > MAX_PRICE_TO_PAY) {
        console.log('Too expensive');
        return;
    }
    onGoingBuyProcess = true;
    await (0, buy_order_1.buyOrder)(order);
    onGoingBuyProcess = false;
}
main()
    .then(() => console.log('Bot started'))
    .catch((e) => console.error(e));
