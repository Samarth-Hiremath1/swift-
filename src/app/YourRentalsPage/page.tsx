import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Package, DollarSign, Star, MapPin } from 'lucide-react'

export default function YourRentalsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-rose-500">RentSpot</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">Explore</a>
            <a href="#" className="text-gray-900 font-semibold">Your Rentals</a>
          </nav>
          <div className="flex space-x-4">
            <Button variant="ghost">Sign up</Button>
            <Button>Log in</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Rentals</h1>
          <Tabs defaultValue="renting">
            <TabsList>
              <TabsTrigger value="renting">Renting</TabsTrigger>
              <TabsTrigger value="lending">Lending</TabsTrigger>
            </TabsList>
            <TabsContent value="renting">
              <div className="grid gap-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start">
                      <img src={`/placeholder.svg?height=100&width=100`} alt="Item" className="w-24 h-24 object-cover rounded-md mr-6" />
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-2">Rented Item {index + 1}</h3>
                        <p className="text-gray-600 mb-2">Rented from: John Doe</p>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar size={16} className="mr-1" />
                          <span>May 15, 2023 - May 20, 2023</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin size={16} className="mr-1" />
                          <span>123 Main St, Anytown, USA</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold mb-2">$250 total</p>
                        <Button variant="outline">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="lending">
              <div className="grid gap-6">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start">
                      <img src={`/placeholder.svg?height=100&width=100`} alt="Item" className="w-24 h-24 object-cover rounded-md mr-6" />
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-2">Your Item {index + 1}</h3>
                        <p className="text-gray-600 mb-2">Rented to: Jane Smith</p>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar size={16} className="mr-1" />
                          <span>June 1, 2023 - June 5, 2023</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <DollarSign size={16} className="mr-1" />
                          <span>Earnings: $150</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline">Manage Listing</Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center mt-6">
                  <Button>
                    <Package className="mr-2" />
                    List a New Item
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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