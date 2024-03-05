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
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../helpers/types");
// a middleware to protect routes that needs a user to be logged in and is admin
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user)
                return res.status(401).json({ message: "You need to sign in" });
            if (req.user.role !== types_1.Roles.admin)
                return res.status(403).json({ message: "Only admin is allowed" });
            return next();
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.default = isAdmin;
//# sourceMappingURL=isAdmin.js.map