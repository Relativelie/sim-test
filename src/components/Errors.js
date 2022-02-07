import React from 'react';

export const Errors = (props) => {
    if (props.errorType === "wrongRequest") {
        return <div className="errors"><p>Please check your data and try again</p></div>
    }
    else return (
        <div className="errors"><p>Something went wrong, you can try again or go to the help desk </p></div>
    )
}