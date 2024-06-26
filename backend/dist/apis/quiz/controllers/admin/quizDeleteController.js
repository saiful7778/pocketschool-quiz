import serverHelper from "../../../../utils/serverHelper";
import { quizModel } from "../../../../models/quizModel";
export default function quizDeleteController(req, res) {
    // get data
    const quizId = req.params.quizId;
    serverHelper(async () => {
        const quiz = await quizModel.findOneAndDelete({ _id: quizId });
        res.status(200).send({ success: true, data: quiz });
    }, res);
}
