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
  const [shiftState, setShiftState] = useState<'off' | 'single' | 'lock'>('off');

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
      '@ # ₫ _ & - + ( ) /',
      '{symbols} , : ; ! ? \" \' {backspace}',
      '{abc} , {space} . {enter}'
    ],
    symbols: [
      '~ ` | • √ π ÷ × § ∆',
      '£ € $ ¢ ^ ° = { } \\',
      '{numbers} % © ® ™ ✓ [ ] {backspace}',
      '{abc} < {space} > {enter}'
    ]
  };

  useEffect(() => {
    if (keyboardRef.current) {
      keyboardRef.current.setInput(input);
    }
  }, [input]);

  useEffect(() => {
    setInput(inputValue);
  }, [inputValue]);

  // Force keyboard re-render when language changes
  useEffect(() => {
    if (keyboardRef.current) {
      keyboardRef.current.setOptions({
        display: {
          '{numbers}': '123',
          '{abc}': 'ABC',
          '{vietnamese}': '🌍',
          '{english}': '🌍',
          '{space}': isVietnamese ? 'Tiếng Việt' : 'English',
          '{shift}': '⇧',
          '{backspace}': '⌫',
          '{enter}': 'enter'
        }
      });
    }
  }, [isVietnamese]);

  // Keep layout in sync with shift state and language
  useEffect(() => {
    if (layoutName === 'numbers' || layoutName === 'symbols') return;
    if (isVietnamese) {
      setLayoutName(shiftState === 'off' ? 'vietnamese' : 'vietnameseShift');
    } else {
      setLayoutName(shiftState === 'off' ? 'default' : 'shift');
    }
  }, [shiftState, isVietnamese]);

  const onChange = (input: string) => {
    const processedInput = processTelexInput(input);
    setInput(processedInput);
    onInputChange?.(processedInput);
  };

  const processTelexInput = (text: string): string => {
    if (!isVietnamese) return text;
    
    const parts = text.split(/(\s+)/); // keep delimiters
    // Process only the last word-like token to reduce churn and lag
    for (let i = parts.length - 1; i >= 0; i--) {
      if (!/\s+/.test(parts[i]) && parts[i].length > 0) {
        parts[i] = applyTelexToWord(parts[i]);
        break;
      }
    }
    return parts.join('');
  };

  const applyTelexToWord = (word: string): string => {
    // Handle Vietnamese Telex per-word with precomposed characters
    // 1) Extract trailing tone key if present
    const toneKeyMatch = word.match(/[sfrxjSFRXJ]$/);
    const toneKey = toneKeyMatch ? toneKeyMatch[0].toLowerCase() : '';
    let base = toneKey ? word.slice(0, -1) : word;

    // 2) Replace structural keys (dd, aw, aa, ee, oo, ow, uw)
    const structuralReplacements: [RegExp, string][] = [
      [/dd/g, 'đ'],
      [/DD/g, 'Đ'],
      [/aw/g, 'ă'],
      [/Aw/g, 'Ă'],
      [/aW/g, 'Ă'],
      [/AW/g, 'Ă'],
      [/aa/g, 'â'],
      [/Aa/g, 'Â'],
      [/aA/g, 'Â'],
      [/AA/g, 'Â'],
      [/ee/g, 'ê'],
      [/Ee/g, 'Ê'],
      [/eE/g, 'Ê'],
      [/EE/g, 'Ê'],
      [/oo/g, 'ô'],
      [/Oo/g, 'Ô'],
      [/oO/g, 'Ô'],
      [/OO/g, 'Ô'],
      [/ow/g, 'ơ'],
      [/Ow/g, 'Ơ'],
      [/oW/g, 'Ơ'],
      [/OW/g, 'Ơ'],
      [/uw/g, 'ư'],
      [/Uw/g, 'Ư'],
      [/uW/g, 'Ư'],
      [/UW/g, 'Ư']
    ];
    structuralReplacements.forEach(([pattern, replacement]) => {
      base = base.replace(pattern, replacement);
    });

    if (!toneKey) return base;

    // 3) Apply tone to the prioritized vowel (heuristic: last Vietnamese vowel)
    const vowels = ['a','ă','â','e','ê','i','o','ô','ơ','u','ư','y','A','Ă','Â','E','Ê','I','O','Ô','Ơ','U','Ư','Y'];
    let targetIndex = -1;
    for (let i = base.length - 1; i >= 0; i--) {
      if (vowels.includes(base[i])) { targetIndex = i; break; }
    }
    if (targetIndex === -1) return base; // no vowel to mark

    const ch = base[targetIndex];
    const toned = applyToneToChar(ch, toneKey);
    if (!toned) return base; // unknown mapping
    return base.slice(0, targetIndex) + toned + base.slice(targetIndex + 1);
  };

  const applyToneToChar = (ch: string, tone: string): string | null => {
    // tone: s(acute), f(grave), r(hook), x(tilde), j(dot)
    type Tone = 's'|'f'|'r'|'x'|'j';
    const t = tone as Tone;
    const map: Record<string, Record<Tone, string>> = {
      'a': { s: 'á', f: 'à', r: 'ả', x: 'ã', j: 'ạ' },
      'ă': { s: 'ắ', f: 'ằ', r: 'ẳ', x: 'ẵ', j: 'ặ' },
      'â': { s: 'ấ', f: 'ầ', r: 'ẩ', x: 'ẫ', j: 'ậ' },
      'e': { s: 'é', f: 'è', r: 'ẻ', x: 'ẽ', j: 'ẹ' },
      'ê': { s: 'ế', f: 'ề', r: 'ể', x: 'ễ', j: 'ệ' },
      'i': { s: 'í', f: 'ì', r: 'ỉ', x: 'ĩ', j: 'ị' },
      'o': { s: 'ó', f: 'ò', r: 'ỏ', x: 'õ', j: 'ọ' },
      'ô': { s: 'ố', f: 'ồ', r: 'ổ', x: 'ỗ', j: 'ộ' },
      'ơ': { s: 'ớ', f: 'ờ', r: 'ở', x: 'ỡ', j: 'ợ' },
      'u': { s: 'ú', f: 'ù', r: 'ủ', x: 'ũ', j: 'ụ' },
      'ư': { s: 'ứ', f: 'ừ', r: 'ử', x: 'ữ', j: 'ự' },
      'y': { s: 'ý', f: 'ỳ', r: 'ỷ', x: 'ỹ', j: 'ỵ' },
      'A': { s: 'Á', f: 'À', r: 'Ả', x: 'Ã', j: 'Ạ' },
      'Ă': { s: 'Ắ', f: 'Ằ', r: 'Ẳ', x: 'Ẵ', j: 'Ặ' },
      'Â': { s: 'Ấ', f: 'Ầ', r: 'Ẩ', x: 'Ẫ', j: 'Ậ' },
      'E': { s: 'É', f: 'È', r: 'Ẻ', x: 'Ẽ', j: 'Ẹ' },
      'Ê': { s: 'Ế', f: 'Ề', r: 'Ể', x: 'Ễ', j: 'Ệ' },
      'I': { s: 'Í', f: 'Ì', r: 'Ỉ', x: 'Ĩ', j: 'Ị' },
      'O': { s: 'Ó', f: 'Ò', r: 'Ỏ', x: 'Õ', j: 'Ọ' },
      'Ô': { s: 'Ố', f: 'Ồ', r: 'Ổ', x: 'Ỗ', j: 'Ộ' },
      'Ơ': { s: 'Ớ', f: 'Ờ', r: 'Ở', x: 'Ỡ', j: 'Ợ' },
      'U': { s: 'Ú', f: 'Ù', r: 'Ủ', x: 'Ũ', j: 'Ụ' },
      'Ư': { s: 'Ứ', f: 'Ừ', r: 'Ử', x: 'Ữ', j: 'Ự' },
      'Y': { s: 'Ý', f: 'Ỳ', r: 'Ỷ', x: 'Ỹ', j: 'Ỵ' }
    };
    return map[ch]?.[t] ?? null;
  };

  const handleKeyPress = (button: string) => {

    /**
     * Xử lý các phím đặc biệt
     */
    if (button === '{shift}' || button === '{lock}') {
      handleShift();
    } else if (button === '{numbers}') {
      setLayoutName('numbers');
    } else if (button === '{abc}') {
      setLayoutName(isVietnamese ? 'vietnamese' : 'default');
    } else if (button === '{symbols}') {
      setLayoutName('symbols');
    } else if (button === '{vietnamese}') {
      setIsVietnamese(true);
      setLayoutName('vietnamese');
    } else if (button === '{english}') {
      setIsVietnamese(false);
      setLayoutName('default');
    }

    // Gọi callback từ parent component
    onKeyPress?.(button);

    // Auto revert shift if in single-use and a character key was pressed
    if (shiftState === 'single') {
      const isLetter = /^[A-Za-zÀ-ỹĀ-ỹĂÂÊÔƠƯăâêôơưĐđ]$/.test(button);
      if (isLetter) {
        setShiftState('off');
      }
    }
  };

  const handleShift = () => {
    // Cycle: off -> single -> lock -> off
    setShiftState(prev => (prev === 'off' ? 'single' : prev === 'single' ? 'lock' : 'off'));
  };

  const display = {
    '{numbers}': '123',
    '{abc}': 'ABC',
    '{symbols}': '#+=',
    '{vietnamese}': '🌍',
    '{english}': '🌍',
    '{space}': isVietnamese ? 'Tiếng Việt' : 'English',
    '{shift}': '⇧',
    '{backspace}': '⌫',
    '{enter}': 'enter'
  };

  const keyboardOptions = {
    onChange,
    onKeyPress: handleKeyPress,
    layoutName,
    layout,
    display: display,
    buttonTheme: [
      // Visual states for shift key
      ...(shiftState === 'single' ? [{ class: 'shift-single', buttons: '{shift}' }] : []),
      ...(shiftState === 'lock' ? [{ class: 'shift-lock', buttons: '{shift}' }] : [])
    ],
    theme: 'hg-theme-default',
    physicalKeyboardHighlight: false,
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