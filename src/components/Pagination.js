/*
 *
 * Pagination
 *
 */

import React from 'react';

export function Pagination(props) {
    const { totalPages, onPageChange, page } = props;
    return (
        <div className="d-flex justify-content-center pt-2" >
            <ul className="pagination pagination-md" onClick={onPageChange}>
                <li className="page-item"><button className="page-link">Previous</button></li>
                {[...Array(totalPages)].map((x, i) =>
                    <li className="page-item" key={i}><button className="page-link" style={{ backgroundColor: page === i + 1 ? '#fdf3ea': '' }}>{i + 1}</button>
                    </li>
                )}
                <li className="page-item"><button className="page-link">Next</button></li>
            </ul>
        </div>
    );
}
export default Pagination;
