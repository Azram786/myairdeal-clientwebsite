import React from 'react'

const ServiceCard = ({image , text , description}) => {
  return (
    <div className='text-black flex flex-col justify-center items-center bg-white border shadow-md w-[16rem] h-[19rem] rounded-2xl mb-4'>
        <div>
            <img className='h-[8rem] w-[8rem] rounded-md' src={image}/>
        </div>
        <h1 className='text-xl font-bold items-center m-2'>{text}</h1>
        <p className='items-center m-2'>{description}</p>
    </div>
  )
}

export default ServiceCard