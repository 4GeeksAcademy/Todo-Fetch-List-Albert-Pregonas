import React from 'react';

const Card = ({title}) => {
    return (
        <div className='cardBox text-dark d-flex align-items-center mb-1' style={{height:'6vh', width:'30vw', fontSize:'1.2em', paddingLeft:'20px', border:'solid, grey, 1px'}}>
            {title}
        </div>
    )
}

export default Card;