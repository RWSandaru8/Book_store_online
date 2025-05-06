import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & Refunds - PageVault',
  description: 'Information about our return and refund policies',
};

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-100 mb-8">Returns & Refunds</h1>
        
        <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-dark-700/50">
          <p className="text-dark-200 mb-6">
            We want you to be completely satisfied with your purchase. If you're not, we're here to help.
            Please review our return and refund policies below.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Return Policy</h2>
              <ul className="list-disc pl-5 text-dark-300 space-y-2">
                <li>Returns are accepted within 30 days of purchase</li>
                <li>Items must be in original condition and packaging</li>
                <li>Digital products are not eligible for return</li>
                <li>Return shipping costs are the responsibility of the customer unless the item is defective</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Refund Process</h2>
              <p className="text-dark-300 mb-2">
                Once we receive your return, we will inspect the item and process your refund within 5-7 business days.
                Refunds will be issued to the original payment method.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Damaged or Defective Items</h2>
              <p className="text-dark-300 mb-2">
                If you receive a damaged or defective item, please contact our customer service team within
                48 hours of delivery. We'll arrange for a replacement or refund as appropriate.
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-dark-700/50 text-center text-dark-400 text-sm">
            <p>This is a mock website built by Sandaru Piumantha.</p>
            <p>This is a demonstration returns policy for example purposes only.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 