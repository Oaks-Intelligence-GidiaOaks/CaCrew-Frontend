import React from "react";
import "./Pagination.scss";
import { left, right } from "assets/images";

const Pagination = ({ totalCount, page = 1, limit = 10, setPage }) => {
  //  query data to perform pagination on // This basically is suscribed data
  //   page = 2;
  //   const { data } = (query && query.useQuery(page)) || { data: null };

  //   //
  //   const totalCount = data?.total || data?.totalCount || 10;
  const totalPages = Math.ceil(totalCount / limit);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  console.log(page, "endpoints");
  return (
    <div className="pagination end">
      <div className="pagination_wrap start">
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
      </div>

      <div className="pagination_num">1 - 10 of 17</div>
      <div className="start pagination_control">
        <div className="pagination_control_item center">
          <img src={left} alt="" />
        </div>
        <div className="pagination_control_item center">
          <img src={right} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
