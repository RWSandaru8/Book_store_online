'use client';

import Link from 'next/link';
import BookList from '@/components/books/BookList';
import { useAuth } from '@/context/AuthContext';
import { FaBook, FaShoppingCart, FaTags, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-dark-800 to-dark-900">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-dark-100 mb-6">Discover Your Next Favorite Book</h1>
              <p className="text-xl text-dark-200 mb-8">
                Browse our extensive collection of books across all genres with our updated inventory and competitive pricing.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/books" className="btn-secondary">
                  Explore Books
                </Link>
                {!isAuthenticated && (
                  <Link href="/auth/register" className="btn-primary">
                    Join Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books Section */}
      <section className="page-container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <FaTags className="text-accent-400 mr-2" />
            <h2 className="section-heading">Featured Books</h2>
          </div>
          <Link href="/books" className="flex items-center text-accent-400 hover:text-accent-500 transition-colors">
            View All <FaArrowRight className="ml-2" />
          </Link>
        </div>
        <BookList featured={true} limit={4} />
      </section>
      
      {/* Features Section */}
      <section className="bg-dark-900/50 py-16">
        <div className="page-container">
          <h2 className="section-heading text-center mb-12">Why Choose BookManager</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-dark-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center">
              <div className="bg-dark-700 p-4 rounded-full mb-4">
                <FaBook className="text-2xl text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-100">Curated Selection</h3>
              <p className="text-dark-300">Discover handpicked titles from our extensive collection across all genres.</p>
            </div>
            <div className="card bg-dark-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center">
              <div className="bg-dark-700 p-4 rounded-full mb-4">
                <FaShoppingCart className="text-2xl text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-100">Seamless Experience</h3>
              <p className="text-dark-300">Enjoy a simple and secure checkout process for a hassle-free shopping experience.</p>
            </div>
            <div className="card bg-dark-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center">
              <div className="bg-dark-700 p-4 rounded-full mb-4">
                <FaTags className="text-2xl text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-100">Competitive Pricing</h3>
              <p className="text-dark-300">Our books are now priced between $10 and $100 for better affordability and value.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="page-container">
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-dark-100 mb-4">Ready to discover your next read?</h2>
          <p className="text-dark-200 max-w-2xl mx-auto mb-8">
            Join thousands of book lovers who have found their perfect books through our platform.
          </p>
          <Link href="/books" className="btn-primary">
            Browse Collection
          </Link>
        </div>
      </section>
    </div>
  );
} 