"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputCheck_1 = __importDefault(require("../../../utils/inputCheck"));
const serverHelper_1 = __importDefault(require("../../../utils/serverHelper"));
const userModel_1 = require("../../../models/userModel");
const devDebug_1 = __importDefault(require("../../../utils/devDebug"));
const env_1 = __importDefault(require("../../../utils/env"));
const jsonwebtoken_1 = require("jsonwebtoken");
function userLoginController(req, res) {
    // extract data
    const { email } = req.body;
    // validate data
    const check = (0, inputCheck_1.default)([email], res);
    if (!check)
        return;
    (0, serverHelper_1.default)(async () => {
        // get user data using user mongoose model and schema also get only _id, role, uid, access data
        const user = await userModel_1.userModel.findOne({ email }, {
            role: 1,
            uid: 1,
            access: 1,
        });
        // check is user exist ro not
        if (!user) {
            res.status(400).json({
                success: false,
                message: "User doesn't exist",
            });
            (0, devDebug_1.default)("User doesn't exist");
            return;
        }
        // check if user have access right of this web app
        if (!user.access) {
            res.status(400).json({
                success: false,
                message: "User can't access this site",
            });
            (0, devDebug_1.default)("User can't access this site");
            return;
        }
        // create a new token with this payload
        const token = (0, jsonwebtoken_1.sign)({
            id: user.id,
            email: email,
            role: user.role,
            uid: user.uid,
        }, (0, env_1.default)("accessToken"), {
            expiresIn: "5h",
        });
        (0, devDebug_1.default)("new token in generated");
        // send response
        res.status(200).json({
            success: true,
            data: {
                token,
                userData: { _id: user._id, role: user.role, uid: user.uid },
            },
        });
    }, res);
}
exports.default = userLoginController;
