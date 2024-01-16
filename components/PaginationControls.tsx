import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handlePageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => {
          handlePrevPage();
          handlePageChange(currentPage - 1);
        }}
        className="mr-2 bg-gray-200 hover:bg-gray-900 text-gray-700 button p-3"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`mx-1 py-1 px-2 rounded ${
            currentPage === index + 1 ? "bg-gray-900 text-white" : "bg-gray-600"
          }`}
          onClick={() => {
            handlePageChange(index + 1);
          }}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => {
          handleNextPage();
          handlePageChange(currentPage + 1);
        }}
        className="bg-gray-800 button mx-1 text-gray-700 font-bold py-2 px-4 rounded p-3"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
