// GreenApron SSV - Core Application Logic
// Handles state, timers, calculators, audio synthesis, and offline persistence

(function() {
  'use strict';

  // State Management
  const state = {
    activeView: 'routines',
    activeRoutine: 'open',
    leadershipSubview: 'scenarios',
    soundEnabled: true,
    csTimer: {
      duration: 480, // default 8 min in seconds
      remaining: 480,
      isRunning: false,
      intervalId: null
    },
    breaks: [],
    breakIntervalId: null,
    quiz: {
      score: 0,
      answeredCount: 0,
      userAnswers: {}
    }
  };

  // Day Colors according to Starbucks Day-Dot Sticker Standard
  const DAY_COLORS = {
    Sunday: { color: '#111827', name: 'BLACK' },
    Monday: { color: '#2563eb', name: 'BLUE' },
    Tuesday: { color: '#eab308', name: 'YELLOW' },
    Wednesday: { color: '#dc2626', name: 'RED' },
    Thursday: { color: '#78350f', name: 'BROWN' },
    Friday: { color: '#16a34a', name: 'GREEN' },
    Saturday: { color: '#ea580c', name: 'ORANGE' }
  };

  const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  // Audio Synth via Web Audio API (Zero external assets needed)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playAlertChime(type = 'success') {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'alarm') {
        // Double warning beep
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(659, now + 0.15);
        osc.frequency.setValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else {
        // Melodic positive chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.12); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.24); // G5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch (e) {
      console.warn("Audio playback not supported or user gesture needed", e);
    }
  }

  // DOM Elements
  const elements = {
    liveTimeStr: document.getElementById('live-time-str'),
    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    quickHotlineBtn: document.getElementById('quick-hotline-btn'),
    hotlineModal: document.getElementById('hotline-modal'),
    closeHotlineBtn: document.getElementById('close-hotline-btn'),
    hotlineContactsList: document.getElementById('hotline-contacts-list'),
    
    // Bottom Navigation
    navItems: document.querySelectorAll('.bottom-nav .nav-item'),
    views: document.querySelectorAll('.app-view'),

    // Routines View
    routinePills: document.querySelectorAll('.pill-tabs .pill-tab[data-routine]'),
    routineTitle: document.getElementById('routine-title'),
    routineTiming: document.getElementById('routine-timing'),
    routineDesc: document.getElementById('routine-desc'),
    routineProgressFill: document.getElementById('routine-progress-fill'),
    routineProgressLabel: document.getElementById('routine-progress-label'),
    taskListContainer: document.getElementById('task-list-container'),
    resetChecklistBtn: document.getElementById('reset-checklist-btn'),

    // Playcaller View
    storeFormatSelect: document.getElementById('store-format-select'),
    partnerCountSelect: document.getElementById('partner-count-select'),
    deploymentOutput: document.getElementById('deployment-output'),
    breakPartnerName: document.getElementById('break-partner-name'),
    start10Btn: document.getElementById('start-10-btn'),
    start30Btn: document.getElementById('start-30-btn'),
    activeBreaksContainer: document.getElementById('active-breaks-container'),

    // Day-Dot View
    stickerItemSelect: document.getElementById('sticker-item-select'),
    prepTimeInput: document.getElementById('prep-time-input'),
    partnerInitials: document.getElementById('partner-initials'),
    stickerColorBar: document.getElementById('sticker-color-bar'),
    previewDay: document.getElementById('preview-day'),
    previewCategory: document.getElementById('preview-category'),
    previewItem: document.getElementById('preview-item'),
    previewTime: document.getElementById('preview-time'),
    previewDate: document.getElementById('preview-date'),
    previewInitials: document.getElementById('preview-initials'),
    stickerRuleTip: document.getElementById('sticker-rule-tip'),
    shelfSearchInput: document.getElementById('shelf-search-input'),
    shelfListContainer: document.getElementById('shelf-list-container'),
    shelfCountBadge: document.getElementById('shelf-count-badge'),

    // Cash View
    safeParTarget: document.getElementById('safe-par-target'),
    resetSafeBtn: document.getElementById('reset-safe-btn'),
    denomInputs: document.querySelectorAll('.denom-input'),
    looseCoinsInput: document.getElementById('loose-coins-input'),
    safeTotalDisplay: document.getElementById('safe-total-display'),
    safeVarianceDisplay: document.getElementById('safe-variance-display'),
    cashRulesContainer: document.getElementById('cash-rules-container'),

    // CS Timer View
    cycleBtns: document.querySelectorAll('.cycle-btn'),
    csCountdownDisplay: document.getElementById('cs-countdown-display'),
    csTimerStartBtn: document.getElementById('cs-timer-start-btn'),
    csTimerResetBtn: document.getElementById('cs-timer-reset-btn'),

    // Recipes View
    recipeSearchInput: document.getElementById('recipe-search-input'),
    recipeListContainer: document.getElementById('recipe-list-container'),

    // Leadership View
    leadershipPills: document.querySelectorAll('.pill-tab[data-subview]'),
    leadershipSubviews: document.querySelectorAll('.leadership-subview'),
    scenariosContainer: document.getElementById('scenarios-container'),
    foodSafetyContainer: document.getElementById('food-safety-container'),
    quizBodyContainer: document.getElementById('quiz-body-container'),
    quizScoreNum: document.getElementById('quiz-score-num'),
    quizTotalNum: document.getElementById('quiz-total-num'),
    restartQuizBtn: document.getElementById('restart-quiz-btn'),

    // Handover View
    handoverDaypart: document.getElementById('handover-daypart'),
    handover86: document.getElementById('handover-86'),
    handoverEquipment: document.getElementById('handover-equipment'),
    handoverShoutout: document.getElementById('handover-shoutout'),
    saveHandoverBtn: document.getElementById('save-handover-btn'),
    copyHandoverBtn: document.getElementById('copy-handover-btn'),
    clearHandoverBtn: document.getElementById('clear-handover-btn'),
    handoverStatus: document.getElementById('handover-status')
  };

  // 1. App Initialization
  function init() {
    updateClock();
    setInterval(updateClock, 1000);

    initNavigation();
    initRoutines();
    initPlaycaller();
    initBreakTimers();
    initDayDotCalculator();
    initCashCalculator();
    initCsTimer();
    initRecipes();
    initLeadership();
    initHandover();
    initHotlines();
    initSoundToggle();

    // Register service worker if available
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => {
          console.log('SW registration note:', err);
        });
      });
    }
  }

  // Real-time Clock & Daypart Identifier
  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    let daypart = "Mid Shift";
    if (hours < 7) daypart = "Morning Open";
    else if (hours >= 7 && hours < 11) daypart = "Morning Peak";
    else if (hours >= 11 && hours < 16) daypart = "Midday Operations";
    else if (hours >= 16 && hours < 20) daypart = "Evening / Pre-Close";
    else daypart = "Closing & Safe";

    const dayName = DAYS_OF_WEEK[now.getDay()];
    elements.liveTimeStr.textContent = `${dayName} ${displayHours}:${minutes} ${ampm} • ${daypart}`;
  }

  // Navigation Controller
  function initNavigation() {
    elements.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.target;
        switchView(target);
      });
    });
  }

  function switchView(viewName) {
    state.activeView = viewName;
    elements.views.forEach(v => {
      v.classList.remove('active');
      if (v.id === `view-${viewName}`) {
        v.classList.add('active');
      }
    });

    elements.navItems.forEach(nav => {
      nav.classList.toggle('active', nav.dataset.target === viewName);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 2. Shift Routines & Checklists
  function initRoutines() {
    elements.routinePills.forEach(pill => {
      pill.addEventListener('click', () => {
        elements.routinePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeRoutine = pill.dataset.routine;
        renderRoutine();
      });
    });

    elements.resetChecklistBtn.addEventListener('click', () => {
      if (confirm(`Reset all tasks for ${SSV_DATA.routines[state.activeRoutine].title}?`)) {
        localStorage.removeItem(`sbux_checklist_${state.activeRoutine}`);
        renderRoutine();
      }
    });

    renderRoutine();
  }

  function getSavedChecklist(routineKey) {
    try {
      const data = localStorage.getItem(`sbux_checklist_${routineKey}`);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveChecklist(routineKey, taskStates) {
    try {
      localStorage.setItem(`sbux_checklist_${routineKey}`, JSON.stringify(taskStates));
    } catch (e) {}
  }

  function renderRoutine() {
    const routine = SSV_DATA.routines[state.activeRoutine];
    if (!routine) return;

    elements.routineTitle.textContent = routine.title;
    elements.routineTiming.textContent = routine.duration;
    elements.routineDesc.textContent = routine.description;

    const savedStates = getSavedChecklist(state.activeRoutine);
    elements.taskListContainer.innerHTML = '';

    let completedCount = 0;
    const totalCount = routine.tasks.length;

    routine.tasks.forEach(task => {
      const isDone = !!savedStates[task.id];
      if (isDone) completedCount++;

      const item = document.createElement('div');
      item.className = `task-item ${isDone ? 'completed' : ''}`;
      
      const tagHtml = `
        <span class="task-tag ${task.critical ? 'critical' : ''}">${task.tag}</span>
        ${task.critical ? '<span class="task-tag critical">CRITICAL</span>' : ''}
      `;

      item.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${isDone ? 'checked' : ''}>
        <div class="task-content">
          <div class="task-tags">${tagHtml}</div>
          <div class="task-text">${task.text}</div>
        </div>
      `;

      // Click event for checkbox and item
      item.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          const cb = item.querySelector('.task-checkbox');
          cb.checked = !cb.checked;
        }
        const checked = item.querySelector('.task-checkbox').checked;
        savedStates[task.id] = checked;
        saveChecklist(state.activeRoutine, savedStates);
        
        if (checked) {
          playAlertChime('success');
        }
        renderRoutine();
      });

      elements.taskListContainer.appendChild(item);
    });

    const percent = Math.round((completedCount / totalCount) * 100);
    elements.routineProgressFill.style.width = `${percent}%`;
    elements.routineProgressLabel.textContent = `${completedCount} of ${totalCount} completed (${percent}%)`;
  }

  // 3. Playcaller & Deployment Matrix
  function initPlaycaller() {
    elements.storeFormatSelect.addEventListener('change', renderDeployment);
    elements.partnerCountSelect.addEventListener('change', renderDeployment);
    renderDeployment();
  }

  function renderDeployment() {
    const format = elements.storeFormatSelect.value;
    const count = parseInt(elements.partnerCountSelect.value, 10);
    const list = SSV_DATA.deployments[format] || [];
    
    // Find deployment matching count or closest
    let matched = list.find(d => d.partnerCount === count);
    if (!matched) {
      matched = list[list.length - 1];
    }

    let positionsHtml = '';
    matched.positions.forEach(pos => {
      positionsHtml += `
        <div class="position-card">
          <div class="pos-role">${pos.role}</div>
          <div class="pos-detail"><strong>Primary:</strong> ${pos.primary}</div>
          <div class="pos-flex"><strong>Flex / Secondary:</strong> ${pos.secondary}</div>
        </div>
      `;
    });

    elements.deploymentOutput.innerHTML = `
      <div class="deployment-header">
        <h4>${matched.name}</h4>
        <p><strong>Strategic Focus:</strong> ${matched.primaryFocus}</p>
      </div>
      <div class="positions-list">
        ${positionsHtml}
      </div>
      <div class="playcaller-tips">
        <strong>Shift Lead Playcaller Tip:</strong> ${matched.tips}
      </div>
    `;
  }

  // Break Timers Manager
  function initBreakTimers() {
    elements.start10Btn.addEventListener('click', () => addBreak(10));
    elements.start30Btn.addEventListener('click', () => addBreak(30));

    // Start background interval for breaks
    state.breakIntervalId = setInterval(tickBreaks, 1000);
  }

  function addBreak(minutes) {
    const name = elements.breakPartnerName.value.trim() || 'Partner';
    const totalSeconds = minutes * 60;
    const breakObj = {
      id: Date.now(),
      name,
      type: `${minutes}-Minute ${minutes === 10 ? 'Rest' : 'Meal'}`,
      remainingSeconds: totalSeconds,
      initialSeconds: totalSeconds,
      isExpired: false
    };

    state.breaks.push(breakObj);
    elements.breakPartnerName.value = '';
    renderBreaks();
    playAlertChime('success');
  }

  function tickBreaks() {
    if (state.breaks.length === 0) return;

    let hasExpired = false;
    state.breaks.forEach(b => {
      if (b.remainingSeconds > 0) {
        b.remainingSeconds--;
        if (b.remainingSeconds === 0) {
          b.isExpired = true;
          hasExpired = true;
        }
      }
    });

    if (hasExpired) {
      playAlertChime('alarm');
      if ('vibrate' in navigator) navigator.vibrate([300, 150, 300]);
    }

    renderBreaks();
  }

  function renderBreaks() {
    if (state.breaks.length === 0) {
      elements.activeBreaksContainer.innerHTML = `<div class="empty-state">No partner breaks currently active.</div>`;
      return;
    }

    elements.activeBreaksContainer.innerHTML = '';
    state.breaks.forEach(b => {
      const mins = Math.floor(b.remainingSeconds / 60);
      const secs = b.remainingSeconds % 60;
      const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      const card = document.createElement('div');
      card.className = `break-item ${b.isExpired ? 'alarm' : ''}`;
      card.innerHTML = `
        <div class="break-partner-info">
          <span class="break-name">${b.name}</span>
          <span class="break-type">${b.type}</span>
        </div>
        <div class="break-clock">${b.isExpired ? 'OVERDUE!' : timeStr}</div>
        <button class="btn btn-secondary" style="padding:4px 8px; font-size:0.75rem;">Done</button>
      `;

      card.querySelector('button').addEventListener('click', () => {
        state.breaks = state.breaks.filter(item => item.id !== b.id);
        renderBreaks();
      });

      elements.activeBreaksContainer.appendChild(card);
    });
  }

  // 4. Day-Dot & Shelf Life Database
  function initDayDotCalculator() {
    // Populate select dropdown
    elements.stickerItemSelect.innerHTML = '';
    SSV_DATA.shelfLife.forEach((item, index) => {
      const opt = document.createElement('option');
      opt.value = index;
      opt.textContent = `${item.name} (${item.ambient.includes('N/A') ? item.refrigerated : item.ambient})`;
      elements.stickerItemSelect.appendChild(opt);
    });

    // Default prep time to current local time
    const now = new Date();
    const currH = String(now.getHours()).padStart(2, '0');
    const currM = String(now.getMinutes()).padStart(2, '0');
    elements.prepTimeInput.value = `${currH}:${currM}`;

    elements.stickerItemSelect.addEventListener('change', updateDayDotPreview);
    elements.prepTimeInput.addEventListener('change', updateDayDotPreview);
    elements.partnerInitials.addEventListener('input', updateDayDotPreview);
    elements.shelfSearchInput.addEventListener('input', renderShelfLifeDirectory);

    updateDayDotPreview();
    renderShelfLifeDirectory();
  }

  function updateDayDotPreview() {
    const selectedIdx = parseInt(elements.stickerItemSelect.value, 10);
    const item = SSV_DATA.shelfLife[selectedIdx] || SSV_DATA.shelfLife[0];
    const initials = (elements.partnerInitials.value || 'LP').toUpperCase();

    // Calculate expiration timestamp
    const now = new Date();
    const prepVal = elements.prepTimeInput.value;
    if (prepVal) {
      const [h, m] = prepVal.split(':');
      now.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
    }

    const expireDate = new Date(now.getTime() + item.hours * 60 * 60 * 1000);
    const dayOfWeek = DAYS_OF_WEEK[expireDate.getDay()];
    const dayColorInfo = DAY_COLORS[dayOfWeek] || { color: '#006241', name: 'GREEN' };

    // Set preview values
    elements.stickerColorBar.style.backgroundColor = dayColorInfo.color;
    elements.previewDay.textContent = `${dayOfWeek.toUpperCase()} (${dayColorInfo.name})`;
    elements.previewDay.style.color = dayColorInfo.color;
    elements.previewCategory.textContent = item.tag.toUpperCase();
    elements.previewItem.textContent = item.name;

    // Time display format
    let expireHours = expireDate.getHours();
    const expireMinutes = String(expireDate.getMinutes()).padStart(2, '0');
    const expireAmpm = expireHours >= 12 ? 'PM' : 'AM';
    const displayH = expireHours % 12 || 12;
    
    // For 24h items ending at store close or exact hour
    let timeLabel = `${displayH}:${expireMinutes} ${expireAmpm}`;
    if (item.hours >= 48 && item.hours % 24 === 0) {
      timeLabel += " (Close)";
    }
    elements.previewTime.textContent = timeLabel;

    const dateStr = `${MONTHS[expireDate.getMonth()]} ${expireDate.getDate()}, ${expireDate.getFullYear()}`;
    elements.previewDate.textContent = dateStr;
    elements.previewInitials.textContent = `PREP: ${initials}`;

    elements.stickerRuleTip.innerHTML = `
      <strong>Rule:</strong> ${item.ambient.includes('N/A') ? 'Refrigerated: ' + item.refrigerated : 'Ambient: ' + item.ambient}.
      ${item.notes ? '<br><em>' + item.notes + '</em>' : ''}
    `;
  }

  function renderShelfLifeDirectory() {
    const query = (elements.shelfSearchInput.value || '').toLowerCase().trim();
    elements.shelfListContainer.innerHTML = '';

    const filtered = SSV_DATA.shelfLife.filter(item => {
      return item.name.toLowerCase().includes(query) ||
             item.category.toLowerCase().includes(query) ||
             item.tag.toLowerCase().includes(query) ||
             (item.notes && item.notes.toLowerCase().includes(query));
    });

    elements.shelfCountBadge.textContent = `${filtered.length} items`;

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'shelf-card';
      card.innerHTML = `
        <div class="shelf-top">
          <span class="shelf-name">${item.name}</span>
          <span class="shelf-tag">${item.tag}</span>
        </div>
        <div class="shelf-details">
          <span><strong>Ambient:</strong> ${item.ambient}</span>
          ${item.refrigerated !== 'N/A' ? `<span><strong>Fridge:</strong> ${item.refrigerated}</span>` : ''}
        </div>
        ${item.notes ? `<div class="shelf-notes">${item.notes}</div>` : ''}
      `;
      elements.shelfListContainer.appendChild(card);
    });
  }

  // 5. Cash & Safe Calculator
  function initCashCalculator() {
    elements.denomInputs.forEach(input => {
      input.addEventListener('input', calculateSafeTotal);
    });
    elements.safeParTarget.addEventListener('input', calculateSafeTotal);
    elements.resetSafeBtn.addEventListener('click', () => {
      elements.denomInputs.forEach(input => input.value = '');
      calculateSafeTotal();
    });

    // Populate cash standards list
    elements.cashRulesContainer.innerHTML = '';
    SSV_DATA.cashGuide.guidelines.forEach(g => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${g.rule}:</strong> ${g.desc}`;
      elements.cashRulesContainer.appendChild(li);
    });

    calculateSafeTotal();
  }

  function calculateSafeTotal() {
    let total = 0;
    elements.denomInputs.forEach(input => {
      const val = parseFloat(input.value) || 0;
      const multiplier = parseFloat(input.dataset.value) || 1;
      total += (val * multiplier);
    });

    const targetPar = parseFloat(elements.safeParTarget.value) || SSV_DATA.cashGuide.safeParDefault;
    const variance = total - targetPar;

    elements.safeTotalDisplay.textContent = `$${total.toFixed(2)}`;

    let varianceHtml = '';
    if (Math.abs(variance) < 0.01) {
      varianceHtml = `<span class="variance-balanced">$0.00 (Perfect Match)</span>`;
    } else if (variance > 0) {
      varianceHtml = `<span class="variance-over">+$${variance.toFixed(2)} (Over Par)</span>`;
    } else {
      varianceHtml = `<span class="variance-short">-$${Math.abs(variance).toFixed(2)} (Short of Par)</span>`;
    }

    elements.safeVarianceDisplay.innerHTML = varianceHtml;
  }

  // 6. Customer Support (CS) Cycle Timer
  function initCsTimer() {
    elements.cycleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.cycleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.csTimer.duration = parseInt(btn.dataset.time, 10);
        resetCsTimer();
      });
    });

    elements.csTimerStartBtn.addEventListener('click', toggleCsTimer);
    elements.csTimerResetBtn.addEventListener('click', resetCsTimer);

    updateCsDisplay();
  }

  function toggleCsTimer() {
    if (state.csTimer.isRunning) {
      pauseCsTimer();
    } else {
      startCsTimer();
    }
  }

  function startCsTimer() {
    state.csTimer.isRunning = true;
    elements.csTimerStartBtn.textContent = "Pause Cycle";
    elements.csTimerStartBtn.className = "btn btn-secondary btn-large";

    state.csTimer.intervalId = setInterval(() => {
      if (state.csTimer.remaining > 0) {
        state.csTimer.remaining--;
        updateCsDisplay();
      } else {
        // Cycle Complete!
        pauseCsTimer();
        playAlertChime('alarm');
        if ('vibrate' in navigator) navigator.vibrate([400, 200, 400]);
        alert("⏱️ CS Timer Alert! Rotate coffee, restock milks & ice, and check lobby!");
        resetCsTimer();
      }
    }, 1000);
  }

  function pauseCsTimer() {
    state.csTimer.isRunning = false;
    clearInterval(state.csTimer.intervalId);
    elements.csTimerStartBtn.textContent = "Resume Cycle";
    elements.csTimerStartBtn.className = "btn btn-primary btn-large";
  }

  function resetCsTimer() {
    pauseCsTimer();
    state.csTimer.remaining = state.csTimer.duration;
    elements.csTimerStartBtn.textContent = "Start Cycle";
    updateCsDisplay();
  }

  function updateCsDisplay() {
    const m = Math.floor(state.csTimer.remaining / 60);
    const s = state.csTimer.remaining % 60;
    elements.csCountdownDisplay.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // 7. Beverage Standards & Recipes
  function initRecipes() {
    elements.recipeSearchInput.addEventListener('input', renderRecipes);
    renderRecipes();
  }

  function renderRecipes() {
    const query = (elements.recipeSearchInput.value || '').toLowerCase().trim();
    elements.recipeListContainer.innerHTML = '';

    const filtered = SSV_DATA.recipes.filter(r => {
      return r.name.toLowerCase().includes(query) ||
             r.category.toLowerCase().includes(query) ||
             (r.notes && r.notes.toLowerCase().includes(query)) ||
             (r.ingredients && r.ingredients.toLowerCase().includes(query));
    });

    filtered.forEach(r => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      
      let detailsHtml = '';
      if (r.short || r.tall) {
        detailsHtml = `
          <div style="margin:4px 0;">
            ${r.short ? `<strong>Short:</strong> ${r.short} | ` : ''}
            <strong>Tall:</strong> ${r.tall} | 
            <strong>Grande:</strong> ${r.grande} | 
            ${r.ventiHot ? `<strong>Venti Hot:</strong> ${r.ventiHot} | ` : ''}
            ${r.ventiIced ? `<strong>Venti Iced:</strong> ${r.ventiIced}` : ''}
          </div>
        `;
      }
      if (r.ingredients) {
        detailsHtml += `<div><strong>Ingredients:</strong> ${r.ingredients}</div>`;
      }
      if (r.steps) {
        detailsHtml += `<div><strong>Sequence:</strong> ${r.steps}</div>`;
      }
      if (r.notes) {
        detailsHtml += `<div style="color:var(--text-muted); font-size:0.78rem; margin-top:4px;"><em>${r.notes}</em></div>`;
      }

      card.innerHTML = `
        <div class="recipe-header">
          <span class="recipe-name">${r.name}</span>
          <span class="recipe-category">${r.category}</span>
        </div>
        <div class="recipe-body">
          ${detailsHtml}
        </div>
      `;
      elements.recipeListContainer.appendChild(card);
    });
  }

  // 8. Leadership, Scenarios, Quiz & Food Safety
  function initLeadership() {
    elements.leadershipPills.forEach(pill => {
      pill.addEventListener('click', () => {
        elements.leadershipPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.leadershipSubview = pill.dataset.subview;

        elements.leadershipSubviews.forEach(sub => {
          sub.classList.toggle('active', sub.id === `subview-${state.leadershipSubview}`);
        });
      });
    });

    renderScenarios();
    renderFoodSafety();
    initQuiz();
  }

  function renderScenarios() {
    elements.scenariosContainer.innerHTML = '';
    SSV_DATA.scenarios.forEach(sc => {
      const card = document.createElement('div');
      card.className = 'scenario-card';
      card.innerHTML = `
        <span class="scenario-category">${sc.category}</span>
        <h4 class="scenario-title">${sc.title}</h4>
        <div class="scenario-situation"><strong>The Floor Situation:</strong> ${sc.situation}</div>
        <div class="scenario-action-title">Optimal SSV Action & Decision:</div>
        <div class="scenario-action">${sc.correctAction}</div>
        <div class="scenario-takeaway"><strong>Leadership Key:</strong> ${sc.ssvTakeaway}</div>
      `;
      elements.scenariosContainer.appendChild(card);
    });
  }

  function renderFoodSafety() {
    elements.foodSafetyContainer.innerHTML = '';
    SSV_DATA.foodSafety.forEach(fs => {
      const card = document.createElement('div');
      card.className = 'food-safety-card';
      card.innerHTML = `
        <div class="fs-top">
          <span class="fs-title">${fs.title}</span>
          <span class="fs-target">${fs.target}</span>
        </div>
        <div class="fs-rule">${fs.rule}</div>
      `;
      elements.foodSafetyContainer.appendChild(card);
    });
  }

  function initQuiz() {
    elements.quizTotalNum.textContent = SSV_DATA.quiz.length;
    elements.restartQuizBtn.addEventListener('click', resetQuiz);
    resetQuiz();
  }

  function resetQuiz() {
    state.quiz.score = 0;
    state.quiz.answeredCount = 0;
    state.quiz.userAnswers = {};
    elements.quizScoreNum.textContent = '0';
    elements.restartQuizBtn.style.display = 'none';

    elements.quizBodyContainer.innerHTML = '';
    SSV_DATA.quiz.forEach((q, idx) => {
      const qCard = document.createElement('div');
      qCard.className = 'quiz-question-card';
      qCard.id = `quiz-q-${idx}`;

      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        optionsHtml += `<button class="quiz-option-btn" data-q="${idx}" data-opt="${optIdx}">${opt}</button>`;
      });

      qCard.innerHTML = `
        <div class="quiz-q-num">Question ${idx + 1} of ${SSV_DATA.quiz.length}</div>
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-options">${optionsHtml}</div>
        <div class="quiz-explanation" id="quiz-exp-${idx}"><strong>Standard Explanation:</strong> ${q.explanation}</div>
      `;

      // Attach option click listeners
      qCard.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', () => handleQuizAnswer(idx, parseInt(btn.dataset.opt, 10)));
      });

      elements.quizBodyContainer.appendChild(qCard);
    });
  }

  function handleQuizAnswer(qIndex, selectedOptionIndex) {
    if (state.quiz.userAnswers[qIndex] !== undefined) return; // already answered
    state.quiz.userAnswers[qIndex] = selectedOptionIndex;
    state.quiz.answeredCount++;

    const q = SSV_DATA.quiz[qIndex];
    const qCard = document.getElementById(`quiz-q-${qIndex}`);
    const explanationEl = document.getElementById(`quiz-exp-${qIndex}`);
    const optionBtns = qCard.querySelectorAll('.quiz-option-btn');

    if (selectedOptionIndex === q.answer) {
      state.quiz.score++;
      elements.quizScoreNum.textContent = state.quiz.score;
      optionBtns[selectedOptionIndex].classList.add('correct');
      playAlertChime('success');
    } else {
      optionBtns[selectedOptionIndex].classList.add('incorrect');
      optionBtns[q.answer].classList.add('correct');
      playAlertChime('alarm');
    }

    explanationEl.style.display = 'block';

    if (state.quiz.answeredCount === SSV_DATA.quiz.length) {
      elements.restartQuizBtn.style.display = 'block';
    }
  }

  // 9. Shift Handover Notes
  function initHandover() {
    // Load saved notes
    try {
      const saved = JSON.parse(localStorage.getItem('sbux_handover_notes') || '{}');
      if (saved.daypart) elements.handoverDaypart.value = saved.daypart;
      if (saved.out86) elements.handover86.value = saved.out86;
      if (saved.equipment) elements.handoverEquipment.value = saved.equipment;
      if (saved.shoutout) elements.handoverShoutout.value = saved.shoutout;
    } catch(e) {}

    elements.saveHandoverBtn.addEventListener('click', () => {
      const data = {
        daypart: elements.handoverDaypart.value,
        out86: elements.handover86.value,
        equipment: elements.handoverEquipment.value,
        shoutout: elements.handoverShoutout.value,
        savedAt: new Date().toLocaleString()
      };
      localStorage.setItem('sbux_handover_notes', JSON.stringify(data));
      elements.handoverStatus.textContent = `✓ Handover saved locally at ${new Date().toLocaleTimeString()}!`;
      elements.handoverStatus.style.color = 'var(--sb-success)';
      playAlertChime('success');
      setTimeout(() => elements.handoverStatus.textContent = '', 3000);
    });

    elements.copyHandoverBtn.addEventListener('click', () => {
      const text = `📋 STARBUCKS SHIFT HANDOVER (${elements.handoverDaypart.value})\n` +
                   `📅 ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()}\n\n` +
                   `🚫 86'd / Depleted Stock:\n${elements.handover86.value || 'None'}\n\n` +
                   `🔧 Equipment / Maintenance Tickets:\n${elements.handoverEquipment.value || 'All equipment operational'}\n\n` +
                   `🌟 Partner Celebrations & Notes:\n${elements.handoverShoutout.value || 'Great shift teamwork!'}`;

      navigator.clipboard.writeText(text).then(() => {
        elements.handoverStatus.textContent = '✓ Copied formatted summary to clipboard! Paste in group chat.';
        elements.handoverStatus.style.color = 'var(--sb-success)';
        playAlertChime('success');
        setTimeout(() => elements.handoverStatus.textContent = '', 4000);
      }).catch(() => {
        alert("Clipboard permission denied. Please copy text manually.");
      });
    });

    elements.clearHandoverBtn.addEventListener('click', () => {
      if (confirm("Clear all shift handover notes?")) {
        elements.handover86.value = '';
        elements.handoverEquipment.value = '';
        elements.handoverShoutout.value = '';
        localStorage.removeItem('sbux_handover_notes');
      }
    });
  }

  // 10. Emergency Hotlines Modal
  function initHotlines() {
    elements.quickHotlineBtn.addEventListener('click', () => {
      elements.hotlineModal.classList.add('active');
    });
    elements.closeHotlineBtn.addEventListener('click', () => {
      elements.hotlineModal.classList.remove('active');
    });
    elements.hotlineModal.addEventListener('click', (e) => {
      if (e.target === elements.hotlineModal) {
        elements.hotlineModal.classList.remove('active');
      }
    });

    elements.hotlineContactsList.innerHTML = '';
    SSV_DATA.contacts.forEach(c => {
      const card = document.createElement('div');
      card.className = 'contact-card';
      card.innerHTML = `
        <div class="contact-title">${c.title}</div>
        <a href="tel:${c.phone.replace(/[^0-9]/g, '')}" class="contact-phone">${c.phone}</a>
        <div class="contact-desc">${c.desc}</div>
      `;
      elements.hotlineContactsList.appendChild(card);
    });
  }

  // Sound Toggle Controller
  function initSoundToggle() {
    elements.soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      elements.soundToggleBtn.classList.toggle('active', state.soundEnabled);
      elements.soundToggleBtn.title = state.soundEnabled ? "Sound alerts enabled" : "Sound muted";
      if (state.soundEnabled) playAlertChime('success');
    });
  }

  // Boot on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
