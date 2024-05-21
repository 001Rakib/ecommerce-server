import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/products/products.routes";
import { OrderRoutes } from "./app/modules/orders/order.routes";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//for not found route
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route is not found",
  });
});

export default app;
