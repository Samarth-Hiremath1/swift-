import { useState } from 'react'
import { Star, Heart } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface RentalCardProps {
  name: string
  image: string
  rating: number
  numRatings: number
  distance: string
  location: string
  price: number
  isFavorite: boolean
  isGuestFavorite: boolean
}

export default function RentalCard({
  name,
  image,
  rating,
  numRatings,
  distance,
  location,
  price,
  isFavorite: initialIsFavorite,
  isGuestFavorite
}: RentalCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)

  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg group">
      <CardHeader className="p-0 relative">
        <img src={image} alt={name} className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105" />
        {isGuestFavorite && (
          <Badge className="absolute top-3 left-3 bg-white text-black font-semibold px-2 py-1 z-10">
            Guest favorite
          </Badge>
        )}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-black/10 rounded-full transition-colors duration-200 ease-in-out hover:bg-black/20 z-10"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'
            }`}
          />
        </button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-black text-black mr-1" />
            <span className="font-medium text-sm">{rating}</span>
            <span className="text-gray-600 text-sm ml-1">({numRatings})</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-1">{distance}</p>
        <p className="text-gray-600 text-sm">{location}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-baseline">
          <span className="text-lg font-semibold">${price}</span>
          <span className="text-gray-600 ml-1 text-sm">/ hour</span>
        </div>
      </CardFooter>
    </Card>
  )
}