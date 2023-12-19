import { Order } from '@/models/order'

export async function buyOrder(order: Order) {
    console.log('(dry run) Buying order', order)
}
