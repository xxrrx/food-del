import mongoose from "mongoose"

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://hun:1007@cluster0.87pjst4.mongodb.net/food-del').then(()=> console.log("DB Connected"))
}