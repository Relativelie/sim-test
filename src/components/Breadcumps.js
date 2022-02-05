import React from 'react';
import ball from '../images/ball.png';
import { Link } from 'react-router-dom';

export const Breadcumps = (props) => {

    return <header className='breadcumbsContainer'>
        <img src={ball} alt="ball"></img>
        <div className='breadcumbsItems'>
            {props.choosenPages.map((item, index) => {
                if (item === "competitions") {
                    return (
                        <Link to="/" key={index}
                            onClick={(e) => props.backToPreviousPage(e.target.outerText)}>
                            {item}
                        </Link>)
                }
                else {
                    return (
                        <Link to={`/${item}`} key={index}
                            onClick={(e) => props.backToPreviousPage(e.target.outerText.substring(1, e.target.outerText.length))}>
                            <span className='slash'>/</span>
                            {props.breadcumbs[index]}
                        </Link>)
                }
            }
            )}
        </div>
    </header>;
}