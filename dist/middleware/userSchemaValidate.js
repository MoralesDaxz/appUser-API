"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaValidateMW = void 0;
const entities_1 = require("../domain/entities");
const userSchemaValidateMW = async (req, res, next) => {
    try {
        await entities_1.userSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        res.status(500).json({ error: `One or more fields of the user schema are invalid.: ${error}` });
    }
};
exports.userSchemaValidateMW = userSchemaValidateMW;
