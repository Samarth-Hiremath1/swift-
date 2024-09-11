'use client';

import { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { updateProfile } from 'firebase/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Mail, Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+

export default function AuthPage() {
  const router = useRouter(); // Ensure useRouter is used inside the component function
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [createUserWithEmailAndPassword, user, error] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, user_sign_in, error_sign_in] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });

      if (res && res.user) {
        console.log('User signed in:', res.user);
        sessionStorage.setItem('user', String(true));
        setEmail('');
        setPassword('');
        router.push('/'); // Correct usage of router.push
      }
    } catch (e) {
      console.error('Error during sign in:', e.message || e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);

      if (userCredential && userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        console.log('User profile updated with name:', name);
        sessionStorage.setItem('user', String(true));
      }

      setName('');
      setEmail('');
      setPassword('');
    } catch (e: any) {
      console.error('Error during sign up:', e.message || e);
    } finally {
      setIsLoading(false);
    }
  };

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
              <form className="space-y-6" onSubmit={handleSignIn}>
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      autoComplete="email" 
                      required 
                      className="pl-10" 
                      placeholder="you@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      autoComplete="current-password" 
                      required 
                      className="pl-10" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                </div>

                <div>
                  <Button type="submit" className="w-full flex justify-center py-2 px-4" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : (
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
            <form className="space-y-6" onSubmit={handleRegisterSubmit}>
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input 
                      id="name" 
                      name="name" 
                      type="text" 
                      autoComplete="name" 
                      required 
                      className="pl-10" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      autoComplete="email" 
                      required 
                      className="pl-10" 
                      placeholder="you@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      autoComplete="new-password" 
                      required 
                      className="pl-10" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password-confirm">Confirm password</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <Input 
                      id="password-confirm" 
                      name="password-confirm" 
                      type="password" 
                      autoComplete="new-password" 
                      required 
                      className="pl-10" 
                      placeholder="••••••••" 
                    />
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
  );
}
