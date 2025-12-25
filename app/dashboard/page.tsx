import { AccountCards } from "@/components/dashboard/account-cards"
import { TransactionsSummary } from "@/components/dashboard/transactions-summary"
import { user } from "@/lib/mock/user"

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-muted-foreground">
                    Overview of your financial activity
                </p>
            </div>

            <AccountCards />
            <TransactionsSummary />
        </div>
    )
}
