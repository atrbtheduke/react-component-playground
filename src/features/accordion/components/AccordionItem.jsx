import { useState } from 'react';

const AccordionItem = ({ title, content, isActive, onToggle }) => {
  return (
    <div className="border rounded-lg overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100 text-left"
        aria-expanded={isActive}
      >
        <span className="font-medium text-gray-800">{title}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`w-5 h-5 transition-transform duration-200 ${
            isActive ? 'rotate-180' : ''
          }`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isActive ? 'max-h-screen p-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="pb-2 text-gray-600">{content}</div>
      </div>
    </div>
  );
};

export default AccordionItem;