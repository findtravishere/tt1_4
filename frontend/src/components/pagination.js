import React, { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [state, setState] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <>
            <li key={number} className="page-item">
              <a
                onClick={() => {
                  paginate(number);
                  setState(number);
                }}
                className="page-link"
              >
                {number}
              </a>
            </li>
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
