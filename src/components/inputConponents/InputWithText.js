import React from 'react';

export const InputWithText = (props) => {
    return <form>
        <input className='filterByName' type="text" placeholder='search'
            onChange={props.changeInputValue}
            value={props.strInputValue}></input>
    </form>
}