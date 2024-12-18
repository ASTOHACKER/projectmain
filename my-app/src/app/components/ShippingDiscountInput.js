'use client';

import React, { useState } from 'react';

// รายการโค้ดส่วนลดค่าจัดส่ง
const SHIPPING_DISCOUNT_CODES = {
  'FREESHIP': {
    type: 'free',
    description: 'ฟรีค่าจัดส่ง',
    minAmount: 1000,
  },
  'SHIP50': {
    type: 'percentage',
    value: 50,
    description: 'ส่วนลดค่าจัดส่ง 50%',
    minAmount: 500,
  },
  'SHIP100': {
    type: 'fixed',
    value: 100,
    description: 'ส่วนลดค่าจัดส่ง 100 บาท',
    minAmount: 0,
  }
};

const ShippingDiscountInput = ({ 
  orderAmount, 
  shippingCost, 
  onApplyDiscount 
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const calculateDiscount = (discountCode, shippingCost, orderAmount) => {
    const discount = SHIPPING_DISCOUNT_CODES[discountCode];
    
    if (!discount) {
      throw new Error('รหัสส่วนลดไม่ถูกต้อง');
    }

    if (orderAmount < discount.minAmount) {
      throw new Error(`ต้องมียอดสั่งซื้อขั้นต่ำ ${discount.minAmount} บาท`);
    }

    let discountAmount = 0;
    
    switch (discount.type) {
      case 'free':
        discountAmount = shippingCost;
        break;
      case 'percentage':
        discountAmount = (shippingCost * discount.value) / 100;
        break;
      case 'fixed':
        discountAmount = Math.min(discount.value, shippingCost);
        break;
    }

    return {
      discountAmount,
      finalShippingCost: Math.max(0, shippingCost - discountAmount),
      description: discount.description
    };
  };

  const handleApplyDiscount = () => {
    setError('');
    setSuccess('');

    if (!code) {
      setError('กรุณากรอกรหัสส่วนลด');
      return;
    }

    try {
      const result = calculateDiscount(code.toUpperCase(), shippingCost, orderAmount);
      setSuccess(result.description);
      onApplyDiscount(result);
      setCode('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="กรอกรหัสส่วนลดค่าจัดส่ง"
          className="bg-green-50 dark:bg-gray-800 "
        />
        <button
          onClick={handleApplyDiscount}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ใช้โค้ด
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}
    </div>
  );
};

export default ShippingDiscountInput;
