
import React from "react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  editable?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  size = "md", 
  editable = false, 
  onChange 
}) => {
  const totalStars = 5;
  const activeStars = Math.round(rating * 2) / 2;
  
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (index: number) => {
    if (editable && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const isActiveInteger = index < Math.floor(activeStars);
        const isActiveHalf = !isActiveInteger && index < activeStars;
        
        return (
          <div 
            key={index} 
            className={`relative ${editable ? 'cursor-pointer' : ''}`}
            onClick={() => handleClick(index)}
          >
            {/* Empty Star (Background) */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className={`${sizeClasses[size]} text-gray-300`}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
              />
            </svg>
            
            {/* Filled Star (Overlay) */}
            {(isActiveInteger || isActiveHalf) && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className={`${sizeClasses[size]} text-yellow-500 absolute top-0 left-0 ${
                  isActiveHalf ? 'clip-path-half' : ''
                }`}
                style={isActiveHalf ? { clipPath: 'inset(0 50% 0 0)' } : {}}
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
