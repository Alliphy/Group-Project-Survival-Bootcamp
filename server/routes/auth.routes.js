import { Router } from "express";
// import all routes
import authRoutes from "./auth.routes";

const appRouter = Router();
appRouter.use("/api/auth", authRoutes);

// attach to appRouter

export default appRouter;
