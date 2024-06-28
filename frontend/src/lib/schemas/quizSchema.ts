import * as z from "zod";

const optionSchema = z.object({
  text: z
    .string({ required_error: "Option is required" })
    .min(1, "Option is required"),
});

const baseQuestionSchema = z.object({
  _id: z.string().optional(),
  questionText: z
    .string({ required_error: "Question is required" })
    .min(1, "Question is required"),
  timeLimit: z
    .number({ required_error: "Time limit must be at least 1 second" })
    .min(1, "Time limit must be at least 1 second")
    .max(120, "Time limit must be at most 120 seconds (2 minutes)"),
  marks: z
    .number({ required_error: "Marks must be at least 1" })
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
    .number({ required_error: "Correct answer is required" })
    .min(1, "Correct answer index must be at least 1")
    .max(5, "Correct answer index must be at most 5"),
});

const multipleAnswerQuestionSchema = baseQuestionSchema.extend({
  questionType: z.literal("multipleAnswer"),
  options: z
    .array(optionSchema)
    .min(2, "At least two options are required")
    .max(5, "At most five options are allowed"),
  correctAnswerIndices: z.array(
    z
      .number({ required_error: "Correct answer Indices is required" })
      .min(1, "Correct answer Indices must be at least 1")
      .max(5, "Correct answer Indices must be at most 5"),
  ),
});

const textAnswerQuestionSchema = baseQuestionSchema.extend({
  questionType: z.literal("textAnswer"),
  correctAnswer: z
    .string({ required_error: "Correct answer is required" })
    .min(1, "Correct answer is required")
    .max(100, "Correct answer must be at most 100 characters long"),
});

const pinPointAnswerQuestionSchema = baseQuestionSchema.extend({
  questionType: z.literal("pinPointAnswer"),
  correctPinPointAnswer: z.object({
    x: z
      .number({ required_error: "x value is required" })
      .min(1, "x value is required")
      .max(800, "x value must be between 1px to 800px"),
    y: z
      .number({ required_error: "y value is required" })
      .min(1, "y value is required")
      .max(800, "y value must be between 1px to 800px"),
  }),
});

export const questionSchema = z.union([
  multipleOptionQuestionSchema,
  multipleAnswerQuestionSchema,
  textAnswerQuestionSchema,
  pinPointAnswerQuestionSchema,
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
