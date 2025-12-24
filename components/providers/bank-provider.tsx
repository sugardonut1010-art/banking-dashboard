"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { BankState, loadBankState, saveBankState } from "@/lib/store/bank-store"
import { Transaction, TransactionType } from "@/types/transaction"

interface BankContextValue {
    state: BankState
    transfer: (fromId: string, toId: string, amount: number) => void
}

const BankContext = createContext<BankContextValue | null>(null)

export function BankProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<BankState>(loadBankState)

    useEffect(() => {
        saveBankState(state)
    }, [state])

    function transfer(fromId: string, toId: string, amount: number) {
        setState((prev) => {
            const from = prev.accounts.find((a) => a.id === fromId)
            const to = prev.accounts.find((a) => a.id === toId)

            if (!from || !to) return prev
            if (amount <= 0 || amount > from.balance) return prev

            const newAccounts = prev.accounts.map(acc => {
                if (acc.id === fromId) return { ...acc, balance: acc.balance - amount }
                if (acc.id === toId) return { ...acc, balance: acc.balance + amount }
                return acc
            })

            const newTransactions: Transaction[] = [
                ...prev.transactions,
                {
                    id: `txn_${Date.now()}_${Math.random()}`,
                    date: new Date().toISOString().split('T')[0],
                    description: `Transfer to ${to.name}`,
                    amount: -amount,
                    type: "transfer",
                    accountId: fromId
                },
                {
                    id: `txn_${Date.now()}_${Math.random() + 1}`,
                    date: new Date().toISOString().split('T')[0],
                    description: `Transfer from ${from.name}`,
                    amount: amount,
                    type: "transfer",
                    accountId: toId
                }
            ]

            return { ...prev, accounts: newAccounts, transactions: newTransactions }
        })
    }

    return (
        <BankContext.Provider value={{ state, transfer }}>
            {children}
        </BankContext.Provider>
    )
}

export function useBank() {
    const context = useContext(BankContext)
    if (!context) throw new Error("useBank must be used within BankProvider")
    return context
}
