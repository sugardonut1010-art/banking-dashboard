"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { accounts } from "@/lib/mock/accounts"
import { cn } from "@/lib/utils"

export function AccountCards() {
    return (
        <>
            {/* Mobile: Swipeable */}
            <div className="md:hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                    {accounts.map((account) => (
                        <div
                            key={account.id}
                            className="min-w-[85%] snap-center"
                        >
                            <Card
                                className={cn(
                                    "transition-all",
                                    account.primary &&
                                    "border-primary shadow-lg"
                                )}
                            >
                                <CardHeader>
                                    <p className="text-sm text-muted-foreground">
                                        {account.name}
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <div className="text-3xl font-bold">
                                        ${account.balance.toLocaleString()}
                                    </div>
                                    <p className="text-sm capitalize text-muted-foreground">
                                        {account.type} account
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-4">
                {accounts.map((account) => (
                    <Card
                        key={account.id}
                        className={cn(
                            account.primary &&
                            "border-primary shadow-md"
                        )}
                    >
                        <CardHeader>
                            <p className="text-sm text-muted-foreground">
                                {account.name}
                            </p>
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${account.balance.toLocaleString()}
                            </div>
                            <p className="text-sm capitalize text-muted-foreground">
                                {account.type} account
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}
