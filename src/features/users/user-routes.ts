import { Router } from "express";
import userController from "./user-controller";
import errorHandler from "../../config/server/middlewares/error-handler-middle";

const userRouter = Router();

userRouter.post("/", errorHandler(userController.create));
userRouter.post("/:id/auth", errorHandler(userController.auth));

export default userRouter;