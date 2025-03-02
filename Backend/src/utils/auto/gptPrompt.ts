export default function createGptPrompt(courseName: string, moduleName: string, className: string, question: string): string {
    const prompt = `The following is a question of an user that is taking the course ${courseName}, in the module ${moduleName}, in the class ${className}. The question is: ${question}. Please provide an answer to this question in the same language that the question was asked. The answer should be clear and concise, and should provide all the information that the user needs to understand the topic.`;
    return prompt;
}
