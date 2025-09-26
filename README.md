

Voice Converter Website (Text-to-Speech)
A lightweight, privacy-friendly Text-to-Speech web app built with vanilla HTML, CSS, and JavaScript. It uses the Web Speech API to convert typed text into lifelike speech with rich controls and animated themes.
Features
* Voice selection (auto-populated from your browser/OS voices)
* Rate, pitch, and volume sliders with live values
* Start, pause, resume, stop controls
* Live progress bar, elapsed time, character/word counters, duration estimate
* Keyboard shortcut: Cmd/Ctrl + Enter to speak
* Theme system with animated gradients
* Theme A: vibrant
* Theme B: dark blue (default)
* Theme C: classical serif
* Theme and voice preference persistence via localStorage
* Responsive layout, mobile-friendly
How it works
* Uses the browser’s Web Speech Synthesis API
* Populates available voices on load and reacts to voiceschanged
* Tracks progress using onboundary events to update spoken character count and UI
* Animates gradient backgrounds with CSS variables and keyframes
* Saves chosen theme and voice to localStorage
Project structure
* index.html: App layout and controls
* styles.css: Animated gradients, themes, responsive layout
* script.js: TTS logic, voice loading, control wiring, persistence
Getting started
* Open index.html in a modern browser (Chrome/Edge/Safari).
* If voices don’t appear initially, wait a moment or reload.
Usage
1. Type or paste text into the input area.
2. Choose a voice and adjust rate, pitch, volume.
3. Click Speak or press Cmd/Ctrl + Enter.
4. Use Pause, Resume, Stop as needed.
5. Switch themes with the header button (cycles A → B → C).
Browser support
* Works best on Chromium-based browsers and Safari
* Requires support for the Web Speech Synthesis API
Limitations
* Available voices depend on the user’s OS/browser
* Boundary events can vary by engine and language
Privacy
* Everything runs locally in your browser; no text is sent to a server
