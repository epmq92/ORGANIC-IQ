import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColorClass?: string;
}

export default function BrandLogo({ 
  className = '', 
  size = 60, 
  showText = true,
  textColorClass = 'text-brand-primary'
}: BrandLogoProps) {
  // Proportional scaling for the text size
  const textSize = size * 0.18;
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 500 480" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transform hover:scale-105 transition-transform duration-300"
      >
        {/* ================= STRAW (Yellow / Gold) ================= */}
        {/* Yellow Straw body and dark outline */}
        <path 
          d="M 235 150 L 235 55 C 235 45, 245 35, 255 35 L 290 35 L 290 65 L 265 65 L 265 150 Z" 
          fill="#F2C144" 
          stroke="#000000" 
          strokeWidth="11" 
          strokeLinejoin="round" 
          strokeLinecap="round"
        />
        
        {/* ================= LEAVES (Green) ================= */}
        {/* Left Leaf with dark outline */}
        <path 
          d="M 250 145 C 190 145, 140 115, 140 100 C 140 90, 180 100, 250 145 Z" 
          fill="#4CAF31" 
          stroke="#000000" 
          strokeWidth="11" 
          strokeLinejoin="round" 
          strokeLinecap="round"
        />
        {/* Right Leaf with dark outline */}
        <path 
          d="M 250 145 C 310 145, 360 115, 360 100 C 360 90, 320 100, 250 145 Z" 
          fill="#4CAF31" 
          stroke="#000000" 
          strokeWidth="11" 
          strokeLinejoin="round" 
          strokeLinecap="round"
        />
        
        {/* ================= CUP BODY - SOLID BLACK BASE ================= */}
        {/* Provides the black center inside the spiral */}
        <polygon 
          points="143,193 357,193 332,347 183,387" 
          fill="#000000" 
          stroke="#000000" 
          strokeWidth="8"
          strokeLinejoin="round"
        />

        {/* ================= YELLOW CUP OUTER WRAPPING FRAME ================= */}
        <path 
          d="M 100 160 L 375 160 L 355 195 L 145 195 L 185 385 L 345 345 L 365 310 L 380 310 L 355 410 L 150 410 Z" 
          fill="#F2C144" 
          stroke="#000000" 
          strokeWidth="11" 
          strokeLinejoin="round" 
          strokeLinecap="round"
        />

        {/* ================= GREEN SPIRAL INNER ================= */}
        {/* Spiral Outer Black Border Outline to create clean edges */}
        <path 
          d="M 355 195 
             L 330 345 
             L 185 385 
             L 145 195 
             L 340 195 
             L 315 320 
             L 210 350 
             L 180 225 
             L 300 225 
             L 285 295 
             L 235 310 
             L 215 255 
             L 265 255 
             L 260 280 
             L 245 285" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="28" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
        {/* Inner Green Ribbon of the Spiral */}
        <path 
          d="M 355 195 
             L 330 345 
             L 185 385 
             L 145 195 
             L 340 195 
             L 315 320 
             L 210 350 
             L 180 225 
             L 300 225 
             L 285 295 
             L 235 310 
             L 215 255 
             L 265 255 
             L 260 280 
             L 245 285" 
          fill="none" 
          stroke="#4CAF31" 
          strokeWidth="16" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
      </svg>
      {showText && (
        <span 
          className={`font-sans font-extrabold uppercase tracking-[0.18em] text-center mt-2 ${textColorClass} transition-colors duration-300`} 
          style={{ fontSize: `${textSize}px` }}
        >
          ORGANIC SIP
        </span>
      )}
    </div>
  );
}
