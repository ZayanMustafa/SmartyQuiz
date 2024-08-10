interface Question {
    question: string;
    choices: string[];
    correctAnswer: number;
}

const questions: Question[] = [
    {
        question: "What does HTML stand for?",
        choices: [
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hypertext Markup Language",
        ],
        correctAnswer: 2 // Correct answer is "Hypertext Markup Language"
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        choices: [
            "var colors = 'red', 'green', 'blue'",
            "var colors = ['red', 'green', 'blue']",
            "var colors = (1:'red', 2:'green', 3:'blue')"
        ],
        correctAnswer: 1 // Correct answer is "var colors = ['red', 'green', 'blue']"
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        choices: [
            "<style>",
            "<script>",
            "<css>",
            "<link>"
        ],
        correctAnswer: 0 // Correct answer is "<style>"
    },
    {
        question: "How do you declare a variable in TypeScript?",
        choices: [
            "var name;",
            "let name;",
            "const name;",
            "All of the above"
        ],
        correctAnswer: 3 // Correct answer is "All of the above"
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        choices: [
            "Refers to the previous object",
            "Refers to the current object",
            "Refers to a global object",
            "None of the above"
        ],
        correctAnswer: 1 // Correct answer is "Refers to the current object"
    },
    {
        question: "Which CSS property controls the text size?",
        choices: [
            "font-size",
            "text-size",
            "font-style",
            "text-style"
        ],
        correctAnswer: 0 // Correct answer is "font-size"
    },
    {
        question: "What does the '==' operator do in JavaScript?",
        choices: [
            "Checks for equality of type",
            "Checks for both value and type equality",
            "None of the above",
            "Checks for equality  of value",
        ],
        correctAnswer: 3 // Correct answer is "Checks for equality of value"
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        choices: [
            "pop()",
            "push()",
            "shift()",
            "unshift()"
        ],
        correctAnswer: 1 // Correct answer is "push()"
    },
    {
        question: "What is the default value of a Boolean variable in JavaScript?",
        choices: [
            "true",
            "null",
            "undefined",
            "false"
        ],
        correctAnswer: 3 // Correct answer is "false"
    },
    {
        question: "How can you make a function private in JavaScript?",
        choices: [
            "By using the 'private' keyword",
            "By using closures",
            "By declaring it inside another function",
            "By using 'const' keyword"
        ],
        correctAnswer: 1 // Correct answer is "By using closures"
    }
];


let currentQuestionIndex = 0;
let answers: number[] = [];

function renderQuestion(index: number) {
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer && index < questions.length) {
        quizContainer.innerHTML = ''; // Clear previous question

        const q = questions[index];
        const questionElement = document.createElement('div');
        questionElement.classList.add('mb-3');

        const questionTitle = document.createElement('h5');
        questionTitle.textContent = `Q${index + 1}: ${q.question}`;
        questionElement.appendChild(questionTitle);

        q.choices.forEach((choice, choiceIndex) => {
            const choiceElement = document.createElement('div');
            choiceElement.classList.add('form-check');

            const inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.name = `question${index}`;
            inputElement.value = choiceIndex.toString();
            inputElement.classList.add('form-check-input');
            choiceElement.appendChild(inputElement);

            const labelElement = document.createElement('label');
            labelElement.classList.add('form-check-label');
            labelElement.textContent = choice;
            choiceElement.appendChild(labelElement);

            questionElement.appendChild(choiceElement);
        });

        quizContainer.appendChild(questionElement);
    }
}

function showNextQuestion() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`) as HTMLInputElement;
    if (selectedOption) {
        answers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion(currentQuestionIndex);
        if (currentQuestionIndex === questions.length - 1) {
            document.getElementById('next-btn')?.classList.add('d-none');
            document.getElementById('submit-btn')?.classList.remove('d-none');
        }
    } else {
        showResult();
    }
}

function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        if (answers[index] === q.correctAnswer) {
            score++;
        }
    });
    return score;
}

function showResult() {
    const score = calculateScore();
    const resultContainer = document.getElementById('result');

    if (resultContainer) {
        resultContainer.innerHTML = '';

        const percentage = (score / questions.length) * 100;

        if (percentage >= 70) {
            resultContainer.textContent = `Congratulations! You passed the quiz with a score of ${score}/${questions.length} (${percentage.toFixed(2)}%).`;
            resultContainer.classList.add('alert', 'alert-success');
        } else {
            resultContainer.textContent = `Sorry, you failed the quiz. Your score is ${score}/${questions.length} (${percentage.toFixed(2)}%).`;
            resultContainer.classList.add('alert', 'alert-danger');
        }
    }
}


document.getElementById('next-btn')?.addEventListener('click', showNextQuestion);
document.getElementById('submit-btn')?.addEventListener('click', () => {
    showResult();
    (document.getElementById('submit-btn') as HTMLButtonElement).classList.add('d-none');
});

document.addEventListener('DOMContentLoaded', () => {
    renderQuestion(currentQuestionIndex);
});
