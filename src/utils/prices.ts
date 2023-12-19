import { Order } from '@/models/order'
import { ethers } from 'ethers'

export interface Prices {
    unit: bigint
    unitAsEth: string
    total: bigint
    totalAsEth: string
}

export function getUnitPricesDifference(order1: Order, order2: Order) {
    const pricesOrder1 = getPrices(order1)
    const pricesOrder2 = getPrices(order2)
    return (+pricesOrder1.unitAsEth / +pricesOrder2.unitAsEth) * 100
}

export function getPrices(order: Order): Prices {
    return {
        unit: BigInt(order.price),
        unitAsEth: ethers.formatEther(order.price),
        total: BigInt(order.price) * BigInt(order.amount),
        totalAsEth: ethers.formatEther(
            BigInt(order.price) * BigInt(order.amount)
        ),
    }
}

export function checkPriceOpportunity(orders: Order[]) {
    console.log('Checking for opportunity')

    if (!orders.length) return false

    const fpOrder = orders[0]
    const fpOrderPrices = getPrices(fpOrder)
    const secondCheapestOrder = orders[1]
    const secondCheapestOrderPrices = getPrices(secondCheapestOrder)

    const diff = getUnitPricesDifference(fpOrder, secondCheapestOrder)

    console.log(
        `Floor priced order is ${100 - diff}% cheaper than second cheapest. (${
            fpOrderPrices.unitAsEth
        } vs ${secondCheapestOrderPrices.unitAsEth}))`
    )

    if (diff > 85) return false

    return {
        ...fpOrder,
        prices: getPrices(fpOrder),
    }
}
