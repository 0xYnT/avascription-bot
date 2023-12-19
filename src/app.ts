import 'module-alias/register'
import { ethers } from 'ethers'
import { getCheapestOrders } from './actions/get-orders'
import { Prices, checkPriceOpportunity } from './utils/prices'
import { buyOrder } from './actions/buy-order'
import { Order } from './models/order'

const MAX_PRICE_TO_PAY = ethers.parseEther('2')

let checkInterval = null,
    onGoingBuyProcess = false

async function main() {
    checkInterval = setInterval(() => {
        checkOpportunity()
    }, 7000)
}

async function checkOpportunity() {
    if (onGoingBuyProcess) return

    const orderList = await getCheapestOrders()
    const order = checkPriceOpportunity(orderList)

    if (order) {
        await onOpportunityFound(order)
    }
}

async function onOpportunityFound(order: Order & { prices: Prices }) {
    console.log('Opportunity found', order)

    if (order.prices.total > MAX_PRICE_TO_PAY) {
        console.log('Too expensive')
        return
    }

    onGoingBuyProcess = true
    await buyOrder(order)
    onGoingBuyProcess = false
}

main()
    .then(() => console.log('Bot started'))
    .catch((e) => console.error(e))
