import "./Pagination.css";
const Pagination = ({ setCurrentPage, currentPage, totalPages }) => {
  return (
    <div className="PaginationControls">
      <div className="previous btn">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >{`<< Previous`}</button>
      </div>
      <div className="pages">
        {Array.from({ length: totalPages })
          .fill(0)
          .map((_, i) => {
            return (
              <div
                onClick={() => setCurrentPage(i + 1)}
                key={i}
                className={`page ${i + 1 === currentPage && "selected"}`}
              >
                {i + 1}
              </div>
            );
          })}
      </div>
      <div className="next btn">
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >{`Next >>`}</button>
      </div>
    </div>
  );
};

export default Pagination;
