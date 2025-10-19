'use client';

import React, { useState } from 'react';
import VirtualKeyboard from '@/components/virtual-keyboard';

interface KeyboardScreenProps {
  onClose?: () => void;
}

export default function KeyboardScreen({ onClose }: KeyboardScreenProps) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (input: string) => {
    setInputText(input);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <h1 className="text-xl font-semibold text-white">Bàn Phím Ảo</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Text Display Area */}
      <div className="flex-1 p-4 bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-200">
        <div className="h-full overflow-y-auto">
          <div className="min-h-[200px] p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-gray-700 whitespace-pre-wrap">
              {inputText || 'Văn bản sẽ hiển thị ở đây...'}
            </div>
            {inputText && (
              <div className="mt-4 pt-4 border-t border-gray-300 text-sm text-gray-500">
                Số ký tự: {inputText.length}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Virtual Keyboard */}
      <div className="p-4 bg-white border-t border-gray-200">
        <VirtualKeyboard
          inputValue={inputText}
          onInputChange={handleInputChange}
          className="max-w-full"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 p-4 bg-white border-t border-gray-200">
        <button
          onClick={() => setInputText('')}
          className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Xóa
        </button>
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(inputText);
              alert('Đã sao chép vào clipboard!');
            }
          }}
          disabled={!inputText}
          className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Sao chép
        </button>
      </div>
    </div>
  );
}
