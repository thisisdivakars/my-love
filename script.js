document.addEventListener('DOMContentLoaded', () => {
    // --- Intro Sequence Logic ---
    const introMessages = [
        "In this vast universe...",
        "My love for you stands infinite.",
        "Changing my world, one star at a time.",
        "Here is our journey..."
    ];

    const introText = document.getElementById('intro-text');
    const introContainer = document.getElementById('intro-container');
    const mainContent = document.getElementById('main-content');

    // Total Duration approx 10s split among messages
    // 4 messages, roughly 2.5s each

    let messageIndex = 0;

    function showNextMessage() {
        if (messageIndex >= introMessages.length) {
            // End of intro
            endIntro();
            return;
        }

        // Set text
        introText.textContent = introMessages[messageIndex];

        // Fade In
        introText.classList.add('visible');

        // Wait, then Fade Out
        setTimeout(() => {
            introText.classList.remove('visible');
            messageIndex++;
            // Wait for fade out to finish before next
            setTimeout(showNextMessage, 1000);
        }, 1500); // Visible time
    }

    function endIntro() {
        introContainer.style.display = 'none';
        mainContent.classList.remove('hidden-initially');
        mainContent.classList.add('fade-in-ui');
    }

    // Start the sequence
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('skipIntro') === 'true') {
        // Came back from a day page -> Skip Intro
        endIntro();
        // Clean URL so reload works as expected (shows intro)
        window.history.replaceState({}, document.title, window.location.pathname);
    } else {
        // Fresh visit or reload -> Play Intro
        setTimeout(showNextMessage, 500);
    }


    // --- Configuration ---

    // Set to a specific date string (e.g., '2026-02-14') for testing.
    // Set to null to use the real current date.
    // const debugDate = new Date('2026-02-14T10:00:00');
    const debugDate = null;

    const today = debugDate ? debugDate : new Date();

    // Normalize today to start of day for comparison
    today.setHours(0, 0, 0, 0);

    const year = new Date().getFullYear(); // Target year for the valentine week

    // --- Status Message Logic ---
    const statusText = document.getElementById('journey-status');
    const startOfEvent = new Date(year, 1, 7); // Feb 7
    const endOfEvent = new Date(year, 1, 14); // Feb 14

    if (today < startOfEvent) {
        statusText.textContent = "The Love Journey begins on Feb 7th! Come back then... 🌹";
    } else if (today <= endOfEvent) {
        statusText.textContent = "A new chapter of love unlocks every day! ✨";
    } else {
        statusText.textContent = "Every day is Valentine's Day with you. ❤️";
    }

    // Note: Month is 0-indexed in JS (0 = Jan, 1 = Feb)
    const valentineWeek = [
        { day: 7, title: "Rose Day", icon: "🌹", content: "For the woman who makes my world bloom. A single rose for my only love." },
        { day: 8, title: "Propose Day", icon: "💍", content: "I choose you today, tomorrow, and forever.", interactive: "propose" },
        { day: 9, title: "Chocolate Day", icon: "🍫", content: "You are sweeter than the finest truffle. My favorite addiction." },
        { day: 10, title: "Teddy Day", icon: "🧸", content: "You are my safe place, my comfort, and my warmest hug." },
        { day: 11, title: "Promise Day", icon: "🤞", content: "I promise to stand by you, to listen, and to love you through it all." },
        { day: 12, title: "Hug Day", icon: "🤗", content: "The best place in the whole world is right in your arms." },
        { day: 13, title: "Kiss Day", icon: "💋", content: "A thousand kisses wouldn't be enough to show how much I love you." },
        { day: 14, title: "Valentine's Day", icon: "❤️", content: "My love, my life, my eternal Valentine. I love you." }
    ];

    const grid = document.getElementById('cards-grid');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalExtra = document.getElementById('modal-extra');
    const closeBtn = document.querySelector('.close-btn');

    // --- Music Player Logic ---
    // --- Music Player Logic ---
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    bgMusic.volume = 0.5;

    // Check if music was playing previously (simple session storage)
    const isMusicPlaying = sessionStorage.getItem('musicPlaying') === 'true';
    if (isMusicPlaying) {
        musicBtn.classList.add('playing');
        bgMusic.play().catch(e => {
            console.log("Autoplay blocked, waiting for interaction");
            musicBtn.classList.remove('playing');
        });
    }

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.volume = 0.5;

            const playPromise = bgMusic.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicBtn.classList.add('playing');
                    musicBtn.textContent = "Playing Love Tune 🎵";
                    sessionStorage.setItem('musicPlaying', 'true');
                }).catch(error => {
                    console.error("Playback failed:", error);
                    // Don't alert if it's just an interruption (double click)
                    if (error.name !== 'AbortError') {
                        alert("Music could not play. Reason: " + error.message + "\nCheck if file exists at: assets/valentine.mp3");
                    }
                });
            }
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.textContent = "Click for Music Love 🎵";
            sessionStorage.setItem('musicPlaying', 'false');
        }
    });

    // --- Background Animation Generation with HIDDEN STARS ---
    const bgContainer = document.getElementById('background-elements');
    const shapes = ['🪐', '🌎', '🌕', '🚀', '⭐', '☄️', '❤️', '💖', '🛸', '✨'];
    const numShapes = 50;

    const loveNotes = [
        "You are my favorite notification.",
        "Your smile is my daily motivation.",
        "I love you more than pizza (and that's a lot).",
        "You make my heart go 🚀",
        "Even the stars are jealous of your shine.",
        "You're my safe space."
    ];

    function showLoveToast(msg) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'love-toast';
        toast.textContent = msg;
        container.appendChild(toast);
        // Remove after animation
        setTimeout(() => toast.remove(), 4000);
    }

    for (let i = 0; i < numShapes; i++) {
        const span = document.createElement('span');
        span.classList.add('floating-item');

        // 20% Chance to be a "Special Star"
        const isSpecial = Math.random() < 0.2;

        if (isSpecial) {
            span.textContent = '⭐'; // Always a star for special ones
            span.classList.add('special-star');
            span.classList.add('twinkle'); // Ensure it blinks
            span.title = "Click me!"; // Tooltip hint

            span.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent other clicks
                const note = loveNotes[Math.floor(Math.random() * loveNotes.length)];
                showLoveToast(note);

                // Explode effect simply by removing and adding confetti at that spot (optional, keep simple for now)
                span.style.transform = "scale(3) rotate(360deg)";
                span.style.opacity = "0";
                setTimeout(() => span.remove(), 500); // Remove star after finding
            });
        } else {
            span.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        }

        // Random positioning and delay
        const left = Math.random() * 100;
        const size = Math.random() * 2 + 0.5;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        span.style.left = `${left}%`;
        span.style.fontSize = `${size}rem`;
        span.style.animationDelay = `-${delay}s`;
        span.style.animationDuration = `${duration}s`;
        span.style.top = `${Math.random() * 100}%`;

        if (size < 1) {
            span.style.filter = "blur(1px)";
            span.style.opacity = "0.5";
        }

        bgContainer.appendChild(span);
    }

    // --- Gyroscope / Parallax Logic (Mobile) ---
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (window.DeviceOrientationEvent && isMobile) {
        window.addEventListener('deviceorientation', (event) => {
            const tiltX = event.beta; // -180 to 180 (front/back)
            const tiltY = event.gamma; // -90 to 90 (left/right)

            // Limit range for subtle effect
            // const limitedX = Math.max(-20, Math.min(20, tiltX));
            // const limitedY = Math.max(-20, Math.min(20, tiltY));

            // Move background slightly
            bgContainer.style.transform = `translate(${tiltY * 0.5}px, ${tiltX * 0.5}px)`;

            // Tilt cards grid (subtle)
            // grid.style.transform = `rotateY(${tiltY * 0.5}deg) rotateX(${-tiltX * 0.5}deg)`;
        });
    }

    // --- Card Generation ---
    valentineWeek.forEach(item => {
        const cardDate = new Date(year, 1, item.day); // Month is 1 for Feb
        cardDate.setHours(0, 0, 0, 0);

        const isLocked = today < cardDate;

        const card = document.createElement('div');
        card.classList.add('card');

        if (isLocked) {
            card.classList.add('locked');
            card.innerHTML = `
                <div class="card-date">Feb ${item.day}</div>
                <div class="card-title">${item.title}</div>
                <div class="card-status">🔒</div>
            `;
        } else {
            card.classList.add('unlocked');
            card.innerHTML = `
                <div class="card-date">Feb ${item.day}</div>
                <div class="card-title">${item.title}</div>
                <div class="card-status">${item.icon}</div>
            `;


            // Interaction Event
            card.addEventListener('click', () => {
                // Navigate to the specific day page
                window.location.href = `day.html?day=${item.day}`;
            });
        }

        grid.appendChild(card);
    });

    // --- Background Animation Generation ---
    // (We keep the background generation as it is needed for index.html)
    // ...
});
