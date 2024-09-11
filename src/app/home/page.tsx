"use client";

import { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Calendar, Star, ArrowRight, DollarSign, Package, Truck, Camera, Tent } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import Link from 'next/link' // Import Link for navigation


export default function LandingPage() {
  const [userType, setUserType] = useState('renter')
  const reviewsRef = useRef(null)

  useEffect(() => {
    const scrollReviews = () => {
      if (reviewsRef.current !== null) {
        const currentRef = reviewsRef.current as HTMLDivElement;
        if (currentRef.scrollLeft >= currentRef.scrollWidth / 2) {
          currentRef.scrollLeft = 0;
        } else {
          currentRef.scrollLeft += 1;
        }
      }
    }

    const intervalId = setInterval(scrollReviews, 30)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-rose-50 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">Rent Anything, Anywhere</h1>
            <p className="text-xl text-center mb-8 text-gray-600">Discover unique items to rent for your next project, event, or adventure.</p>
            <div className="max-w-3xl mx-auto bg-white rounded-full shadow-lg p-2 flex items-center space-x-4">
              <div className="flex-grow">
                <Input type="text" placeholder="What do you want to rent?" className="w-full border-none focus:ring-0" />
              </div>
              <div className="flex-grow">
                <Input type="text" placeholder="Where?" className="w-full border-none focus:ring-0" />
              </div>
              <Button size="lg" className="rounded-full">
                <Search className="mr-2" />
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: 'Electronics', icon: <Camera size={48} /> },
                { name: 'Outdoor Gear', icon: <Tent size={48} /> },
                { name: 'Party Supplies', icon: <Package size={48} /> },
                { name: 'Tools', icon: <Truck size={48} /> }
              ].map((category) => (
                <div key={category.name} className="bg-gray-100 rounded-lg p-6 text-center hover:shadow-md transition duration-300">
                  <div className="text-4xl mb-4 text-rose-500">{category.icon}</div>
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Items */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">Trending Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: 1, name: 'High-End Camera', price: 50, rating: 4.9, icon: <Camera size={24} /> },
                { id: 2, name: 'Mountain Bike', price: 35, rating: 4.7, icon: <Tent size={24} /> },
                { id: 3, name: 'Drone', price: 75, rating: 4.8, icon: <Camera size={24} /> },
                { id: 4, name: 'Camping Tent', price: 30, rating: 4.6, icon: <Tent size={24} /> }
              ].map((item, index) => (
                <Link href={`/items/${item.id}`} key={index}> {/* Use Link to create a clickable card */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                    <div className="h-48 bg-gray-200 flex items-center justify-center text-rose-500">{item.icon}</div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-2">${item.price}/day</p>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">How RentSpot Works</h2>
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2">
                <Label htmlFor="user-type">For Renters</Label>
                <Switch
                  id="user-type"
                  checked={userType === 'owner'}
                  onCheckedChange={(checked: boolean) => setUserType(checked ? 'owner' : 'renter')}
                />
                <Label htmlFor="user-type">For Owners</Label>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {userType === 'renter' ? (
                <>
                  <div className="text-center">
                    <div className="bg-rose-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Search className="text-rose-500" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Find the Perfect Item</h3>
                    <p className="text-gray-600">Browse thousands of items available for rent in your area.</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-rose-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="text-rose-500" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Book Your Rental</h3>
                    <p className="text-gray-600">Choose your rental dates and book securely through our platform.</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-rose-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="text-rose-500" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Pick Up or Get Delivered</h3>
                    <p className="text-gray-600">Collect your item or have it delivered right to your doorstep.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="bg-rose-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Package className="text-rose-500" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">List Your Items</h3>
                    <p className="text-gray-600">Easily list your items for rent and set your own prices.</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-rose-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="text-rose-500" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Manage Bookings</h3>
                    <p className="text-gray-600">Accept bookings and manage your rental calendar effortlessly.</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-rose-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="text-rose-500" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Earn Money</h3>
                    <p className="text-gray-600">Get paid securely for your rentals through our platform.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-12 text-center">What Our Users Say</h2>
            <div className="relative">
              <div ref={reviewsRef} className="flex space-x-6 overflow-x-hidden">
                {[
                  { name: 'Alex', text: "RentSpot saved me so much money on equipment for my weekend project!" },
                  { name: 'Sarah', text: "I love how easy it is to find and rent unique items for special occasions." },
                  { name: 'Mike', text: "As an owner, I've been able to make great extra income from my unused gear." },
                  { name: 'Emily', text: "The variety of items available is amazing. I always find what I need!" },
                  { name: 'David', text: "Renting out my tools has been a breeze. Great platform for owners!" },
                  { name: 'Lisa', text: "I've had nothing but positive experiences with RentSpot. Highly recommend!" }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md flex-shrink-0" style={{ width: '300px' }}>
                    <p className="mb-4 text-gray-600">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <div className="flex text-yellow-400">
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-rose-500 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-4 text-white">Ready to Start Renting or Listing?</h2>
            <p className="text-xl mb-8 text-rose-100">Join thousands of happy renters and owners on RentSpot today.</p>
            <Button size="lg" variant="secondary" className="rounded-full">
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">RentSpot</h3>
              <p className="text-gray-600">Rent anything, anywhere.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About us</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900">Safety</a></li>
                <li><a href="#" className="hover:text-gray-900">Cancellation options</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900">Trust & Safety</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            © 2023 RentSpot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}