export class Reader {
    constructor(exegesisComponent) {
        this.container = document.getElementById('reader-content');
        this.exegesisComponent = exegesisComponent;
    }

    renderWelcome() {
        this.container.innerHTML = `
            <div class="welcome-screen">
                <h2 class="welcome-title">La Parole de Dieu</h2>
                <div class="welcome-logo">
                    <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="1" fill="none" class="cross-icon">
                        <line x1="12" y1="3" x2="12" y2="21"></line>
                        <line x1="7" y1="9" x2="17" y2="9"></line>
                    </svg>
                </div>
                <p class="welcome-subtitle">Sélectionnez un Évangile pour commencer la lecture.</p>
            </div>
        `;
    }

    renderChapter(gospel, chapterNumber) {
        const chapter = gospel.chapters[chapterNumber];
        if (!chapter) return;

        // Create Header
        let html = `
            <header class="chapter-header">
                <h2>${gospel.name}</h2>
                <p class="chapter-title">${chapter.title}</p>
            </header>
            <div class="verses-container">
        `;

        // Render Verses
        chapter.verses.forEach(verse => {
            // Check if verse has exegesis (only flag the first verse of the range to avoid repetition)
            const exegeses = chapter.exegesis || [];
            const hasExegesis = exegeses.some(exe => verse.number === exe.verseRange[0]);

            const classes = ['verse-block'];
            if (hasExegesis) classes.push('has-exegesis');

            html += `
                <span class="${classes.join(' ')}" data-verse="${verse.number}">
                    <sup class="verse-number">${verse.number}</sup>
                    <span class="verse-text">${verse.text}</span>
                    ${hasExegesis ? '<span class="exegesis-indicator"></span>' : ''}
                </span>
            `;
        });

        html += `</div>`;
        this.container.innerHTML = html;

        // Reset scroll position
        this.container.scrollTop = 0;

        // Add Event Listeners
        this.attachEventListeners(chapter, chapterNumber);
    }

    attachEventListeners(chapter, chapterNumber) {
        const versesWithExegesis = this.container.querySelectorAll('.has-exegesis');

        versesWithExegesis.forEach(verseEl => {
            verseEl.addEventListener('click', () => {
                const verseNum = parseInt(verseEl.dataset.verse);

                // Find matching exegesis
                const relevantExegeses = chapter.exegesis.filter(exe =>
                    verseNum >= exe.verseRange[0] && verseNum <= exe.verseRange[1]
                );

                if (relevantExegeses.length > 0) {
                    // Highlight active verse
                    this.container.querySelectorAll('.verse-block.active').forEach(v => v.classList.remove('active'));

                    // Highlight all verses in the range of the first matching exegesis
                    const range = relevantExegeses[0].verseRange;
                    for (let i = range[0]; i <= range[1]; i++) {
                        const vEl = this.container.querySelector(`.verse-block[data-verse="${i}"]`);
                        if (vEl) vEl.classList.add('active');
                    }

                    // Open Exegesis Panel
                    this.exegesisComponent.open(relevantExegeses, chapterNumber);
                }
            });
        });
    }

    scrollToVerse(verseNumber) {
        const verseEl = this.container.querySelector(`.verse-block[data-verse="${verseNumber}"]`);
        if (verseEl) {
            // Remove previous active highlights
            this.container.querySelectorAll('.verse-block.active').forEach(v => v.classList.remove('active'));

            // Highlight target
            verseEl.classList.add('active');

            // Scroll to element
            verseEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Remove highlight after a few seconds if it doesn't have an exegesis open
            setTimeout(() => {
                if (!this.exegesisComponent.isOpen) {
                    verseEl.classList.remove('active');
                }
            }, 3000);
        }
    }
}
