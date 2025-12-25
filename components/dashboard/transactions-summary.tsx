"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useBank } from "@/components/providers/bank-provider"
import { formatCurrency } from "@/lib/format"

export function TransactionsSummary() {
    const { state } = useBank()
    const recentTransactions = state.transactions
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5)

    function getTransactionColor(type: string) {
        switch (type) {
            case "deposit":
                return "bg-green-100 text-green-800"
            case "withdrawal":
                return "bg-red-100 text-red-800"
            case "transfer":
                return "bg-blue-100 text-blue-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    function getAmountColor(amount: number) {
        return amount > 0 ? "text-green-600" : "text-red-600"
    }

    if (recentTransactions.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-8">
                    No transactions yet
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentTransactions.map((txn) => (
                        <div key={txn.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                                <p className="font-medium text-sm">{txn.description}</p>
                                <p className="text-xs text-muted-foreground">{new Date(txn.timestamp).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge className={getTransactionColor(txn.type)}>
                                    {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                                </Badge>
                                <span className={`font-semibold ${getAmountColor(txn.amount)}`}>
                                    {txn.amount > 0 ? "+" : ""}{formatCurrency(txn.amount)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-end">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="dashboard/transactions">View all activity</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}