"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
// Connect to MongoDB and start the server
mongoose_1.default.connect(process.env.MONGOSB_URL)
    .then(() => {
    app_1.default.listen(process.env.PORT, () => {
        console.log(`Successfully connected to the database, and the server is running on port ${process.env.PORT}`);
    });
})
    .catch((error) => {
    console.log(`Failed to connect to the database: ${error.message}`);
});
//# sourceMappingURL=index.js.map