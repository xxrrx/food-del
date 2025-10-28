import express from 'express'
import { addToCard,removeFromCart,getCart}  from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCard)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter;