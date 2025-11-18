// src/pages/PinDetail.jsx (or similar name)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MasonryGrid from '../components/MasonryGrid'; // Component you will create

function  PinDetail({ pin, onClose }){
    if (!pin) return null;
	const imgsrc = `https://pin-app-production.up.railway.app/api/get/Images/${pin.img}`
    // We use a fixed-size container and Flexbox for the content arrangement (Image on top, Details below)
    return (
        // Modal Backdrop: fixed to cover the screen, fading background
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
            onClick={onClose} // Click backdrop to close
        >
            {/* Pin Detail Card */}
            <div 
                className="bg-black rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full max-h-[90vh] flex flex-col animate-popup"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
            >
                {/* Close Button */}
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                {/* Main Content Area (Scrollable if needed) */}
                <div className="flex-grow overflow-y-auto">
                    
                    {/* 1. Image Area (The Pin itself) */}
                    <div className="flex justify-center items-center">
                        <img 
                            src={imgsrc} 
                            alt={pin.title} 
                            className="w-full h-auto object-contain" // Use object-contain to show full original size
                        />
                    </div>
                    
                    {/* 2. Details and Sender Area (Below the image) */}
                    <div className="p-6">
                        
                        {/* Title and Save Button */}
                        
                        
                        {/* Sender/Creator Info */}
                        <div className="flex items-center space-x-3 mb-6 pt-1">
                            <img className="w-10 h-10 rounded-full" src={imgsrc} alt={pin.sender} />
                            <div>
                                <p className="font-bold">{pin.senderName}</p>
                                
                            </div>
                        </div>

                        {/* Caption (Mock) */}
                        <p className="text-gray-50 text-sm mb-4 font-semibold">
                            {pin.caption}
                        </p>
                        
                        {/* Related Pins Link (To show where the 'side' content would go in a full desktop view) */}
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PinDetail;
