import serverHelper from "../../../../utils/serverHelper";
import { questionModel, quizModel } from "../../../../models/quizModel";
import devDebug from "../../../../utils/devDebug";
import { Types } from "mongoose";
export default function quizUpdateController(req, res) {
    const quizId = req.params.quizId;
    const { title, startTime, questions } = req.body;
    if (!Array.isArray(questions)) {
        res.status(400).send({
            success: false,
            message: "Questions must be an array",
        });
        devDebug("invalid questions");
        return;
    }
    if (questions.length === 0) {
        res.status(400).send({
            success: false,
            message: "Questions array is empty",
        });
        devDebug("question array in empty");
        return;
    }
    const isQuestionsAvailable = questions.map((question) => {
        if (!question?.questionType ||
            !question?.questionText ||
            !question?.timeLimit ||
            !question?.marks) {
            return undefined;
        }
        return question;
    });
    if (isQuestionsAvailable.includes(undefined)) {
        res.status(400).send({
            success: false,
            message: "Question data not available",
        });
        devDebug("invalid question data");
        return;
    }
    serverHelper(async () => {
        const quizData = (await quizModel.findOne({ _id: quizId }, { questions: 1 }));
        const questionIds = await questionPromises(questions, quizData.questions);
        const quiz = await quizModel.updateOne({
            _id: quizId,
        }, {
            title,
            startTime,
            questions: questionIds,
        });
        res.status(200).send({ success: true, data: quiz });
    }, res);
}
async function questionPromises(questions, quizQuestions) {
    const allPromises = [];
    const ids = [];
    const deleteAbleQuestions = quizQuestions.filter((questionId) => questions.find((question) => String(questionId) !== question?._id)
        ? true
        : false);
    if (deleteAbleQuestions.length > 0) {
        allPromises.push(...deleteAbleQuestions.map((deleteQuestion) => questionModel.deleteOne({ _id: deleteQuestion })));
    }
    // const updateAbleQuestions = quizQuestions
    //   .map((quizQuestion) => String(quizQuestion))
    //   .filter((questionId) =>
    //     questions.find((question) => String(questionId) === question?._id) ? true : false
    //   );
    allPromises.push(...questions.map((question) => {
        // if (updateAbleQuestions.includes(question?._id as string)) {
        if (question?._id) {
            const { _id, ...questionData } = question;
            ids.push(_id);
            return questionModel.updateOne({ _id: new Types.ObjectId(_id) }, { ...questionData });
        }
        else {
            const newQuestionId = new Types.ObjectId();
            ids.push(String(newQuestionId));
            return questionModel.create({ _id: newQuestionId, ...question });
        }
    }));
    await Promise.all(allPromises);
    return ids;
}
