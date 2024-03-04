"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = require("../../controllers/message");
const checkIsLoggedIn_1 = __importDefault(require("../../middlewares/checkIsLoggedIn"));
const message_2 = __importDefault(require("../../validations/message"));
const isAdmin_1 = __importDefault(require("../../middlewares/isAdmin"));
const messageRouter = (0, express_1.Router)();
// Create a new message
messageRouter.post("/", message_2.default, message_1.createMessage);
// Get all messages
messageRouter.get("/", checkIsLoggedIn_1.default, isAdmin_1.default, message_1.getAllMessages);
// get single message
messageRouter.get("/:id", checkIsLoggedIn_1.default, message_1.getSingleMessage);
// Delete a message by ID
messageRouter.delete("/:id", checkIsLoggedIn_1.default, isAdmin_1.default, message_1.deleteMessage);
exports.default = messageRouter;
//# sourceMappingURL=message.routes.js.map