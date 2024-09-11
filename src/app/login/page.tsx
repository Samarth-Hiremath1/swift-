'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Mail, Lock, User } from 'lucide-react'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to RentSpot</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input id="email" name="email" type="email" autoComplete="email" required className="pl-10" placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input id="password" name="password" type="password" autoComplete="current-password" required className="pl-10" placeholder="••••••••" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <Button type="submit" className="w-full flex justify-center py-2 px-4" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : (
                      <>
                        Sign in
                        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input id="name" name="name" type="text" autoComplete="name" required className="pl-10" placeholder="John Doe" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input id="email" name="email" type="email" autoComplete="email" required className="pl-10" placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input id="password" name="password" type="password" autoComplete="new-password" required className="pl-10" placeholder="••••••••" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password-confirm">Confirm password</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input id="password-confirm" name="password-confirm" type="password" autoComplete="new-password" required className="pl-10" placeholder="••••••••" />
                  </div>
                </div>

                <div>
                  <Button type="submit" className="w-full flex justify-center py-2 px-4" disabled={isLoading}>
                    {isLoading ? 'Registering...' : (
                      <>
                        Create account
                        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}