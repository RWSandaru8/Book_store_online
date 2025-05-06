import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - PageVault',
  description: 'Information about how we collect, use, and protect your personal data',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-100 mb-8">Privacy Policy</h1>
        
        <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-dark-700/50">
          <p className="text-dark-200 mb-6">
            At PageVault, we take your privacy seriously. This privacy policy outlines how we collect, use,
            and protect your personal information.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Information We Collect</h2>
              <p className="text-dark-300 mb-2">
                We collect information you provide when creating an account, making a purchase, or contacting
                our customer service. This may include:
              </p>
              <ul className="list-disc pl-5 text-dark-300 space-y-2">
                <li>Name and contact information</li>
                <li>Payment details</li>
                <li>Order history</li>
                <li>Communication preferences</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">How We Use Your Information</h2>
              <p className="text-dark-300 mb-2">
                We use your information to:
              </p>
              <ul className="list-disc pl-5 text-dark-300 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support</li>
                <li>Send you order confirmations and updates</li>
                <li>Improve our website and services</li>
                <li>Personalize your shopping experience</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Data Security</h2>
              <p className="text-dark-300 mb-2">
                We implement appropriate security measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Cookie Policy</h2>
              <p className="text-dark-300 mb-2">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                You can control cookies through your browser settings.
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-dark-700/50 text-center text-dark-400 text-sm">
            <p>This is a mock website built by Sandaru Piumantha.</p>
            <p>This privacy policy is for demonstration purposes only and does not represent an actual legal document.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 