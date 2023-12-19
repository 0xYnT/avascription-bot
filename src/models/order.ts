import { z } from 'zod'

export const orderSchema = z.object({
    id: z.string(),
    listId: z.string(),
    maker: z.string(),
    taker: z.string(),
    tick: z.string(),
    number: z.string(),
    side: z.number(),
    price: z.string(),
    amount: z.string(),
    listingAt: z.number(),
    expirationAt: z.number(),
    dealAt: z.number(),
    cancelAt: z.number(),
    trxId: z.string(),
    sellHash: z.string(),
    status: z.number(),
    input: z.string(),
    precision: z.number(),
})
export const listOrders = z.array(orderSchema)
export type Order = z.infer<typeof orderSchema>
