"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const userModel_1 = require("../../../models/userModel");
const devDebug_1 = __importDefault(require("../../../utils/devDebug"));
function userGetController(req, res) {
    const userId = req.params.userId;
    (0, serverHelper_1.default)(async () => {
        // find the user based on userId data and return only _id and role data
        const user = await userModel_1.userModel.findOne({ _id: userId }, {
            role: 1,
        });
        // check is user found or not
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            (0, devDebug_1.default)("User not found");
            return;
        }
        // send response
        res.status(200).json({
            success: true,
            data: user,
        });
    }, res);
}
exports.default = userGetController;
