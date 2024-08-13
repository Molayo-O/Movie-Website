import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function Pagination({ currentPage, changePage, totalPages }) {
  // Number of pages to show per range
  const pageSize = 10;
  //Add logic for start and endPage
  const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPages);

  const pageNumbers = [];

  //loop to add pageNumbers within calculated range to the array
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {/* Change page to previous, disable button if below 1 */}
      <button
        className="next-page"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon className="page-icon" icon={faAngleLeft} />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => changePage(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </button>
      ))}

      {/* Change page to next */}
      <button
        className="next-page"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon className="page-icon" icon={faAngleRight} />
      </button>
    </div>
  );
}
