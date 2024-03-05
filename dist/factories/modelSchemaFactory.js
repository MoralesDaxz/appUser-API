"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelSchemaFactory = (middlewares) => {
    return (req, res, next) => {
        middlewares.forEach((middleware) => {
            middleware(req, res, next);
        });
    };
};
exports.default = modelSchemaFactory;
