import React from 'react';

export const InputWithDates = (props) => {
    return <div className="dateFilters">
        <label className='filterLabel' htmlFor={`date${props.inputType}`}>Date {props.inputType.toLowerCase()}</label>
        <input className='filter' type="date" id={`date${props.inputType}`} 
        onChange={(e) => props.changeValue(e, props.inputType.toLowerCase())}
        value={props.inputValue}/>
    </div>
}