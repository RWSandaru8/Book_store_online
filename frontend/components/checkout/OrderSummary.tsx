'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FaBox } from 'react-icons/fa';

export default function OrderSummary() {
  const { cartItems, totalItems, totalPrice } = useCart();

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-dark-100">Order Summary</h2>
      
      <div className="border-b border-dark-700 pb-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-dark-300">Items ({totalItems})</span>
          <span className="font-medium text-dark-200">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-dark-300">Shipping</span>
          <span className="font-medium text-dark-200">$0.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-dark-300">Tax</span>
          <span className="font-medium text-dark-200">$0.00</span>
        </div>
      </div>
      
      <div className="flex justify-between mb-6">
        <span className="font-bold text-dark-100">Total</span>
        <span className="font-bold text-lg text-accent-400">${totalPrice.toFixed(2)}</span>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-dark-200">Items in Order</h3>
        {cartItems.length > 0 ? (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="h-14 w-10 bg-dark-700 rounded mr-2 relative flex-shrink-0">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="40px"
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FaBox className="text-dark-500" />
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium truncate text-dark-200">{item.title}</p>
                  <div className="flex justify-between text-sm text-dark-400">
                    <span>${item.price.toFixed(2)} × {item.quantity}</span>
                    <span className="font-medium text-dark-300">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-dark-400 text-sm">No items in cart</p>
        )}
      </div>
      
      <div className="bg-dark-700 p-3 rounded-md border border-dark-600">
        <p className="text-xs text-dark-300">
          By completing your purchase, you agree to our{' '}
          <a href="/terms" className="text-accent-400 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-accent-400 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
} 