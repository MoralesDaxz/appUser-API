"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.admin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.admin = firebase_admin_1.default;
const app_1 = require("firebase-admin/app");
if (process.env.NODE_ENV !== "production") {
    try {
        const serviceAccount = require("../../serviceAccount.json");
        (0, app_1.initializeApp)({
            credential: (0, app_1.cert)(serviceAccount),
        });
    }
    catch (e) {
        console.log(e);
    }
}
else {
    (0, app_1.initializeApp)({
        credential: (0, app_1.applicationDefault)(),
    });
}
const db = firebase_admin_1.default.firestore();
exports.db = db;
