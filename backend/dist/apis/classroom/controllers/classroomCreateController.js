import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroomModel";
import devDebug from "../../../utils/devDebug";
export default function classroomCreateController(req, res) {
    // get data
    const admin = req.userId;
    const { title } = req.body;
    // check is all data available or not
    const check = inputCheck([title], res);
    if (!check)
        return;
    serverHelper(async () => {
        // create a new classroom using classroom mongoose model
        await classroomModel.create({
            title,
            admins: [{ userId: admin, access: true }],
        });
        devDebug("new classroom created");
        // send response data
        res.status(201).send({
            success: true,
            message: "classroom is created",
        });
    }, res);
}
