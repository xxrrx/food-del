import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatVND } from '../../utils/formatCurrency'

const Home = ({url}) => {
  const [orders, setOrders] = useState([])
  const [foodList, setFoodList] = useState([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0
  })

  const fetchOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list")
      if (response.data.success) {
        console.log("Orders data:", response.data.data)
        setOrders(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error("Lỗi khi tải đơn hàng")
    }
  }

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list")
      if (response.data.success) {
        console.log("Food list:", response.data.data.length, "products")
        setFoodList(response.data.data)
      }
    } catch (error) {
      toast.error("Lỗi khi tải sản phẩm")
    }
  }

  const calculateStats = (orderData, productList) => {
    // Tính tổng doanh thu từ tất cả đơn hàng đã thanh toán
    const totalRevenue = orderData.reduce((sum, order) => {
      if (order.payment === true) {
        return sum + (order.amount || 0)
      }
      return sum
    }, 0)
    
    const totalOrders = orderData.length
    const pendingOrders = orderData.filter(order => order.status === "Food Processing").length
    
    console.log("Calculating stats - Products:", productList.length)
    
    setStats({
      totalRevenue,
      totalOrders,
      totalProducts: productList.length,
      pendingOrders
    })
  }

  const getRevenueByMonth = () => {
    const monthlyRevenue = {}
    orders.forEach(order => {
      if (order.payment === true) {
        try {
          const date = new Date(order.date)
          const month = date.toLocaleString('vi-VN', { month: 'short', year: 'numeric' })
          monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (order.amount || 0)
        } catch (error) {
          console.error("Error parsing date:", order.date, error)
        }
      }
    })
    console.log("Monthly revenue:", monthlyRevenue)
    return monthlyRevenue
  }

  const getTopProducts = () => {
    const productSales = {}
    orders.forEach(order => {
      if (order.payment === true && order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const itemName = item.name || 'Unknown'
          if (!productSales[itemName]) {
            productSales[itemName] = { quantity: 0, revenue: 0 }
          }
          const quantity = item.quantity || 0
          const price = item.price || 0
          productSales[itemName].quantity += quantity
          productSales[itemName].revenue += price * quantity
        })
      }
    })
    
    console.log("Product sales:", productSales)
    
    const sortedProducts = Object.entries(productSales)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 5)
    
    console.log("Top products:", sortedProducts)
    return sortedProducts
  }

  useEffect(() => {
    fetchOrders()
    fetchFoodList()
  }, [])

  useEffect(() => {
    calculateStats(orders, foodList)
  }, [orders, foodList])

  const monthlyRevenue = getRevenueByMonth()
  const topProducts = getTopProducts()
  const maxRevenue = Math.max(...Object.values(monthlyRevenue), 1)

  return (
    <div className='home-page'>
      <h2>Tổng quan</h2>
      
      <div className="stats-grid">
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Tổng doanh thu</h3>
            <p className="stat-value">{formatVND(stats.totalRevenue)} VNĐ</p>
          </div>
        </div>
        
        <div className="stat-card orders">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Tổng đơn hàng</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
        </div>
        
        <div className="stat-card products">
          <div className="stat-icon">🍔</div>
          <div className="stat-info">
            <h3>Tổng sản phẩm</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Đơn chờ xử lý</h3>
            <p className="stat-value">{stats.pendingOrders}</p>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Doanh thu theo tháng</h3>
          <div className="bar-chart">
            {Object.keys(monthlyRevenue).length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888', margin: 'auto' }}>
                Chưa có dữ liệu doanh thu
              </p>
            ) : (
              Object.entries(monthlyRevenue).map(([month, revenue]) => (
                <div key={month} className="bar-item">
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ height: `${(revenue / maxRevenue) * 100}%` }}
                    ></div>
                  </div>
                  <span className="bar-label">{month}</span>
                  <span className="bar-value">{formatVND(revenue)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="chart-box">
          <h3>Top 5 sản phẩm bán chạy</h3>
          <div className="top-products">
            {topProducts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
                Chưa có dữ liệu sản phẩm
              </p>
            ) : (
              topProducts.map(([name, data], index) => (
                <div key={name} className="product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <div className="product-details">
                    <p className="product-name">{name}</p>
                    <p className="product-stats">
                      Số lượng: {data.quantity} | Doanh thu: {formatVND(data.revenue)} VNĐ
                    </p>
                  </div>
                  <div 
                    className="product-bar" 
                    style={{ width: `${topProducts[0] ? (data.revenue / topProducts[0][1].revenue) * 100 : 0}%` }}
                  ></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Đơn hàng gần đây</h3>
        <div className="orders-table">
          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
              Chưa có đơn hàng nào
            </p>
          ) : (
            <>
              <div className="table-header">
                <span>Khách hàng</span>
                <span>Sản phẩm</span>
                <span>Số tiền</span>
                <span>Trạng thái</span>
              </div>
              {orders.slice(0, 5).map((order) => (
                <div key={order._id} className="table-row">
                  <span>{order.address?.firstName || ''} {order.address?.lastName || ''}</span>
                  <span>{order.items?.length || 0} món</span>
                  <span>{formatVND(order.amount || 0)} VNĐ</span>
                  <span className={`status ${order.status.toLowerCase().replace(/\s/g, '-')}`}>
                    {order.status === "Food Processing" ? "Đang xử lý" :
                     order.status === "Out for delivery" ? "Đang giao" : "Đã giao"}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home