import Link from 'next/link';
import { Button } from './ui/button'; // Adjust the import path for Button

const Navbar = () => {
  return (
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
  );
};

export default Navbar;