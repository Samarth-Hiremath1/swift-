"use client";

import { useState } from 'react'
import { Search, Filter, Star, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import RentalCard from "@/components/RentalCard" // Import RentalCard component

import Link from 'next/link' // Import Link for navigation

import Vase from '../../images/gold-vase.jpg' // Import the image as a string


export default function ExplorePage() {
  const [priceRange, setPriceRange] = useState([0, 1000])

  return (
    <div className="min-h-screen flex flex-col">

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
                  <RentalCard
                    key={index}
                    name={`Rental Item ${index + 1}`}
                    image={Vase.src}
                    rating={4.8}
                    numRatings={42}
                    distance="2 miles away"
                    location="Location"
                    price={50}
                    isFavorite={false}
                    isGuestFavorite={index % 2 === 0}
                  />
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