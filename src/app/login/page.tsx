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
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'; // Import React Hot Toast

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcgQPUGt90vlIAo8UdTc3FOeJ5WbdVsi8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) {
        const contentType = res.headers.get('Content-Type');
        let errorMessage = 'An unexpected error occurred.';
  
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          errorMessage = errorData.error?.message || `HTTP error! Status: ${res.status}`;
        } else {
          const text = await res.text();
          errorMessage = `HTTP error! Status: ${res.status}. Response: ${text}`;
        }
  
        throw new Error(errorMessage);
      }
  
      const data = await res.json();
      // Handle successful response
      sessionStorage.setItem('user', String(true));
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (e: any) {
      if (e.message === 'INVALID_LOGIN_CREDENTIALS') {
        toast.error('Invalid login credentials. Please try again.'); // Show error toast
      }
      console.log('Error caught:', e); // Debugging line
      console.log('Error message:', e.message); // Debugging line
  
      //toast.error(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      // Firebase URL for creating a new user
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcgQPUGt90vlIAo8UdTc3FOeJ5WbdVsi8`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );
  
      if (!res.ok) {
        const contentType = res.headers.get('Content-Type');
        let errorMessage = 'An unexpected error occurred.';
  
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          errorMessage = errorData.error?.message || `HTTP error! Status: ${res.status}`;
        } else {
          const text = await res.text();
          errorMessage = `HTTP error! Status: ${res.status}. Response: ${text}`;
        }
  
        throw new Error(errorMessage);
      }
  
      const data = await res.json();
      const idToken = data.idToken; // Get the ID token from the response
  
      // Update profile with the user's display name
      const profileRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCcgQPUGt90vlIAo8UdTc3FOeJ5WbdVsi8`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken,
            displayName: name,
            returnSecureToken: true,
          }),
        }
      );
  
      if (!profileRes.ok) {
        const contentType = profileRes.headers.get('Content-Type');
        let errorMessage = 'An error occurred while updating the profile.';
  
        if (contentType && contentType.includes('application/json')) {
          const errorData = await profileRes.json();
          errorMessage = errorData.error?.message || `HTTP error! Status: ${profileRes.status}`;
        } else {
          const text = await profileRes.text();
          errorMessage = `HTTP error! Status: ${profileRes.status}. Response: ${text}`;
        }
  
        throw new Error(errorMessage);
      }
  
      sessionStorage.setItem('user', String(true));
      setName('');
      setEmail('');
      setPassword('');
    } catch (e: any) {
      if (e.message.includes('EMAIL_EXISTS')) {
        toast.error('Email already in use. Please use a different email.'); // Show error toast
      } else if (e.message.includes('WEAK_PASSWORD')) {
        toast.error('Password should be at least 6 characters.'); // Show error toast
      } else {
        toast.error(e.message || 'An unexpected error occurred.'); // Show unexpected error toast
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} /> {/* Toaster Component for displaying popups */}
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
