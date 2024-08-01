// components/ui/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-32">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;