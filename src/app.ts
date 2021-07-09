import express, {Application, Request, Response, NextFunction} from "express";

import cors from "cors";
import "reflect-metadata";

import postRoutes from "./routes/posts"

const app: Application = express();

app.use('/posts', postRoutes)

app.use(cors());


app.get("/",(req: Request, res: Response)=>{
// function logType(target: any, key: string) {
//     let t = Reflect.getMetadata('design:type', target, key);
//     console.log(`${key} type: ${t.name}`)
// }
//     class Demo {
//     @logType
//     private attr: string = '3';
// }
    res.send("Hello")
})

const PORT = process.env.PORT || 5001
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))