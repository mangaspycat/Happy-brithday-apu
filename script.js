/* ============================================================
   Happy Birthday Khushi Apu - Interactive Script
   ============================================================ */

/* ---------- 1. Background floating decorations ---------- */
function initBgDecorations() {
    const container = document.getElementById('bgDecorations');
    const items = ['🎈', '🌸', '💖', '🎂', '🎁', '🌺', '💕', '⭐', '🦋', '🍓'];
    const count = 18;

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'float-item';
        el.textContent = items[Math.floor(Math.random() * items.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = (1.5 + Math.random() * 1.8) + 'rem';
        el.style.animationDuration = (10 + Math.random() * 15) + 's';
        el.style.animationDelay = (Math.random() * 12) + 's';
        container.appendChild(el);
    }
}

/* ---------- 2. Screen transitions ---------- */
function goToScreen(num) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('screen' + num);
    if (target) {
        target.classList.add('active');
        // small confetti burst on every screen change
        burstConfetti(30);
        // scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Special triggers
        if (num === 4) {
            bigConfetti();
        }
    }
}

/* ---------- 3. Counter: generate floating "happy birthday" texts ---------- */
function generateTexts() {
    const input = document.getElementById('countInput');
    let count = parseInt(input.value, 10);

    if (isNaN(count) || count < 1) {
        alert('দয়া করে একটা সংখ্যা লেখো! 🌸');
        return;
    }
    if (count > 100) {
        count = 100;
        alert('বেশি বেশি করলে ব্রাউজার হ্যাং করবে! ১০০ করে দিলাম 😄');
    }

    const container = document.getElementById('floatingTexts');
    const colors = ['#E91E63', '#FF6B9D', '#E63946', '#FF1493', '#C71585'];
    const variants = ['Happy Birthday!', 'Shuvo Jonmodin!', 'জন্মদিন শুভ হোক!', '🎂 Happy Birthday!'];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const t = document.createElement('div');
            t.className = 'floating-text';
            t.textContent = variants[Math.floor(Math.random() * variants.length)];
            t.style.left = Math.random() * 90 + 'vw';
            t.style.top = (50 + Math.random() * 40) + 'vh';
            t.style.color = colors[Math.floor(Math.random() * colors.length)];
            t.style.fontSize = (1.1 + Math.random() * 1.4) + 'rem';
            t.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
            container.appendChild(t);

            setTimeout(() => t.remove(), 4500);
        }, i * 120);
    }

    // small confetti burst alongside
    burstConfetti(count * 2);
}

/* ---------- 4. Cake click: serve a slice ---------- */
let cakeClicked = false;
function serveCake() {
    if (cakeClicked) {
        // allow repeated clicks but reset message
        resetCake();
        setTimeout(runCakeAnimation, 200);
        return;
    }
    runCakeAnimation();
}

function runCakeAnimation() {
    cakeClicked = true;

    // blow out candles visually
    const flames = document.querySelectorAll('.flame');
    flames.forEach(f => {
        f.style.transition = 'opacity 0.4s';
        f.style.opacity = '0';
    });

    // smoke effect briefly
    const candles = document.querySelectorAll('.candle');
    candles.forEach(c => {
        const smoke = document.createElement('div');
        smoke.textContent = '💨';
        smoke.style.position = 'absolute';
        smoke.style.top = '-25px';
        smoke.style.left = '50%';
        smoke.style.transform = 'translateX(-50%)';
        smoke.style.fontSize = '1rem';
        smoke.style.opacity = '0.7';
        smoke.style.animation = 'floatUp 1.5s ease-out forwards';
        c.appendChild(smoke);
        setTimeout(() => smoke.remove(), 1500);
    });

    // flying cake slice
    const slice = document.getElementById('cakeSlice');
    slice.classList.remove('flying');
    void slice.offsetWidth; // reflow to restart animation
    slice.classList.add('flying');

    // show message
    const msg = document.getElementById('cakeMessage');
    msg.textContent = 'নেও আপু হাঁ করো 🍰😋';
    msg.style.animation = 'none';
    void msg.offsetWidth;
    msg.style.animation = 'popIn 0.5s ease';

    // confetti burst
    burstConfetti(40);
}

function resetCake() {
    const msg = document.getElementById('cakeMessage');
    msg.textContent = '';
    const slice = document.getElementById('cakeSlice');
    slice.classList.remove('flying');
}

/* ---------- 5. Confetti ---------- */
const confettiColors = ['#FF6B9D', '#E91E63', '#FFB6D1', '#FFFFFF', '#E63946', '#FFE4ED'];

function burstConfetti(count) {
    const container = document.getElementById('confettiContainer');
    for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        c.style.width = (6 + Math.random() * 8) + 'px';
        c.style.height = (10 + Math.random() * 10) + 'px';
        c.style.animationDuration = (2 + Math.random() * 2) + 's';
        c.style.opacity = 0.9;
        if (Math.random() > 0.5) {
            c.style.borderRadius = '50%';
        }
        container.appendChild(c);
        setTimeout(() => c.remove(), 4500);
    }
}

function bigConfetti() {
    // long celebration for final screen
    let i = 0;
    const interval = setInterval(() => {
        burstConfetti(20);
        i++;
        if (i > 8) clearInterval(interval);
    }, 500);
}

/* ---------- 6. Init ---------- */
window.addEventListener('DOMContentLoaded', () => {
    initBgDecorations();

    // Enter key on input triggers generation
    const input = document.getElementById('countInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') generateTexts();
        });
    }

    // initial welcome confetti
    setTimeout(() => burstConfetti(50), 300);
});
