"use strict";
var _a, _b;
var questions = [
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
var currentQuestionIndex = 0;
var answers = [];
function renderQuestion(index) {
    var quizContainer = document.getElementById('quiz-container');
    if (quizContainer && index < questions.length) {
        quizContainer.innerHTML = ''; // Clear previous question
        var q = questions[index];
        var questionElement_1 = document.createElement('div');
        questionElement_1.classList.add('mb-3');
        var questionTitle = document.createElement('h5');
        questionTitle.textContent = "Q".concat(index + 1, ": ").concat(q.question);
        questionElement_1.appendChild(questionTitle);
        q.choices.forEach(function (choice, choiceIndex) {
            var choiceElement = document.createElement('div');
            choiceElement.classList.add('form-check');
            var inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.name = "question".concat(index);
            inputElement.value = choiceIndex.toString();
            inputElement.classList.add('form-check-input');
            choiceElement.appendChild(inputElement);
            var labelElement = document.createElement('label');
            labelElement.classList.add('form-check-label');
            labelElement.textContent = choice;
            choiceElement.appendChild(labelElement);
            questionElement_1.appendChild(choiceElement);
        });
        quizContainer.appendChild(questionElement_1);
    }
}
function showNextQuestion() {
    var _a, _b;
    var selectedOption = document.querySelector("input[name=\"question".concat(currentQuestionIndex, "\"]:checked"));
    if (selectedOption) {
        answers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion(currentQuestionIndex);
        if (currentQuestionIndex === questions.length - 1) {
            (_a = document.getElementById('next-btn')) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
            (_b = document.getElementById('submit-btn')) === null || _b === void 0 ? void 0 : _b.classList.remove('d-none');
        }
    }
    else {
        showResult();
    }
}
function calculateScore() {
    var score = 0;
    questions.forEach(function (q, index) {
        if (answers[index] === q.correctAnswer) {
            score++;
        }
    });
    return score;
}
function showResult() {
    var score = calculateScore();
    var resultContainer = document.getElementById('result');
    if (resultContainer) {
        resultContainer.innerHTML = '';
        var percentage = (score / questions.length) * 100;
        if (percentage >= 70) {
            resultContainer.textContent = "Congratulations! You passed the quiz with a score of ".concat(score, "/").concat(questions.length, " (").concat(percentage.toFixed(2), "%).");
            resultContainer.classList.add('alert', 'alert-success');
        }
        else {
            resultContainer.textContent = "Sorry, you failed the quiz. Your score is ".concat(score, "/").concat(questions.length, " (").concat(percentage.toFixed(2), "%).");
            resultContainer.classList.add('alert', 'alert-danger');
        }
    }
}
(_a = document.getElementById('next-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', showNextQuestion);
(_b = document.getElementById('submit-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    showResult();
    document.getElementById('submit-btn').classList.add('d-none');
});
document.addEventListener('DOMContentLoaded', function () {
    renderQuestion(currentQuestionIndex);
});
