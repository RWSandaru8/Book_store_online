import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy - PageVault',
  description: 'Information about our shipping policies and delivery times',
};

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-100 mb-8">Shipping Policy</h1>
        
        <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-dark-700/50">
          <p className="text-dark-200 mb-6">
            At PageVault, we strive to get your books to you as quickly as possible. Below is information
            about our shipping options, costs, and estimated delivery times.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Shipping Options</h2>
              <ul className="list-disc pl-5 text-dark-300 space-y-2">
                <li>Standard Shipping (3-5 business days)</li>
                <li>Express Shipping (1-2 business days)</li>
                <li>International Shipping (7-14 business days)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Shipping Costs</h2>
              <p className="text-dark-300 mb-2">
                Shipping costs are calculated based on the destination, weight, and selected shipping method.
                Free standard shipping is available for orders over $35.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Order Processing</h2>
              <p className="text-dark-300 mb-2">
                Orders are typically processed within 1 business day. You will receive a shipping confirmation
                email with tracking information once your order has been shipped.
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-dark-700/50 text-center text-dark-400 text-sm">
            <p>This is a mock website built by Sandaru Piumantha.</p>
            <p>This is a demonstration shipping policy for example purposes only.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 