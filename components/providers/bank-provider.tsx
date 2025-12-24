"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { BankState, loadBankState, saveBankState } from "@/lib/store/bank-store"
import { Transaction, TransactionType } from "@/types/transaction"
import { toast } from "@/lib/use-toast"

interface BankContextValue {
    state: BankState
    transfer: (fromId: string, toId: string, amount: number) => void
}

const BankContext = createContext<BankContextValue | null>(null)

export function BankProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<BankState>(loadBankState)
    const { data: session } = useSession()

    useEffect(() => {
        saveBankState(state)
    }, [state])

    useEffect(() => {
        if (session?.user) {
            const user = session.user
            setState(prev => ({
                ...prev,
                user: {
                    id: (user as any).id,
                    name: user.name!,
                    email: user.email!,
                }
            }))
        }
    }, [session])

    function transfer(fromId: string, toId: string, amount: number) {
        const from = state.accounts.find((a) => a.id === fromId)
        const to = state.accounts.find((a) => a.id === toId)

        if (!from || !to) {
            toast({
                title: "Transfer Failed",
                description: "Invalid account selected.",
                variant: "destructive",
            })
            return
        }
        if (amount <= 0) {
            toast({
                title: "Transfer Failed",
                description: "Amount must be greater than zero.",
                variant: "destructive",
            })
            return
        }
        if (amount > from.balance) {
            toast({
                title: "Transfer Failed",
                description: "Insufficient funds.",
                variant: "destructive",
            })
            return
        }

        setState((prev) => {
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

        toast({
            title: "Transfer Successful",
            description: `$${amount.toLocaleString()} transferred from ${from.name} to ${to.name}.`,
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
