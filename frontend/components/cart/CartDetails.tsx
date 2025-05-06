'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaUser } from 'react-icons/fa';
import Loader from '@/components/ui/Loader';

export default function CartDetails() {
  const { 
    cartItems, 
    totalItems, 
    totalPrice, 
    updateQuantity, 
    removeFromCart,
    clearCart,
    isLoading 
  } = useCart();
  
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      router.push('/checkout');
    } else {
      router.push('/auth/login?redirect=checkout');
    }
  };
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="bg-dark-800 border border-dark-700 rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-dark-100">Your cart is empty</h2>
        <p className="text-dark-300 mb-6">
          Looks like you haven't added any books to your cart yet.
        </p>
        <Link href="/books" className="btn-primary inline-block">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-dark-800 border border-dark-700 rounded-lg shadow-md">
          <div className="p-6 border-b border-dark-700">
            <h2 className="text-xl font-semibold text-dark-100">
              Cart Items ({totalItems})
            </h2>
          </div>
          
          <ul className="divide-y divide-dark-700">
            {cartItems.map((item) => (
              <li key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center">
                <div className="flex-shrink-0 mr-4 mb-4 sm:mb-0">
                  <div className="relative w-20 h-28 bg-dark-700 rounded">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-dark-400 text-xs">No image</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-grow mb-4 sm:mb-0">
                  <Link href={`/books/${item.id}`} className="font-medium text-dark-200 hover:text-accent-400">
                    {item.title}
                  </Link>
                  <div className="text-accent-400 font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 sm:w-32 sm:justify-end">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded bg-dark-700 hover:bg-dark-600 text-dark-300"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="w-8 text-center text-dark-200">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded bg-dark-700 hover:bg-dark-600 text-dark-300"
                    aria-label="Increase quantity"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
                
                <div className="sm:w-24 sm:text-right mt-4 sm:mt-0">
                  <div className="font-bold text-dark-100">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 flex items-center sm:justify-end mt-2"
                    aria-label="Remove item"
                  >
                    <FaTrash size={14} className="mr-1" />
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="p-6 border-t border-dark-700 flex justify-between">
            <button 
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Clear Cart
            </button>
            <Link href="/books" className="text-accent-400 hover:text-accent-300 text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="bg-dark-800 border border-dark-700 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-dark-100">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-dark-300">Subtotal</span>
              <span className="font-medium text-dark-200">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-dark-300">Shipping</span>
              <span className="font-medium text-dark-200">$0.00</span>
            </div>
            
            <div className="border-t border-dark-700 pt-4 flex justify-between">
              <span className="font-bold text-dark-100">Total</span>
              <span className="font-bold text-lg text-accent-400">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <button
            onClick={handleProceedToCheckout}
            className="btn-primary w-full mt-6 flex items-center justify-center"
          >
            {isAuthenticated ? (
              <>
                <span>Proceed to Checkout</span>
                <FaArrowRight className="ml-2" />
              </>
            ) : (
              <>
                <FaUser className="mr-2" />
                <span>Login to Checkout</span>
              </>
            )}
          </button>
          
          {!isAuthenticated && (
            <p className="text-sm text-dark-400 mt-4 text-center">
              You'll need to log in before completing your purchase.
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 