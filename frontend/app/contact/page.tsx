import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - PageVault',
  description: 'Get in touch with our customer support team',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-100 mb-8">Contact Us</h1>
        
        <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-dark-700/50">
          <p className="text-dark-200 mb-6">
            Have questions or need assistance? Our customer support team is here to help. 
            Please use the contact information below to reach out to us.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Contact Information</h2>
              <ul className="space-y-3 text-dark-300">
                <li>Email: support@pagevault.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Hours: Monday-Friday, 9am-6pm EST</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Office Address</h2>
              <address className="not-italic text-dark-300">
                PageVault Headquarters<br />
                123 Book Street<br />
                Booktown, BK 12345<br />
                United States
              </address>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-dark-700/50 text-center text-dark-400 text-sm">
            <p>This is a mock website built by Sandaru Piumantha.</p>
            <p>No actual contact functionality is implemented.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 