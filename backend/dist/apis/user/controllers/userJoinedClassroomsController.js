import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroomModel";
export default function userJoinedClassroomsController(req, res) {
    const { userId } = req.user;
    serverHelper(async () => {
        const classrooms = await classroomModel.find({
            $or: [
                { "admins.userId": userId, "admins.access": true },
                { "users.userId": userId, "users.access": true },
            ],
        }, { title: 1 });
        res.status(200).json({ success: true, data: classrooms });
    }, res);
}
