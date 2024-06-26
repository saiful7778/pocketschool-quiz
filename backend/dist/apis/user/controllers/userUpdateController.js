import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { userModel } from "../../../models/userModel";
import devDebug from "../../../utils/devDebug";
export default function userUpdateController(req, res) {
    const userId = req.params.userId;
    const superAdminUserId = req.userId;
    const { role, access } = req.body;
    // check if requested user don't update her account data
    if (superAdminUserId.toString() === userId) {
        res.status(400).json({
            success: false,
            message: "You can't update your role or access",
        });
        devDebug("You can't update your role or access");
        return;
    }
    // check is all data available or not
    const check = inputCheck([role, access], res);
    if (!check)
        return;
    serverHelper(async () => {
        // update user data based on her userId
        const user = await userModel.updateOne({ _id: userId }, { role, access });
        // send response
        res.status(200).json({
            success: true,
            data: user,
        });
    }, res);
}
