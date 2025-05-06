'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import Invoice from '@/components/checkout/Invoice';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const initialized = useRef(false);
  
  // Generate these values once
  const orderNumber = useRef(`ORD-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`).current;
  const orderDate = useRef(new Date().toISOString()).current;

  // Default shipping info
  const defaultShippingInfo = {
    address: 'Customer Address',
    city: 'Customer City',
    state: 'Customer State',
    postalCode: '12345',
    country: 'Customer Country'
  };

  // Run initialization only once on component mount
  useEffect(() => {
    // Prevent multiple initializations
    if (initialized.current) return;
    initialized.current = true;
    
    let finalOrderItems: any[] = [];
    let finalOrderTotal = 0;
    
    // Get cart items snapshot
    const currentCartItems = [...cartItems];
    const currentTotalPrice = totalPrice;
    
    // First check if we have items in the current cart
    if (currentCartItems && currentCartItems.length > 0) {
      finalOrderItems = currentCartItems;
      finalOrderTotal = currentTotalPrice;
      
      // Save current cart items to localStorage for future reference
      try {
        localStorage.setItem('lastOrderItems', JSON.stringify(currentCartItems));
      } catch (e) {
        console.error('Error saving order items to localStorage:', e);
      }
    } else {
      // If not, try to get saved order items from localStorage
      try {
        const savedOrderItemsStr = localStorage.getItem('lastOrderItems');
        if (savedOrderItemsStr) {
          const savedOrderItems = JSON.parse(savedOrderItemsStr);
          if (Array.isArray(savedOrderItems) && savedOrderItems.length > 0) {
            finalOrderItems = savedOrderItems;
            // Calculate total from saved items
            finalOrderTotal = savedOrderItems.reduce(
              (total, item) => total + (item.price * item.quantity), 
              0
            );
          }
        }
      } catch (e) {
        console.error('Error retrieving saved order items:', e);
        // If error, use empty array as fallback
      }
    }
    
    // Update state with final values (only once)
    setOrderItems(finalOrderItems);
    setOrderTotal(finalOrderTotal);
    
    // Clear cart after successful order
    clearCart();
    
    // Show loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []); // Empty dependency array - run only once on mount

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
      totalAmount={orderTotal}
      orderDate={orderDate}
      orderNumber={orderNumber}
    />
  );
} 