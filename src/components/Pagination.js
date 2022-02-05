import React from 'react';


export const Pagination = (props) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalContests / props.itemsPerPaginateSheet); i++) {
        pageNumbers.push(i);
    }

    const firstandLastNumbers = [pageNumbers[0], pageNumbers[1], pageNumbers.length - 1, pageNumbers.length];


    const VisiblePages = () => {
        let activeClass;
        let rows = [];
        let loopLimit = props.currentPage > 3 ? pageNumbers.length - props.currentPage+2: props.currentPage+1;

        if (firstandLastNumbers.indexOf(props.currentPage) !== -1) {
            let firstNumber = props.currentPage < 3 ? 1 : props.currentPage -1;
            for (let item=0; item < loopLimit && item < pageNumbers.length - 1; item++) {
                if (firstNumber+item===props.currentPage) activeClass = "active";
                else activeClass = "";
                rows.push(
                    <a onClick={(e) => props.paginate(e, firstNumber + item)} href='/' className='page-link' key={item}>
                        <li className={`page-item ${activeClass}`}>
                            {firstNumber + item}
                        </li>
                    </a>)
        }}

        else {
            let pageValues = [props.currentPage - 1, props.currentPage, props.currentPage + 1];
            for (let item=0; item<pageValues.length; item ++) {
                if (pageValues[item]===props.currentPage) activeClass = "active";
                else activeClass = "";
                rows.push(
                    <a onClick={(e) => props.paginate(e, pageValues[item])} href='/' className='page-link' key={item}>
                        <li className={`page-item ${activeClass}`}>
                            {pageValues[item]}
                        </li>
                    </a>)
            }
        } 
            return rows
    }

    return (
        
        <nav>
            <ul className='pagination'>
                { ( props.currentPage)<= 2 ? <div></div> : <a onClick={(e) => props.changeGroupOfItems(e, "previous", pageNumbers.length)} href='#?'><li>{"<<"}</li></a>}
                    <VisiblePages/>
                { (pageNumbers.length - props.currentPage)< 2 ? <div></div> : <a onClick={(e) => props.changeGroupOfItems(e, "next", pageNumbers.length)} href='#?'><li>{">>"}</li></a>}

            </ul>
        </nav >
    );
};
