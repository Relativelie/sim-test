import React from 'react';

export const InputWithText = (props) => {
    return <form>
        <input className='filter' type="text" placeholder='search'
            onChange={props.changeInputValue}
            value={props.strInputValue}></input>
    </form>
}