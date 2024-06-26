"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverHelper_1 = __importDefault(require("../../../../utils/serverHelper"));
const quizModel_1 = require("../../../../models/quizModel");
const mongoose_1 = require("mongoose");
function quizGetAllController(req, res) {
    // get data
    const classroomId = req.params.classroomId;
    (0, serverHelper_1.default)(async () => {
        const quizzes = await quizModel_1.quizModel.aggregate([
            {
                $match: {
                    classroom: new mongoose_1.Types.ObjectId(classroomId),
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
exports.default = quizGetAllController;
