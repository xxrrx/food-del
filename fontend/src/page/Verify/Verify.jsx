import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import './Verify.css'
import axios from 'axios';

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("vnp_ResponseCode")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext)
    const navigate = useNavigate();

    const verifyPayment = async () =>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
        if (response.data.success) {
            navigate("/success", { state: { orderId } })
        }
        else{
            navigate("/false")
        }
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
        verifyPayment();
        },1500)
    },[])
  return (
    <div className='verify'>
        <div className="verify-spinner"></div>
    </div>
  )
}

export default Verify