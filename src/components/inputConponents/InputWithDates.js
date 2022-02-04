import React from 'react';

export const InputWithDates = (props) => {
    return <div>
        <label htmlFor={`date${props.inputType}`}>Date {props.inputType.toLowerCase()}</label>
        <input className='' type="date" id={`date${props.inputType}`} 
        onChange={(e) => props.changeValue(e, props.inputType.toLowerCase())}
        value={props.inputValue}/>
    </div>
}