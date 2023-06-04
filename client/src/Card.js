import React from 'react'

const Card = (props) => {
  return (
    <div className=' flex flex-col items-center px-4 py2 bg-orange-500 rounded shadow-md text-slate-600' >
        <div className='text-lg font-medium'>{props.city[0].toUpperCase() + props.city.slice(1)}</div>
        <div>{props.temp}C</div>
    </div>
  )
}

export default Card