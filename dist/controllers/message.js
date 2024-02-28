"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.getSingleMessage = exports.createMessage = exports.getAllMessages = void 0;
const messageModel_1 = __importDefault(require("../model/messageModel"));
// get all messages controller
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMessages = yield messageModel_1.default.find();
        if (allMessages.length > 0) {
            return res.status(200).json(allMessages);
        }
        else {
            return res.status(404).json({ message: "No messages found in database" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllMessages = getAllMessages;
// create new message controller
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMessage = new messageModel_1.default(Object.assign({}, req.body));
        const saved = yield newMessage.save();
        return res.status(201).json({ message: "success", data: saved });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createMessage = createMessage;
// get single message controller
const getSingleMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const message = yield messageModel_1.default.findById(id);
        if (message) {
            return res.status(200).json({ message: "Message found", Message: message });
        }
        else {
            return res.status(404).json({ message: "Message not found or invalid user ID" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSingleMessage = getSingleMessage;
// Delete message controller
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedMessage = yield messageModel_1.default.findByIdAndDelete(id);
        if (deletedMessage) {
            return res.status(200).json({ message: "Message found and successfully deleted", deletedMessage });
        }
        else {
            return res.status(404).json({ message: "Message not found or invalid message ID and not deleted" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteMessage = deleteMessage;
//# sourceMappingURL=message.js.map