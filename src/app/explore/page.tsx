"use client";

import { useState } from 'react'
import { Search, Filter, Star, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

import Link from 'next/link' // Import Link for navigation


export default function ExplorePage() {
  const [priceRange, setPriceRange] = useState([0, 1000])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/home" className="text-2xl font-bold text-rose-500">
            RentSpot
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/explore" className="text-gray-600 hover:text-gray-900">
              Explore
            </Link>
            <Link href="/rentals" className="text-gray-600 hover:text-gray-900">
              Your Rentals
            </Link>
          </nav>
          <div className="flex space-x-4">
            <Button variant="ghost">Sign up</Button>
            <Button>Log in</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className="w-full md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Select>
                      <option>All Categories</option>
                      <option>Electronics</option>
                      <option>Outdoor Gear</option>
                      <option>Party Supplies</option>
                      <option>Tools</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <Slider
                      min={0}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <Select>
                      <option>Any Rating</option>
                      <option>4+ Stars</option>
                      <option>3+ Stars</option>
                      <option>2+ Stars</option>
                    </Select>
                  </div>
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>

            {/* Search Results */}
            <div className="w-full md:w-3/4">
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full"
                  icon={<Search className="text-gray-400" />}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={`/placeholder.svg?height=200&width=300`} alt="Item" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Rental Item {index + 1}</h3>
                      <p className="text-gray-600 mb-2">$50/day</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="text-yellow-400 fill-current" size={16} />
                          <span className="ml-1 text-sm text-gray-600">4.8 (42 reviews)</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin size={16} className="mr-1" />
                          <span>2 miles away</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More</Button>
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