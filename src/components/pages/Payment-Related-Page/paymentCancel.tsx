import { XCircle, RotateCcw, CreditCard, AlertTriangle, ExternalLink, Home } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

const PaymentCancel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for URL parameters
  const [transactionData, setTransactionData] = useState({
    transactionId: '',
    amount: '',
    status: ''
  });
  
  // State for suggested solutions
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: 'Insufficient Funds',
      description: 'Check your account balance or try a different payment method.',
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      id: 2,
      title: 'Bank Declined',
      description: 'Your bank may have blocked the transaction. Contact your bank for details.',
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      id: 3,
      title: 'Network Issue',
      description: 'Try again in a few minutes or check your internet connection.',
      icon: <RotateCcw className="h-5 w-5" />
    }
  ]);

  // Extract URL parameters on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const transactionId = searchParams.get('transactionId');
    const amount = searchParams.get('amount');
    const status = searchParams.get('status');

    setTransactionData({
      transactionId: transactionId || 'Not Available',
      amount: amount || 'N/A',
      status: status || 'cancelled'
    });

    // Log for debugging
    console.log('Payment cancelled with:', { transactionId, amount, status });
  }, [location]);

  // Handle retry payment
  const handleRetryPayment = () => {
    // In a real app, this would redirect to payment gateway
    alert(`Retrying payment for Transaction: ${transactionData.transactionId}`);
    // navigate('/checkout'); // Redirect to checkout page
  };

  // Handle contact support
  const handleContactSupport = () => {
    const message = `I need help with my failed payment. Transaction ID: ${transactionData.transactionId}, Amount: ${transactionData.amount}`;
    window.open(`mailto:support@example.com?subject=Payment Failed&body=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header with accent color */}
          <div className="bg-gradient-to-r from-[#EC003F] to-[#FF3366] p-8 text-center text-white">
            <div className="relative inline-block mb-4">
              {/* Animated pulse effect */}
              <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
              <div className="relative bg-white/20 rounded-full p-4 backdrop-blur-sm">
                <XCircle size={64} className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Payment Cancelled</h1>
            <p className="text-white/90 text-lg">The transaction was not completed successfully.</p>
          </div>

          <div className="p-6 md:p-8">
            {/* Transaction Details Card */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-6">
              <div className="flex items-start">
                <div className="text-[#EC003F] mr-3 mt-1">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Transaction Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono font-semibold text-gray-800">
                        {transactionData.transactionId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-[#EC003F]">
                        {transactionData.amount ? `$${transactionData.amount}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-semibold uppercase text-[#EC003F]">
                        {transactionData.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Issues Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-[#EC003F] mr-2">Possible Reasons</span>
                <AlertTriangle className="h-5 w-5 text-[#EC003F]" />
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestions.map((suggestion) => (
                  <div 
                    key={suggestion.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#EC003F]/30 hover:shadow-sm transition duration-300"
                  >
                    <div className="text-[#EC003F] mb-3">
                      {suggestion.icon}
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{suggestion.title}</h4>
                    <p className="text-gray-600 text-sm">{suggestion.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
              <div className="flex">
                <div className="text-blue-500 mr-3">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Note:</span> If the amount was deducted from your account, 
                    it will be refunded within 5-7 business days. For immediate assistance, contact our support team.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRetryPayment}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#EC003F] to-[#FF3366] hover:from-[#D40036] hover:to-[#EC003F] text-white rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg flex-1 sm:flex-none"
              >
                <RotateCcw size={18} className="mr-2" />
                Try Again
              </button>
              
              <button
                onClick={handleContactSupport}
                className="flex items-center justify-center px-6 py-3 bg-white border border-[#EC003F] text-[#EC003F] hover:bg-[#EC003F] hover:text-white rounded-lg font-medium transition duration-300 flex-1 sm:flex-none"
              >
                <ExternalLink size={18} className="mr-2" />
                Contact Support
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition duration-300 flex-1 sm:flex-none"
              >
                <Home size={18} className="mr-2" />
                Return Home
              </button>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
            <span className="text-gray-600 mr-2">Need help?</span>
            <button
              onClick={handleContactSupport}
              className="text-[#EC003F] hover:underline font-medium"
            >
              Contact our support team
            </button>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-500 text-sm">Response time: Under 2 hours</span>
          </div>
          
          <div className="mt-4 text-gray-500 text-sm">
            <p>Transaction ID: {transactionData.transactionId} • Status: {transactionData.status.toUpperCase()}</p>
            <p className="mt-1">For refund inquiries, please include the transaction ID in your communication.</p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-6 text-gray-400 text-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;