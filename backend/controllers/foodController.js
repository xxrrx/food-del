import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item
const addFood = async(req,res)=>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const listFood = async(req,res)=> {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
}

const removeFood = async(req,res)=> {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const updateFood = async(req,res)=> {
    try {
        const food = await foodModel.findById(req.body.id);
        if(!food){
            return res.json({success:false,message:"Food not found"})
        }

        const updateData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
        }

        if(req.file){
            fs.unlink(`uploads/${food.image}`,()=>{})
            updateData.image = req.file.filename;
        }

        await foodModel.findByIdAndUpdate(req.body.id, updateData);
        res.json({success:true,message:"Food Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood,updateFood}