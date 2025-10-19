'use client';

import React, { useEffect, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import '@/styles/virtual-keyboard.css';

interface VirtualKeyboardProps {
  inputValue?: string;
  onInputChange?: (input: string) => void;
  onKeyPress?: (button: string) => void;
  onClose?: () => void;
  className?: string;
}

export default function VirtualKeyboard({ 
  inputValue = '', 
  onInputChange,
  onKeyPress,
  onClose,
  className = ''
}: VirtualKeyboardProps) {
  const keyboardRef = useRef<any>(null);
  const [input, setInput] = useState(inputValue);
  const [layoutName, setLayoutName] = useState('default');
  const [isVietnamese, setIsVietnamese] = useState(false);

  const layout = {
    default: [
      'q w e r t y u i o p',
      'a s d f g h j k l',
      '{shift} z x c v b n m {backspace}',
      '{numbers} {vietnamese} {space} . {enter}'
    ],
    shift: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L',
      '{shift} Z X C V B N M {backspace}',
      '{numbers} {vietnamese} {space} . {enter}'
    ],
    vietnamese: [
      'q w e r t y u i o p',
      'a s d f g h j k l',
      '{shift} z x c v b n m {backspace}',
      '{numbers} {english} {space} . {enter}'
    ],
    vietnameseShift: [
      'Q W E R T Y U I O P',
      'A S D F G H J K L',
      '{shift} Z X C V B N M {backspace}',
      '{numbers} {english} {space} . {enter}'
    ],
    numbers: [
      '1 2 3 4 5 6 7 8 9 0',
      '- / : ; ( ) $ & @ "',
      '{abc} . , ? ! \' {backspace}',
      '{space} {enter}'
    ]
  };

  const display = {
    '{numbers}': '123',
    '{abc}': 'ABC',
    '{vietnamese}': 'VN',
    '{english}': 'EN',
    '{space}': 'space',
    '{shift}': '⇧',
    '{backspace}': '⌫',
    '{enter}': 'enter'
  };

  useEffect(() => {
    if (keyboardRef.current) {
      keyboardRef.current.setInput(input);
    }
  }, [input]);

  useEffect(() => {
    setInput(inputValue);
  }, [inputValue]);

  const onChange = (input: string) => {
    const processedInput = processTelexInput(input);
    setInput(processedInput);
    onInputChange?.(processedInput);
    console.log('Input changed', processedInput);
  };

  // Hàm xử lý phương thức nhập Telex
  const processTelexInput = (text: string): string => {
    if (!isVietnamese) return text;
    
    // Telex rules
    const telexRules = [
      // Dấu thanh
      { pattern: /([aeiouy])f/g, replacement: '$1̀' }, // huyền
      { pattern: /([aeiouy])s/g, replacement: '$1́' }, // sắc
      { pattern: /([aeiouy])r/g, replacement: '$1̉' }, // hỏi
      { pattern: /([aeiouy])x/g, replacement: '$1̃' }, // ngã
      { pattern: /([aeiouy])j/g, replacement: '$1̣' }, // nặng
      
      // Ký tự đặc biệt
      { pattern: /aa/g, replacement: 'â' },
      { pattern: /ee/g, replacement: 'ê' },
      { pattern: /oo/g, replacement: 'ô' },
      { pattern: /uw/g, replacement: 'ư' },
      { pattern: /ow/g, replacement: 'ơ' },
      { pattern: /aw/g, replacement: 'ă' },
      { pattern: /dd/g, replacement: 'đ' },
      
      // Uppercase
      { pattern: /AA/g, replacement: 'Â' },
      { pattern: /EE/g, replacement: 'Ê' },
      { pattern: /OO/g, replacement: 'Ô' },
      { pattern: /UW/g, replacement: 'Ư' },
      { pattern: /OW/g, replacement: 'Ơ' },
      { pattern: /AW/g, replacement: 'Ă' },
      { pattern: /DD/g, replacement: 'Đ' }
    ];

    let result = text;
    telexRules.forEach(rule => {
      result = result.replace(rule.pattern, rule.replacement);
    });
    
    return result;
  };

  const handleKeyPress = (button: string) => {
    console.log('Button pressed', button);

    /**
     * Xử lý các phím đặc biệt
     */
    if (button === '{shift}' || button === '{lock}') {
      handleShift();
    } else if (button === '{numbers}') {
      setLayoutName('numbers');
    } else if (button === '{abc}') {
      setLayoutName(isVietnamese ? 'vietnamese' : 'default');
    } else if (button === '{vietnamese}') {
      setIsVietnamese(true);
      setLayoutName('vietnamese');
    } else if (button === '{english}') {
      setIsVietnamese(false);
      setLayoutName('default');
    }

    // Gọi callback từ parent component
    onKeyPress?.(button);
  };

  const handleShift = () => {
    if (isVietnamese) {
      const newLayoutName = layoutName === 'vietnamese' ? 'vietnameseShift' : 'vietnamese';
      setLayoutName(newLayoutName);
    } else {
      const newLayoutName = layoutName === 'default' ? 'shift' : 'default';
      setLayoutName(newLayoutName);
    }
  };

  const keyboardOptions = {
    onChange,
    onKeyPress: handleKeyPress,
    layoutName,
    layout,
    display,
    theme: 'hg-theme-default',
    physicalKeyboardHighlight: true,
    syncInstanceInputs: true,
    mergeDisplay: true,
    debug: false
  };

  return (
    <div className={`virtual-keyboard ${className}`}>
      <div className="keyboard-container">
        <Keyboard
          keyboardRef={(r) => {
            if (keyboardRef.current !== r) {
              keyboardRef.current = r;
            }
          }}
          {...keyboardOptions}
        />
      </div>
      
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute bottom-4 left-4 w-6 h-6 flex items-center justify-center transition-colors z-10"
        >
          <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}