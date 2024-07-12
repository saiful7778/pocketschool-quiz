export type questionType =
  | "multipleOption"
  | "multipleAnswer"
  | "textAnswer"
  | "pinPointAnswer";

interface QuestionBase {
  _id: string;
  mark: number;
  title: string;
  questionType: questionType;
  timeLimit: number;
  mark: number;
}

type Option = {
  text: string;
};

export interface MultipleOption extends QuestionBase {
  correctAnswerIndex: number;
  options: Option[];
}

export interface MultipleAnswer extends QuestionBase {
  correctAnswerIndices: number[];
  options: Option[];
}

export interface TextAnswer extends QuestionBase {
  correctAnswer: string;
}

export interface PinPointAnswer extends QuestionBase {
  correctPinPointAnswer: {
    x: string;
    y: string;
  };
}

export type Question =
  | MultipleOption
  | MultipleAnswer
  | TextAnswer
  | PinPointAnswer;

export type AnswerType =
  | "multipleOptionAnswer"
  | "multipleAnswerAnswer"
  | "textAnswerAnswer"
  | "pinPointAnswerAnswer";

interface Answerbase {
  _id: string;
  mark: number;
  isCorrect: boolean;
  question: Question;
  answerType: AnswerType;
}

export interface MultipleOptionAnswer extends Answerbase {
  answerIndex: number;
}

export interface MultipleAnswerAnswer extends Answerbase {
  answerIndices: number[];
}

export interface TextAnswerAnswer extends Answerbase {
  answer: string;
}

export type Answers =
  | MultipleOptionAnswer
  | MultipleAnswerAnswer
  | TextAnswerAnswer;

export interface Result {
  _id: string;
  totalAnswers: number;
  totalMarks: number;
  quiz: string;
  answers: Answers[];
}
