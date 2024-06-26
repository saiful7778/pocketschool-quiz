import serverHelper from "../../../../utils/serverHelper";
import { quizModel } from "../../../../models/quizModel";
import { Types } from "mongoose";
export default function quizGetAllController(req, res) {
    // get data
    const classroomId = req.params.classroomId;
    serverHelper(async () => {
        const quizzes = await quizModel.aggregate([
            {
                $match: {
                    classroom: new Types.ObjectId(classroomId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author",
                    pipeline: [
                        {
                            $project: {
                                fullName: 1,
                                email: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: "$author",
            },
            {
                $addFields: {
                    questionsCount: { $size: "$questions" },
                },
            },
            {
                $project: {
                    classroom: 0,
                    __v: 0,
                    questions: 0,
                },
            },
        ]);
        res.status(200).send({
            success: true,
            data: quizzes,
        });
    }, res);
}
