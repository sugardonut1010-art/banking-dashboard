export type TransactionType = "deposit" | "withdrawal" | "transfer"

export type TransactionStatus = "completed" | "pending" | "failed"

export interface Transaction {
    id: string
    timestamp: string
    description: string
    amount: number
    type: TransactionType
    accountId: string
    toAccountId?: string
    status: TransactionStatus
}
