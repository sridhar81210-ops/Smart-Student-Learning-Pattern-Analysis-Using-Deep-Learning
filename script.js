// ===== APP STATE =====
const state = {
    currentSection: 'dashboard',
    sidebarCollapsed: false,
    darkMode: false,
    currentPage: 1,
    studentsPerPage: 8,
    charts: {}
};

// ===== STUDENT DATA =====
const students = [
    { id:1,  name:'Alice Johnson',  initials:'AJ', subject:'Mathematics',    score:98, hours:6.5, style:'Visual',           risk:'low',    prediction:'A+' },
    { id:2,  name:'Bob Smith',      initials:'BS', subject:'Physics',         score:85, hours:4.2, style:'Auditory',         risk:'low',    prediction:'B+' },
    { id:3,  name:'Carol White',    initials:'CW', subject:'Chemistry',       score:72, hours:3.8, style:'Reading/Writing',  risk:'medium', prediction:'C+' },
    { id:4,  name:'David Lee',      initials:'DL', subject:'Computer Science',score:95, hours:5.9, style:'Kinesthetic',      risk:'low',    prediction:'A'  },
    { id:5,  name:'Emma Davis',     initials:'ED', subject:'Biology',         score:88, hours:5.1, style:'Visual',           risk:'low',    prediction:'B+' },
    { id:6,  name:'Frank Miller',   initials:'FM', subject:'Mathematics',     score:61, hours:2.5, style:'Auditory',         risk:'high',   prediction:'D'  },
    { id:7,  name:'Grace Wilson',   initials:'GW', subject:'Physics',         score:79, hours:4.8, style:'Visual',           risk:'medium', prediction:'C+' },
    { id:8,  name:'Henry Brown',    initials:'HB', subject:'Chemistry',       score:55, hours:1.9, style:'Kinesthetic',      risk:'high',   prediction:'F'  },
    { id:9,  name:'Iris Taylor',    initials:'IT', subject:'Biology',         score:91, hours:6.1, style:'Reading/Writing',  risk:'low',    prediction:'A-' },
    { id:10, name:'Jack Anderson',  initials:'JA', subject:'Computer Science',score:84, hours:4.5, style:'Visual',           risk:'low',    prediction:'B+' },
    { id:11, name:'Karen Thomas',   initials:'KT', subject:'Mathematics',     score:68, hours:3.2, style:'Auditory',         risk:'medium', prediction:'C'  },
    { id:12, name:'Leo Martinez',   initials:'LM', subject:'Physics',         score:77, hours:4.0, style:'Kinesthetic',      risk:'medium', prediction:'C+' },
    { id:13, name:'Mia Robinson',   initials:'MR', subject:'Chemistry',       score:93, hours:5.7, style:'Visual',           risk:'low',    prediction:'A'  },
    { id:14, name:'Noah Clark',     initials:'NC', subject:'Biology',         score:58, hours:2.1, style:'Reading/Writing',  risk:'high',   prediction:'D'  },
    { id:15, name:'Olivia Lewis',   initials:'OL', subject:'Computer Science',score:87, hours:5.3, style:'Visual',           risk:'low',    prediction:'B+' },
    { id:16, name:'Paul Hall',      initials:'PH', subject:'Mathematics',     score:73, hours:3.6, style:'Auditory',         risk:'medium', prediction:'C+' },
    { id:17, name:'Quinn Young',    initials:'QY', subject:'Physics',         score:96, hours:6.8, style:'Kinesthetic',      risk:'low',    prediction:'A'  },
    { id:18, name:'Rachel King',    initials:'RK', subject:'Chemistry',       score:64, hours:2.9, style:'Visual',           risk:'medium', prediction:'D+' },
    { id:19, name:'Sam Wright',     initials:'SW', subject:'Biology',         score:82, hours:4.4, style:'Reading/Writing',  risk:'low',    prediction:'B'  },
    { id:20, name:'Tina Scott',     initials:'TS', subject:'Computer Science',score:50, hours:1.5, style:'Auditory',         risk:'high',   prediction:'F'  },
    { id:21, name:'Uma Harris',     initials:'UH', subject:'Mathematics',     score:89, hours:5.5, style:'Visual',           risk:'low',    prediction:'B+' },
    { id:22, name:'Victor Adams',   initials:'VA', subject:'Physics',         score:75, hours:3.9, style:'Kinesthetic',      risk:'medium', prediction:'C+' },
    { id:23, name:'Wendy Baker',    initials:'WB', subject:'Chemistry',       score:94, hours:6.2, style:'Reading/Writing',  risk:'low',    prediction:'A'  },
    { id:24, name:'Xavier Gonzalez',initials:'XG', subject:'Biology',         score:62, hours:2.7, style:'Auditory',         risk:'medium', prediction:'D+' },
];

// ===== CHART COLORS =====
const colors = {
    blue:   { bg: 'rgba(59,130,246,0.2)',   border: '#3b82f6' },
    green:  { bg: 'rgba(16,185,129,0.2)',   border: '#10b981' },
    orange: { bg: 'rgba(245,158,11,0.2)',   border: '#f59e0b' },
    purple: { bg: 'rgba(139,92,246,0.2)',   border: '#8b5cf6' },
    red:    { bg: 'rgba(239,68,68,0.2)',    border: '#ef4444' },
    primary:{ bg: 'rgba(79,70,229,0.2)',    border: '#4f46e5' },
};

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSidebar();
    initTheme();
    initCharts();
    initStudentTable();
    initPredictions();
    initModal();
    initTraining();
    animateCounters();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    const titles = {
        dashboard:   { title: 'Dashboard',             sub: "Welcome back! Here's the learning overview." },
        analysis:    { title: 'Pattern Analysis',       sub: 'AI-powered deep learning insights.' },
        students:    { title: 'Student Management',     sub: 'View and manage all students.' },
        predictions: { title: 'AI Predictions',         sub: 'Deep learning outcome predictions.' },
        reports:     { title: 'Reports & Analytics',    sub: 'Comprehensive learning reports.' },
        settings:    { title: 'Settings',               sub: 'Configure system preferences.' },
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;

            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(section)?.classList.add('active');

            state.currentSection = section;

            const t = titles[section];
            if (t) {
                document.getElementById('pageTitle').textContent = t.title;
                document.getElementById('pageSubtitle').textContent = t.sub;
            }

            // Init section-specific charts lazily
            if (section === 'predictions' && !state.charts.accuracy) initPredictionCharts();
            if (section === 'reports'     && !state.charts.classComp) initReportCharts();
        });
    });
}

// ===== SIDEBAR =====
function initSidebar() {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar   = document.getElementById('sidebar');
    const main      = document.getElementById('mainContent');

    toggleBtn.addEventListener('click', () => {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
        main.classList.toggle('expanded', state.sidebarCollapsed);
    });
}

// ===== THEME =====
function initTheme() {
    const themeBtn      = document.getElementById('themeToggle');
    const darkToggle    = document.getElementById('darkModeToggle');
    const icon          = themeBtn.querySelector('i');

    function applyDark(on) {
        document.body.classList.toggle('dark', on);
        icon.className = on ? 'fas fa-sun' : 'fas fa-moon';
        if (darkToggle) darkToggle.checked = on;
        state.darkMode = on;

        // Update chart colors
        Object.values(state.charts).forEach(c => {
            if (!c) return;
            c.options.plugins.legend.labels.color = on ? '#f1f5f9' : '#1e293b';
            c.options.scales && Object.values(c.options.scales).forEach(s => {
                if (s.ticks) s.ticks.color = on ? '#94a3b8' : '#64748b';
                if (s.grid)  s.grid.color  = on ? '#334155' : '#e2e8f0';
            });
            c.update();
        });
    }

    themeBtn.addEventListener('click', () => applyDark(!state.darkMode));
    darkToggle?.addEventListener('change', e => applyDark(e.target.checked));
}

// ===== CHART DEFAULTS =====
function getChartDefaults() {
    const dark = state.darkMode;
    return {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { labels: { color: dark ? '#f1f5f9' : '#1e293b', font: { size: 12 } } }
        },
        scales: {
            x: {
                ticks: { color: dark ? '#94a3b8' : '#64748b' },
                grid:  { color: dark ? '#334155' : '#e2e8f0' }
            },
            y: {
                ticks: { color: dark ? '#94a3b8' : '#64748b' },
                grid:  { color: dark ? '#334155' : '#e2e8f0' }
            }
        }
    };
}

// ===== CHARTS =====
function initCharts() {
    initPerformanceChart();
    initLearningStyleChart();
    initSubjectChart();
    initStudyTimeChart();
}

function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const d = getChartDefaults();

    state.charts.performance = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Math',
                    data: [82, 85, 88, 84, 91, 87, 93],
                    borderColor: colors.blue.border,
                    backgroundColor: colors.blue.bg,
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
                {
                    label: 'Science',
                    data: [75, 78, 80, 79, 85, 82, 88],
                    borderColor: colors.green.border,
                    backgroundColor: colors.green.bg,
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
                {
                    label: 'CS',
                    data: [88, 90, 87, 92, 94, 91, 96],
                    borderColor: colors.purple.border,
                    backgroundColor: colors.purple.bg,
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                }
            ]
        },
        options: { ...d }
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updatePerformanceData(btn.dataset.filter);
        });
    });
}

function updatePerformanceData(filter) {
    const chart = state.charts.performance;
    const datasets = {
        week:  { labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], math:[82,85,88,84,91,87,93], sci:[75,78,80,79,85,82,88], cs:[88,90,87,92,94,91,96] },
        month: { labels:['W1','W2','W3','W4'], math:[80,84,87,91], sci:[74,79,82,86], cs:[86,89,92,95] },
        year:  { labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], math:[78,80,82,84,85,87,88,90,91,92,94,95], sci:[72,74,76,78,80,81,83,84,86,87,88,90], cs:[84,86,88,89,91,92,93,94,95,96,97,98] }
    };
    const d = datasets[filter];
    chart.data.labels = d.labels;
    chart.data.datasets[0].data = d.math;
    chart.data.datasets[1].data = d.sci;
    chart.data.datasets[2].data = d.cs;
    chart.update();
}

function initLearningStyleChart() {
    const ctx = document.getElementById('learningStyleChart').getContext('2d');
    state.charts.learningStyle = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Visual','Auditory','Reading','Kinesthetic'],
            datasets: [{
                data: [35, 28, 22, 15],
                backgroundColor: ['#3b82f6','#10b981','#f59e0b','#8b5cf6'],
                borderWidth: 3,
                borderColor: getComputedStyle(document.body).getPropertyValue('--surface') || '#fff',
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            cutout: '65%'
        }
    });
}

function initSubjectChart() {
    const ctx = document.getElementById('subjectChart').getContext('2d');
    const d = getChartDefaults();

    state.charts.subject = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Math','Physics','Chemistry','Biology','CS'],
            datasets: [{
                label: 'Average Score',
                data: [87, 82, 79, 85, 91],
                backgroundColor: [
                    colors.blue.border,
                    colors.green.border,
                    colors.orange.border,
                    colors.purple.border,
                    colors.primary.border
                ],
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            ...d,
            plugins: {
                ...d.plugins,
                legend: { display: false }
            }
        }
    });
}

function initStudyTimeChart() {
    const ctx = document.getElementById('studyTimeChart').getContext('2d');
    const d = getChartDefaults();

    state.charts.studyTime = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Morning','Afternoon','Evening','Night','Weekend','Breaks'],
            datasets: [
                {
                    label: 'High Performers',
                    data: [85, 60, 90, 45, 70, 55],
                    borderColor: colors.primary.border,
                    backgroundColor: colors.primary.bg,
                    borderWidth: 2,
                    pointRadius: 4,
                },
                {
                    label: 'Average Students',
                    data: [55, 75, 65, 60, 50, 40],
                    borderColor: colors.orange.border,
                    backgroundColor: colors.orange.bg,
                    borderWidth: 2,
                    pointRadius: 4,
                }
            ]
        },
        options: {
            ...d,
            scales: {
                r: {
                    ticks: { color: '#64748b', backdropColor: 'transparent', font: { size: 10 } },
                    grid:  { color: '#e2e8f0' },
                    pointLabels: { color: '#64748b', font: { size: 11 } }
                }
            }
        }
    });
}

function initPredictionCharts() {
    // Accuracy chart
    const ctx1 = document.getElementById('accuracyChart').getContext('2d');
    const d = getChartDefaults();

    state.charts.accuracy = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Epoch 1','Epoch 5','Epoch 10','Epoch 20','Epoch 30','Epoch 40','Epoch 50'],
            datasets: [
                {
                    label: 'Training Accuracy',
                    data: [65, 75, 82, 88, 91, 93, 94.2],
                    borderColor: colors.primary.border,
                    backgroundColor: colors.primary.bg,
                    fill: true, tension: 0.4, borderWidth: 2.5, pointRadius: 4,
                },
                {
                    label: 'Validation Accuracy',
                    data: [60, 70, 79, 85, 88, 91, 92.8],
                    borderColor: colors.green.border,
                    backgroundColor: colors.green.bg,
                    fill: true, tension: 0.4, borderWidth: 2.5, pointRadius: 4,
                },
                {
                    label: 'Loss',
                    data: [0.9, 0.6, 0.4, 0.25, 0.18, 0.12, 0.08],
                    borderColor: colors.red.border,
                    backgroundColor: colors.red.bg,
                    fill: true, tension: 0.4, borderWidth: 2, pointRadius: 4,
                }
            ]
        },
        options: { ...d }
    });

    // Outcome chart
    const ctx2 = document.getElementById('outcomeChart').getContext('2d');
    state.charts.outcome = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Pass','At Risk','Fail'],
            datasets: [{
                data: [68, 22, 10],
                backgroundColor: [colors.green.border, colors.orange.border, colors.red.border],
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '60%',
            plugins: {
                legend: { labels: { color: '#1e293b' } }
            }
        }
    });
}

function initReportCharts() {
    // Class comparison
    const ctx1 = document.getElementById('classCompChart').getContext('2d');
    const d = getChartDefaults();

    state.charts.classComp = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Class A','Class B','Class C','Class D','Class E'],
            datasets: [
                {
                    label: 'Current Term',
                    data: [87, 82, 79, 91, 85],
                    backgroundColor: colors.primary.border,
                    borderRadius: 6,
                },
                {
                    label: 'Previous Term',
                    data: [80, 78, 72, 85, 81],
                    backgroundColor: colors.blue.border,
                    borderRadius: 6,
                }
            ]
        },
        options: { ...d }
    });

    // Grade distribution
    const ctx2 = document.getElementById('gradeDistChart').getContext('2d');
    state.charts.gradeDist = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['A (90-100)','B (80-89)','C (70-79)','D (60-69)','F (<60)'],
            datasets: [{
                data: [28, 35, 22, 10, 5],
                backgroundColor: [
                    colors.green.border,
                    colors.primary.border,
                    colors.orange.border,
                    colors.red.border,
                    '#6b7280'
                ],
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { labels: { color: '#1e293b', font: { size: 11 } } }
            }
        }
    });
}

// ===== STUDENT TABLE =====
function initStudentTable() {
    renderTable();

    document.getElementById('studentSearch').addEventListener('input', () => {
        state.currentPage = 1;
        renderTable();
    });

    document.getElementById('subjectFilter').addEventListener('change', () => {
        state.currentPage = 1;
        renderTable();
    });

    document.getElementById('riskFilter').addEventListener('change', () => {
        state.currentPage = 1;
        renderTable();
    });

    document.getElementById('prevPage').addEventListener('click', () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            renderTable();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        const filtered = getFilteredStudents();
        const totalPages = Math.ceil(filtered.length / state.studentsPerPage);
        if (state.currentPage < totalPages) {
            state.currentPage++;
            renderTable();
        }
    });
}

function getFilteredStudents() {
    const search  = document.getElementById('studentSearch').value.toLowerCase();
    const subject = document.getElementById('subjectFilter').value.toLowerCase();
    const risk    = document.getElementById('riskFilter').value.toLowerCase();

    return students.filter(s => {
        const matchSearch  = s.name.toLowerCase().includes(search) || s.subject.toLowerCase().includes(search);
        const matchSubject = !subject || s.subject.toLowerCase().includes(subject === 'cs' ? 'computer' : subject);
        const matchRisk    = !risk || s.risk === risk;
        return matchSearch && matchSubject && matchRisk;
    });
}

function renderTable() {
    const filtered   = getFilteredStudents();
    const totalPages = Math.ceil(filtered.length / state.studentsPerPage);
    const start      = (state.currentPage - 1) * state.studentsPerPage;
    const pageData   = filtered.slice(start, start + state.studentsPerPage);

    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';

    if (pageData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text-muted)">No students found</td></tr>`;
        return;
    }

    pageData.forEach(s => {
        const riskColor = { low: 'green', medium: 'orange', high: 'red' }[s.risk];
        const scoreColor = s.score >= 90 ? 'green' : s.score >= 75 ? 'blue' : s.score >= 60 ? 'orange' : 'red';
        const gradeBg = {
            'A+':'#dcfce7','A':'#dcfce7','A-':'#dcfce7',
            'B+':'#dbeafe','B':'#dbeafe','B-':'#dbeafe',
            'C+':'#fef9c3','C':'#fef9c3',
            'D+':'#fee2e2','D':'#fee2e2','F':'#fee2e2'
        }[s.prediction] || '#f1f5f9';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="student-cell">
                    <div class="student-avatar" style="background:linear-gradient(135deg,${getAvatarColor(s.id)})">
                        ${s.initials}
                    </div>
                    <div>
                        <div style="font-weight:600;font-size:0.875rem">${s.name}</div>
                        <div style="font-size:0.75rem;color:var(--text-muted)">#${String(s.id).padStart(3,'0')}</div>
                    </div>
                </div>
            </td>
            <td>${s.subject}</td>
            <td>
                <span style="font-weight:700;color:var(--${scoreColor === 'blue' ? 'blue' : scoreColor})">${s.score}%</span>
            </td>
            <td>${s.hours} hrs/day</td>
            <td>
                <span style="background:var(--bg);padding:3px 8px;border-radius:6px;font-size:0.8rem">${s.style}</span>
            </td>
            <td><span class="risk-pill ${s.risk}">${s.risk.charAt(0).toUpperCase() + s.risk.slice(1)}</span></td>
            <td>
                <span style="background:${gradeBg};padding:3px 10px;border-radius:6px;font-weight:700;font-size:0.85rem">${s.prediction}</span>
            </td>
            <td>
                <div class="action-btns">
                    <button class="action-btn" title="View"><i class="fas fa-eye"></i></button>
                    <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" title="Delete" onclick="deleteStudent(${s.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('pageInfo').textContent = `Page ${state.currentPage} of ${Math.max(1, totalPages)}`;
}

function getAvatarColor(id) {
    const colors = [
        '#4f46e5,#818cf8','#10b981,#34d399','#f59e0b,#fbbf24',
        '#8b5cf6,#a78bfa','#3b82f6,#60a5fa','#ef4444,#f87171'
    ];
    return colors[id % colors.length];
}

function deleteStudent(id) {
    const idx = students.findIndex(s => s.id === id);
    if (idx > -1) {
        students.splice(idx, 1);
        renderTable();
    }
}

// ===== AI PREDICTIONS =====
function initPredictions() {
    // Range sliders
    const sliders = [
        { id: 'studyHours',  valId: 'studyHoursVal',  suffix: ' hrs' },
        { id: 'quizScore',   valId: 'quizScoreVal',   suffix: '%' },
        { id: 'attendance',  valId: 'attendanceVal',  suffix: '%' },
        { id: 'engagement',  valId: 'engagementVal',  suffix: '%' },
        { id: 'assignments', valId: 'assignmentsVal', suffix: '%' },
    ];

    sliders.forEach(({ id, valId, suffix }) => {
        const input = document.getElementById(id);
        const val   = document.getElementById(valId);
        if (input && val) {
            input.addEventListener('input', () => {
                val.textContent = input.value + suffix;
            });
        }
    });

    document.getElementById('predictBtn').addEventListener('click', runPrediction);
}

function runPrediction() {
    const btn = document.getElementById('predictBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    btn.disabled  = true;

    setTimeout(() => {
        const hours      = +document.getElementById('studyHours').value;
        const quiz       = +document.getElementById('quizScore').value;
        const attendance = +document.getElementById('attendance').value;
        const engagement = +document.getElementById('engagement').value;
        const assignments= +document.getElementById('assignments').value;

        // Simulated deep learning prediction
        const score = Math.min(100, Math.round(
            quiz * 0.35 +
            attendance * 0.20 +
            assignments * 0.20 +
            engagement * 0.15 +
            (hours / 12) * 100 * 0.10
        ));

        const successProb = Math.min(99, Math.round(
            (score / 100) * 85 +
            (attendance / 100) * 10 +
            (assignments / 100) * 5
        ));

        let risk, riskStyle, recs;

        if (score >= 85) {
            risk = 'Low Risk';
            riskStyle = 'background:rgba(16,185,129,0.1);color:#10b981';
            recs = [
                'Maintain current study habits — excellent performance!',
                'Consider advanced challenges to further growth.',
                'Peer tutoring could benefit lower-performing classmates.',
                'Explore extra-curricular academic programs.',
            ];
        } else if (score >= 70) {
            risk = 'Medium Risk';
            riskStyle = 'background:rgba(245,158,11,0.1);color:#f59e0b';
            recs = [
                'Increase daily study time by 30–45 minutes.',
                'Focus on quiz preparation with practice tests.',
                'Attend office hours for clarification on weak areas.',
                'Use spaced repetition for better retention.',
            ];
        } else {
            risk = 'High Risk';
            riskStyle = 'background:rgba(239,68,68,0.1);color:#ef4444';
            recs = [
                'Immediate intervention required — schedule counseling session.',
                'Increase attendance to at least 85% urgently.',
                'Assign a study buddy or mentor.',
                'Complete all missing assignments within one week.',
                'Reduce distractions and establish a structured study schedule.',
            ];
        }

        document.getElementById('predictedScore').textContent = score + '%';
        document.getElementById('successProb').textContent    = successProb + '%';
        document.getElementById('riskTag').textContent = risk;
        document.getElementById('riskTag').style.cssText = riskStyle;

        const recList = document.getElementById('recList');
        recList.innerHTML = recs.map(r => `<li>${r}</li>`).join('');

        document.getElementById('predictionResult').style.display = 'block';
        document.getElementById('predictionResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        btn.innerHTML = '<i class="fas fa-magic"></i> Run AI Prediction';
        btn.disabled  = false;
    }, 2000);
}

// ===== MODAL =====
function initModal() {
    const modal       = document.getElementById('studentModal');
    const openBtn     = document.getElementById('addStudentBtn');
    const closeBtn    = document.getElementById('closeModal');
    const cancelBtn   = document.getElementById('cancelModal');
    const overlay     = document.getElementById('modalOverlay');

    const open  = () => modal.classList.add('open');
    const close = () => modal.classList.remove('open');

    openBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    cancelBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);
}

// ===== TRAINING SIMULATION =====
function initTraining() {
    const retrainBtn  = document.getElementById('retrainBtn');
    const trainingCard = document.getElementById('trainingCard');

    retrainBtn?.addEventListener('click', () => {
        trainingCard.style.display = 'block';
        trainingCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        retrainBtn.disabled = true;
        retrainBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Training...';
        simulateTraining();
    });
}

function simulateTraining() {
    const steps = [
        { id: 1, label: 'Loading Training Data',           duration: 1500 },
        { id: 2, label: 'Preprocessing & Normalization',   duration: 2000 },
        { id: 3, label: 'Training LSTM Layers',            duration: 3000 },
        { id: 4, label: 'Training CNN Layers',             duration: 2500 },
        { id: 5, label: 'Model Validation',                duration: 1500 },
    ];

    let elapsed = 0;
    const total = steps.reduce((a, s) => a + s.duration, 0);
    const progressBar = document.getElementById('trainingProgress');
    const progressText = document.getElementById('progressText');

    // Reset all
    steps.forEach(s => {
        const el = document.getElementById(`step${s.id}`);
        el.classList.remove('active','done');
        document.getElementById(`status${s.id}`).textContent = 'Pending';
    });
    progressBar.style.width = '0%';
    progressText.textContent = '0% Complete';

    steps.forEach(step => {
        setTimeout(() => {
            // Mark previous done
            if (step.id > 1) {
                const prev = document.getElementById(`step${step.id - 1}`);
                prev.classList.remove('active');
                prev.classList.add('done');
                document.getElementById(`status${step.id - 1}`).textContent = 'Done ✓';
            }

            // Activate current
            const curr = document.getElementById(`step${step.id}`);
            curr.classList.add('active');
            document.getElementById(`status${step.id}`).textContent = 'Processing...';
        }, elapsed);

        elapsed += step.duration;

        // Update progress
        setTimeout(() => {
            const pct = Math.round((elapsed / total) * 100);
            progressBar.style.width = pct + '%';
            progressText.textContent = pct + '% Complete';
        }, elapsed - step.duration / 2);
    });

    // Done
    setTimeout(() => {
        document.getElementById(`step5`).classList.remove('active');
        document.getElementById(`step5`).classList.add('done');
        document.getElementById('status5').textContent = 'Done ✓';
        progressBar.style.width = '100%';
        progressText.textContent = '100% Complete — Model Updated!';

        setTimeout(() => {
            document.getElementById('trainingCard').style.display = 'none';
            document.getElementById('retrainBtn').disabled = false;
            document.getElementById('retrainBtn').innerHTML = '<i class="fas fa-sync-alt"></i> Retrain Model';
        }, 2000);
    }, elapsed);
}

// ===== ANIMATE COUNTERS =====
function animateCounters() {
    const counters = [
        { el: document.querySelector('.stat-card.blue h3'),   target: 1248, suffix: '',    duration: 1500 },
        { el: document.querySelector('.stat-card.green h3'),  target: 87.4, suffix: '%',   duration: 1500, decimal: true },
        { el: document.querySelector('.stat-card.orange h3'), target: 4.6,  suffix: ' hrs',duration: 1200, decimal: true },
        { el: document.querySelector('.stat-card.purple h3'), target: 94.2, suffix: '%',   duration: 1500, decimal: true },
    ];

    counters.forEach(({ el, target, suffix, duration, decimal }) => {
        if (!el) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start = Math.min(start + step, target);
            el.textContent = (decimal ? start.toFixed(1) : Math.floor(start)) + suffix;
            if (start >= target) clearInterval(timer);
        }, 16);
    });
}

// ===== SCORE BAR ANIMATION =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.score-fill').forEach(el => {
            const w = el.style.width;
            el.style.width = '0%';
            setTimeout(() => { el.style.transition = 'width 1s ease'; el.style.width = w; }, 100);
        });
    }, 300);
});