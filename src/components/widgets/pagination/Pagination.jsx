import React, { useState } from "react";
import "./Pagination.scss";
import { left, right } from "assets/images";

const Pagination = ({
  totalCount,
  page,
  limit = 10,
  setPage,
  dataLength = 10,
}) => {
  // set page number limit, for sliding page number boxes
  const [pageNumbersLimit, setPageNumbersLimit] = useState(5);

  // Get the current count of items user has moved through on the table.
  const currentCount =
    page * limit - (dataLength === limit ? 0 : limit - dataLength);

  // Get the total number of pages
  const totalPages = Math.ceil(totalCount / limit);

  // get a list of the number of pages, this is used to display page number boxes.. I use length property here
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // I want to always slide the page number boxes forward
  const pageList = pageNumbers.slice(page - 1, pageNumbersLimit);

  const handleNext = () => {
    page < totalPages && setPage(page + 1);
    pageNumbersLimit <= totalPages && setPageNumbersLimit(pageNumbersLimit + 1);
  };

  const handlePrev = () => {
    page > 1 && setPage(page - 1);
    pageNumbersLimit > 5 && setPageNumbersLimit(pageNumbersLimit - 1);
  };
  // console.log(page, "endpoints");
  return (
    <div className="pagination end">
      <div className="pagination_wrap center">
        {pageList.map((pageNumber) => (
          <div
            key={pageNumber}
            className={
              pageNumber === page
                ? "pagination_active center"
                : "pagination_inactive center"
            }
            onClick={() => {
              setPage(pageNumber);
              setPageNumbersLimit(pageNumber + 4);
            }}
          >
            {pageNumber}
          </div>
        ))}
        <div className="pagination_dots_wrap center">
          <div className="pagination_dots"></div>
          <div className="pagination_dots"></div>
          <div className="pagination_dots"></div>
        </div>
        <div
          className={
            pageNumbers?.length === page
              ? "pagination_active center"
              : "pagination_inactive center"
          }
          onClick={() => setPage(pageNumbers?.length)}
        >
          {pageNumbers?.length}
        </div>
      </div>

      <div className="pagination_num center text">
        {page + " - " + currentCount + " of " + totalCount}
      </div>
      <div className="start pagination_control">
        <div
          className="pagination_control_item center"
          onClick={handlePrev}
          style={{ cursor: page === 1 && "not-allowed" }}
        >
          <img src={left} alt="icon" />
        </div>
        <div
          className="pagination_control_item center"
          onClick={handleNext}
          style={{ cursor: page === pageNumbers?.length && "not-allowed" }}
        >
          <img src={right} alt="icon" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
