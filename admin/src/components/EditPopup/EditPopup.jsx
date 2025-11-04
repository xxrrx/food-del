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
    category:"Drinking Food",
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
        toast.success(response.data.message || 'Updated')
        setEdit(null)
        if (typeof fetchList === 'function') await fetchList()
      } else {
        toast.error(response.data.message || 'Update failed')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error while updating')
    }
  }

  const overlayClick = (e) => {
    if (e.target.className === 'edit-popup') setEdit(null)
  }

  return (
    <div className='edit-popup' onClick={overlayClick}>
      <form className='edit-popup-containter' onSubmit={onSubmitHandler}>
        <div>
          <p>Upload Image</p>
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
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            placeholder='Type here'
            required
          />
        </div>

        <div>
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows='6'
            placeholder='Write content here'
            required
          ></textarea>
        </div>

        <div>
          <div>
            <p>Product category</p>
            <select onChange={onChangeHandler} name='category' value={data.category}>
              <option value="Drinking Food">Drinking Food</option>
              <option value="Rice Dishes">Rice Dishes</option>
              <option value="Beverages">Beverages</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Slow Food">Slow Food</option>
            </select>
          </div>

          <div>
            <p>Product price</p>
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
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default EditPopup