"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputCheck_1 = __importDefault(require("../../../utils/inputCheck"));
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const userModel_1 = require("../../../models/userModel");
const devDebug_1 = __importDefault(require("../../../utils/devDebug"));
function userUpdateController(req, res) {
    const userId = req.params.userId;
    const superAdminUserId = req.userId;
    const { role, access } = req.body;
    // check if requested user don't update her account data
    if (superAdminUserId.toString() === userId) {
        res.status(400).json({
            success: false,
            message: "You can't update your role or access",
        });
        (0, devDebug_1.default)("You can't update your role or access");
        return;
    }
    // check is all data available or not
    const check = (0, inputCheck_1.default)([role, access], res);
    if (!check)
        return;
    (0, serverHelper_1.default)(async () => {
        // update user data based on her userId
        const user = await userModel_1.userModel.updateOne({ _id: userId }, { role, access });
        // send response
        res.status(200).json({
            success: true,
            data: user,
        });
    }, res);
}
exports.default = userUpdateController;
