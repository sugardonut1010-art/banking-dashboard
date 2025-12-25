import { BankAccount } from "@/types/account"
import { Transaction } from "@/types/transaction"
import { User } from "@/types/user"
import { transactions as mockTransactions } from "@/lib/mock/transactions"

export interface BankState {
    user: User
    accounts: BankAccount[]
    transactions: Transaction[]
}

const STORAGE_KEY = "bank_state"

const initialState: BankState = {
    user: {
        id: "user_1",
        name: "Jamie",
        email: "jamieleecurtis997@gmail.com",
    },
    accounts: [
        {
            id: "acc_checking",
            name: "Checking Account",
            type: "checking",
            balance: 573_222.14,
            currency: "USD",
            accountNumber: "****1234"
        },
        {
            id: "acc_savings",
            name: "Savings Account",
            type: "savings",
            balance: 822_500.5,
            currency: "USD",
            accountNumber: "****5678"
        },
    ],
    transactions: mockTransactions,
}

export function loadBankState(): BankState {
    if (typeof window === "undefined") return initialState

    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialState

    try {
        const parsed: BankState = JSON.parse(stored)

        // Migration: if stored balances are integers (no cents), add the small
        // cent adjustments so the balances reflect the intended values.
        const needsMigration = parsed.accounts.some(a => Number.isInteger(a.balance))

        let migrated = parsed
        if (needsMigration) {
            migrated = {
                ...parsed,
                accounts: parsed.accounts.map((a) => {
                    if (a.id === "acc_checking") {
                        return { ...a, balance: a.balance + 0.14 }
                    }
                    if (a.id === "acc_savings") {
                        return { ...a, balance: a.balance + 0.5 }
                    }
                    return a
                }),
            }
        }

        // Ensure transactions are loaded - always include mock transactions if fewer than expected
        if (!migrated.transactions || migrated.transactions.length < mockTransactions.length) {
            migrated = {
                ...migrated,
                transactions: mockTransactions,
            }
        }

        // Persist migrated state
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
        return migrated
    } catch (e) {
        // If parsing fails, fall back to initial state
        return initialState
    }
}

export function saveBankState(state: BankState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
