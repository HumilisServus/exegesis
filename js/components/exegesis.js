export class Exegesis {
    constructor() {
        this.panel = document.getElementById('exegesis-panel');
        this.content = document.getElementById('exegesis-content');
        this.closeBtn = document.getElementById('close-exegesis');

        this.isOpen = false;

        this.attachEventListeners();
    }

    attachEventListeners() {
        this.closeBtn.addEventListener('click', () => this.close());

        // Close when clicking outside panel
        document.addEventListener('click', (e) => {
            const isClickInsidePanel = this.panel.contains(e.target);
            const isClickOnVerse = e.target.closest('.has-exegesis');

            if (this.isOpen && !isClickInsidePanel && !isClickOnVerse) {
                this.close();
            }
        });
    }

    open(exegeses, chapterNumber) {
        if (!exegeses || exegeses.length === 0) return;

        this.content.innerHTML = '';

        exegeses.forEach(exe => {
            // Format verse range text
            let rangeText = `Verset${exe.verseRange[0] === exe.verseRange[1] ? '' : 's'} `;
            rangeText += exe.verseRange[0] === exe.verseRange[1]
                ? exe.verseRange[0]
                : `${exe.verseRange[0]}-${exe.verseRange[1]}`;

            // Create html for exegesis item
            const itemHTML = `
                <div class="exegesis-item">
                    <div class="exegesis-verses-ref">${rangeText}</div>
                    <h4 class="exegesis-author">${exe.author}</h4>
                    <div class="exegesis-source">${exe.source}</div>
                    <p class="exegesis-text">${exe.text}</p>
                </div>
            `;
            this.content.innerHTML += itemHTML;
        });

        // Open panel
        this.panel.classList.add('open');
        this.isOpen = true;
    }

    close() {
        this.panel.classList.remove('open');
        this.isOpen = false;

        // Optionally, trigger a custom event or a callback to clear active highlights in the reader component
        document.querySelectorAll('.verse-block.active').forEach(v => v.classList.remove('active'));
    }
}
