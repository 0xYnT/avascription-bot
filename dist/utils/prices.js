"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPriceOpportunity = exports.getPrices = exports.getUnitPricesDifference = void 0;
const ethers_1 = require("ethers");
function getUnitPricesDifference(order1, order2) {
    const pricesOrder1 = getPrices(order1);
    const pricesOrder2 = getPrices(order2);
    return (+pricesOrder1.unitAsEth / +pricesOrder2.unitAsEth) * 100;
}
exports.getUnitPricesDifference = getUnitPricesDifference;
function getPrices(order) {
    return {
        unit: BigInt(order.price),
        unitAsEth: ethers_1.ethers.formatEther(order.price),
        total: BigInt(order.price) * BigInt(order.amount),
        totalAsEth: ethers_1.ethers.formatEther(BigInt(order.price) * BigInt(order.amount)),
    };
}
exports.getPrices = getPrices;
function checkPriceOpportunity(orders) {
    console.log('Checking for opportunity');
    if (!orders.length)
        return false;
    const fpOrder = orders[0];
    const fpOrderPrices = getPrices(fpOrder);
    const secondCheapestOrder = orders[1];
    const secondCheapestOrderPrices = getPrices(secondCheapestOrder);
    const diff = getUnitPricesDifference(fpOrder, secondCheapestOrder);
    console.log(`Floor priced order is ${100 - diff}% cheaper than second cheapest. (${fpOrderPrices.unitAsEth} vs ${secondCheapestOrderPrices.unitAsEth}))`);
    if (diff > 85)
        return false;
    return {
        ...fpOrder,
        prices: getPrices(fpOrder),
    };
}
exports.checkPriceOpportunity = checkPriceOpportunity;
