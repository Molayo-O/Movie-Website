export default function Pagination({currentPage, changePage}) {
    return(
        <div className="pagination">
        {/* Change page to previous, disable button if below 1 */}
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        {/* Change page to next */}
        <button onClick={() => changePage(currentPage + 1)}>Next</button>
      </div>
    );
}