import React from 'react';

const Card = ({title}) => {
    return (
        <div className='cardBox text-light d-flex align-items-center mb-1 rounded-1 bg-dark'>
            {title}
        </div>
    )
}

export default Card;