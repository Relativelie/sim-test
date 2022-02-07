import React, { useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import ball from '../images/ball.png';
import { Link } from 'react-router-dom';
import { changeLocation } from '../store/reducers';


export const Breadcumps = (props) => {

    const dispatch = useDispatch();
    const [sheetName] = useState('base');
    const { chosenLocation } = useSelector((sheets) => sheets[sheetName]);

    return  <header className='breadcumbsContainer'>
        <img src={ball} alt="ball"></img>
        <div className='breadcumbsItems'>
            {chosenLocation.map((item, index) => {
                if (item.type === "competitions") {
                    return (
                        <Link to="/" key={index}
                            onClick={() => dispatch(changeLocation(item))}>
                            {item.name}
                        </Link>)
                }
                else {
                    return (
                        <Link to={`/${item.id}/${item.type}`} key={index}
                            onClick={() => dispatch(changeLocation(item))}>
                            <span className='slash'>/</span>
                            {item.name}
                        </Link>)
                }
            }
            )}
        </div>
    </header>
}