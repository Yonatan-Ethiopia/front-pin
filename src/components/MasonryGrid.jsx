import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css'; // The package you installed
import PinCard from './pinCard';
import PinDetail from '../pages/PinDetail'; // The component you'll create
import Header from './Header';

// Define how many columns should display at different screen widths
const breakpointColumnsObj = {
  default: 5,  // Default (largest screens)
  1400: 4,     // 4 columns from 1400px down
  1000: 3,     // 3 columns from 1000px down
  700: 2      // 2 columns from 700px down       // 1 column from 500px down (mobile)
};

// Assuming your API returns this many items per page (adjust if needed)
const PAGE_SIZE = 10; 
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://pin-app-production.up.railway.app/api/get/Images';

const CustomStyles = () => (
  <style>
     {`

      /* Custom pop-up keyframes */

      @keyframes popUp {

        from { transform: scale(0.92); opacity: 0; }

        to { transform: scale(1); opacity: 1; }

      }

      .animate-popup {

        animation: popUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;

      }

      @import url('https://fonts.googleapis.com/css2?family=Momo+Signature&display=swap');


      /* Custom bounce keyframes for HIGHER bounce (moves -20px) */

      @keyframes custom-bounce {

          0%, 100% { transform: translateY(0); }

          50%      { transform: translateY(-20px); } /* Control the height here */

      }

      .bouncing-dot {

        animation-name: custom-bounce;

        animation-duration: 0.7s; 

        animation-iteration-count: infinite;

        animation-timing-function: ease-in-out;

      }

    `} 
  </style>
);

function MasonryGrid() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPin, setSelectedPin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // 🆕 1. Ref for the Intersection Observer target element at the bottom
  const observerTarget = useRef(null); 

  // 🛠️ 2. Refactored fetchPins to handle pagination and appending data
  const fetchPins = async (page) => {
    // Prevent fetching if there's no more data or we're already loading the next page
    if (!hasMore || (page > 1 && loading)) return; 
    
    // Only show the big initial loader on the first page load
    if (page === 1) setLoading(true);

    try {
      const fetchUrl = `${API_BASE_URL}?page=${page}`;
      
      const response = await fetch(fetchUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true', 
          'Accept': 'application/json' 
        }
      }); 
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // Append new data to the existing pins array
        setPins(prevPins => [...prevPins, ...data]);
        
        // Check if we received less than the page size (meaning we hit the end)
        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        } else {
          // Increment the page state for the next fetch
          setCurrentPage(prevPage => prevPage + 1);
        }
        
        console.log(`Fetched page ${page} with ${data.length} pins.`);
      } else {
        setHasMore(false); // Stop trying to load if the response isn't an array
      }

    } catch (error) {
      console.error("Error fetching pins:", error.message);
      setHasMore(false); // Stop further attempts on error
    } finally {
      // Set loading to false once the data process for this page is complete
      setLoading(false);
    }
  };

  // 🚀 3. Initial Load useEffect (Page 1)
  useEffect(() => {
    fetchPins(1);
  }, []);

  // 🔄 4. Intersection Observer useEffect (Infinite Scroll Logic)
  useEffect(() => {
    // Ensure we have a target, there's more data, and we're not currently busy
    if (!observerTarget.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(entries => {
      // If the target is intersecting (visible), and we are not in the initial load phase
      if (entries[0].isIntersecting && pins.length > 0) {
        // Trigger the next page load using the updated currentPage state
        fetchPins(currentPage); 
      }
    }, { 
      root: null, // viewport
      rootMargin: '200px', // Start loading when 200px away from the bottom
      threshold: 0.1
    });

    observer.observe(observerTarget.current);

    // Cleanup function: disconnect the observer when the component unmounts or dependencies change
    return () => {
      if (observerTarget.current) {
        observer.disconnect();
      }
    };
  // Dependencies: Rerun when hasMore, loading, or the currentPage state changes
  }, [hasMore, loading, currentPage]);


  // --- Initial Full-Screen Loading State ---
  // Only show this if no pins have been loaded yet
  if (pins.length === 0 && loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-black text-white z-50 h-screen w-screen">
        <CustomStyles /> 
        <div className="flex justify-center items-center space-x-2">
          <span className="w-4 h-4 bg-gray-700 rounded-full bouncing-dot" style={{ animationDelay: '0ms' }}></span>
          <span className="w-4 h-4 bg-gray-700 rounded-full bouncing-dot" style={{ animationDelay: '150ms' }}></span>
          <span className="w-4 h-4 bg-gray-700 rounded-full bouncing-dot" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="p-2 min-h-screen w-screen bg-black">
      <CustomStyles />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {pins.map(pin => (
          <PinCard key={pin._id} pin={pin} onPinClick={setSelectedPin}/> 
        ))}
      </Masonry>

      {/* 🧭 5. Intersection Observer Target */}
      <div className="flex justify-center py-4">
        {hasMore ? (
          <>
            {/* The element the observer watches */}
            <div ref={observerTarget} className="h-1 w-full" style={{ visibility: 'hidden' }}></div>
            
            {/* Show a mini-loader while subsequent pages are fetching */}
            {loading && pins.length > 0 && (
              <div className="flex justify-center items-center space-x-2 text-white">
                <span className="w-3 h-3 bg-gray-700 rounded-full bouncing-dot" style={{ animationDelay: '0ms', animationDuration: '0.5s' }}></span>
                <span className="w-3 h-3 bg-gray-700 rounded-full bouncing-dot" style={{ animationDelay: '100ms', animationDuration: '0.5s' }}></span>
                <span className="w-3 h-3 bg-gray-700 rounded-full bouncing-dot" style={{ animationDelay: '200ms', animationDuration: '0.5s' }}></span>
              </div>
            )}
            
            {/* This message will appear briefly before the next page loads */}
            {!loading && pins.length > 0 && (
                <p className="text-gray-500 text-sm">Scroll down to load more...</p>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-sm">You've reached the end of the content.</p>
        )}
      </div>

      <PinDetail 
        pin={selectedPin} 
        onClose={() => setSelectedPin(null)} 
      />
    </div>
  );
}

export default MasonryGrid;
