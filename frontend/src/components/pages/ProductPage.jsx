import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../layout/Navbar'

const ProductPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <button className='btn btn-accent' onClick={() => navigate(-1)}>GO BACK</button>
        <h1>Product {id}</h1>
    </div>
  )
}

export default ProductPage
