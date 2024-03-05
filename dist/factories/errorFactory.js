"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFactory = void 0;
const errorFactory = (options, status) => {
    console.log(options);
    const errorResponse = {
        status: status || 500,
        error: options || 'Unknown error'
    };
    return errorResponse;
};
exports.errorFactory = errorFactory;
