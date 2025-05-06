'use client';

import { useState, useEffect, useRef } from 'react';
import { FaSpinner, FaCheckCircle, FaShoppingBag, FaCreditCard, FaShippingFast } from 'react-icons/fa';

interface OrderProcessingLoaderProps {
  onComplete?: () => void;
  processingTime?: number; // Time in ms to show the loader before completion
}

export default function OrderProcessingLoader({ 
  onComplete, 
  processingTime = 3000 
}: OrderProcessingLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCompletedRef = useRef(false);

  const steps = [
    { icon: FaShoppingBag, text: 'Preparing your order...' },
    { icon: FaCreditCard, text: 'Processing payment...' },
    { icon: FaShippingFast, text: 'Finalizing order...' },
    { icon: FaCheckCircle, text: 'Order completed!' }
  ];

  useEffect(() => {
    // Calculate interval durations with smaller steps for better performance
    const totalSteps = steps.length - 1;
    const stepInterval = Math.max(processingTime / totalSteps, 500); // Ensure minimum interval of 500ms
    
    // Use a reference to track if component is still mounted
    let mounted = true;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Only start a new interval if not already completed
    if (!isCompletedRef.current) {
      intervalRef.current = setInterval(() => {
        if (!mounted) return;
        
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep >= totalSteps) {
            // Stop the interval and mark as complete
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            
            isCompletedRef.current = true;
            setIsComplete(true);
            
            // Call onComplete after a small delay
            if (onComplete) {
              setTimeout(onComplete, 1000);
            }
            
            return totalSteps;
          }
          return nextStep;
        });
      }, stepInterval);
    }

    // Cleanup function to prevent memory leaks
    return () => {
      mounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [steps.length, processingTime, onComplete]);

  // Calculate the progress percentage with more precision
  const progressPercentage = Math.min(
    Math.round((currentStep / (steps.length - 1)) * 100), 
    100
  );

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 shadow-lg max-w-md mx-auto">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          {currentStep < steps.length - 1 ? (
            <FaSpinner className="text-accent-500 animate-spin h-16 w-16" />
          ) : (
            <FaCheckCircle className={`text-green-500 h-16 w-16 transition-all duration-300 ${isComplete ? 'scale-110' : 'scale-100'}`} />
          )}
        </div>
        
        <h2 className="text-xl font-semibold text-dark-100">
          {steps[currentStep].text}
        </h2>
        
        <div className="w-full mt-6">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-dark-300 bg-dark-700">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-dark-300">
                  {progressPercentage}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-dark-700">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-accent-500 transition-all duration-300 ease-in-out"
              ></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-x-2 w-full mt-2">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index <= currentStep;
            const isProcessing = index === currentStep && index !== steps.length - 1;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`rounded-full p-2 ${
                  isActive 
                    ? index === steps.length - 1 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-accent-500/20 text-accent-400'
                    : 'bg-dark-700 text-dark-500'
                } transition-colors duration-200`}>
                  <StepIcon className={`h-4 w-4 ${isProcessing ? 'animate-pulse' : ''}`} />
                </div>
                <div className="h-0.5 w-full bg-dark-700 mt-2">
                  <div 
                    className={`h-full bg-accent-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 