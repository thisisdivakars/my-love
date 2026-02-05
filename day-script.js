document.addEventListener('DOMContentLoaded', () => {
    // --- Data Source ---
    // Using placeholder images for now. Replace 'src' with actual GIF URLs.
    const valentineData = {
        7: {
            title: "Rose Day",
            icon: "🌹",
            quote: "For the woman who makes my world bloom. A single rose for my only love. 🌹",
            gif: "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif"
        },
        8: {
            title: "Propose Day",
            icon: "💍",
            quote: "I choose you today, tomorrow, and forever. Will you be mine explicitly, again?",
            interactive: true,
            type: "proposal",
            gif: "https://media.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif"
        },
        9: {
            title: "Chocolate Day",
            icon: "🍫",
            quote: "You are sweeter than the finest truffle. My favorite addiction. 🍫",
            gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGJub2VzNTRqeThucTlqYjAwZzFlaGFmNGhrOWpxNDVvczh5eWQzZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NCh9BaR2HMO79ONgPM/giphy.gif"
        },
        10: {
            title: "Teddy Day",
            icon: "🧸",
            quote: "You are my safe place, my comfort, and my warmest hug. 🧸",
            gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExem5tcjdjdjEyZTdqMzZubmExYml0YWFya2p6NWppbzY1bjBya2FhNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zFHu7yuSHm4H5gNZVx/giphy.gif"
        },
        11: {
            title: "Promise Day",
            icon: "🤞",
            quote: "I promise to stand by you, to listen, and to love you through it all. 🤞",
            gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3k0d3oxem91ajdrMXZjNGJrem84b2lsaTJpdjlsYW92YXJhaTBzZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cNY7yMxXT058H6wyVq/giphy.gif"
        },
        12: {
            title: "Hug Day",
            icon: "🤗",
            quote: "The best place in the whole world is right in your arms. 🤗",
            gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWl1eDVyN3RpcGQzOWZpeWw1cm9nOWY0NDc2ZDBiM29oNDgwazI3NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/s3psh7LcrZQKJaE4aJ/giphy.gif"
        },
        13: {
            title: "Kiss Day",
            icon: "💋",
            quote: "A thousand kisses wouldn't be enough to show how much I love you. 💋",
            gif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cmIxcTE5enB1YmF6cjc5OGRjOWpzbWRnZW1iMm9yaWhma29uMHU2NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rrgNST6QLz86k/giphy.gif"
        },
        14: {
            title: "Valentine's Day",
            icon: "❤️",
            quote: "My love, my life, my eternal Valentine. I love you! ❤️",
            interactive: true,
            type: "final",
            gif: "https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif"
        }
    };

    // --- Parse URL Params ---
    const urlParams = new URLSearchParams(window.location.search);
    const dayId = urlParams.get('day');

    // --- Date Locking Logic ---
    const checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);
    const currentYear = checkDate.getFullYear();
    const dayNum = parseInt(dayId) || 7; // Default to 7
    const targetDate = new Date(currentYear, 1, dayNum); // Feb is 1
    targetDate.setHours(0, 0, 0, 0);

    // If trying to access a future date, redirect back
    if (checkDate < targetDate) {
        window.location.href = 'index.html';
        return;
    }
    const data = valentineData[dayId] || valentineData[7]; // Default to 7 if error

    if (!data) {
        // Redirect to home if invalid
        window.location.href = 'index.html';
        return;
    }

    // --- Populate Content ---
    document.getElementById('day-date').textContent = `FEB ${dayId}`;
    document.getElementById('day-title').textContent = data.title;
    document.getElementById('day-quote').textContent = data.quote;

    // Handle GIF area
    const gifContainer = document.querySelector('.gif-container');
    gifContainer.innerHTML = '';

    // Create the GIF Image
    const img = document.createElement('img');
    img.src = data.gif; // Using the Giphy URL
    img.className = 'day-gif';
    img.alt = data.title + " GIF";

    // Add a visual icon overlay (floating 3D)
    const overlayIcon = document.createElement('div');
    overlayIcon.textContent = data.icon;
    overlayIcon.style.position = 'absolute';
    overlayIcon.style.bottom = '-20px';
    overlayIcon.style.right = '-20px';
    overlayIcon.style.fontSize = '4rem';
    overlayIcon.style.filter = 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))';
    overlayIcon.style.zIndex = '10';
    overlayIcon.style.animation = 'floatText 3s ease-in-out infinite';

    gifContainer.appendChild(img);
    gifContainer.appendChild(overlayIcon);

    // Apply Theme
    // No need to manually set background or card colors here, handled by CSS now
    // document.body.style.background = data.theme; // Keep the universe background!

    // --- 3D Tilt Logic ---
    const card = document.getElementById('card-3d');
    const scene = document.querySelector('.scene');

    scene.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    scene.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });

    scene.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });

    // --- Interactive Logic ---
    const interactionArea = document.getElementById('interaction-area');

    if (data.interactive) {
        if (data.type === 'proposal') {
            const btnYes = document.createElement('button');
            btnYes.textContent = "Yes, Forever! 💍";
            btnYes.className = 'action-btn primary';
            btnYes.onclick = () => { triggerHugeConfetti(); document.getElementById('day-quote').textContent = "Together Forever! 💖"; btnYes.remove(); btnNo.remove(); };

            const btnNo = document.createElement('button');
            btnNo.textContent = "Maybe...";
            btnNo.className = 'action-btn secondary';
            btnNo.addEventListener('mouseover', () => {
                const x = Math.random() * (window.innerWidth - 200);
                const y = Math.random() * (window.innerHeight - 100);
                btnNo.style.position = 'absolute';
                btnNo.style.left = `${x}px`;
                btnNo.style.top = `${y}px`;
            });
            interactionArea.appendChild(btnYes);
            interactionArea.appendChild(btnNo);
        } else if (data.type === 'final') {
            const btn = document.createElement('button');
            btn.textContent = "Accept My Love ❤️";
            btn.className = 'action-btn primary';
            btn.onclick = () => { triggerHugeConfetti(); alert("You are the best! 💖"); };
            interactionArea.appendChild(btn);
        }
    }

    // --- Confetti ---
    function triggerHugeConfetti() {
        // Reuse same logic
        createDOMConfetti();
        setInterval(createDOMConfetti, 300);
        setTimeout(() => { location.reload(); }, 5000); // Reset or do something else
    }

    // Reuse the DOM confetti from script.js but beefed up
    function createDOMConfetti() {
        for (let i = 0; i < 10; i++) {
            const confetti = document.createElement('div');
            confetti.textContent = ['❤️', '💍', '🌸', '✨'][Math.floor(Math.random() * 4)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-5vh';
            confetti.style.fontSize = Math.random() * 2 + 1 + 'rem';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);
            confetti.animate([
                { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${Math.random() * 200 - 100}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], { duration: 3000 }).onfinish = () => confetti.remove();
        }
    }

    // --- Music Player Logic ---
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    bgMusic.volume = 0.5;

    // Session state
    if (sessionStorage.getItem('musicPlaying') === 'true') {
        musicBtn.classList.add('playing');
        bgMusic.play().catch(e => {
            console.log("Autoplay blocked");
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
                    alert("Music Error: " + error.message);
                });
            }
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.textContent = "Click for Music Love 🎵";
            sessionStorage.setItem('musicPlaying', 'false');
        }
    });

    // --- Gyroscope 3D Tilt (Mobile) ---
    if (window.DeviceOrientationEvent && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        window.addEventListener('deviceorientation', (event) => {
            // Gamma: Left/Right (-90 to 90) -> mapped to RotateY
            // Beta: Front/Back (-180 to 180) -> mapped to RotateX
            const yAxis = event.gamma;
            const xAxis = event.beta;

            // Constrain 
            const rotY = Math.min(30, Math.max(-30, yAxis));
            const rotX = Math.min(30, Math.max(-30, xAxis - 45)); // -45 to account for holding angle

            // Apply 3D rotation
            const card = document.getElementById('card-3d');
            // We invert X because tilting phone forward (positive beta) should rotate top away (negative X rot)
            card.style.transform = `rotateY(${rotY}deg) rotateX(${-rotX}deg)`;
        }, true);
    }

    // --- Hidden Stars / Love Toast Logic ---
    const loveNotes = [
        "You are my favorite notification.",
        "Your smile is my daily motivation.",
        "I love you more than pizza.",
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
        setTimeout(() => toast.remove(), 4000);
    }

    // Auto-generate background floaters with BLINKING STARS & HIDDEN ONES
    const bgContainer = document.getElementById('background-elements');
    const shapes = ['❤️', '💖', '🪐', '⭐', '✨', '☄️'];
    // Clear previous generic generation if needed, but since we are replacing the block:

    for (let i = 0; i < 40; i++) {
        const span = document.createElement('div');
        span.classList.add('floating-item');

        // Logic for Secret Star
        const isSpecial = Math.random() < 0.2;
        if (isSpecial) {
            span.textContent = '⭐';
            span.classList.add('twinkle');
            span.style.cursor = 'pointer';
            span.addEventListener('click', (e) => {
                e.stopPropagation();
                const note = loveNotes[Math.floor(Math.random() * loveNotes.length)];
                showLoveToast(note);
                span.style.transform = "scale(3)";
                span.style.opacity = "0";
                setTimeout(() => span.remove(), 500);
            });
        } else {
            if (Math.random() > 0.5) span.classList.add('twinkle');
            span.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        }

        span.style.left = `${Math.random() * 100}%`;
        span.style.top = `${Math.random() * 100}%`;
        span.style.fontSize = `${Math.random() * 2 + 0.5}rem`;
        span.style.animationDelay = `${Math.random() * 5}s`;
        span.style.opacity = Math.random() * 0.5 + 0.3; // Random opacity
        bgContainer.appendChild(span);
    }
});
