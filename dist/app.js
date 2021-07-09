"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const posts_1 = __importDefault(require("./routes/posts"));
const app = express_1.default();
app.use('/posts', posts_1.default);
app.use(cors_1.default());
app.get("/", (req, res) => {
    // function logType(target: any, key: string) {
    //     let t = Reflect.getMetadata('design:type', target, key);
    //     console.log(`${key} type: ${t.name}`)
    // }
    //     class Demo {
    //     @logType
    //     private attr: string = '3';
    // }
    res.send("Hello");
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
