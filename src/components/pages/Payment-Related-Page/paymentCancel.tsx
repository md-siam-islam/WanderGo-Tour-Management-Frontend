import React from 'react';

const paymentCancel = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
        <p className="text-gray-600">Your payment was cancelled. Please try again.</p>
      </div>
    </div>
  );
};

export default paymentCancel;