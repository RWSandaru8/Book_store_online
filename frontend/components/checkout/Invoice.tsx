'use client';

import { useRef } from 'react';
import { FaDownload, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { generatePdf } from '@/utils/pdfUtils';

interface InvoiceProps {
  orderItems: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  totalAmount: number;
  orderDate: string;
  orderNumber: string;
  onDownloadPdf?: () => void;
}

export default function Invoice({
  orderItems,
  shippingInfo,
  totalAmount,
  orderDate,
  orderNumber,
  onDownloadPdf
}: InvoiceProps) {
  const router = useRouter();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    try {
      if (onDownloadPdf) {
        onDownloadPdf();
      } else if (invoiceRef.current) {
        await generatePdf(invoiceRef.current, `invoice-${orderNumber}.pdf`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to window print if PDF generation fails
      window.print();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => router.push('/orders')}
          className="flex items-center text-accent-400 hover:text-accent-300"
        >
          <FaArrowLeft className="mr-2" />
          Go to My Orders
        </button>
        <button
          onClick={handleDownloadPdf}
          className="flex items-center bg-accent-500 text-dark-100 px-4 py-2 rounded hover:bg-accent-600 transition-colors"
        >
          <FaDownload className="mr-2" />
          Download Invoice
        </button>
      </div>

      <div 
        ref={invoiceRef} 
        className="bg-dark-800 border border-dark-700 rounded-lg shadow-md p-6 max-w-4xl mx-auto"
        id="invoice-content"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-dark-100">INVOICE</h1>
            <p className="text-dark-300">#{orderNumber}</p>
          </div>
          <div className="text-right">
            <h2 className="font-bold text-xl text-dark-100">PageVault</h2>
            <p className="text-dark-300">123 Book Street</p>
            <p className="text-dark-300">Booktown, BK 12345</p>
            <p className="text-dark-300">support@pagevault.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-dark-200 mb-2">Bill To:</h3>
            <p className="text-dark-300">{shippingInfo.address}</p>
            <p className="text-dark-300">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
            <p className="text-dark-300">{shippingInfo.country}</p>
          </div>
          <div className="text-right">
            <h3 className="font-semibold text-dark-200 mb-2">Invoice Details:</h3>
            <p className="text-dark-300"><span className="font-medium text-dark-200">Invoice Date:</span> {new Date(orderDate).toLocaleDateString()}</p>
            <p className="text-dark-300"><span className="font-medium text-dark-200">Order Date:</span> {new Date(orderDate).toLocaleDateString()}</p>
            <p className="text-dark-300"><span className="font-medium text-dark-200">Payment Method:</span> Credit Card</p>
          </div>
        </div>

        <div className="border-t border-b border-dark-700 py-4 mb-8">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-3 text-dark-200">Item</th>
                <th className="pb-3 text-dark-200">Quantity</th>
                <th className="pb-3 text-dark-200">Price</th>
                <th className="pb-3 text-right text-dark-200">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems && orderItems.length > 0 ? (
                orderItems.map((item, index) => (
                  <tr key={index} className="border-t border-dark-700">
                    <td className="py-3 text-dark-200">{item.title}</td>
                    <td className="py-3 text-dark-300">{item.quantity}</td>
                    <td className="py-3 text-dark-300">${item.price.toFixed(2)}</td>
                    <td className="py-3 text-right text-accent-400">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-t border-dark-700">
                  <td colSpan={4} className="py-3 text-center text-dark-400">
                    No items in order
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between mb-2">
              <span className="text-dark-200">Subtotal:</span>
              <span className="text-dark-300">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-dark-200">Tax:</span>
              <span className="text-dark-300">$0.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-dark-200">Shipping:</span>
              <span className="text-dark-300">$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-dark-700 pt-2">
              <span className="text-dark-100">Total:</span>
              <span className="text-accent-400">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-dark-400 text-sm">
          <p>Thank you for your purchase!</p>
          <p>If you have any questions, please contact our customer support.</p>
        </div>
      </div>
    </div>
  );
} 