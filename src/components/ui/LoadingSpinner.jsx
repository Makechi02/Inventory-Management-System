const LoadingSpinner = () => {
    return (
        <div className={`flex items-center justify-center h-32`}>
            <div className={`w-16 aspect-square border-t-4 border-blue-500 border-solid rounded-full animate-spin`}></div>
        </div>
    );
};

export const SmallLoadingSpinner = () => {
    return (
        <div className={`flex items-center justify-center h-fit`}>
            <div className={`w-4 aspect-square border-t-4 border-white border-solid rounded-full animate-spin`}></div>
        </div>
    )
}

export default LoadingSpinner;
