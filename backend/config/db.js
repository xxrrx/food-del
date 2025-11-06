import mongoose from "mongoose"

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://Thuan:12112004@cluster0.0281ihc.mongodb.net/food-del=Cluster0').then(()=> console.log("DB Connected"))
}