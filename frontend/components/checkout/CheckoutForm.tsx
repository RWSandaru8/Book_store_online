'use client';

import { useCheckout } from './CheckoutContext';
import { useCart } from '@/context/CartContext';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import OrderReview from './OrderReview';
import { FaShoppingCart, FaTruck, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, name: 'Cart', icon: FaShoppingCart },
  { id: 2, name: 'Shipping', icon: FaTruck },
  { id: 3, name: 'Payment', icon: FaCreditCard },
  { id: 4, name: 'Review', icon: FaCheckCircle },
];

export default function CheckoutForm() {
  const { 
    step, 
    nextStep, 
    prevStep, 
    placeOrder, 
    isSubmitting,
    shippingInfo,
    paymentInfo 
  } = useCheckout();
  const { cartItems, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const validateAndProceed = () => {
    // Check authentication before final checkout step
    if (step === 3 && !isAuthenticated) {
      toast.warning('Please log in to complete your purchase');
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    if (step === 2) {
      // Validate shipping info
      const { address, city, state, postalCode, country } = shippingInfo;
      if (!address || !city || !state || !postalCode || !country) {
        toast.error('Please complete all shipping information fields');
        return;
      }
    } 
    else if (step === 3) {
      // Validate payment info
      const { cardNumber, cardHolder, expiryDate, cvv } = paymentInfo;
      const cardDigits = cardNumber.replace(/\s/g, '');
      
      if (!cardDigits || cardDigits.length !== 16) {
        toast.error('Please enter a valid 16-digit card number');
        return;
      }
      
      if (!cardHolder) {
        toast.error('Please enter the cardholder name');
        return;
      }
      
      if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        toast.error('Please enter a valid expiry date (MM/YY)');
        return;
      }
      
      if (!cvv || !/^\d{3,4}$/.test(cvv)) {
        toast.error('Please enter a valid CVV code');
        return;
      }
    }
    
    // All validations passed, proceed to next step
    nextStep();
  };

  if (totalItems === 0) {
    return (
      <div className="bg-dark-800 border border-dark-700 rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-2 text-dark-100">Your cart is empty</h2>
        <p className="text-dark-300">
          You don't have any items in your cart to checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-dark-800 border border-dark-700 rounded-lg shadow-md p-6 mb-6">
          {/* Checkout Steps Progress */}
          <div className="hidden md:block mb-8">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.id} className="flex flex-col items-center relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= s.id
                        ? 'bg-accent-500 text-dark-100'
                        : 'bg-dark-700 text-dark-400'
                    }`}
                  >
                    <s.icon size={18} />
                  </div>
                  <div
                    className={`text-sm mt-2 ${
                      step >= s.id ? 'text-accent-400 font-medium' : 'text-dark-400'
                    }`}
                  >
                    {s.name}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress bar - now as a separate element below the steps */}
            <div className="relative mt-5 h-1 bg-dark-700">
              <div 
                className="absolute h-1 bg-accent-500 transition-all duration-300"
                style={{ 
                  width: `${(step - 1) / (steps.length - 1) * 100}%`,
                  left: 0,
                }}
              ></div>
            </div>
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden mb-6 text-center">
            <h2 className="text-lg font-medium text-dark-100">
              Step {step} of {steps.length}: {steps.find(s => s.id === step)?.name}
            </h2>
            {/* Mobile progress bar */}
            <div className="relative mt-4 h-1 bg-dark-700">
              <div 
                className="absolute h-1 bg-accent-500"
                style={{ width: `${(step - 1) / (steps.length - 1) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Step Content */}
          {step === 1 && (
            <div className="text-center py-8">
              <button onClick={nextStep} className="btn-primary px-8">
                Begin Checkout
              </button>
            </div>
          )}

          {step === 2 && <ShippingForm />}
          {step === 3 && <PaymentForm />}
          {step === 4 && (
            <OrderReview
              onPlaceOrder={placeOrder}
              onPrevStep={prevStep}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Navigation Buttons - Only show for steps 2 and 3 */}
        {(step === 2 || step === 3) && (
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              onClick={validateAndProceed}
              className="btn-primary"
              disabled={isSubmitting}
            >
              {step === 3 ? 'Review Order' : 'Continue'}
            </button>
          </div>
        )}
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  );
} 