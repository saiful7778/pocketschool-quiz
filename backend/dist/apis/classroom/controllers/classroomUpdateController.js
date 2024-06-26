import inputCheck from "../../../utils/inputCheck";
import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroomModel";
import { Types } from "mongoose";
export default function classroomUpdateController(req, res) {
    // get data
    const classroomId = req.params.classroomId;
    const userId = req.query.userId;
    const { title } = req.body;
    const check = inputCheck([title], res);
    if (!check)
        return;
    serverHelper(async () => {
        const classroom = await classroomModel.updateOne({
            _id: new Types.ObjectId(classroomId),
            "admins.userId": userId,
            "admins.access": true,
        }, { title });
        res.status(200).json({
            success: true,
            data: classroom,
        });
    }, res);
}
