
import React, { useState, useEffect } from 'react';
function Sidebar({ isOpen, onClose}){
	return(
		<>
            {/* Overlay for closing */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            
            {/* Sidebar content */}
            <div className={`fixed top-0 left-0 h-dvh w-64 bg-black shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-red-800 mb-6 border-b pb-2">Menu</h2>
                    <nav className="space-y-3">
                        <a href="https://t.me/aastu_photography" className="block text-gray-200 hover:text-red-600 font-semibold transition">View group</a>
                        <a href="https://t.me/ace_ventura2nd" className="block text-gray-200 hover:text-red-600 font-semibold transition">Contact developer</a>
                    </nav>
                </div>
            </div>
        </>
	);

}
export default Sidebar;
