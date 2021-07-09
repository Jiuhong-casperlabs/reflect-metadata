"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("../controllers/posts"));
const router = express_1.default.Router();
// http://localhost:5001/posts
router.get("/", posts_1.default);
exports.default = router;
