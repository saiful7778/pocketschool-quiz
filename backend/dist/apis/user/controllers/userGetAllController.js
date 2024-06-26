"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const userModel_1 = require("../../../models/userModel");
function userGetAllController(_req, res) {
    (0, serverHelper_1.default)(async () => {
        // get all user account data without __v
        const users = await userModel_1.userModel.find({}, { __v: 0 });
        // send all user data
        res.status(200).send({ success: true, data: users });
    }, res);
}
exports.default = userGetAllController;
