
"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { toast } from "react-toastify"
import type { FormEvent } from "react"

export default function LoginPage() {
    const router = useRouter()

    const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const user = Object.fromEntries(formData.entries()) as {
            email: string
            password: string
        }

        const { password } = user

        // Password validation
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter.")
            return
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter.")
            return
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.")
            return
        }

        try {
            const { data, error } = await authClient.signIn.email({
                ...user,
            })

            if (error) {
                toast.error(error.message || "Invalid email or password.")
                return
            }

            if (data) {
                toast.success("Login successful! Welcome back.")

                router.push("/")
            }
        } catch {
            toast.error("Something went wrong. Please try again.")
        }
    }

    return (
        <div className="flex flex-col gap-6 max-w-6xl mx-auto my-18">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Login</CardTitle>
                    <CardDescription>
                        Login with you Google account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleEmailLogin}>
                        <FieldGroup>
                            <Field>
                                <Button variant="outline" type="button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>

                                    Login with Google
                                </Button>
                            </Field>

                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>

                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>

                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                            </Field>

                            <Field>
                                <Button type="submit" className="bg-green-700 hover:bg-green-800">Login</Button>

                                <FieldDescription className="text-center">
                                    Don&apos;t Have an account?{" "}
                                    <a href="/register">Register</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}
