'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { LanguageCode } from '@/types';

interface LanguageOption {
  code: LanguageCode;
  label: string;
  langAttr: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'EN', label: 'English (EN)', langAttr: 'en' },
  { code: 'FIL', label: 'Filipino (FIL)', langAttr: 'fil' },
  { code: 'MRW', label: 'Meranaw (MRW)', langAttr: 'mrw' },
];

interface LanguageSwitcherProps {
  fullWidth?: boolean;
}

export function LanguageSwitcher({ fullWidth = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle outside click/tap using pointerdown
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isOpen]);

  // Set focused index to current language when opening
  useEffect(() => {
    if (isOpen) {
      const idx = LANGUAGES.findIndex((l) => l.code === language);
      setFocusedIndex(idx >= 0 ? idx : 0);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, language]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev < LANGUAGES.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : LANGUAGES.length - 1));
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(LANGUAGES.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < LANGUAGES.length) {
          handleSelect(LANGUAGES[focusedIndex].code);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block ${fullWidth ? 'w-full' : ''}`}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button: h-8 to match existing height, keeps header compact */}
      <button
        ref={triggerRef}
        type="button"
        id={`${listboxId}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={`Select language. Current: ${language}`}
        onClick={toggleDropdown}
        className={`h-8 px-2.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 transition-colors inline-flex items-center gap-1.5 text-xs font-semibold shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800 ${
          fullWidth ? 'w-full justify-between' : ''
        }`}
      >
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-stone-500 shrink-0" aria-hidden="true" />
          <span className="tracking-wide uppercase">{language}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-brand-900' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu Card: right-aligned, z-50 to sit above hero & navbar */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Select language"
          aria-activedescendant={focusedIndex >= 0 ? `lang-option-${LANGUAGES[focusedIndex].code}` : undefined}
          tabIndex={-1}
          className={`absolute z-50 mt-1.5 py-1 bg-white rounded-xl shadow-lg border border-stone-200/90 text-stone-900 animate-in fade-in-0 zoom-in-95 duration-100 ${
            fullWidth ? 'left-0 right-0 w-full' : 'right-0 w-48 sm:w-52'
          }`}
        >
          {LANGUAGES.map((item, index) => {
            const isSelected = language === item.code;
            const isFocused = focusedIndex === index;

            return (
              <button
                key={item.code}
                id={`lang-option-${item.code}`}
                role="option"
                aria-selected={isSelected}
                lang={item.langAttr}
                type="button"
                onClick={() => handleSelect(item.code)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left ${
                  isSelected
                    ? 'bg-brand-50 text-brand-950 font-semibold'
                    : isFocused
                    ? 'bg-stone-100 text-stone-900'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{item.label}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-brand-900 shrink-0 ml-2" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
