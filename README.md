# Manulife IIAP Quiz Application

A beautiful, professional quiz application for practicing Manulife IIAP insurance exams with modern UI/UX design.

## ✨ Features

**Four Quiz Modes:**
- 📘 **Mock Exam 1** - 60 questions from Set 1
- 📗 **Mock Exam 2** - 60 questions from Set 2
- 🔀 **Mixed Mode** - 30 questions from each exam (60 total)
- 🎲 **Random Mode** - 60 random questions from all 120

**Timer Option:**
- ⏱️ Enable/disable countdown timer
- ⏰ Customizable duration (1-180 minutes)
- 🚨 Visual warning when time is running low
- ⚡ Auto-submit when time expires

**Interactive Experience:**
- 📊 Real-time progress bar
- ⬅️➡️ Navigate forward and backward
- 📝 Review all answers after completion
- 🎯 Score calculation with performance feedback
- 🎨 Beautiful, modern Manulife-branded design

## 🎨 Design Features

- Clean, modern aesthetic with Manulife green branding
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Professional typography (Inter font)
- Gradient backgrounds and shadows
- Emoji icons for visual appeal

## 📝 How to Add All Questions

The quiz currently has 10 sample questions from each exam. To add all 120 questions:

### 1. Open `questions.js`

### 2. Replace the placeholder logo (optional)
Replace `manulife-logo.svg` with your actual Manulife logo SVG file.

### 3. Add questions to `MOCK_EXAM_1` array (60 total)

Format for each question:
```javascript
{ 
    q: "Question text here?", 
    a: ["Option A", "Option B", "Option C", "Option D"], 
    c: 0  // Index of correct answer (0=A, 1=B, 2=C, 3=D)
}
```

### 4. Add questions to `MOCK_EXAM_2` array (60 total)

Use the same format as above.

### 5. Question Mapping from PDFs

**Mock Exam 1:** Questions 1-60 from IIAP_Set1_V1.pdf
**Mock Exam 2:** Questions 1-60 from IIAP_Set2_V1.pdf

The correct answers are marked in **red bold** in the PDFs.

## 🎯 Quiz Modes Explained

- **Mock Exam 1/2**: All 60 questions from the selected exam in order
- **Mixed Mode**: Randomly selects 30 questions from Exam 1 and 30 from Exam 2, then shuffles them
- **Random Mode**: Randomly selects any 60 questions from the combined pool of 120 questions

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Manulife-branded styling
├── script.js           # Quiz logic and functionality
├── questions.js        # Question database (ADD YOUR QUESTIONS HERE)
└── README.md          # This file
```

## 🚀 Usage

1. Open `index.html` in a web browser
2. Select your quiz mode:
   - **Mock Exam 1 or 2** for focused practice
   - **Mixed Mode** for balanced practice from both exams
   - **Random Mode** for unpredictable variety
3. Optionally enable the timer and set duration
4. Click "Start Quiz" 
5. Answer all 60 questions
6. Review your results and answers

## 🎨 Customization

### Change Default Quiz Mode
Edit in `script.js`:
```javascript
document.getElementById('exam-select').value = 'random'; // Change to 'exam1', 'exam2', 'mixed', or 'random'
```

### Change Timer Default
Edit in `script.js`:
```javascript
document.getElementById('timer-minutes').value = 60; // Change default minutes
```

### Change Passing Thresholds
Edit in `script.js` in the `finishQuiz()` function:
```javascript
if (scorePercentage >= 90) {  // Excellent
if (scorePercentage >= 70) {  // Good
if (scorePercentage >= 50) {  // Not bad
```

### Replace Logo
Replace `manulife-logo.svg` with your actual Manulife logo file (keep the same filename or update the `src` in `index.html`).

## Tips for Adding Questions

1. **Copy-paste efficiently:** Use find-and-replace in your text editor
2. **Watch for special characters:** Escape quotes with backslash: `\"`
3. **Verify correct answer index:** Remember 0=first option, 1=second, etc.
4. **Test incrementally:** Add 10 questions at a time and test

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## License

For Manulife internal training use.
