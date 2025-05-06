"use client";
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaGithub } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated } = useAuth();
  
  return (
    <footer className="bg-dark-900 text-dark-100 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent-400">BookManager</h3>
            <p className="text-dark-300 mb-4">
              Your one-stop destination for all your book needs. Browse, buy, and enjoy!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-300 hover:text-accent-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-dark-300 hover:text-accent-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-dark-300 hover:text-accent-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-dark-300 hover:text-accent-400 transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="mailto:info@bookmanager.com" className="text-dark-300 hover:text-accent-400 transition-colors">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent-300">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/books" className="text-dark-300 hover:text-accent-400 transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/books?category=fiction" className="text-dark-300 hover:text-accent-400 transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link href="/books?category=non-fiction" className="text-dark-300 hover:text-accent-400 transition-colors">
                  Non-Fiction
                </Link>
              </li>
              <li>
                <Link href="/books/new-releases" className="text-dark-300 hover:text-accent-400 transition-colors">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent-300">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-dark-300 hover:text-accent-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-dark-300 hover:text-accent-400 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-dark-300 hover:text-accent-400 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-dark-300 hover:text-accent-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent-300">My Account</h3>
            <ul className="space-y-2">
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link href="/auth/login" className="text-dark-300 hover:text-accent-400 transition-colors">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/register" className="text-dark-300 hover:text-accent-400 transition-colors">
                      Register
                    </Link>
                  </li>
                </>
              ) : null}
              <li>
                <Link href="/orders" className="text-dark-300 hover:text-accent-400 transition-colors">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-dark-300 hover:text-accent-400 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dark-400 text-sm">
              &copy; {currentYear} BookManager. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-dark-400 text-sm hover:text-accent-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-dark-400 text-sm hover:text-accent-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 