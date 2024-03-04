"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => {
    return res.status(404).json({ error: `${req.originalUrl} is not found!` });
};
exports.default = notFound;
//# sourceMappingURL=notFount.js.map