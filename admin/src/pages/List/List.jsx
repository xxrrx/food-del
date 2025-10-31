import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { data } from 'react-router-dom';
import { assets } from '../../assets/assets';
import EditPopup from '../../components/EditPopup/EditPopup';
const List = ({url}) => {
  
  const[list,setList] = useState([]);
  const[searchValue,setSearchValue] = useState("")
  const[edit,setEdit] = useState(null);

  const handleInput = (event) => {
    setSearchValue(event.target.value);
  }

  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])
  return (
  <>
    {edit ? <EditPopup setEdit={setEdit} food={edit} fetchList={fetchList} url={url} /> : null}
    <div className='list add flex-col'>
      <div className="search-item">
        <input value={searchValue} onChange={handleInput} type="text" placeholder='Search'/>
        <img src={assets.search_icon} alt="Search" />
      </div>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Remove</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          if(item.name.toLowerCase().includes(searchValue.trim().toLowerCase())){
            return(
              <div key={index} className="list-table-format"> 
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
                <p className='edit-btn' onClick={() => {setEdit(item)}}>Edit</p>
              </div>
            )
          }
        })}
      </div>
    </div>
  </>
  )
}

export default List