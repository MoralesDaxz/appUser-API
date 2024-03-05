"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKsuid = void 0;
const ksuid_1 = __importDefault(require("ksuid"));
const generateKsuid = (prefix) => {
    const generatedKsuid = ksuid_1.default.randomSync(new Date());
    const idString = generatedKsuid.string;
    if (prefix) {
        return `${prefix}_${idString}`;
    }
    return idString;
};
exports.generateKsuid = generateKsuid;
