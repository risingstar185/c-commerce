import React from 'react'

const Title = ({text1,text2}) => {
  return (

    <div className='inline-flex gap-2 items-center text-center mb-3 text-[35px] -mt-[200px] md:text-[40px]'>
      <p className='text-green font-semibold  font-[cursive]'>{text1} <span className='text-white'>
        {text2}</span></p>
    </div>
  )
}

export default Title
