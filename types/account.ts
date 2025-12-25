export type AccountType = "checking" | "savings"

export interface BankAccount {
    id: string
    name: string
    type: AccountType
    balance: number
    currency: "USD"
    accountNumber: string
}
