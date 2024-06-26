import devDebug from "../utils/devDebug";
import { userModel } from "../models/userModel";
/**
 * This middleware take userId from request query key and verify is user exist or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns user Id and role by `req.user` `{userId: existUser._id, role: existUser.role}`
 */
export default async function verifyUserExist(req, res, next) {
    const { userId } = req.query;
    if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        devDebug("userId is unavailable");
        return;
    }
    try {
        const existUser = await userModel.findOne({ _id: userId }, { _id: 1, role: 1 });
        if (!existUser) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            devDebug("User doesn't exist");
            return;
        }
        req.user = { userId: existUser._id, role: existUser.role };
        next();
    }
    catch {
        res.status(401).json({ success: false, message: "Unauthorized" });
        devDebug("User query catch error in verifyUserID middleware");
        return;
    }
}
