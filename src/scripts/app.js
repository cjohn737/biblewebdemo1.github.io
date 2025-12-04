// Bible Nation - Main Application Logic

// State Management
const appState = {
    currentPage: 'home',
    recentAnalyses: [],
    userStats: {
        chaptersRead: 0,
        analysesCount: 0,
        notesCount: 0,
        streakDays: 0
    },
    verseNotes: {},
    currentVerse: null,
    selectedVersion: 'KJV',
    currentBook: 'John',
    currentChapter: 1,
    readingProgress: {
        oldTestament: 0,
        newTestament: 0
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadFromLocalStorage();
    updateDashboard();
});

function initializeApp() {
    setupNavigation();
    setupScriptureAnalysis();
    setupBibleReader();
    setupModals();
    setupSearch();
    attachEventListeners();
}

// Load data from localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('bibleNationData');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            appState.recentAnalyses = data.recentAnalyses || [];
            appState.userStats = data.userStats || appState.userStats;
            appState.verseNotes = data.verseNotes || {};
            appState.readingProgress = data.readingProgress || appState.readingProgress;
            updateRecentAnalysesList();
        } catch (e) {
            console.error('Error loading data:', e);
        }
    }
}

// Save data to localStorage
function saveToLocalStorage() {
    const data = {
        recentAnalyses: appState.recentAnalyses,
        userStats: appState.userStats,
        verseNotes: appState.verseNotes,
        readingProgress: appState.readingProgress
    };
    localStorage.setItem('bibleNationData', JSON.stringify(data));
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            const version = this.getAttribute('data-version');
            
            if (version) {
                appState.selectedVersion = version;
            }
            
            navigateToPage(page);
        });
    });

    // Logo click
    document.querySelector('.logo').addEventListener('click', () => {
        navigateToPage('home');
    });

    // Hero buttons
    document.getElementById('getStartedBtn').addEventListener('click', () => {
        navigateToPage('browse');
    });

    document.getElementById('learnMoreBtn').addEventListener('click', () => {
        showToast('Learn more about Bible Nation features!', 'success');
    });

    // Sign in button
    document.getElementById('signInBtn').addEventListener('click', () => {
        showToast('Sign in functionality coming soon!', 'success');
    });
}

function navigateToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPage = pageName;

        // Load page-specific content
        if (pageName === 'reader') {
            loadBibleChapter();
        } else if (pageName === 'dashboard') {
            updateDashboard();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Scripture Analysis
function setupScriptureAnalysis() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const scriptureSelect = document.getElementById('scriptureSelect');
    const scriptureText = document.getElementById('scriptureText');
    const saveAnalysisBtn = document.getElementById('saveAnalysisBtn');

    analyzeBtn.addEventListener('click', () => {
        const selectedScripture = scriptureSelect.value;
        const typedText = scriptureText.value.trim();

        if (selectedScripture) {
            performAnalysis(selectedScripture);
        } else if (typedText) {
            performAnalysis('custom', typedText);
        } else {
            showToast('Please select or enter a scripture passage', 'error');
        }
    });

    scriptureSelect.addEventListener('change', function() {
        if (this.value) {
            scriptureText.value = '';
        }
    });

    scriptureText.addEventListener('input', function() {
        if (this.value.trim()) {
            scriptureSelect.value = '';
        }
    });

    saveAnalysisBtn.addEventListener('click', saveCurrentAnalysis);

    setupAnalysisTabs();
}

function performAnalysis(reference, customText = null) {
    const analysisResults = document.getElementById('analysisResults');
    const resultsTitle = document.getElementById('resultsTitle');

    // Get scripture and analysis
    let scripture, analysis;
    
    if (customText) {
        scripture = { text: customText, reference: 'Custom Scripture' };
        analysis = getAnalysis('default');
    } else {
        scripture = getScripture(reference);
        analysis = getAnalysis(reference);
    }

    if (!scripture && !customText) {
        showToast('Scripture not found', 'error');
        return;
    }

    // Display results
    resultsTitle.textContent = `Analysis: ${scripture.reference}`;
    
    // Populate tabs
    populateAnalysisTabs(scripture, analysis);

    // Show results
    analysisResults.style.display = 'block';
    analysisResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Store current analysis
    appState.currentAnalysis = {
        reference: scripture.reference,
        text: scripture.text,
        analysis: analysis,
        date: new Date().toISOString()
    };

    showToast('Analysis generated successfully!', 'success');
}

function populateAnalysisTabs(scripture, analysis) {
    // Overview tab
    const overviewTab = document.getElementById('overviewTab');
    overviewTab.innerHTML = `
        <h3>Scripture Text</h3>
        <p style="font-style: italic; padding: 1rem; background: var(--surface); border-radius: var(--radius); border-left: 3px solid var(--primary);">
            "${scripture.text}"
        </p>
        <h3 style="margin-top: 1.5rem;">Overview</h3>
        <p>${analysis.overview}</p>
    `;

    // Themes tab
    const themesTab = document.getElementById('themesTab');
    themesTab.innerHTML = `
        <h3>Key Themes</h3>
        <ul>
            ${analysis.themes.map(theme => `<li>${theme}</li>`).join('')}
        </ul>
    `;

    // Context tab
    const contextTab = document.getElementById('contextTab');
    contextTab.innerHTML = `
        <h3>Historical Context</h3>
        <p>${analysis.context}</p>
    `;

    // Application tab
    const applicationTab = document.getElementById('applicationTab');
    applicationTab.innerHTML = `
        <h3>Practical Application</h3>
        <ul>
            ${analysis.application.map(app => `<li>${app}</li>`).join('')}
        </ul>
    `;

    // References tab
    const referencesTab = document.getElementById('referencesTab');
    referencesTab.innerHTML = `
        <h3>Cross-References</h3>
        <ul>
            ${analysis.references.map(ref => `<li>${ref}</li>`).join('')}
        </ul>
    `;
}

function setupAnalysisTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(tabName + 'Tab').classList.add('active');
        });
    });
}

function saveCurrentAnalysis() {
    if (!appState.currentAnalysis) {
        showToast('No analysis to save', 'error');
        return;
    }

    // Add to recent analyses
    const newAnalysis = {
        ...appState.currentAnalysis,
        id: Date.now()
    };

    appState.recentAnalyses.unshift(newAnalysis);
    
    // Keep only last 10
    if (appState.recentAnalyses.length > 10) {
        appState.recentAnalyses = appState.recentAnalyses.slice(0, 10);
    }

    // Update stats
    appState.userStats.analysesCount++;

    // Save and update UI
    saveToLocalStorage();
    updateRecentAnalysesList();
    updateDashboard();

    showToast('Analysis saved successfully!', 'success');
}

function updateRecentAnalysesList() {
    const recentList = document.getElementById('recentAnalyses');
    
    if (appState.recentAnalyses.length === 0) {
        recentList.innerHTML = '<p class="empty-state">No recent analyses yet. Start by analyzing a scripture passage!</p>';
        return;
    }

    recentList.innerHTML = appState.recentAnalyses.map(analysis => {
        const date = new Date(analysis.date);
        const dateStr = date.toLocaleDateString();
        
        return `
            <div class="recent-item" data-id="${analysis.id}">
                <div class="recent-item-title">${analysis.reference}</div>
                <div class="recent-item-date">${dateStr}</div>
            </div>
        `;
    }).join('');

    // Add click handlers
    document.querySelectorAll('.recent-item').forEach(item => {
        item.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            loadSavedAnalysis(id);
        });
    });
}

function loadSavedAnalysis(id) {
    const analysis = appState.recentAnalyses.find(a => a.id === id);
    if (!analysis) return;

    appState.currentAnalysis = analysis;
    
    const scripture = {
        text: analysis.text,
        reference: analysis.reference
    };

    populateAnalysisTabs(scripture, analysis.analysis);
    
    const analysisResults = document.getElementById('analysisResults');
    const resultsTitle = document.getElementById('resultsTitle');
    resultsTitle.textContent = `Analysis: ${analysis.reference}`;
    analysisResults.style.display = 'block';
    analysisResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Bible Reader
function setupBibleReader() {
    const loadChapterBtn = document.getElementById('loadChapterBtn');
    const bookSelect = document.getElementById('bookSelect');
    const chapterInput = document.getElementById('chapterInput');
    const versionSelect = document.getElementById('versionSelect');

    loadChapterBtn.addEventListener('click', loadBibleChapter);

    bookSelect.addEventListener('change', function() {
        appState.currentBook = this.value;
    });

    chapterInput.addEventListener('change', function() {
        appState.currentChapter = parseInt(this.value) || 1;
    });

    versionSelect.addEventListener('change', function() {
        appState.selectedVersion = this.value;
        loadBibleChapter();
    });
}

function loadBibleChapter() {
    const book = document.getElementById('bookSelect').value;
    const chapter = parseInt(document.getElementById('chapterInput').value) || 1;
    
    appState.currentBook = book;
    appState.currentChapter = chapter;

    const verses = getChapter(book, chapter);
    const verseContainer = document.getElementById('verseContainer');
    const chapterTitle = document.getElementById('chapterTitle');

    chapterTitle.textContent = `${book} ${chapter}`;

    if (verses.length === 0) {
        verseContainer.innerHTML = '<p class="empty-state">Chapter not available. This is a demo with limited content.</p>';
        return;
    }

    verseContainer.innerHTML = verses.map((text, index) => {
        const verseNum = index + 1;
        const verseKey = `${book}_${chapter}_${verseNum}`;
        const hasNote = appState.verseNotes[verseKey];
        const noteClass = hasNote ? 'has-note' : '';

        return `
            <div class="verse ${noteClass}" data-verse="${verseNum}" data-key="${verseKey}">
                <span class="verse-number">${verseNum}</span>
                <span class="verse-text">${text}</span>
            </div>
        `;
    }).join('');

    // Add click handlers for verses
    document.querySelectorAll('.verse').forEach(verse => {
        verse.addEventListener('click', function() {
            const verseNum = this.getAttribute('data-verse');
            const verseKey = this.getAttribute('data-key');
            openVerseNoteModal(verseKey, `${book} ${chapter}:${verseNum}`);
        });
    });

    // Update stats
    appState.userStats.chaptersRead++;
    saveToLocalStorage();
    
    showToast(`Loaded ${book} ${chapter} (${appState.selectedVersion})`, 'success');
}

// Modals
function setupModals() {
    const modal = document.getElementById('verseModal');
    const closeModal = document.getElementById('closeModal');
    const cancelNoteBtn = document.getElementById('cancelNoteBtn');
    const saveNoteBtn = document.getElementById('saveNoteBtn');

    closeModal.addEventListener('click', closeVerseNoteModal);
    cancelNoteBtn.addEventListener('click', closeVerseNoteModal);
    saveNoteBtn.addEventListener('click', saveVerseNote);

    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVerseNoteModal();
        }
    });
}

function openVerseNoteModal(verseKey, verseTitle) {
    const modal = document.getElementById('verseModal');
    const modalTitle = document.getElementById('modalVerseTitle');
    const noteText = document.getElementById('verseNoteText');

    appState.currentVerse = verseKey;
    modalTitle.textContent = `Notes for ${verseTitle}`;
    noteText.value = appState.verseNotes[verseKey] || '';

    modal.classList.add('show');
}

function closeVerseNoteModal() {
    const modal = document.getElementById('verseModal');
    modal.classList.remove('show');
    appState.currentVerse = null;
}

function saveVerseNote() {
    if (!appState.currentVerse) return;

    const noteText = document.getElementById('verseNoteText').value.trim();
    
    if (noteText) {
        const hadNote = !!appState.verseNotes[appState.currentVerse];
        appState.verseNotes[appState.currentVerse] = noteText;
        
        if (!hadNote) {
            appState.userStats.notesCount++;
        }

        saveToLocalStorage();
        loadBibleChapter(); // Reload to update styling
        showToast('Note saved successfully!', 'success');
    } else {
        // Delete note if empty
        if (appState.verseNotes[appState.currentVerse]) {
            delete appState.verseNotes[appState.currentVerse];
            appState.userStats.notesCount = Math.max(0, appState.userStats.notesCount - 1);
            saveToLocalStorage();
            loadBibleChapter();
            showToast('Note deleted', 'success');
        }
    }

    closeVerseNoteModal();
    updateDashboard();
}

// Dashboard
function updateDashboard() {
    // Update stats
    document.getElementById('chaptersRead').textContent = appState.userStats.chaptersRead;
    document.getElementById('analysesCount').textContent = appState.userStats.analysesCount;
    document.getElementById('notesCount').textContent = appState.userStats.notesCount;
    document.getElementById('streakDays').textContent = appState.userStats.streakDays;

    // Update progress bars
    const otProgress = Math.min(100, appState.readingProgress.oldTestament);
    const ntProgress = Math.min(100, appState.readingProgress.newTestament);
    
    document.getElementById('otProgress').textContent = `${otProgress}%`;
    document.getElementById('otProgressBar').style.width = `${otProgress}%`;
    document.getElementById('ntProgress').textContent = `${ntProgress}%`;
    document.getElementById('ntProgressBar').style.width = `${ntProgress}%`;

    // Update recent activity
    updateRecentActivity();
}

function updateRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    
    const activities = [];
    
    // Add recent analyses
    appState.recentAnalyses.slice(0, 3).forEach(analysis => {
        activities.push({
            title: 'Scripture Analysis',
            desc: analysis.reference,
            date: new Date(analysis.date)
        });
    });

    // Add recent notes
    const recentNotes = Object.keys(appState.verseNotes)
        .map(key => ({ key, note: appState.verseNotes[key] }))
        .slice(0, 2);
    
    recentNotes.forEach(({ key }) => {
        const parts = key.split('_');
        activities.push({
            title: 'Verse Note Added',
            desc: `${parts[0]} ${parts[1]}:${parts[2]}`,
            date: new Date()
        });
    });

    // Sort by date
    activities.sort((a, b) => b.date - a.date);

    if (activities.length === 0) {
        activityList.innerHTML = '<p class="empty-state">No recent activity yet. Start exploring scripture!</p>';
        return;
    }

    activityList.innerHTML = activities.slice(0, 5).map(activity => `
        <div class="activity-item">
            <div class="activity-item-title">${activity.title}</div>
            <div class="activity-item-desc">${activity.desc}</div>
        </div>
    `).join('');
}

// Search
function setupSearch() {
    const searchInput = document.getElementById('headerSearch');
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });
}

function performSearch(query) {
    showToast(`Searching for: ${query}`, 'success');
    // In a real app, this would search through scripture
    navigateToPage('browse');
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Additional event listeners
function attachEventListeners() {
    // Update streak daily (mock implementation)
    if (!localStorage.getItem('lastVisit')) {
        appState.userStats.streakDays = 1;
    } else {
        const lastVisit = new Date(localStorage.getItem('lastVisit'));
        const today = new Date();
        const diffDays = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            appState.userStats.streakDays++;
        } else if (diffDays > 1) {
            appState.userStats.streakDays = 1;
        }
    }
    
    localStorage.setItem('lastVisit', new Date().toISOString());
    saveToLocalStorage();
}

// Simulate reading progress (demo purposes)
function updateReadingProgress() {
    const totalActivities = appState.userStats.chaptersRead + appState.userStats.analysesCount;
    
    // Distribute progress between OT and NT
    appState.readingProgress.oldTestament = Math.min(100, totalActivities * 2);
    appState.readingProgress.newTestament = Math.min(100, totalActivities * 3);
    
    saveToLocalStorage();
}

// Auto-update progress when stats change
setInterval(() => {
    updateReadingProgress();
}, 5000);
