import { gospels } from './data/gospels.js';
import { Reader } from './components/reader.js';
import { Exegesis } from './components/exegesis.js';
import { Search } from './components/search.js';

class App {
    constructor() {
        this.currentGospelKey = null;
        this.currentChapterNum = null;

        // Initialize Components
        this.exegesis = new Exegesis();
        this.reader = new Reader(this.exegesis);
        this.search = new Search(gospels, this);

        // Sidebar Navigation Container
        this.navContainer = document.getElementById('gospels-nav');

        // Mobile Menu Elements
        this.menuToggle = document.getElementById('menu-toggle');
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('overlay');

        this.init();
    }

    init() {
        this.buildNavigation();
        this.attachEventListeners();

        // Handle initial hash routing if present
        this.handleHashChange();

        // Initial render if no hash
        if (!window.location.hash) {
            this.reader.renderWelcome();
        }
    }

    buildNavigation() {
        Object.keys(gospels).forEach(key => {
            const gospel = gospels[key];

            // Gospel Item Container
            const gospelItem = document.createElement('div');
            gospelItem.className = 'gospel-item';

            // Gospel Button
            const gospelBtn = document.createElement('button');
            gospelBtn.className = 'gospel-btn';
            gospelBtn.innerHTML = `${gospel.name} <span class="nav-arrow">▼</span>`;
            gospelBtn.dataset.gospel = key;

            // Chapters List Container
            const chaptersList = document.createElement('div');
            chaptersList.className = 'chapters-list';
            chaptersList.id = `chapters-${key}`;

            // Populate Chapters
            Object.keys(gospel.chapters).forEach(chapterNum => {
                const chapterBtn = document.createElement('button');
                chapterBtn.className = 'chapter-btn';
                chapterBtn.textContent = chapterNum;
                chapterBtn.dataset.chapter = chapterNum;

                chapterBtn.addEventListener('click', () => {
                    this.navigateTo(key, parseInt(chapterNum));
                });

                chaptersList.appendChild(chapterBtn);
            });

            // Toggle Chapters List
            gospelBtn.addEventListener('click', () => {
                const isActive = gospelBtn.classList.contains('active');

                // Close all others
                document.querySelectorAll('.gospel-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.chapters-list').forEach(list => list.classList.remove('active'));

                if (!isActive) {
                    gospelBtn.classList.add('active');
                    chaptersList.classList.add('active');
                }
            });

            gospelItem.appendChild(gospelBtn);
            gospelItem.appendChild(chaptersList);
            this.navContainer.appendChild(gospelItem);
        });
    }

    attachEventListeners() {
        // Hash routing
        window.addEventListener('hashchange', () => this.handleHashChange());

        // Mobile Menu Toggle
        this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        this.overlay.addEventListener('click', () => this.toggleMobileMenu(false));
    }

    toggleMobileMenu(forceState) {
        const isOpen = this.sidebar.classList.contains('open');
        const newState = forceState !== undefined ? forceState : !isOpen;

        if (newState) {
            this.sidebar.classList.add('open');
            this.overlay.classList.add('active');
        } else {
            this.sidebar.classList.remove('open');
            this.overlay.classList.remove('active');
        }
    }

    handleHashChange() {
        const hash = window.location.hash.substring(1); // Remove #
        if (!hash) {
            this.reader.renderWelcome();
            this.updateNavUI(null, null);
            return;
        }

        const params = new URLSearchParams(hash);
        const book = params.get('book');
        const chapter = parseInt(params.get('chap'));
        const verse = parseInt(params.get('verse'));

        if (book && chapter && gospels[book] && gospels[book].chapters[chapter]) {
            this.loadChapter(book, chapter, verse);
        } else {
            this.reader.renderWelcome();
        }
    }

    navigateTo(gospelKey, chapterNum, verseNum = null) {
        // Close mobile menu if open
        this.toggleMobileMenu(false);

        // Update URL hash, which triggers handleHashChange
        let hash = `book=${gospelKey}&chap=${chapterNum}`;
        if (verseNum) hash += `&verse=${verseNum}`;

        window.location.hash = hash;
    }

    loadChapter(gospelKey, chapterNum, verseNum) {
        if (this.currentGospelKey === gospelKey && this.currentChapterNum === chapterNum) {
            // Already on this chapter, just scroll if verse provided
            if (verseNum) {
                // Small timeout to ensure DOM is ready if it was a direct load
                setTimeout(() => this.reader.scrollToVerse(verseNum), 100);
            }
            return;
        }

        const gospel = gospels[gospelKey];

        // Update App State
        this.currentGospelKey = gospelKey;
        this.currentChapterNum = chapterNum;

        // Close exegesis panel if open
        this.exegesis.close();

        // Render Reader
        this.reader.renderChapter(gospel, chapterNum);

        // Update Navigation UI
        this.updateNavUI(gospelKey, chapterNum);

        // Update Mobile Header Title
        const mobileTitle = document.querySelector('.mobile-header h2');
        if (mobileTitle) {
            mobileTitle.textContent = `${gospel.abbreviation} ${chapterNum}`;
        }

        // Scroll to verse if provided
        if (verseNum) {
            setTimeout(() => this.reader.scrollToVerse(verseNum), 100);
        }
    }

    updateNavUI(gospelKey, chapterNum) {
        // Reset all
        document.querySelectorAll('.gospel-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.chapters-list').forEach(list => list.classList.remove('active'));
        document.querySelectorAll('.chapter-btn').forEach(btn => btn.classList.remove('active'));

        if (gospelKey) {
            // Activate Gospel
            const gospelBtn = document.querySelector(`.gospel-btn[data-gospel="${gospelKey}"]`);
            if (gospelBtn) gospelBtn.classList.add('active');

            const chaptersList = document.getElementById(`chapters-${gospelKey}`);
            if (chaptersList) chaptersList.classList.add('active');
        }

        if (chapterNum) {
            // Activate Chapter
            const chapterBtn = document.querySelector(`.chapters-list.active .chapter-btn[data-chapter="${chapterNum}"]`);
            if (chapterBtn) chapterBtn.classList.add('active');
        }
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
