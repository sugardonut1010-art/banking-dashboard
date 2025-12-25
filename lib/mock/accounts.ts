import { BankAccount } from "@/types/account"

export const accounts: (BankAccount & { primary?: boolean })[] = [
    {
        id: "acc_checking",
        name: "Checking Account",
        type: "checking",
        balance: 4250.75,
        currency: "USD",
        accountNumber: "1234567890",
        primary: true, // 👈 main account
    },
    {
        id: "acc_savings",
        name: "Savings Account",
        type: "savings",
        balance: 12850.0,
        currency: "USD",
        accountNumber: "0987654321",
    },
]
