import React from 'react';
import { changeCurrentPage, changeGroupOfPage } from '../store/reducers';
import { useDispatch } from 'react-redux';


export const Pagination = (props) => {

    const dispatch = useDispatch();

    const itemTemplate = (pageNumber, active) => {
        return <a onClick={(e) => dispatch(changeCurrentPage(parseInt(e.target.textContent)))} href='#?' className='page-link' key={pageNumber}>
            <li className={`page-item ${active}`}>
                {pageNumber}
            </li>
        </a>
    }

    const VisiblePages = () => {
        let rows = [];
        let maxPage = Math.ceil(props.totalContests / props.itemsPerPaginateSheet);

        if (props.currentPage > 2) {
            rows.push(<a onClick={(e) => dispatch(changeGroupOfPage({ maxItems: props.totalContests, pageShift: -3 }))} href='#?' key="previous"><li>{"<<"}</li></a>)
        }
        if (props.currentPage > 1) {
            rows.push(itemTemplate(props.currentPage - 1, ''))
        }
        rows.push(itemTemplate(props.currentPage, "active"))
        if (props.currentPage < maxPage) {
            rows.push(itemTemplate(props.currentPage + 1, ''))
        }
        if (maxPage - props.currentPage >= 2) {
            rows.push(<a onClick={(e) => dispatch(changeGroupOfPage({ maxItems: props.totalContests, pageShift: 3 }))} href='#?' key="next"><li>{">>"}</li></a>)
        }

        return rows
    }

    return (

        <nav>
            <ul className='pagination'>
                <VisiblePages />
            </ul>
        </nav >
    );
};
