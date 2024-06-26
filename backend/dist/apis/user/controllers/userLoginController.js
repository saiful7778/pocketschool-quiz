import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { userModel } from "../../../models/userModel";
import devDebug from "../../../utils/devDebug";
import getEnv from "../../../utils/env";
import { sign } from "jsonwebtoken";
export default function userLoginController(req, res) {
    // extract data
    const { email } = req.body;
    // validate data
    const check = inputCheck([email], res);
    if (!check)
        return;
    serverHelper(async () => {
        // get user data using user mongoose model and schema also get only _id, role, uid, access data
        const user = await userModel.findOne({ email }, {
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
            devDebug("User doesn't exist");
            return;
        }
        // check if user have access right of this web app
        if (!user.access) {
            res.status(400).json({
                success: false,
                message: "User can't access this site",
            });
            devDebug("User can't access this site");
            return;
        }
        // create a new token with this payload
        const token = sign({
            id: user.id,
            email: email,
            role: user.role,
            uid: user.uid,
        }, getEnv("accessToken"), {
            expiresIn: "5h",
        });
        devDebug("new token in generated");
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
