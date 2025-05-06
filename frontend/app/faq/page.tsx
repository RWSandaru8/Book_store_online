import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - PageVault',
  description: 'Find answers to common questions about our products and services',
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-100 mb-8">Frequently Asked Questions</h1>
        
        <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-dark-700/50">
          <p className="text-dark-200 mb-8">
            Find answers to the most common questions about PageVault products and services.
          </p>
          
          <div className="space-y-8">
            <div className="border-b border-dark-700/50 pb-6">
              <h2 className="text-xl font-semibold text-dark-100 mb-3">How long does shipping take?</h2>
              <p className="text-dark-300">
                Standard shipping typically takes 3-5 business days, while express shipping can deliver your books
                within 1-2 business days. International shipping may take 7-14 business days depending on the destination.
              </p>
            </div>
            
            <div className="border-b border-dark-700/50 pb-6">
              <h2 className="text-xl font-semibold text-dark-100 mb-3">Are digital editions available?</h2>
              <p className="text-dark-300">
                Yes, many of our books are available in digital format. Look for the "Digital Edition" option
                on the book's product page to purchase a digital copy.
              </p>
            </div>
            
            <div className="border-b border-dark-700/50 pb-6">
              <h2 className="text-xl font-semibold text-dark-100 mb-3">How do I track my order?</h2>
              <p className="text-dark-300">
                Once your order ships, you'll receive a confirmation email with tracking information.
                You can also track your order by logging into your account and viewing your order history.
              </p>
            </div>
            
            <div className="border-b border-dark-700/50 pb-6">
              <h2 className="text-xl font-semibold text-dark-100 mb-3">Can I change or cancel my order?</h2>
              <p className="text-dark-300">
                Orders can be modified or canceled within 1 hour of placement. After that, please contact our
                customer service team for assistance.
              </p>
            </div>
            
            <div className="border-b border-dark-700/50 pb-6">
              <h2 className="text-xl font-semibold text-dark-100 mb-3">Do you offer gift wrapping?</h2>
              <p className="text-dark-300">
                Yes, gift wrapping is available for an additional fee of $5 per item. You can select this option
                during the checkout process.
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-dark-700/50 text-center text-dark-400 text-sm">
            <p>This is a mock website built by Sandaru Piumantha.</p>
            <p>These FAQs are provided for demonstration purposes only.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 