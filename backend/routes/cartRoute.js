import express from 'express'
import { addToCard,removeFromCart,getCart, removeAll}  from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCard)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)
cartRouter.post("/removeAll",authMiddleware,removeAll)

export default cartRouter;