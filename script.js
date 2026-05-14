// Quiz Configuration
let quizConfig = {
    examType: 'mixed', // 'exam1', 'exam2', or 'mixed'
    timerEnabled: false,
    timerMinutes: 60,
    currentQuestions: []
};

// Quiz State
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let timerInterval = null;
let timeRemaining = 0;

// Load questions based on selection
function loadQuestions(examType) {
    let questions = [];
    
    // Convert short format to full format
    const convertQuestion = (q) => ({
        question: q.q,
        answers: q.a,
        correct: q.c
    });
    
    switch(examType) {
        case 'exam1':
            // All 60 questions from Exam 1
            questions = MOCK_EXAM_1.map(convertQuestion);
            break;
            
        case 'exam2':
            // All 60 questions from Exam 2
            questions = MOCK_EXAM_2.map(convertQuestion);
            break;
            
        case 'mixed':
            // 30 from Exam 1 + 30 from Exam 2
            const exam1Shuffled = shuffleArray([...MOCK_EXAM_1]);
            const exam2Shuffled = shuffleArray([...MOCK_EXAM_2]);
            questions = [
                ...exam1Shuffled.slice(0, 30),
                ...exam2Shuffled.slice(0, 30)
            ].map(convertQuestion);
            // Shuffle the combined set
            questions = shuffleArray(questions);
            break;
            
        case 'random':
            // 60 random questions from all 120
            const allQuestions = [...MOCK_EXAM_1, ...MOCK_EXAM_2];
            const shuffled = shuffleArray(allQuestions);
            questions = shuffled.slice(0, 60).map(convertQuestion);
            break;
    }
    
    return questions;
}

// Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize Quiz
function startQuiz() {
    console.log('startQuiz called');
    const examSelect = document.getElementById('exam-select');
    const timerCheckbox = document.getElementById('timer-enabled');
    
    console.log('Exam type:', examSelect.value);
    console.log('Timer enabled:', timerCheckbox.checked);
    
    quizConfig.examType = examSelect.value;
    quizConfig.timerEnabled = timerCheckbox.checked;
    
    // Load questions based on selection
    console.log('Loading questions...');
    quizConfig.currentQuestions = loadQuestions(quizConfig.examType);
    console.log('Questions loaded:', quizConfig.currentQuestions.length);
    
    currentQuestionIndex = 0;
    userAnswers = new Array(quizConfig.currentQuestions.length).fill(undefined);
    score = 0;
    
    // Show/hide timer display
    const timerDisplay = document.getElementById('timer-display');
    if (quizConfig.timerEnabled) {
        timerDisplay.style.display = 'block';
        startTimer();
    } else {
        timerDisplay.style.display = 'none';
    }
    
    console.log('Showing quiz screen...');
    showScreen('quiz-screen');
    console.log('Displaying questions...');
    displayAllQuestions();
    console.log('Quiz started successfully!');
}
    
    showScreen('quiz-screen');
    displayAllQuestions();


// Display All Questions at Once
function displayAllQuestions() {
    const container = document.getElementById('all-questions-container');
    const totalQuestionsSpan = document.getElementById('total-questions-quiz');
    
    container.innerHTML = '';
    totalQuestionsSpan.textContent = quizConfig.currentQuestions.length;
    
    const answerLabels = ['A', 'B', 'C', 'D'];
    
    quizConfig.currentQuestions.forEach((question, qIndex) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.id = `question-${qIndex}`;
        
        let html = `
            <div class="question-number">Question ${qIndex + 1}</div>
            <div class="question-text">${question.question}</div>
            <div class="answers-container">
        `;
        
        question.answers.forEach((answer, aIndex) => {
            const radioId = `q${qIndex}_a${aIndex}`;
            html += `
                <label class="answer-option" for="${radioId}">
                    <input type="radio" 
                           id="${radioId}" 
                           name="question_${qIndex}" 
                           value="${aIndex}"
                           onchange="selectAnswer(${qIndex}, ${aIndex})">
                    <span class="answer-letter">${answerLabels[aIndex]}.</span>
                    <span class="answer-label">${answer}</span>
                </label>
            `;
        });
        
        html += `</div>`;
        questionItem.innerHTML = html;
        container.appendChild(questionItem);
    });
    
    updateAnsweredCount();
}

// Select Answer
function selectAnswer(questionIndex, answerIndex) {
    userAnswers[questionIndex] = answerIndex;
    
    // Mark question as answered
    const questionItem = document.getElementById(`question-${questionIndex}`);
    questionItem.classList.add('answered');
    
    updateAnsweredCount();
}

// Update Answered Count
function updateAnsweredCount() {
    const answeredCount = userAnswers.filter(a => a !== undefined).length;
    document.getElementById('answered-count').textContent = answeredCount;
}

// Submit Quiz
function submitQuiz() {
    const unanswered = userAnswers.filter(a => a === undefined).length;
    
    if (unanswered > 0) {
        const confirm = window.confirm(`You have ${unanswered} unanswered question(s). Do you want to submit anyway?`);
        if (!confirm) return;
    }
    
    finishQuiz();
}

// Timer Functions - Count UP from 0
function startTimer() {
    timeRemaining = 0; // Start at 0
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeRemaining++; // Count UP
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer-display');
    if (!timerElement) return;
    
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    let timeString = '';
    if (hours > 0) {
        timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    timerElement.textContent = `Time: ${timeString}`;
    
    // Change color based on time elapsed
    if (timeRemaining > 3600) { // Over 1 hour - Red
        timerElement.style.color = '#dc3545';
        timerElement.style.borderColor = '#dc3545';
        timerElement.style.background = '#ffe6e6';
    } else if (timeRemaining > 1800) { // Over 30 minutes - Orange
        timerElement.style.color = '#ff9800';
        timerElement.style.borderColor = '#ff9800';
        timerElement.style.background = '#fff3e0';
    } else { // Under 30 minutes - Green
        timerElement.style.color = 'var(--manulife-green)';
        timerElement.style.borderColor = 'var(--manulife-green)';
        timerElement.style.background = 'var(--manulife-light-green)';
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Finish Quiz
function finishQuiz() {
    stopTimer();
    
    // Calculate score
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizConfig.currentQuestions[index].correct) {
            score++;
        }
    });
    
    // Display results
    const scorePercentage = Math.round((score / quizConfig.currentQuestions.length) * 100);
    document.getElementById('score').textContent = score;
    document.getElementById('total-score').textContent = quizConfig.currentQuestions.length;
    document.getElementById('score-percentage').textContent = scorePercentage + '%';
    
    // Display message
    const resultsMessage = document.getElementById('results-message');
    if (scorePercentage >= 90) {
        resultsMessage.innerHTML = '<strong>Excellent!</strong> You have a great understanding of the material.';
    } else if (scorePercentage >= 70) {
        resultsMessage.innerHTML = '<strong>Good job!</strong> You have a solid grasp of the concepts.';
    } else if (scorePercentage >= 50) {
        resultsMessage.innerHTML = '<strong>Not bad!</strong> Consider reviewing the material to improve your understanding.';
    } else {
        resultsMessage.innerHTML = '<strong>Keep learning!</strong> Review the material and try again.';
    }
    
    showScreen('results-screen');
}

// Review Answers
function reviewAnswers() {
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';
    
    const answerLabels = ['A', 'B', 'C', 'D'];
    
    quizConfig.currentQuestions.forEach((question, index) => {
        const reviewItem = document.createElement('div');
        const isCorrect = userAnswers[index] === question.correct;
        reviewItem.className = `review-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        let html = `
            <div class="review-question">
                <strong>Question ${index + 1}:</strong> ${question.question}
            </div>
        `;
        
        if (!isCorrect) {
            const userAnswerText = userAnswers[index] !== undefined 
                ? `${answerLabels[userAnswers[index]]}. ${question.answers[userAnswers[index]]}`
                : 'Not answered';
            
            html += `
                <div class="review-answer user-answer">
                    <div class="review-label">Your Answer:</div>
                    ${userAnswerText}
                </div>
                <div class="review-answer correct-answer">
                    <div class="review-label">Correct Answer:</div>
                    ${answerLabels[question.correct]}. ${question.answers[question.correct]}
                </div>
            `;
        } else {
            html += `
                <div class="review-answer correct-answer">
                    <div class="review-label">Your Answer (Correct):</div>
                    ${answerLabels[question.correct]}. ${question.answers[question.correct]}
                </div>
            `;
        }
        
        reviewItem.innerHTML = html;
        reviewContainer.appendChild(reviewItem);
    });
    
    showScreen('review-screen');
}

// Restart Quiz
function restartQuiz() {
    stopTimer();
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    showScreen('welcome-screen');
}

// Back to Welcome Screen
function backToWelcome() {
    const answeredCount = userAnswers.filter(a => a !== undefined).length;
    
    if (answeredCount > 0) {
        const confirm = window.confirm('Are you sure you want to go back? Your progress will be lost.');
        if (!confirm) return;
    }
    
    stopTimer();
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    showScreen('welcome-screen');
}

// Show Screen
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Force welcome screen to show
    showScreen('welcome-screen');
    
    // Set default values
    document.getElementById('exam-select').value = 'random';
    document.getElementById('timer-enabled').checked = false;
    
    // Load dark mode preference
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    }
    
    // Scroll to top button
    window.addEventListener('scroll', function() {
        const scrollBtn = document.getElementById('scroll-top-btn');
        if (scrollBtn) {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'flex';
            } else {
                scrollBtn.style.display = 'none';
            }
        }
    });
});

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Easter Egg Functions - MEME EXPLOSION MODE!
function showEasterEgg() {
    const modal = document.getElementById('easter-egg-modal');
    modal.style.display = 'flex';
    
    // Add a fun animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Make photos explode in with random animations
    const photos = modal.querySelectorAll('.photo-gallery img');
    photos.forEach((photo, index) => {
        // Random delay for staggered explosion
        const delay = Math.random() * 500;
        
        // Random starting position (off-screen)
        const startPositions = [
            { x: -200, y: -200 }, // top-left
            { x: 200, y: -200 },  // top-right
            { x: -200, y: 200 },  // bottom-left
            { x: 200, y: 200 },   // bottom-right
            { x: 0, y: -300 },    // top
            { x: 0, y: 300 },     // bottom
            { x: -300, y: 0 },    // left
            { x: 300, y: 0 }      // right
        ];
        
        const randomPos = startPositions[Math.floor(Math.random() * startPositions.length)];
        const randomRotation = (Math.random() - 0.5) * 720; // Random spin
        const randomScale = 0.3 + Math.random() * 0.5; // Random initial scale
        
        // Set initial transform
        photo.style.transform = `translate(${randomPos.x}%, ${randomPos.y}%) rotate(${randomRotation}deg) scale(${randomScale})`;
        photo.style.opacity = '0';
        
        // Animate to final position
        setTimeout(() => {
            photo.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            photo.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
            photo.style.opacity = '1';
            
            // Add continuous floating animation
            setTimeout(() => {
                photo.classList.add('floating');
            }, 800);
        }, delay);
    });
}

function closeEasterEgg() {
    const modal = document.getElementById('easter-egg-modal');
    const photos = modal.querySelectorAll('.photo-gallery img');
    
    // Explode photos out in random directions
    photos.forEach((photo) => {
        const randomX = (Math.random() - 0.5) * 400;
        const randomY = (Math.random() - 0.5) * 400;
        const randomRotation = (Math.random() - 0.5) * 1080;
        
        photo.style.transition = 'all 0.5s ease-in';
        photo.style.transform = `translate(${randomX}%, ${randomY}%) rotate(${randomRotation}deg) scale(0)`;
        photo.style.opacity = '0';
        photo.classList.remove('floating');
    });
    
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        // Reset photos for next time
        photos.forEach((photo) => {
            photo.style.transition = '';
            photo.style.transform = '';
            photo.style.opacity = '';
        });
    }, 500);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeEasterEgg();
    }
});
