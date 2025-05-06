'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import Invoice from '@/components/checkout/Invoice';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
  const orderDate = new Date().toISOString();

  // Default shipping info if not available from context
  const defaultShippingInfo = {
    address: 'Customer Address',
    city: 'Customer City',
    state: 'Customer State',
    postalCode: '12345',
    country: 'Customer Country'
  };

  useEffect(() => {
    // Initialize order data
    const initializeOrder = () => {
      // Get saved order items from localStorage
      if (typeof window !== 'undefined') {
        const savedOrderItemsStr = localStorage.getItem('lastOrderItems');
        let savedOrderItems = [];
        
        if (savedOrderItemsStr) {
          try {
            savedOrderItems = JSON.parse(savedOrderItemsStr);
            setOrderItems(cartItems.length > 0 ? cartItems : savedOrderItems);
          } catch (e) {
            console.error('Error parsing saved order items:', e);
            setOrderItems(cartItems);
          }
        } else {
          setOrderItems(cartItems);
          localStorage.setItem('lastOrderItems', JSON.stringify(cartItems));
        }
      }
      
      // Clear cart after successful order
      clearCart();
      
      // Show loading for 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    
    initializeOrder();
  }, [cartItems, clearCart]);

  // If still loading, show the loading UI
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto bg-dark-800 border border-dark-700 rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <FaSpinner className="mx-auto animate-spin text-accent-500" size={64} />
          </div>
          
          <h1 className="text-2xl font-bold mb-4 text-dark-100">
            Processing Your Order
          </h1>
          
          <div className="mt-6">
            <p className="text-dark-300">
              Please wait while we process your order...
            </p>
          </div>
          
          {/* Simple progress bar */}
          <div className="mt-8 mb-2">
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
              <div className="h-full bg-accent-500 rounded-full animate-pulse" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Once loading is complete, show the invoice
  return (
    <Invoice
      orderItems={orderItems}
      shippingInfo={defaultShippingInfo}
      totalAmount={totalPrice}
      orderDate={orderDate}
      orderNumber={orderNumber}
    />
  );
} 