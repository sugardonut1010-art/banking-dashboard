"use client"

import { useState } from "react"
import { accounts } from "@/lib/mock/accounts"
import { transfers } from "@/lib/mock/transfers"
import { formatCurrency } from "@/lib/format"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

type Step = 1 | 2 | 3 | 4

export function TransferForm() {
    const [step, setStep] = useState<Step>(1)
    const [fromId, setFromId] = useState("")
    const [toId, setToId] = useState("")
    const [amount, setAmount] = useState("")
    const [error, setError] = useState("")

    const from = accounts.find((a) => a.id === fromId)
    const to = accounts.find((a) => a.id === toId)
    const amt = Number(amount)

    function next() {
        setError("")
        setStep((s) => (s + 1) as Step)
    }

    function back() {
        setError("")
        setStep((s) => (s - 1) as Step)
    }

    function validateStep1() {
        if (!from || !to) {
            setError("Please select both accounts.")
            return false
        }
        if (from.id === to.id) {
            setError("Accounts must be different.")
            return false
        }
        return true
    }

    function validateStep2() {
        if (amt <= 0) {
            setError("Enter a valid amount.")
            return false
        }
        if (!from || from.balance < amt) {
            setError("Insufficient funds.")
            return false
        }
        return true
    }

    function submit() {
        transfers.push({
            id: `tr_${Date.now()}`,
            fromAccountId: fromId,
            toAccountId: toId,
            amount: amt,
            date: new Date().toISOString(),
        })
        next()
    }

    return (
        <Card className="max-w-lg mx-auto">
            <CardHeader className="text-sm text-muted-foreground">
                Step {step} of 4
            </CardHeader>

            <CardContent className="space-y-6">
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* STEP 1 — ACCOUNTS */}
                {step === 1 && (
                    <>
                        <Select value={fromId} onValueChange={setFromId}>
                            <SelectTrigger>
                                <SelectValue placeholder="From account" />
                            </SelectTrigger>
                            <SelectContent>
                                {accounts.map((a) => (
                                    <SelectItem key={a.id} value={a.id}>
                                        {a.name} — {formatCurrency(a.balance)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={toId} onValueChange={setToId}>
                            <SelectTrigger>
                                <SelectValue placeholder="To account" />
                            </SelectTrigger>
                            <SelectContent>
                                {accounts.map((a) => (
                                    <SelectItem key={a.id} value={a.id}>
                                        {a.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            className="w-full"
                            onClick={() => validateStep1() && next()}
                        >
                            Continue
                        </Button>
                    </>
                )}

                {/* STEP 2 — AMOUNT */}
                {step === 2 && (
                    <>
                        <Input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={back}>
                                Back
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => validateStep2() && next()}
                            >
                                Continue
                            </Button>
                        </div>
                    </>
                )}

                {/* STEP 3 — CONFIRM */}
                {step === 3 && from && to && (
                    <>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center justify-between">
                                <span>{from.name}</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                <span>{to.name}</span>
                            </div>

                            <Separator />

                            <div className="text-center text-2xl font-bold">
                                {formatCurrency(amt)}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={back}>
                                Back
                            </Button>
                            <Button className="flex-1" onClick={submit}>
                                Confirm Transfer
                            </Button>
                        </div>
                    </>
                )}

                {/* STEP 4 — SUCCESS */}
                {step === 4 && (
                    <Alert>
                        <AlertTitle>Transfer Complete</AlertTitle>
                        <AlertDescription>
                            Your money has been transferred successfully.
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}
