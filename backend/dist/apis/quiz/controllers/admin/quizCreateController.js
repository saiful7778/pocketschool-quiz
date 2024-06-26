import inputCheck from "../../../../utils/inputCheck";
import devDebug from "../../../../utils/devDebug";
import serverHelper from "../../../../utils/serverHelper";
// models
import { multipleAnswersQuestion, multipleOptionsQuestion, pinPointerAnswerQuestion, quizModel, textAnswerQuestion, } from "../../../../models/quizModel";
export default function quizCreateController(req, res) {
    // get data
    const { userId, classroomId } = req.query;
    const { title, questions, startTime } = req.body;
    // validate
    const check = inputCheck([title, questions, startTime], res);
    if (!check)
        return;
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
        const quizQuestions = await Promise.all(questions.map(async (question) => {
            switch (question.questionType) {
                case "multipleOption":
                    return multipleOptionsQuestion.create(question);
                case "multipleAnswers":
                    return multipleAnswersQuestion.create(question);
                case "textAnswer":
                    return textAnswerQuestion.create(question);
                case "pinPointerAnswer":
                    return pinPointerAnswerQuestion.create(question);
                default:
                    throw new Error("Invalid question type");
            }
        }));
        await quizModel.create({
            title,
            author: userId,
            classroom: classroomId,
            questions: quizQuestions.map((question) => question._id),
            startTime,
        });
        res.status(201).send({
            success: true,
            message: "Quiz is created",
        });
    }, res);
}
