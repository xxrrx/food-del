import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({ url }) => {

  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Pizza",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSumbitHandler = async (event) => {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Pizza",
      })
      setImage(false)
      toast.success("Đã thêm sản phẩm thành công")
    }
    else {
      toast.error("Lỗi khi thêm sản phẩm")
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSumbitHandler}>
        <div className="add-image-upload flex-col">
          <p>Tải hình ảnh lên</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Tên sản phẩm</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Nhập tên sản phẩm' />
        </div>
        <div className="add-product-description flex-col">
          <p>Mô tả sản phẩm</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Nhập mô tả sản phẩm'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Danh mục sản phẩm</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Pizza">Pizza</option>
              <option value="Chicken">Gà</option>
              <option value="Dessert">Tráng miệng</option>
              <option value="Drink">Đồ uống</option>
              <option value="Rice Dishe">Cơm</option>
              <option value="Fast Food">Đồ ăn nhanh</option>
              <option value="Slow Food">Đồ ăn chậm</option>
              <option value="Drinking Food">Đồ ăn nhậu</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Giá sản phẩm</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='100.000 VNĐ' />
          </div>
        </div>
        <button type='submit' className='add-button'>THÊM SẢN PHẨM</button>
      </form>
    </div>
  )
}

export default Add