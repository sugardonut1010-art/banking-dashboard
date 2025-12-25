"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { transactions } from "@/lib/mock/transactions"
import { accounts } from "@/lib/mock/accounts"
import { filterTransactions } from "@/lib/transactions"
import { formatCurrency } from "@/lib/format"
import { Transaction } from "@/types/transaction"

export function TransactionsTable() {
    const [search, setSearch] = useState("")
    const [type, setType] = useState("all")
    const [accountId, setAccountId] = useState("all")

    const filtered = filterTransactions(
        transactions,
        search,
        type,
        accountId
    )

    function amountColor(amount: number) {
        return amount > 0 ? "text-green-600" : "text-red-600"
    }

    function typeBadge(type: Transaction["type"]) {
        switch (type) {
            case "deposit":
                return <Badge variant="default">Deposit</Badge>
            case "withdrawal":
                return <Badge variant="destructive">Withdrawal</Badge>
            case "transfer":
                return <Badge variant="secondary">Transfer</Badge>
        }
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row">
                <Input
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="md:w-48">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="deposit">Deposit</SelectItem>
                        <SelectItem value="withdrawal">Withdrawal</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={accountId} onValueChange={setAccountId}>
                    <SelectTrigger className="md:w-64">
                        <SelectValue placeholder="Account" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Accounts</SelectItem>
                        {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                                {account.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filtered.map((txn) => (
                        <TableRow key={txn.id}>
                            <TableCell>{new Date(txn.timestamp).toLocaleDateString()}</TableCell>
                            <TableCell>{txn.description}</TableCell>
                            <TableCell>{typeBadge(txn.type)}</TableCell>
                            <TableCell
                                className={`text-right font-medium ${amountColor(txn.amount)}`}
                            >
                                {formatCurrency(txn.amount)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground">
                    No transactions found.
                </p>
            )}
        </div>
    )
}
