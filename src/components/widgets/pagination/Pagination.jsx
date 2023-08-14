import React from "react";
import "./Pagination.scss";
import { left, right } from "assets/images";

const Pagination = ({
  totalCount,
  page,
  limit = 10,
  setPage,
  dataLength = 10,
}) => {
  //  query data to perform pagination on // This basically is suscribed data
  //   page = 2;
  //   const { data } = (query && query.useQuery(page)) || { data: null };

  //   //
  //   const totalCount = data?.total || data?.totalCount || 10;
  // console.log(dataLength, "len");
  const currentCount =
    page * limit - (dataLength === limit ? 0 : limit - dataLength);
  const totalPages = Math.ceil(totalCount / limit);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleNext = () => {
    page < totalPages && setPage(page + 1);
  };
  const handlePrev = () => {
    page > 1 && setPage(page - 1);
  };
  // console.log(page, "endpoints");
  return (
    <div className="pagination end">
      <div className="pagination_wrap center">
        {pageNumbers.map((pageNumber, idx) => (
          <div
            key={pageNumber}
            className={
              pageNumber === page
                ? "pagination_active center"
                : "pagination_inactive center"
            }
            onClick={() => setPage(pageNumber)}
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
