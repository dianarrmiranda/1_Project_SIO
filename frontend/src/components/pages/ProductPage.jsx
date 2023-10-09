import React from 'react'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const {id} = useParams()
  return (
    <div>
        <h1>Product {id}</h1>
    </div>
  )
}

export default ProductPage
