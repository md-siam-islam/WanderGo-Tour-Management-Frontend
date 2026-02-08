import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { Check, Download, Mail, Printer, Home, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';

const PaymentSuccess = () => {
  const [copySuccess, setCopySuccess] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);

  const {data} = useUserInfoQuery(undefined)

  const location = useLocation()

  const searchParams = new URLSearchParams(location.search);
    const transactionId = searchParams.get('transactionId');
    const amount = searchParams.get('amount');
    const status = searchParams.get('status');
  
  // Sample transaction data
  const transactionData = {
    id: transactionId || 'TXN123456789',
    amount: amount || '$149.99',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    method: 'SSLCommerz',
    customer: data?.data?.name || 'John Smith',
    email: data?.data?.email || 'john.smith@example.com',
    
  };

  // Calculate total
  const subtotal = parseFloat(amount?.replace('$', '') || '149.99');
  const tax = subtotal * 0.0825; // Assuming 8.25% tax rate
  const total = subtotal + tax;

  const handleCopyTransactionId = () => {
    navigator.clipboard.writeText(transactionData.id);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleEmailReceipt = () => {
    alert(`Receipt sent to ${transactionData.email}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
            <div className={`relative inline-block mb-4 ${isAnimating ? 'animate-bounce' : ''}`}>
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-white rounded-full p-4">
                <Check size={48} className="text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-green-100 text-lg opacity-90">Your transaction has been completed successfully.</p>
          </div>

          <div className="p-6 md:p-8">
            {/* Transaction Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
                <p className="text-3xl font-bold text-gray-800">{transactionData.amount}</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                <div className="flex items-center justify-center">
                  <p className="text-sm font-mono text-gray-800 mr-2">{transactionData.id}</p>
                  <button 
                    onClick={handleCopyTransactionId}
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Copy to clipboard"
                  >
                    {copySuccess || 'Copy'}
                  </button>
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                <p className="text-lg font-semibold text-gray-800">{transactionData.date}</p>
                <p className="text-gray-600">{transactionData.time}</p>
              </div>
            </div>

            {/* Receipt Details */}
            <div className="border border-gray-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b">Receipt Details</h2>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-300">
                  <span>Total</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Payment Method</h4>
                    <p className="text-gray-800">{transactionData.method}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Customer</h4>
                    <p className="text-gray-800">{transactionData.customer}</p>
                    <p className="text-gray-600 text-sm">{transactionData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <button 
                onClick={handlePrintReceipt}
                className="flex items-center justify-center px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition duration-300"
              >
                <Printer size={18} className="mr-2" />
                Print Receipt
              </button>
              
              <button 
                onClick={handleEmailReceipt}
                className="flex items-center justify-center px-5 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition duration-300"
              >
                <Mail size={18} className="mr-2" />
                Email Receipt
              </button>
              
              <button 
                onClick={() => alert('Downloading receipt...')}
                className="flex items-center justify-center px-5 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-medium transition duration-300"
              >
                <Download size={18} className="mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition">
              <div className="text-green-500 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Check your email</h4>
              <p className="text-gray-600 text-sm">We've sent a confirmation email with your receipt and order details.</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition">
              <div className="text-green-500 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Access your account</h4>
              <p className="text-gray-600 text-sm">Your account has been upgraded. You can now access all premium features.</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition">
              <div className="text-green-500 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Need help?</h4>
              <p className="text-gray-600 text-sm">Our support team is available 24/7 to assist with any questions.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/" className="flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition duration-300 w-full sm:w-auto">
            <Home size={18} className="mr-2" />
            Return to Homepage
          </Link>
          
          <Link to="/" className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition duration-300 w-full sm:w-auto">
            Go to Dashboard
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
        
        {/* Help Text */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>If you have any questions about your purchase, please contact our <a href="#" className="text-green-600 hover:underline">support team</a>.</p>
          <p className="mt-1">Transaction ID: {transactionData.id} • This page is your receipt</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;