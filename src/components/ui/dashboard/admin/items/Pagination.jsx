const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center items-center gap-8 mt-4">
            <button
                className={`px-4 py-2 border rounded-lg ${currentPage === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                Previous
            </button>
            <span className="mx-2">{`Page ${currentPage + 1} of ${totalPages}`}</span>
            <button
                className={`px-4 py-2 border rounded-lg ${currentPage + 1 === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage + 1 === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
