import React, { useState, useEffect } from 'react'
import './EditPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const EditPopup = ({ setEdit, food, fetchList, url }) => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Pizza",
  })

  useEffect(() => {
    if (food) {
      setData({
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category,
      })
      setImage(false)
      console.log(food);
      
    }
  }, [food])

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData()
      formData.append("id", food._id)
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("price", Number(data.price))
      formData.append("category", data.category)
      if (image && image instanceof File) {
        formData.append("image", image)
      }
      const response = await axios.post(`${url}/api/food/update`, formData)
      if (response.data.success) {
        toast.success('Đã cập nhật sản phẩm thành công')
        setEdit(null)
        if (typeof fetchList === 'function') await fetchList()
      } else {
        toast.error('Cập nhật thất bại')
      }
    } catch (err) {
      console.error(err)
      toast.error('Lỗi khi cập nhật')
    }
  }

  const overlayClick = (e) => {
    if (e.target.className === 'edit-popup') setEdit(null)
  }

  return (
    <div className='edit-popup' onClick={overlayClick}>
      <form className='edit-popup-containter' onSubmit={onSubmitHandler}>
        <div>
          <p>Tải hình ảnh lên</p>
          <label htmlFor='image'>
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : food && food.image
                  ? `${url}/images/${food.image}`
                  : assets.upload_area
              }
              alt=''
            />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
        </div>

        <div>
          <p>Tên sản phẩm</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            placeholder='Nhập tên sản phẩm'
            required
          />
        </div>

        <div>
          <p>Mô tả sản phẩm</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows='6'
            placeholder='Nhập mô tả sản phẩm'
            required
          ></textarea>
        </div>

        <div>
          <div>
            <p>Danh mục sản phẩm</p>
            <select onChange={onChangeHandler} name='category' value={data.category}>
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

          <div>
            <p>Giá sản phẩm</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type='number'
              name='price'
              placeholder='20000'
              required
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button type='submit'>Cập nhật</button>
        </div>
      </form>
    </div>
  )
}

export default EditPopup