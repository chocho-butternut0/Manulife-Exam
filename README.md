# Manulife IIAP Practice Exam

This interactive practice exam is designed to help you prepare for the Manulife IIAP (Insurance Institute Accreditation Program) certification. With 120 carefully curated questions across two complete mock exams, you'll gain the confidence and knowledge needed to excel. Choose from multiple exam modes, track your progress, and review detailed explanations to strengthen your understanding of insurance principles, regulations, and best practices.

## ✨ Features

**Four Quiz Modes:**
- 📘 **Mock Exam 1** - 60 questions from Set 1
- 📗 **Mock Exam 2** - 60 questions from Set 2
- 🔀 **Mixed Mode** - 30 questions from each exam (60 total)
- 🎲 **Random Mode** - 60 random questions from all 120

**Timer Option:**
- ⏱️ Enable/disable timer (counts up to track your time)
- 🎨 Visual color changes based on time elapsed
- 📊 Real-time progress tracking

**Interactive Experience:**
- 📊 Real-time progress bar showing answered questions
- 📝 Review all answers after completion
- 🎯 Score calculation with performance feedback
- 🎨 Beautiful, modern Manulife-branded design
- 🌙 Dark mode support
- 🎉 Hidden easter egg (click the logo!)

## 🎨 Design Features

- Clean, modern aesthetic with Manulife green branding
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Professional typography (Inter font)
- Gradient backgrounds and shadows
- Emoji icons for visual appeal
- Dark mode toggle

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

## 📁 File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Manulife-branded styling
├── script.js           # Quiz logic and functionality
├── questions.js        # Question database (ADD YOUR QUESTIONS HERE)
├── .gitignore          # Git ignore file
└── README.md          # This file
```

## 🚀 Usage

1. Open `index.html` in a web browser
2. Select your quiz mode:
   - **Mock Exam 1 or 2** for focused practice
   - **Mixed Mode** for balanced practice from both exams
   - **Random Mode** for unpredictable variety
3. Optionally enable the timer to track your time
4. Click "Start Exam" 
5. Answer all 60 questions
6. Review your results and answers

## 🎨 Customization

### Change Default Quiz Mode
Edit in `script.js`:
```javascript
document.getElementById('exam-select').value = 'random'; // Change to 'exam1', 'exam2', 'mixed', or 'random'
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

### Customize Easter Egg Photos
Edit the image URLs in `index.html` in the easter egg modal section to use your own photos or memes!

## 🎉 Easter Egg

Click the Manulife logo in the header to reveal a fun surprise with exploding photos!

## 💡 Tips for Adding Questions

1. **Copy-paste efficiently:** Use find-and-replace in your text editor
2. **Watch for special characters:** Escape quotes with backslash: `\"`
3. **Verify correct answer index:** Remember 0=first option, 1=second, etc.
4. **Test incrementally:** Add 10 questions at a time and test

## 🌐 Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## 📄 License

For Manulife internal training use.

## 🙏 Credits

Built with ❤️ for IIAP exam preparation
