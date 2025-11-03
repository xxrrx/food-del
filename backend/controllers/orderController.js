import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { VnpLocale,ignoreLogger,ProductCode,dateFormat,VNPay } from "vnpay";

const placeOrder = async(req,res)=>{
    console.log("placeOrder req.body:", req.body);
    const frontend_url = 'http://localhost:5173'
    try {
        const newOrder  = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const vnpay  = new VNPay({
            tmnCode:'X46YN0AK',
            secureSecret:'39CIVLD2VYGF6BNWXO7ABBPQDWMF3K5G',
            vnpayHost:'https://sandbox.vnpayment.vn',
            testMode:true,
            hashAlgorithm:'SHA512',
            loggerFn:ignoreLogger
        })
        const session = await vnpay.buildPaymentUrl({
            vnp_TxnRef: newOrder._id.toString(),
            vnp_OrderInfo: `Thanh toán đơn hàng ${newOrder._id}`,
            vnp_Amount: Math.round(Number(newOrder.amount)),
            vnp_ReturnUrl: `${frontend_url}/verify?orderId=${newOrder._id}`,
            vnp_CreateDate: dateFormat(new Date(), 'yyyyMMddHHmmss'),
            vnp_IpAddr: req.ip,
            vnp_Locale:VnpLocale.VN,
            vnp_CurrCode: 'VND',
            vnp_ExpireDate: dateFormat(new Date(Date.now() + 15 * 60 * 1000), "yyyyMMddHHmmss"),
            vnp_ProductCode: ProductCode.FOOD,
        });

        return res.json({
            success: true,
            session_url:session
        });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
}
const verifyOrder = async (req,res)=>{
    const{orderId,success} = req.body;
    try {
        if (success=="00") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const  userOrders = async(req,res)=>{
    try {
        const orders  =await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {updateStatus,placeOrder,verifyOrder,userOrders,listOrders};