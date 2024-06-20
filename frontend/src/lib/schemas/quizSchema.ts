import * as z from "zod";

const optionSchema = z.object({
  text: z
    .string({ required_error: "Options is required" })
    .min(1, "Option is required"),
});

const baseQuestionSchema = z.object({
  questionText: z
    .string({ required_error: "Question is required" })
    .min(1, "Question is required"),
  timeLimit: z
    .number()
    .min(1, "Time limit must be at least 1 second")
    .max(120, "Time limit must be at most 120 seconds (2 minutes)"),
  marks: z
    .number()
    .min(1, "Marks must be at least 1")
    .max(100, "Marks must be at most 100"),
});

const multipleOptionQuestionSchema = baseQuestionSchema.extend({
  questionType: z.literal("multipleOption"),
  options: z
    .array(optionSchema)
    .min(2, "At least two options are required")
    .max(5, "At most five options are allowed"),
  correctAnswerIndex: z
    .number()
    .min(1, "Correct answer index must be at least 1")
    .max(5, "Correct answer index must be at most 5"),
});

const multipleAnswersQuestionSchema = baseQuestionSchema.extend({
  questionType: z.literal("multipleAnswers"),
  options: z
    .array(optionSchema)
    .min(2, "At least two options are required")
    .max(5, "At most five options are allowed"),
  correctAnswerIndices: z.array(
    z
      .number()
      .min(1, "Correct answer index must be at least 1")
      .max(5, "Correct answer index must be at most 5"),
  ),
});

const textAnswerQuestionSchema = baseQuestionSchema.extend({
  questionType: z.literal("textAnswer"),
  correctAnswer: z
    .string({ required_error: "Correct answer is required" })
    .min(1, "Correct answer is required")
    .max(100, "Correct answer must be at most 100 characters long"),
});

const numberAnswerQuestionSchema = baseQuestionSchema.extend({
  questionType: z.literal("pinPointerAnswer"),
  correctAnswer: z.number(),
});

const questionSchema = z.union([
  multipleOptionQuestionSchema,
  multipleAnswersQuestionSchema,
  textAnswerQuestionSchema,
  numberAnswerQuestionSchema,
]);

export const quizSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title must be at least 1 character long")
    .max(100, "Title must be at most 100 characters long"),
  startTime: z
    .string({ required_error: "Start time is required" })
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid date and time",
    }),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required")
    .max(50, "At most 50 questions are allowed"),
});
