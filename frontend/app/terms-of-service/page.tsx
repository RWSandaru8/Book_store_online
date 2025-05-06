import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - PageVault',
  description: 'The terms and conditions that govern your use of our website and services',
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-100 mb-8">Terms of Service</h1>
        
        <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-dark-700/50">
          <p className="text-dark-200 mb-6">
            These Terms of Service ("Terms") govern your use of the PageVault website and services.
            By accessing or using our website, you agree to be bound by these Terms.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Account Registration</h2>
              <p className="text-dark-300 mb-2">
                When you create an account with us, you must provide accurate and complete information.
                You are responsible for maintaining the confidentiality of your account credentials 
                and for all activities that occur under your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">User Conduct</h2>
              <p className="text-dark-300 mb-2">
                You agree not to:
              </p>
              <ul className="list-disc pl-5 text-dark-300 space-y-2">
                <li>Use our service for any illegal purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with the operation of our website</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Intellectual Property</h2>
              <p className="text-dark-300 mb-2">
                All content on the PageVault website, including text, graphics, logos, and software,
                is the property of PageVault and is protected by copyright and other intellectual property laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Limitation of Liability</h2>
              <p className="text-dark-300 mb-2">
                PageVault shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                resulting from your use of or inability to use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-dark-100 mb-4">Changes to Terms</h2>
              <p className="text-dark-300 mb-2">
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes
                by posting the updated Terms on our website.
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-dark-700/50 text-center text-dark-400 text-sm">
            <p>This is a mock website built by Sandaru Piumantha.</p>
            <p>These terms of service are for demonstration purposes only and do not represent an actual legal agreement.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 