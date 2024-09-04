"use client";

import { useState } from 'react'
import { Star, Heart, Share, MapPin, Calendar, DollarSign, Shield, Award } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"

export default function ItemViewPage() {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() })

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-rose-500">RentSpot</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">Explore</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Your Rentals</a>
          </nav>
          <div className="flex space-x-4">
            <Button variant="ghost">Sign up</Button>
            <Button>Log in</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">High-End DSLR Camera</h1>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Star className="text-yellow-400 fill-current" size={20} />
              <span className="ml-1 font-semibold">4.9</span>
              <span className="mx-1">·</span>
              <span className="text-gray-500 underline">42 reviews</span>
              <span className="mx-1">·</span>
              <MapPin size={16} className="text-gray-500" />
              <span className="text-gray-500 ml-1">New York, NY</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Share size={16} className="mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Heart size={16} className="mr-2" />
                Save
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <img src="/placeholder.svg?height=400&width=600" alt="Item" className="w-full h-[400px] object-cover rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <img src="/placeholder.svg?height=196&width=296" alt="Item detail" className="w-full h-[196px] object-cover rounded-lg" />
              <img src="/placeholder.svg?height=196&width=296" alt="Item detail" className="w-full h-[196px] object-cover rounded-lg" />
              <img src="/placeholder.svg?height=196&width=296" alt="Item detail" className="w-full h-[196px] object-cover rounded-lg" />
              <img src="/placeholder.svg?height=196&width=296" alt="Item detail" className="w-full h-[196px] object-cover rounded-lg" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">About this item</h2>
                <p className="text-gray-600">
                  This high-end DSLR camera is perfect for professional photographers or enthusiasts looking to capture stunning images. With its advanced features and superior image quality, you'll be able to take your photography to the next level.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">What this item offers</h2>
                <ul className="grid grid-cols-2 gap-4">
                  <li className="flex items-center"><Shield className="mr-2" /> Insurance included</li>
                  <li className="flex items-center"><Award className="mr-2" /> Professional-grade equipment</li>
                  <li className="flex items-center"><Calendar className="mr-2" /> Flexible rental periods</li>
                  <li className="flex items-center"><MapPin className="mr-2" /> Local pickup available</li>
                </ul>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6 border sticky top-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold">$75</span>
                    <span className="text-gray-500"> / day</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="ml-1 font-semibold">4.9</span>
                    <span className="text-gray-500 ml-1">(42)</span>
                  </div>
                </div>

                {/* <DatePickerWithRange date={dateRange} setDate={setDateRange} className="mb-4" /> */}

                <Button className="w-full mb-4">Reserve</Button>

                <div className="text-center text-gray-500 text-sm mb-4">You won't be charged yet</div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>$75 x 3 nights</span>
                    <span>$225</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$30</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>$255</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2023 RentSpot. All rights reserved.
        </div>
      </footer>
    </div>
  )
}