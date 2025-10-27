import mongoose from "mongoose"

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://Thuan:12112004@cluster0.gk5tol5.mongodb.net/food-del').then(()=> console.log("DB Connected"))
}