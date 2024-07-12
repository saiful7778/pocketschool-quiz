export const USER_KEY = ["users"];

export function QUIZZES_KEY(classroomId: string) {
  return ["quizzes", "admin", { classroomId }];
}
