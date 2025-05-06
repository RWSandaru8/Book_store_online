'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import { formatPrice, roundPrice } from '@/utils/formatters';

interface Book {
  id: string;
  title: string;
  authors: string[];
  price: number;
  description: string;
  thumbnail: string;
  stock: number;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      title: book.title,
      price: roundPrice(book.price),
      thumbnail: book.thumbnail,
    });
  };

  // Format the price using the utility function
  const formattedPrice = formatPrice(book.price);

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
      <Link href={`/books/${book.id}`} className="block relative h-48 bg-dark-700 overflow-hidden">
        {book.thumbnail ? (
          <Image
            src={book.thumbnail}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform hover:scale-105 duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-dark-400">No image available</span>
          </div>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/books/${book.id}`} className="block mb-auto">
          <h3 className="text-lg font-semibold mb-1 line-clamp-2 text-dark-100 hover:text-accent-400 transition-colors">
            {book.title}
          </h3>
        </Link>
        
        <p className="text-dark-300 text-sm mb-4">
          {book.authors?.length > 0
            ? book.authors.join(', ')
            : 'Unknown Author'}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-accent-400">{formattedPrice}</span>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 bg-accent-500 text-dark-100 px-3 py-1 rounded hover:bg-accent-600 transition-colors"
            disabled={book.stock <= 0}
          >
            <FaShoppingCart size={14} />
            <span>{book.stock > 0 ? 'Add' : 'Out of Stock'}</span>
          </button>
        </div>
        
        {book.stock <= 5 && book.stock > 0 && (
          <p className="text-orange-400 text-xs mt-2">
            Only {book.stock} left in stock
          </p>
        )}
      </div>
    </div>
  );
} 