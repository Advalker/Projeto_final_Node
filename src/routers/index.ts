import { Router } from "express";
import healthRouter from './health.router';
import userRouter from './user.router';
import productRouter from './product.router'

const router = Router();

router.use('/health', healthRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);

export default router;