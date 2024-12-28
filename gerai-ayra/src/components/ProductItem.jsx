import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext)

  return (
    <Link className='text-gray-700 cursor-pointer ' to={`/product/${id}`}>
      <div className='border-b-2 border-pink-200 rounded-lg transition duration-500 hover:scale-105'>
        <img src={image[0]} alt="" className="w-full rounded-t-lg object-cover"/>
          <div className="mt-3">
            <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4 pl-3 text-sm">
            {name}
            </h3>
            <p className="mt-1 text-sm text-gray-700 pl-3 pb-4">{currency}{price}</p>
          </div>
        </div>
    </Link>
  )
}

export default ProductItem