/* ====================================================================
   TOJI PROTOCOL — Application logic
   Depends on data.js being loaded first (programData, exercises,
   week1Workouts).
   ==================================================================== */

// ---------------------------------------------------------------------
// State
// ---------------------------------------------------------------------
let currentSection = 'dashboard';
let currentDay = 1;
let userProgress = {
    completedDays: [],
    waterIntake: {},
    measurements: {},
    strengthTests: {},
    habits: {},
    checklistCompleted: {}
};

// ---------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    initializeDashboard();
    renderWeekView();
    renderExerciseLibrary();
    renderHabitTracker();
    updateWaterTracker();
});

// ---------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------
function showSection(sectionName) {
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(sectionName).classList.add('active');
    document.getElementById(`btn-${sectionName}`).classList.add('active');

    currentSection = sectionName;

    if (sectionName === 'workout') {
        loadDayWorkout(currentDay);
    }

    document.getElementById('navButtons').classList.remove('active');
}

function toggleMobileMenu() {
    document.getElementById('navButtons').classList.toggle('active');
}

// ---------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------
function initializeDashboard() {
    const today = new Date();
    const daysElapsed = Math.floor((today - programData.startDate) / (1000 * 60 * 60 * 24)) + 1;
    currentDay = Math.min(Math.max(daysElapsed, 1), 365);

    const weekNumber = Math.ceil(currentDay / 7);
    if (weekNumber <= 8) programData.phase = 1;
    else if (weekNumber <= 16) programData.phase = 2;
    else if (weekNumber <= 24) programData.phase = 3;
    else if (weekNumber <= 32) programData.phase = 4;
    else if (weekNumber <= 40) programData.phase = 5;
    else programData.phase = 6;

    document.getElementById('currentPhase').textContent = `Phase ${programData.phase}: ${programData.phases[programData.phase].name}`;
    document.getElementById('phaseDescription').textContent = programData.phases[programData.phase].description;

    document.getElementById('currentDay').textContent = currentDay;
    document.getElementById('overallProgress').style.width = `${(currentDay / 365) * 100}%`;
    document.getElementById('overallProgress').textContent = `${((currentDay / 365) * 100).toFixed(1)}%`;

    const completedWorkouts = userProgress.completedDays.length;
    document.getElementById('workoutsCompleted').textContent = completedWorkouts;
    document.getElementById('workoutProgress').style.width = `${(completedWorkouts / 365) * 100}%`;
    document.getElementById('workoutProgress').textContent = `${((completedWorkouts / 365) * 100).toFixed(1)}%`;

    const workoutData = getWorkoutForDay(currentDay);
    if (workoutData) {
        document.getElementById('todaysFocus').textContent = workoutData.focus;
        document.getElementById('todayDuration').textContent = workoutData.duration;
        document.getElementById('todayIntensity').textContent = workoutData.intensity;
    }
}

function renderWeekView() {
    const weekView = document.getElementById('weekView');
    const startOfWeek = currentDay - ((currentDay - 1) % 7);

    weekView.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const dayNum = startOfWeek + i;
        if (dayNum > 365) break;

        const workout = getWorkoutForDay(dayNum);
        const isCompleted = userProgress.completedDays.includes(dayNum);
        const isCurrent = dayNum === currentDay;

        const dayCard = document.createElement('div');
        dayCard.className = `day-card ${isCurrent ? 'current' : ''}`;
        dayCard.onclick = () => {
            currentDay = dayNum;
            showSection('workout');
            loadDayWorkout(dayNum);
        };

        dayCard.innerHTML = `
            <div class="day-number">${String(dayNum).padStart(3, '0')}</div>
            <div class="day-date">Day ${dayNum}</div>
            <div class="day-workout-name">${workout ? workout.name : 'Rest Day'}</div>
            <span class="day-status ${isCompleted ? 'status-complete' : 'status-pending'}">
                ${isCompleted ? 'Complete' : isCurrent ? 'Today' : 'Pending'}
            </span>
        `;

        weekView.appendChild(dayCard);
    }
}

// ---------------------------------------------------------------------
// Workout system
// ---------------------------------------------------------------------
function getWorkoutForDay(day) {
    const weekNumber = Math.ceil(day / 7);
    const dayOfWeek = (day - 1) % 7;

    if (weekNumber <= 2) {
        return week1Workouts[dayOfWeek];
    }
    return generateWorkoutForDay(day, weekNumber, dayOfWeek);
}

function generateWorkoutForDay(day, week, dayOfWeek) {
    const phase = Math.ceil(week / 8);
    const baseWorkout = week1Workouts[dayOfWeek];

    return {
        ...baseWorkout,
        day: day,
        date: calculateDate(day),
        name: `${baseWorkout.name} (Week ${week})`,
        intensity: phase === 1 ? 'Beginner' : phase === 2 ? 'Intermediate' : 'Advanced'
    };
}

function calculateDate(dayNumber) {
    const date = new Date(programData.startDate);
    date.setDate(date.getDate() + dayNumber - 1);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function loadDayWorkout(day) {
    const workout = getWorkoutForDay(day);
    document.getElementById('workoutDate').textContent = workout.date;
    document.getElementById('dayNumber').textContent = `Day ${day}`;

    const workoutContent = document.getElementById('workoutContent');
    workoutContent.innerHTML = `
        <div class="workout-header">
            <h2>${workout.name}</h2>
            <div class="workout-meta">
                <span>⏱ ${workout.duration}</span>
                <span>🔥 ${workout.intensity}</span>
                <span>🎯 ${workout.focus}</span>
            </div>
        </div>

        <div class="exercise-block">
            <div class="exercise-name">Warm-up</div>
            <div class="mini-list">
                ${workout.warmup.map(w => `
                    <div class="mini-item">
                        <strong>${w.exercise}</strong>
                        <span>${w.reps || w.duration}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="exercise-name" style="margin: 1.5rem 0 1rem;">Main Workout</div>
        ${workout.mainWorkout.map(ex => renderExerciseBlock(ex)).join('')}

        <div class="exercise-block">
            <div class="exercise-name">Cooldown</div>
            <div class="mini-list">
                ${workout.cooldown.map(c => `
                    <div class="mini-item">
                        <strong>${c.exercise}</strong>
                        <span>${c.duration}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="exercise-block">
            <div class="exercise-name">Notes</div>
            <div class="detail-value" style="margin-top: 0.75rem;">
                <p><strong style="color: var(--text);">Nutrition:</strong> ${workout.nutrition}</p>
                <p style="margin-top: 0.4rem;"><strong style="color: var(--text);">Water:</strong> ${workout.water}</p>
                <p style="margin-top: 0.4rem;"><strong style="color: var(--text);">Sleep:</strong> ${workout.sleep}</p>
            </div>
        </div>
    `;

    document.getElementById('dailyMotivation').innerHTML = `
        "${workout.motivation}"
        <div class="quote-author">DAY ${String(day).padStart(3, '0')}</div>
    `;

    renderChecklist(workout.checklist, day);
}

function exerciseThumb(exData) {
    if (exData && exData.image) {
        return `<div class="exercise-thumb"><img src="${exData.image}" alt="${exData.name}" loading="lazy"></div>`;
    }
    return `<div class="exercise-thumb placeholder">💪</div>`;
}

function renderExerciseBlock(exercise) {
    if (exercise.type === 'circuit') {
        return `
            <div class="exercise-block" style="border-left-color: var(--brass);">
                <div class="exercise-name">Circuit — ${exercise.rounds} Rounds</div>
                <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    ${exercise.exercises.map((ex, i) => {
                        const exData = exercises[ex.exercise] || {};
                        return `
                        <div style="display:flex; align-items:center; gap:0.85rem; padding: 0.6rem 0.8rem; background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius-sm);">
                            <span style="font-family: var(--font-mono); color: var(--brass); font-weight: 600; width: 1.4rem;">${i + 1}</span>
                            <span style="flex:1; color: var(--text);">${getExerciseName(ex.exercise)}</span>
                            <span style="font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem;">${ex.reps}</span>
                        </div>`;
                    }).join('')}
                </div>
                <div style="margin-top: 0.85rem; color: var(--brass); font-size: 0.85rem;">Rest ${exercise.exercises[exercise.exercises.length - 1].rest} between rounds</div>
            </div>
        `;
    }

    if (exercise.type === 'assessment') {
        return `
            <div class="exercise-block" style="border-left-color: var(--brass);">
                <div class="exercise-name">Assessment Tests</div>
                <div style="margin-top: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    ${exercise.tests.map(test => `
                        <div style="padding: 0.6rem 0.8rem; background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius-sm);">
                            <strong style="color: var(--text);">${test.name}:</strong>
                            <span style="color: var(--text-muted);"> ${test.target}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    const exData = exercises[exercise.exercise] || {};
    return `
        <div class="exercise-block">
            <div class="exercise-block-body">
                ${exerciseThumb(exData)}
                <div class="exercise-block-content">
                    <div class="exercise-header">
                        <div class="exercise-name">${exData.name || exercise.exercise}</div>
                        <div class="exercise-sets">${exercise.sets} × ${exercise.reps}</div>
                    </div>
                    <div class="exercise-details">
                        <div class="detail-item">
                            <div class="detail-label">Rest</div>
                            <div class="detail-value">${exercise.rest}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Muscles</div>
                            <div class="detail-value">${exData.muscles ? exData.muscles.join(', ') : 'Various'}</div>
                        </div>
                        ${exercise.notes ? `
                        <div class="detail-item">
                            <div class="detail-label">Notes</div>
                            <div class="detail-value">${exercise.notes}</div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getExerciseName(key) {
    return exercises[key] ? exercises[key].name : key;
}

function renderChecklist(items, day) {
    const checklist = document.getElementById('dailyChecklist');
    const dayKey = `day${day}`;
    const completed = userProgress.checklistCompleted?.[dayKey] || [];

    checklist.innerHTML = items.map((item, index) => `
        <li class="checklist-item ${completed.includes(index) ? 'completed' : ''}"
            onclick="toggleChecklistItem(${day}, ${index})">
            <div class="checkbox">${completed.includes(index) ? '✓' : ''}</div>
            <div>${item}</div>
        </li>
    `).join('');
}

function toggleChecklistItem(day, index) {
    const dayKey = `day${day}`;
    if (!userProgress.checklistCompleted) userProgress.checklistCompleted = {};
    if (!userProgress.checklistCompleted[dayKey]) userProgress.checklistCompleted[dayKey] = [];

    const list = userProgress.checklistCompleted[dayKey];
    const idx = list.indexOf(index);
    if (idx > -1) {
        list.splice(idx, 1);
    } else {
        list.push(index);
    }

    // Mark the day complete when every checklist item is checked
    const workout = getWorkoutForDay(day);
    if (workout && list.length === workout.checklist.length && !userProgress.completedDays.includes(day)) {
        userProgress.completedDays.push(day);
    } else if (workout && list.length < workout.checklist.length) {
        userProgress.completedDays = userProgress.completedDays.filter(d => d !== day);
    }

    saveProgress();
    loadDayWorkout(day);
    initializeDashboard();
    renderWeekView();
}

function changeDay(direction) {
    const newDay = currentDay + direction;
    if (newDay >= 1 && newDay <= 365) {
        currentDay = newDay;
        loadDayWorkout(currentDay);
        renderWeekView();
    }
}

function jumpToDay() {
    const day = prompt('Enter day number (1-365):');
    const num = parseInt(day, 10);
    if (num && num >= 1 && num <= 365) {
        currentDay = num;
        showSection('workout');
        loadDayWorkout(currentDay);
        renderWeekView();
    }
}

// ---------------------------------------------------------------------
// Exercise library
// ---------------------------------------------------------------------
function renderExerciseLibrary(filter = 'all') {
    const grid = document.getElementById('exerciseGrid');
    grid.innerHTML = '';

    Object.keys(exercises).forEach(key => {
        const ex = exercises[key];
        if (filter === 'all' || ex.category === filter) {
            const card = document.createElement('div');
            card.className = 'exercise-card';
            card.onclick = () => showExerciseDetail(key);

            card.innerHTML = `
                <div class="exercise-card-img">
                    ${ex.image ? `<img src="${ex.image}" alt="${ex.name}" loading="lazy">` : '💪'}
                </div>
                <div class="exercise-card-content">
                    <h3>${ex.name}</h3>
                    <p>${ex.description}</p>
                    <div class="exercise-card-footer">
                        <span class="difficulty-badge difficulty-${ex.difficulty}">${ex.difficulty}</span>
                        <span class="muscle-tags">${ex.muscles.join(' · ')}</span>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        }
    });
}

function filterExercises(btn, category) {
    document.querySelectorAll('#exercises .tab-btn').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    renderExerciseLibrary(category);
}

function showExerciseDetail(key) {
    const ex = exercises[key];
    const modal = document.getElementById('exerciseModal');
    const content = document.getElementById('modalContent');

    content.innerHTML = `
        ${ex.image ? `<div class="modal-image"><img src="${ex.image}" alt="${ex.name}"></div>` : ''}
        <div class="modal-body">
            <h2>${ex.name}</h2>
            <div class="metric-grid" style="margin-bottom: 1.4rem;">
                <div class="metric">
                    <div class="metric-value" style="font-size: 1.1rem; text-transform: capitalize;">${ex.difficulty}</div>
                    <div class="metric-label">Difficulty</div>
                </div>
                <div class="metric">
                    <div class="metric-value" style="font-size: 1.1rem; text-transform: capitalize;">${ex.category}</div>
                    <div class="metric-label">Category</div>
                </div>
                <div class="metric">
                    <div class="metric-value" style="font-size: 0.95rem;">${ex.muscles.join(', ')}</div>
                    <div class="metric-label">Muscles</div>
                </div>
            </div>
            <h3>Instructions</h3>
            <ol>
                ${ex.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
            <div class="rx-box">
                <strong>Typical prescription:</strong> ${ex.sets} sets × ${ex.reps} · Rest ${ex.rest}
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('exerciseModal').classList.remove('active');
}

// ---------------------------------------------------------------------
// Progress tracking
// ---------------------------------------------------------------------
function renderHabitTracker() {
    const tracker = document.getElementById('habitTracker');
    if (!tracker) return;

    tracker.innerHTML = '';
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'habit-day';
        day.textContent = i;

        const dateKey = `${currentYear}-${currentMonth}-${i}`;
        if (userProgress.habits?.[dateKey]) {
            day.classList.add('completed');
        }

        day.onclick = () => toggleHabitDay(dateKey, day);
        tracker.appendChild(day);
    }
}

function toggleHabitDay(dateKey, element) {
    if (!userProgress.habits) userProgress.habits = {};

    if (userProgress.habits[dateKey]) {
        delete userProgress.habits[dateKey];
        element.classList.remove('completed');
    } else {
        userProgress.habits[dateKey] = true;
        element.classList.add('completed');
    }

    saveProgress();
}

function updateWaterTracker() {
    const tracker = document.getElementById('waterTracker');
    if (!tracker) return;

    const today = new Date().toDateString();
    const consumed = userProgress.waterIntake?.[today] || 0;

    tracker.innerHTML = '';
    for (let i = 1; i <= 8; i++) {
        const glass = document.createElement('div');
        glass.className = `water-glass ${i <= consumed ? 'filled' : ''}`;
        glass.onclick = () => addWater(i === consumed ? i - 1 : i);
        tracker.appendChild(glass);
    }
}

function addWater(amount) {
    const today = new Date().toDateString();
    if (!userProgress.waterIntake) userProgress.waterIntake = {};
    userProgress.waterIntake[today] = Math.max(0, amount);
    saveProgress();
    updateWaterTracker();
}

function saveMeasurements() {
    const weight = document.getElementById('trackWeight').value;
    userProgress.measurements = {
        weight: weight,
        date: new Date().toISOString()
    };
    document.getElementById('currentWeight').textContent = weight;
    saveProgress();
}

function recordStrengthTest() {
    const pushups = prompt('Max push-ups:');
    const squats = prompt('Max squats:');
    const plank = prompt('Max plank (seconds):');

    if (!userProgress.strengthTests) userProgress.strengthTests = {};
    if (pushups) userProgress.strengthTests.pushups = pushups;
    if (squats) userProgress.strengthTests.squats = squats;
    if (plank) userProgress.strengthTests.plank = plank;

    document.getElementById('testPushups').textContent = userProgress.strengthTests.pushups || '0';
    document.getElementById('testSquats').textContent = userProgress.strengthTests.squats || '0';
    document.getElementById('testPlank').textContent = userProgress.strengthTests.plank || '0';

    saveProgress();
}

// ---------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------
function saveProgress() {
    try {
        localStorage.setItem('tojiProtocolProgress', JSON.stringify(userProgress));
    } catch (e) {
        console.warn('Could not save progress:', e);
    }
}

function loadProgress() {
    const saved = localStorage.getItem('tojiProtocolProgress');
    if (saved) {
        try {
            userProgress = { ...userProgress, ...JSON.parse(saved) };
        } catch (e) {
            console.warn('Could not parse saved progress:', e);
        }

        if (userProgress.strengthTests) {
            document.getElementById('testPushups').textContent = userProgress.strengthTests.pushups || '0';
            document.getElementById('testSquats').textContent = userProgress.strengthTests.squats || '0';
            document.getElementById('testPlank').textContent = userProgress.strengthTests.plank || '0';
        }

        if (userProgress.measurements?.weight) {
            document.getElementById('currentWeight').textContent = userProgress.measurements.weight;
            document.getElementById('trackWeight').value = userProgress.measurements.weight;
        }
    }
}

// ---------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------
function showResource(btn, resource) {
    document.querySelectorAll('.resource-content').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('#resources .tab-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(`resource-${resource}`).style.display = 'block';
    btn.classList.add('active');
}

// ---------------------------------------------------------------------
// Global listeners
// ---------------------------------------------------------------------
window.onclick = function (event) {
    const modal = document.getElementById('exerciseModal');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
};

document.addEventListener('keydown', (e) => {
    if (currentSection === 'workout') {
        if (e.key === 'ArrowLeft') changeDay(-1);
        if (e.key === 'ArrowRight') changeDay(1);
    }
    if (e.key === 'Escape') closeModal();
});
