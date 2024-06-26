import serverHelper from "../../../utils/serverHelper";
import { classroomModel } from "../../../models/classroomModel";
import { Types } from "mongoose";
export default function classroomGetController(req, res) {
    // get data
    const classroomId = req.params.classroomId;
    const userId = req.query.userId;
    serverHelper(async () => {
        // get classroom data by mongodb aggregation pipeline
        const classroom = await classroomModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(classroomId),
                    // check if userId exist in this classroom admin or user array also her access should be true
                    $or: [
                        {
                            "admins.userId": new Types.ObjectId(userId),
                            "admins.access": true,
                        },
                        {
                            "users.userId": new Types.ObjectId(userId),
                            "users.access": true,
                        },
                    ],
                },
            },
            {
                // add a new role field of user in admin or user
                $addFields: {
                    role: {
                        $cond: {
                            if: { $in: [new Types.ObjectId(userId), "$admins.userId"] },
                            then: "admin",
                            else: {
                                $cond: {
                                    if: { $in: [new Types.ObjectId(userId), "$users.userId"] },
                                    then: "user",
                                    else: null,
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    admins: 0,
                    users: 0,
                    __v: 0,
                },
            },
        ]);
        if (!classroom || classroom.length === 0) {
            res.status(404).json({
                success: false,
                message: "Classroom not found",
            });
            return;
        }
        // send response
        res.status(200).json({
            success: true,
            data: classroom[0],
        });
    }, res);
}
