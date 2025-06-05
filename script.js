document.addEventListener('DOMContentLoaded', () => {
    const quizQuestionElem = document.getElementById('quiz-question');
    const quizOptionsElem = document.getElementById('quiz-options');
    const quizFeedbackElem = document.getElementById('quiz-feedback');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    let currentQuestionIndex = 0;
    let quizActive = false; // To prevent multiple clicks

    // Sila 5 quiz questions (Question, Correct Sila Number)
    const silaQuizQuestions = [
        { question: "ການບໍ່ລັກສິ່ງຂອງຂອງຜູ້ອື່ນ ກົງກັບສິນຂໍ້ໃດ?", correctSila: 2 },
        { question: "ການບໍ່ຂ້າສັດຕ່າງໆ ກົງກັບສິນຂໍ້ໃດ?", correctSila: 1 },
        { question: "ການບໍ່ດື່ມເຫຼົ້າ ແລະ ສິ່ງມືນເມົາອື່ນໆ ກົງກັບສິນຂໍ້ໃດ?", correctSila: 5 },
        { question: "ການບໍ່ເວົ້າຕົວະ ຫຼື ຫຼອກລວງ ກົງກັບສິນຂໍ້ໃດ?", correctSila: 4 },
        { question: "ການບໍ່ປະພຶດຜິດໃນຄູ່ຄອງຂອງຕົນ ກົງກັບສິນຂໍ້ໃດ?", correctSila: 3 }
    ];

    function initializeQuiz() {
        currentQuestionIndex = 0;
        quizFeedbackElem.textContent = '';
        quizFeedbackElem.className = ''; // Clear previous feedback styling
        startQuizBtn.style.display = 'block';
        nextQuestionBtn.style.display = 'none';
        quizQuestionElem.textContent = 'ກົດປຸ່ມ "ເລີ່ມ Quiz" ເພື່ອເລີ່ມຕົ້ນ!';
        disableOptions(true); // Disable options initially
    }

    function displayQuestion() {
        if (currentQuestionIndex < silaQuizQuestions.length) {
            const question = silaQuizQuestions[currentQuestionIndex];
            quizQuestionElem.textContent = question.question;
            quizFeedbackElem.textContent = '';
            quizFeedbackElem.className = '';
            disableOptions(false); // Enable options for new question
            quizActive = true;
        } else {
            quizQuestionElem.textContent = 'ຈົບ Quiz ແລ້ວ! ຍິນດີດ້ວຍ!';
            quizOptionsElem.style.display = 'none';
            nextQuestionBtn.style.display = 'none';
            startQuizBtn.textContent = 'ເລີ່ມ Quiz ໃໝ່';
            startQuizBtn.style.display = 'block';
            quizActive = false;
        }
    }

    function handleAnswer(event) {
        if (!quizActive) return; // Prevent multiple clicks

        const selectedSila = parseInt(event.target.dataset.value);
        const correctSila = silaQuizQuestions[currentQuestionIndex].correctSila;

        disableOptions(true); // Disable options after selection
        quizActive = false; // Deactivate quiz for current question

        if (selectedSila === correctSila) {
            quizFeedbackElem.textContent = 'ຖືກຕ້ອງ!';
            quizFeedbackElem.classList.add('correct');
        } else {
            quizFeedbackElem.textContent = `ຜິດ! ຄໍາຕອບທີ່ຖືກຕ້ອງແມ່ນ ສິນຂໍ້ ${correctSila}.`;
            quizFeedbackElem.classList.add('incorrect');
        }

        if (currentQuestionIndex < silaQuizQuestions.length - 1) {
            nextQuestionBtn.style.display = 'block';
        } else {
            startQuizBtn.textContent = 'ເລີ່ມ Quiz ໃໝ່';
            startQuizBtn.style.display = 'block';
            nextQuestionBtn.style.display = 'none';
        }
    }

    function disableOptions(disabled) {
        Array.from(quizOptionsElem.children).forEach(button => {
            if (disabled) {
                button.classList.add('disabled');
                button.removeEventListener('click', handleAnswer);
            } else {
                button.classList.remove('disabled');
                button.addEventListener('click', handleAnswer);
            }
        });
    }

    // Event Listeners
    startQuizBtn.addEventListener('click', () => {
        currentQuestionIndex = 0; // Reset for a new quiz
        quizOptionsElem.style.display = 'block'; // Ensure options are visible
        startQuizBtn.style.display = 'none';
        displayQuestion();
    });

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        nextQuestionBtn.style.display = 'none';
        displayQuestion();
    });

    // Initialize the quiz when the page loads
    initializeQuiz();
});
