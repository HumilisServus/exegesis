export class Search {
    constructor(gospels, app) {
        this.gospels = gospels;
        this.app = app; // Reference to main app for navigation

        this.searchInput = document.getElementById('search-input');
        this.searchResults = null; // Container for results

        this.createResultsContainer();
        this.attachEventListeners();
    }

    createResultsContainer() {
        this.searchResults = document.createElement('div');
        this.searchResults.className = 'search-results';
        this.searchResults.style.display = 'none';

        // Append to .search-container for correct absolute positioning
        const searchContainer = document.querySelector('.search-container');
        searchContainer.appendChild(this.searchResults);

        // Add CSS for search results dynamically or ensure it's in style.css
        const style = document.createElement('style');
        style.textContent = `
            .search-results {
                position: absolute;
                top: calc(100% + 5px); /* Just below the input */
                left: 0;
                width: 100%;
                max-height: calc(100vh - 200px);
                overflow-y: auto;
                background-color: var(--bg-surface);
                border-bottom: 1px solid var(--border-color);
                box-shadow: 0 10px 15px rgba(0,0,0,0.5);
                z-index: 50;
            }
            .search-result-item {
                padding: var(--spacing-sm) var(--spacing-md);
                border-bottom: 1px solid rgba(201, 169, 110, 0.1);
                cursor: pointer;
                transition: background-color var(--transition-fast);
            }
            .search-result-item:last-child {
                border-bottom: none;
            }
            .search-result-item:hover {
                background-color: var(--bg-surface-hover);
            }
            .search-result-ref {
                font-family: var(--font-ui);
                font-size: 0.8rem;
                color: var(--accent-gold);
                margin-bottom: 0.2rem;
            }
            .search-result-text {
                font-size: 0.95rem;
                color: var(--text-primary);
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .search-highlight {
                color: var(--accent-gold);
                font-weight: bold;
                background-color: rgba(201, 169, 110, 0.2);
            }
            .search-no-results {
                padding: var(--spacing-md);
                text-align: center;
                color: var(--text-secondary);
                font-size: 0.9rem;
                font-family: var(--font-ui);
            }
        `;
        document.head.appendChild(style);

        // No need for sidebar positioning anymore as it's within search container
    }

    attachEventListeners() {
        let debounceTimer;

        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const query = e.target.value.trim();

            if (query.length < 3) {
                this.hideResults();
                return;
            }

            debounceTimer = setTimeout(() => {
                this.performSearch(query);
            }, 300); // 300ms debounce
        });

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.hideResults();
            }
        });

        // Show results again if input is focused and has value
        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim().length >= 3 && this.searchResults.innerHTML !== '') {
                this.searchResults.style.display = 'block';
            }
        });
    }

    performSearch(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();

        // Iterate through all data
        for (const [gospelKey, gospelData] of Object.entries(this.gospels)) {
            for (const [chapterNum, chapterData] of Object.entries(gospelData.chapters)) {
                chapterData.verses.forEach(verse => {
                    if (verse.text.toLowerCase().includes(lowerQuery)) {
                        results.push({
                            gospelKey,
                            gospelAbbr: gospelData.abbreviation,
                            chapterNum: parseInt(chapterNum),
                            verseNum: verse.number,
                            text: verse.text
                        });
                    }
                });
            }
        }

        this.renderResults(results, query);
    }

    renderResults(results, query) {
        this.searchResults.innerHTML = '';

        if (results.length === 0) {
            this.searchResults.innerHTML = `<div class="search-no-results">Aucun résultat trouvé pour "${query}"</div>`;
        } else {
            // Group by Gospel (optional, but simplified here for list view)
            results.slice(0, 50).forEach(result => { // Limit to 50 results to avoid lag
                const item = document.createElement('div');
                item.className = 'search-result-item';

                // Highlight search term
                const regex = new RegExp(`(${query})`, 'gi');
                const highlightedText = result.text.replace(regex, '<span class="search-highlight">$1</span>');

                item.innerHTML = `
                    <div class="search-result-ref">${result.gospelAbbr} ${result.chapterNum}, ${result.verseNum}</div>
                    <div class="search-result-text">${highlightedText}</div>
                `;

                item.addEventListener('click', () => {
                    this.app.navigateTo(result.gospelKey, result.chapterNum, result.verseNum);
                    this.hideResults();
                    // Optional: clear input
                    // this.searchInput.value = '';
                });

                this.searchResults.appendChild(item);
            });

            if (results.length > 50) {
                this.searchResults.innerHTML += `<div class="search-no-results">Plus de 50 résultats. Affinez votre recherche.</div>`;
            }
        }

        this.searchResults.style.display = 'block';
    }

    hideResults() {
        this.searchResults.style.display = 'none';
    }
}
