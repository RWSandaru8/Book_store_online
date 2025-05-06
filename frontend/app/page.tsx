'use client';

import Link from 'next/link';
import BookList from '@/components/books/BookList';
import { useAuth } from '@/context/AuthContext';
import { FaBook, FaShoppingCart, FaTags, FaArrowRight } from 'react-icons/fa';
import BackgroundAnimation from '@/components/layout/BackgroundAnimation';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center">
        <BackgroundAnimation />
        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto bg-dark-900/60 backdrop-blur-lg p-8 rounded-xl border border-dark-700/50 shadow-xl">
              <h1 className="text-5xl font-bold text-dark-100 mb-6 text-center">
                Your Next Obsession Awaits Here
              </h1>
              <p className="text-xl text-dark-200 mb-8 text-center">
                Browse our extensive collection of books across all genres with our updated inventory and competitive pricing.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/books"
                  className="btn-secondary transition-transform hover:scale-105"
                >
                  Explore Books
                </Link>
                {!isAuthenticated && (
                  <Link
                    href="/auth/register"
                    className="btn-primary transition-transform hover:scale-105"
                  >
                    Join Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="page-container relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-row items-center">
            <h2 className="section-heading">Featured Books</h2>
          </div>
          <Link
            href="/books"
            className="inline-flex items-center text-accent-400 hover:text-accent-500 transition-colors"
          >
            <span>View All</span>
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
        <BookList featured={true} limit={4} />
      </section>

      {/* Features Section */}
      <section className="bg-dark-900/50 backdrop-blur-sm py-16 relative">
        <div className="page-container">
          <h2 className="section-heading text-center mb-12">Why Choose PageVault</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-dark-800/80 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-dark-700/50 hover:border-accent-500/30 hover:-translate-y-1">
              <div className="bg-dark-700/70 p-4 rounded-full mb-4 shadow-lg">
                <FaBook className="text-2xl text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-100">Curated Selection</h3>
              <p className="text-dark-300">Discover handpicked titles from our extensive collection across all genres.</p>
            </div>
            <div className="card bg-dark-800/80 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-dark-700/50 hover:border-accent-500/30 hover:-translate-y-1">
              <div className="bg-dark-700/70 p-4 rounded-full mb-4 shadow-lg">
                <FaShoppingCart className="text-2xl text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-100">Seamless Experience</h3>
              <p className="text-dark-300">Enjoy a simple and secure checkout process for a hassle-free shopping experience.</p>
            </div>
            <div className="card bg-dark-800/80 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center border border-dark-700/50 hover:border-accent-500/30 hover:-translate-y-1">
              <div className="bg-dark-700/70 p-4 rounded-full mb-4 shadow-lg">
                <FaTags className="text-2xl text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-100">Competitive Pricing</h3>
              <p className="text-dark-300">Our store is now offering affordability and best value for your money.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-container">
        <div className="bg-dark-800/90 backdrop-blur-md border border-dark-700/70 rounded-xl p-8 md:p-12 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-dark-100 mb-4">Ready to discover your next read?</h2>
          <p className="text-dark-200 max-w-2xl mx-auto mb-8">
            Join thousands of book lovers who have found their perfect books through our platform.
          </p>
          <Link
            href="/books"
            className="btn-primary px-8 py-3 text-lg transition-transform hover:scale-105"
          >
            Browse Collection
          </Link>
        </div>
      </section>
    </div>
  );
} 