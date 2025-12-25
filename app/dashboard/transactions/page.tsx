"use client"

import { useBank } from "@/components/providers/bank-provider"
import { formatCurrency } from "@/lib/format"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TransactionsPage() {
    const { state } = useBank()

    console.log("Transactions state:", state.transactions)

    if (state.transactions.length === 0) {
        return (
            <p className="text-muted-foreground">
                No transactions yet.
            </p>
        )
    }

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

    function getStatusColor(status: string) {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "failed":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    function formatDateTime(timestamp: string) {
        return new Date(timestamp).toLocaleString()
    }

    function getToAccountNumber(txn: any) {
        if (txn.toAccountId) {
            const account = state.accounts.find(acc => acc.id === txn.toAccountId)
            return account ? account.accountNumber : "Unknown"
        }
        return "N/A"
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Transaction History</h1>
                <p className="text-muted-foreground">
                    View all your financial transactions
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>To Account</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {state.transactions.map((txn) => (
                                <TableRow key={txn.id}>
                                    <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                                    <TableCell>{formatDateTime(txn.timestamp)}</TableCell>
                                    <TableCell>{txn.description}</TableCell>
                                    <TableCell>
                                        <Badge className={getTransactionColor(txn.type)}>
                                            {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono">{getToAccountNumber(txn)}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(txn.status || "completed")}>
                                            {(txn.status || "completed").charAt(0).toUpperCase() + (txn.status || "completed").slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={`text-right font-semibold ${txn.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                                        {formatCurrency(txn.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
