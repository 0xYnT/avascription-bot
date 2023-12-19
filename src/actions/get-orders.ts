import { Order, listOrders } from '@/models/order'

export async function getCheapestOrders(): Promise<Order[]> {
    try {
        const response = await fetch(
            'https://avascriptions.com/api/order/list',
            {
                method: 'POST',
                body: JSON.stringify({
                    page: 1,
                    pageSize: 12,
                    tick: 'asct',
                    status: [2],
                    orderId: '',
                }),
                headers: { 'Content-Type': 'application/json' },
            }
        )
        const { status, data }: any = await response.json()

        listOrders.parse(data.list)

        if (status !== 200) throw new Error('Failed to fetch orders')

        return data.list
    } catch (e) {
        console.log(e)
        return []
    }
}
