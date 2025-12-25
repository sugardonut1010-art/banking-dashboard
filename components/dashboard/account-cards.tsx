"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useBank } from "@/components/providers/bank-provider"
import { formatCurrency } from "@/lib/format"
import { Wallet, PiggyBank } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useToast } from "@/lib/use-toast"

export function AccountCards() {
    const { state } = useBank()
    const accounts = state.accounts

    return (
        <>
            {/* Tabs (mobile & desktop): show one account at a time */}
            <div>
                <AccountTabs accounts={accounts} />
            </div>
        </>
    )
}

function AccountTabs({ accounts }: { accounts: any[] }) {
    const [active, setActive] = useState(0)
    const { toast } = useToast()

    return (
        <div>
            <div className="flex gap-2 mb-4">
                {accounts.map((a, i) => (
                    <button
                        key={a.id}
                        onClick={() => setActive(i)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
                            i === active
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                    >
                        {a.type === "savings" ? (
                            <PiggyBank className="h-4 w-4" />
                        ) : (
                            <Wallet className="h-4 w-4" />
                        )}
                        <span className="truncate max-w-[120px]">{a.name}</span>
                    </button>
                ))}
            </div>

            <div>
                {accounts.map((account, index) => (
                    <div key={account.id} className={index === active ? "block" : "hidden"}>
                        <Card
                            className={cn("rounded-2xl overflow-hidden text-white shadow-lg")}
                            style={{
                                background: account.type === "savings"
                                    ? "linear-gradient(90deg,#14532d,#166534)"
                                    : "linear-gradient(90deg,#16a34a,#22c55e)"
                            }}
                        >
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm opacity-90">{account.name}</p>
                                        <p className="text-xs uppercase opacity-80 tracking-wider">{account.type} account</p>
                                    </div>
                                    <div>
                                        {account.type === "savings" ? (
                                            <PiggyBank className="h-6 w-6 opacity-95" />
                                        ) : (
                                            <Wallet className="h-6 w-6 opacity-95" />
                                        )}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-extrabold leading-none" suppressHydrationWarning>
                                            {formatCurrency(account.balance)}
                                        </div>
                                        <p className="text-sm opacity-90">Available balance</p>
                                    </div>
                                    <div className="text-right text-sm opacity-80">
                                        <div>Acct •••• {account.id.slice(-4)}</div>
                                        <div className="mt-2 text-[12px]">{account.currency}</div>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="dashboard/transfer">Transfer</Link>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => toast({
                                            title: "Deposit Unavailable",
                                            description: "Deposit functionality is currently unavailable. Please try again later."
                                        })}
                                    >
                                        Deposit
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}
