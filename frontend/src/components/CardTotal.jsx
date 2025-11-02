import React, { useContext } from 'react'
import { shopDataConext } from '../context/ShopContext'
import Title from './Title'

const CardTotal = () => {

  const {currency,delivery_fee,getCartAmount}=useContext(shopDataConext)

  
  return (
    <div className='w--full lg:ml-[30px]'>
      <div className='text-xl py-[10px]'>
<Title text1={'Cart'} text2={'Total'}/>

      </div>
    <div className='flex flex-col gap-2 mt-2 text-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890]'>
<div className='flex justify-between text-white text-[18px] p-[10px]' >
<p className=''>
  SubTotal
</p>
<p>{currency}{getCartAmount()}.00</p>
</div>
<hr />
<div className='flex justify-between text-white text-[18px] p-[10px]'>
<p>Shipping Fee</p>
<p>{currency}{delivery_fee}</p>
</div>
<hr />
<div className='flex justify-between text-white text-[18px] p-[10px]'>
<p>Total Fee</p>
<p>{currency}{getCartAmount()===0 ?0 :getCartAmount() + delivery_fee}</p>
</div>

    </div>
    </div>
  )
}

export default CardTotal
