import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Points() {
  const navigate = useNavigate()
  return (
    <div className="investments">
      <div className="investment">mutual funds</div>
      <div className="investment" onClick={()=>{navigate("/stock")}}>stock</div>
      <div className="investment" onClick={()=>{navigate("/realestate")}}>Real estate</div>
      <div className="investment">Fixed deposit</div>
    </div>
  )
}
