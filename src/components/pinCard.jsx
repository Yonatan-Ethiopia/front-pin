import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const PinSkeleton = () => (
    <div 
        className="rounded-xl overflow-hidden bg-neutral-700 animate-pulse w-full h-auto" 
        style={{ height: `${Math.floor(Math.random() * (350 - 250) + 250)}px` }}
    >
        <div className="w-full h-full bg-neutral-800"></div>
    </div>
);
const PinCard = ({ pin, onPinClick }) => {
	 const [imageLoaded, setImageLoaded] = useState(false);
	 const [imageError, setImageError] = useState(false);
	 const showSkeleton = !imageLoaded && !imageError;
    
	const imgsrc = `https://pin-app-production.up.railway.app/api/get/Images/${pin.img}`
    return (
        // The container is a group so we can apply hover effects to children
        <div 
            className="relative group rounded-xl overflow-hidden shadow-md cursor-zoom-in transition-all duration-300 hover:shadow-xl hover:scale-[1.03]" 
            onClick={() => onPinClick(pin)}
        >
        {showSkeleton && <PinSkeleton />}
         <img 
                src={imgsrc} 
                alt={pin.senderName} 
                loading = "lazy"
                className={`w-full h-auto object-cover transition-opacity duration-800 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
					setImageError(true); 
                    e.target.onerror = null; 
                    e.target.src = `https://placehold.co/400x600/1e293b/ffffff?text=No+Image`; 
                    setImageLoaded(true); // Stop loading indicator on error
                }}
            />
			 {!showSkeleton && (
                <>
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end p-3">
                        
                    </div>
                    
                    <p className="absolute bottom-2 left-2 text-white text-sm font-semibold z-10 p-1 bg-black bg-opacity-40 rounded-lg max-w-[90%] truncate">
                        
                    </p>
                </>
            )}
            {/* Overlay for Save Button (Pinterest style) */}
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end p-3">
                
            </div>
            
            {/* Caption */}
            <p className="absolute bottom-2 left-2 text-white text-sm font-semibold z-10 p-1 bg-black bg-opacity-40 rounded-lg">
                {pin.senderName}
            </p>
        </div>
    );
};

export default PinCard;
