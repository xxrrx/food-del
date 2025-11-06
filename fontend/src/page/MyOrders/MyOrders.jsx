import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { formatVND } from '../../utils/formatCurrency';

const MyOrders = () => {

  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const getStatusText = (status) => {
    const statusMap = {
      "Food Processing": "Đang xử lý",
      "Out for delivery": "Đang giao hàng",
      "Delivered": "Đã giao hàng"
    }
    return statusMap[status] || status;
  }

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>Đơn hàng của tôi</h2>
      <div className="container">
        {
          data.length === 0 ? (
            <p className="no-orders">Bạn chưa có đơn hàng nào.</p>
          ) : (
            data.map((order, index) => {
              return (
                <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="Parcel Icon" />
                  <p>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p>Tổng tiền: {formatVND(order.amount)} VNĐ</p>
                  <p>Số lượng món: {order.items.length}</p>
                  <p><span>&#x25cf;</span><b> Trạng thái: {getStatusText(order.status)}</b></p>
                  <button onClick={fetchOrders}>Theo dõi đơn hàng</button>
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default MyOrders
