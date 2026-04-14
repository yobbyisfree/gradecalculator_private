const STORAGE_KEY = "graduation-planner-clone-v3";
const THEME_KEY = "graduation-planner-theme";

const UI = {
  darkMode: "\uB2E4\uD06C \uBAA8\uB4DC",
  lightMode: "\uB77C\uC774\uD2B8 \uBAA8\uB4DC",
  addCourse: "+ \uACFC\uBAA9 \uCD94\uAC00",
  plannerBoard: "\uD50C\uB798\uB108 \uBCF4\uB4DC",
  roadmap: "\uC878\uC5C5 \uB85C\uB4DC\uB9F5",
  roadmapDesc: "\uD559\uAE30 \uD750\uB984, \uC878\uC5C5 \uC694\uAC74, \uC804\uACF5 \uD3C9\uC810\uC744 \uD55C \uD654\uBA74\uC5D0\uC11C \uD655\uC778\uD569\uB2C8\uB2E4.",
  major: "\uC804\uACF5",
  english: "\uC601\uAC15",
  retake: "\uC7AC\uC218\uAC15",
  excluded: "\uC9D1\uACC4 \uC81C\uC678",
  replaced: "\uB300\uCCB4\uB428",
  pending: "\uACC4\uD68D",
  total: "\uCD1D\uAD04",
  courses: "\uAC1C \uACFC\uBAA9",
  editable: "\uCE74\uB4DC \uD074\uB9AD\uC73C\uB85C \uC790\uC720\uB86D\uAC8C \uC218\uC815 \uAC00\uB2A5",
  creditsUnit: "\uD559\uC810",
  totalCompletion: "\uC804\uCCB4 \uC774\uC218\uC728",
  majorCredits: "\uC804\uACF5 \uD559\uC810",
  englishCount: "\uC601\uAC15 \uAC1C\uC218",
  gpaPending: "GPA \uBBF8\uC815",
  termTotalSuffix: " \uD569\uACC4",
  saveCourse: "\uACFC\uBAA9 \uC800\uC7A5",
  editCourse: "\uACFC\uBAA9 \uC218\uC815"
};

const gradeScale = {
  "A+": 4.5,
  A: 4.0,
  A0: 4.0,
  "B+": 3.5,
  B: 3.0,
  B0: 3.0,
  "C+": 2.5,
  C: 2.0,
  C0: 2.0,
  "D+": 1.5,
  D: 1.0,
  D0: 1.0,
  F: 0,
  P: null,
  Planned: null,
};

function makeCourse(name, credits, grade, badge, options = {}) {
  return {
    id: crypto.randomUUID(),
    name,
    credits,
    grade,
    badge,
    major: Boolean(options.major),
    english: Boolean(options.english),
    retake: Boolean(options.retake),
    retakeKey: options.retakeKey || "",
    excluded: Boolean(options.excluded),
    memo: options.memo || "",
  };
}

const sampleData = {
  terms: ["군복무", "19-1", "19-2", "20-1", "21-1", "23-여름", "23-2", "25-1", "25-2"],
  requirements: {
    totalCredits: 130,
    majorCredits: 55,
    englishCourses: 3,
  },
  categories: [
    {
      id: crypto.randomUUID(),
      title: "군복무중이수",
      requirement: 6,
      hint: "군복무 중 취득 학점",
      courses: {
        "군복무": [
          makeCourse("한국의젊은시인들", 3, "P", "군복", { memo: "문학과예술" }),
          makeCourse("데이터학습과지능(영강)", 3, "P", "군복", { major: true, english: true, memo: "전공선택" }),
        ],
      },
    },
    {
      id: crypto.randomUUID(),
      title: "교양/핵심",
      requirement: 36,
      hint: "교양 및 기초 과목",
      courses: {
        "19-1": [
          makeCourse("일반화학및연습Ⅰ", 3, "C", "전관교"),
          makeCourse("일반화학실험Ⅰ", 1, "C+", "전관교"),
          makeCourse("1학년세미나Ⅰ", 1, "P", "세미나"),
          makeCourse("자유정의진리Ⅰ", 3, "B+", "자정진"),
          makeCourse("글쓰기", 2, "B", "글쓰기"),
          makeCourse("ACADEMIC ENGLISHⅠ(영강)", 1, "F", "영교", { english: true, retake: true, retakeKey: "academic-english-1" }),
          makeCourse("미적분학및연습I", 3, "F", "전관교"),
          makeCourse("일반물리학및연습Ⅰ", 3, "F", "전관교", { retake: true, retakeKey: "phys1" }),
          makeCourse("일반물리학실험Ⅰ", 1, "B", "전관교"),
        ],
        "19-2": [
          makeCourse("경제학개론", 3, "C+", "선교"),
          makeCourse("컴퓨터언어및실습", 3, "A", "전관교"),
          makeCourse("정보적사고", 1, "P", "정보"),
          makeCourse("1학년세미나 II", 1, "P", "세미나"),
          makeCourse("자유정의진리II", 3, "B+", "자정진"),
          makeCourse("ACADEMIC ENGLISHⅠ(영강)", 1, "B+", "영교", { english: true, retake: true, retakeKey: "academic-english-1" }),
          makeCourse("미적분학및연습II", 3, "D+", "전관교", { retake: true, retakeKey: "calc2" }),
          makeCourse("일반물리학및연습Ⅱ", 3, "D", "전관교"),
          makeCourse("일반물리학실험Ⅱ", 1, "B+", "전관교"),
        ],
        "20-1": [
          makeCourse("감정과삶", 3, "C+", "윤리"),
          makeCourse("환경문명사", 3, "A+", "역사"),
          makeCourse("일반물리학및연습Ⅰ", 3, "B+", "전관교", { retake: true, retakeKey: "phys1" }),
        ],
        "21-1": [
          makeCourse("발명과창업", 3, "A", "과기"),
          makeCourse("현대사회의윤리적쟁점들", 3, "A+", "선교"),
        ],
        "23-여름": [
          makeCourse("미적분학및연습II", 3, "C+", "기초과학", { retake: true, retakeKey: "calc2" }),
        ],
        "25-2": [
          makeCourse("고령사회에대한다학제적이해", 3, "A+", "선교"),
        ],
      },
    },
    {
      id: crypto.randomUUID(),
      title: "전공필수",
      requirement: 25,
      hint: "전기전자공학부 필수",
      courses: {
        "20-1": [
          makeCourse("전기회로실험", 1, "B", "전필", { major: true }),
          makeCourse("디지털시스템(영강)", 3, "A+", "전필", { major: true, english: true }),
          makeCourse("공학수학Ⅰ(영강)", 3, "C", "전필", { major: true, english: true, retake: true, retakeKey: "engmath1" }),
        ],
        "21-1": [
          makeCourse("전기회로Ⅰ(영강)", 3, "B", "전필", { major: true, english: true }),
          makeCourse("공학수학Ⅰ(영강)", 3, "C", "전필", { major: true, english: true, retake: true, retakeKey: "engmath1", memo: "재수강" }),
        ],
        "23-2": [
          makeCourse("전자기학", 3, "D+", "전필", { major: true }),
          makeCourse("디지털시스템실험", 1, "C", "전필", { major: true }),
          makeCourse("공학수학Ⅱ(영강)", 3, "C+", "전필", { major: true, english: true }),
        ],
        "25-1": [
          makeCourse("전자회로I(영강)", 3, "B", "전필", { major: true, english: true }),
          makeCourse("전자회로설계및실험I", 1, "B", "전필", { major: true }),
          makeCourse("신호와시스템", 3, "C+", "전필", { major: true }),
        ],
        "25-2": [
          makeCourse("전공소개세미나", 1, "P", "전필", { major: true }),
        ],
      },
    },
    {
      id: crypto.randomUUID(),
      title: "전공선택",
      requirement: 30,
      hint: "전공 선택 및 심화",
      courses: {
        "21-1": [
          makeCourse("데이터과학기초(영강)", 3, "A", "전선", { major: true, english: true }),
          makeCourse("확률및랜덤프로세스(영강)", 3, "B", "전선", { major: true, english: true }),
        ],
        "23-2": [
          makeCourse("데이터구조및알고리즘", 3, "C+", "전선", { major: true }),
          makeCourse("물성전자공학(영강)", 3, "C+", "전선", { major: true, english: true }),
        ],
        "25-1": [
          makeCourse("반도체공학Ⅰ(영강)", 3, "B", "전선", { major: true, english: true }),
          makeCourse("전기전자공학도를위한기계학습과지능(영강)", 3, "C+", "전선", { major: true, english: true }),
        ],
        "25-2": [
          makeCourse("반도체공학Ⅱ(영강)", 3, "B+", "전선", { major: true, english: true }),
          makeCourse("전기기기Ⅰ(영강)", 3, "C+", "전선", { major: true, english: true }),
          makeCourse("디지털신호처리", 3, "C", "전선", { major: true }),
        ],
      },
    },
  ],
};

const state = loadState();
const uiState = { activeCategoryId: null, activeTerm: null, editingCourseId: null };
let dragState = null;

const plannerGrid = document.getElementById("plannerGrid");
const progressList = document.getElementById("progressList");
const chart = document.getElementById("gpaChart");
const overallGpa = document.getElementById("overallGpa");
const majorGpa = document.getElementById("majorGpa");
const earnedCredits = document.getElementById("earnedCredits");
const englishCount = document.getElementById("englishCount");
const themeToggle = document.getElementById("themeToggle");
const resetDataBtn = document.getElementById("resetDataBtn");
const addSemesterBtn = document.getElementById("addSemesterBtn");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const termForm = document.getElementById("termForm");
const termNameInput = document.getElementById("termNameInput");
const categoryForm = document.getElementById("categoryForm");
const categoryNameInput = document.getElementById("categoryNameInput");
const requirementForm = document.getElementById("requirementForm");
const totalCreditsTarget = document.getElementById("totalCreditsTarget");
const majorCreditsTarget = document.getElementById("majorCreditsTarget");
const englishTarget = document.getElementById("englishTarget");
const termManager = document.getElementById("termManager");
const categoryManager = document.getElementById("categoryManager");
const courseDialog = document.getElementById("courseDialog");
const courseForm = document.getElementById("courseForm");
const modalTitle = document.getElementById("modalTitle");
const deleteCourseBtn = document.getElementById("deleteCourseBtn");
const closeDialogBtn = document.getElementById("closeDialogBtn");
const courseName = document.getElementById("courseName");
const courseCredits = document.getElementById("courseCredits");
const courseGrade = document.getElementById("courseGrade");
const courseBadge = document.getElementById("courseBadge");
const courseRetakeKey = document.getElementById("courseRetakeKey");
const courseMemo = document.getElementById("courseMemo");
const courseMajor = document.getElementById("courseMajor");
const courseEnglish = document.getElementById("courseEnglish");
const courseRetake = document.getElementById("courseRetake");
const courseExcluded = document.getElementById("courseExcluded");

populateGradeOptions();
applyTheme(localStorage.getItem(THEME_KEY) || "light");
hydrateRequirementInputs();
render();

plannerGrid.addEventListener("click", handlePlannerClick);
plannerGrid.addEventListener("dragstart", handlePlannerDragStart);
plannerGrid.addEventListener("dragover", handlePlannerDragOver);
plannerGrid.addEventListener("dragleave", handlePlannerDragLeave);
plannerGrid.addEventListener("drop", handlePlannerDrop);
plannerGrid.addEventListener("dragend", handlePlannerDragEnd);
themeToggle.addEventListener("click", toggleTheme);
resetDataBtn.addEventListener("click", resetToSample);
addSemesterBtn.addEventListener("click", submitTermForm);
addCategoryBtn.addEventListener("click", submitCategoryForm);
termForm.addEventListener("submit", handleTermSubmit);
categoryForm.addEventListener("submit", handleCategorySubmit);
requirementForm.addEventListener("input", handleRequirementInput);
termManager.addEventListener("click", handleTermManagerClick);
termManager.addEventListener("change", handleTermManagerChange);
categoryManager.addEventListener("click", handleCategoryManagerClick);
categoryManager.addEventListener("change", handleCategoryManagerChange);
courseForm.addEventListener("submit", handleCourseSubmit);
deleteCourseBtn.addEventListener("click", deleteCurrentCourse);
closeDialogBtn.addEventListener("click", () => courseDialog.close());

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const fallback = structuredClone(sampleData);
  if (!saved) return fallback;

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed.terms) || !Array.isArray(parsed.categories)) throw new Error("invalid");
    parsed.requirements ||= {};
    parsed.requirements.totalCredits ??= fallback.requirements.totalCredits;
    parsed.requirements.majorCredits ??= fallback.requirements.majorCredits;
    parsed.requirements.englishCourses ??= fallback.requirements.englishCourses;
    parsed.categories.forEach((category) => {
      category.courses ||= {};
      category.requirement ??= 0;
      category.hint ??= "";
      Object.values(category.courses).forEach((courses) => {
        courses.forEach((course) => {
          course.badge ||= "";
          course.major = Boolean(course.major);
          course.english = Boolean(course.english);
          course.retake = Boolean(course.retake);
          course.retakeKey ||= "";
          course.excluded = Boolean(course.excluded);
          course.memo ||= "";
        });
      });
    });
    return parsed;
  } catch {
    return fallback;
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function populateGradeOptions() {
  Object.keys(gradeScale).forEach((grade) => {
    const option = document.createElement("option");
    option.value = grade;
    option.textContent = grade === "Planned" ? UI.pending : grade;
    courseGrade.append(option);
  });
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? UI.lightMode : UI.darkMode;
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
}

function hydrateRequirementInputs() {
  totalCreditsTarget.value = state.requirements.totalCredits;
  majorCreditsTarget.value = state.requirements.majorCredits;
  englishTarget.value = state.requirements.englishCourses;
}

function resetToSample() {
  const fresh = structuredClone(sampleData);
  state.terms = fresh.terms;
  state.categories = fresh.categories;
  state.requirements = fresh.requirements;
  hydrateRequirementInputs();
  render();
}

function render() {
  const analysis = analyzeCourses();
  renderManagers();
  renderPlanner(analysis);
  renderStats(analysis);
  renderChart(analysis);
  persist();
}

function renderManagers() {
  termManager.replaceChildren(...state.terms.map((term) => {
    const item = document.createElement("div");
    item.className = "manager-item";
    item.innerHTML = `
      <div class="manager-item__top">
        <strong>${term}</strong>
        <div class="manager-actions">
          <button class="button button--soft" type="button" data-action="remove-term" data-term="${term}">\uC0AD\uC81C</button>
        </div>
      </div>
      <input type="text" value="${escapeAttribute(term)}" data-role="term-name" data-term="${term}">
    `;
    return item;
  }));

  categoryManager.replaceChildren(...state.categories.map((category) => {
    const item = document.createElement("div");
    item.className = "manager-item";
    item.innerHTML = `
      <div class="manager-item__top">
        <strong>${category.title}</strong>
        <span class="manager-item__meta">${category.requirement}${UI.creditsUnit}</span>
      </div>
      <div class="compact-inputs">
        <input type="text" value="${escapeAttribute(category.title)}" data-role="category-title" data-category-id="${category.id}">
        <input type="text" value="${escapeAttribute(category.hint)}" data-role="category-hint" data-category-id="${category.id}">
        <input type="number" min="0" step="1" value="${category.requirement}" data-role="category-requirement" data-category-id="${category.id}">
      </div>
      <div class="manager-actions">
        <span class="manager-item__meta">\uCE74\uD14C\uACE0\uB9AC \uC124\uBA85\uACFC \uC694\uAC74 \uD559\uC810\uC744 \uBC14\uB85C \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.</span>
        <button class="button button--soft" type="button" data-action="remove-category" data-category-id="${category.id}">\uC0AD\uC81C</button>
      </div>
    `;
    return item;
  }));
}

function renderPlanner(analysis) {
  const table = document.createElement("div");
  table.className = "planner-table";
  table.style.setProperty("--term-count", state.terms.length);

  const header = document.createElement("div");
  header.className = "planner-header";
  header.append(buildCornerCard());
  state.terms.forEach((term) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "term-chip";
    chip.textContent = term;
    header.append(chip);
  });
  table.append(header);

  state.categories.forEach((category) => {
    const row = document.createElement("div");
    row.className = "planner-row";
    row.append(buildCategoryLabel(category, analysis));
    state.terms.forEach((term) => {
      const cell = document.createElement("div");
      cell.className = "term-cell";
      cell.dataset.dropCategoryId = category.id;
      cell.dataset.dropTerm = term;
      (category.courses[term] || []).forEach((course) => {
        cell.append(buildCourseCard(category.id, term, course, analysis.courseStatus.get(course.id)));
      });
      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.className = "add-card";
      addButton.dataset.action = "add-course";
      addButton.dataset.categoryId = category.id;
      addButton.dataset.term = term;
      addButton.textContent = UI.addCourse;
      cell.append(addButton);
      row.append(cell);
    });
    table.append(row);
  });

  const footer = document.createElement("div");
  footer.className = "planner-footer";
  footer.append(buildFooterLead(analysis));
  state.terms.forEach((term) => {
    const stats = getTermStats(term, analysis);
    const card = document.createElement("div");
    card.className = "footer-card";
    card.innerHTML = `
      <span>${term}${UI.termTotalSuffix}</span>
      <strong>${formatNumber(stats.credits)}${UI.creditsUnit}</strong>
      <span>${stats.gpaLabel}</span>
    `;
    footer.append(card);
  });
  table.append(footer);
  plannerGrid.replaceChildren(table);
}

function buildCornerCard() {
  const card = document.createElement("div");
  card.className = "corner-card";
  card.innerHTML = `
    <p class="toolbar__label">${UI.plannerBoard}</p>
    <h2>${UI.roadmap}</h2>
  `;
  return card;
}

function buildCategoryLabel(category, analysis) {
  const earned = analysis.categoryCredits.get(category.id) || 0;
  const percent = Math.min(100, category.requirement ? Math.round((earned / category.requirement) * 100) : 0);
  const card = document.createElement("div");
  card.className = "category-label";
  card.innerHTML = `
    <div>
      <div class="pill">${category.title}</div>
      <h3>${category.hint || "\uC790\uC720 \uD3B8\uC9D1 \uCE74\uD14C\uACE0\uB9AC"}</h3>
    </div>
    <div class="category-meta">
      <span>${earned}/${category.requirement}${UI.creditsUnit}</span>
      <span>${percent}%</span>
    </div>
  `;
  return card;
}

function buildCourseCard(categoryId, term, course, status = {}) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "course-card";
  card.draggable = true;
  card.dataset.action = "edit-course";
  card.dataset.categoryId = categoryId;
  card.dataset.term = term;
  card.dataset.courseId = course.id;

  const badges = [];
  if (course.badge) badges.push(`<span class="badge">${course.badge}</span>`);
  if (course.major) badges.push(`<span class="badge badge--major">${UI.major}</span>`);
  if (course.english) badges.push(`<span class="badge badge--english">${UI.english}</span>`);
  if (course.retake) badges.push(`<span class="badge badge--retake">${UI.retake}</span>`);
  if (status.replaced) badges.push(`<span class="badge badge--retake">${UI.replaced}</span>`);
  if (course.excluded) badges.push(`<span class="badge badge--retake">${UI.excluded}</span>`);

  const gradeLabel = course.grade === "Planned" ? UI.pending : course.grade;
  const memo = course.memo ? `<div class="course-card__meta"><span>${course.memo}</span></div>` : "";
  card.innerHTML = `
    <div class="course-card__top">
      <strong>${course.name}</strong>
      <span>${gradeLabel}</span>
    </div>
    <div class="course-card__meta">
      <span>${course.credits}${UI.creditsUnit}</span>
      <div class="course-badges">${badges.join("")}</div>
    </div>
    ${memo}
  `;
  if (status.replaced || course.excluded) card.style.opacity = "0.68";
  return card;
}

function buildFooterLead(analysis) {
  const lead = document.createElement("div");
  lead.className = "footer-card";
  lead.innerHTML = `
    <span>${UI.total}</span>
    <strong>${analysis.countedCourses.length}${UI.courses}</strong>
    <span>${UI.editable}</span>
  `;
  return lead;
}

function renderStats(analysis) {
  overallGpa.textContent = formatGpa(calculateGpa(analysis.countedCourses));
  majorGpa.textContent = formatGpa(calculateGpa(analysis.majorCourses));
  earnedCredits.textContent = String(analysis.earnedCredits);
  englishCount.textContent = String(analysis.englishCourses.length);

  const blocks = [
    buildProgressBlock(UI.totalCompletion, analysis.earnedCredits, state.requirements.totalCredits, false),
    buildProgressBlock(UI.majorCredits, analysis.majorCredits, state.requirements.majorCredits, false),
    buildProgressBlock(UI.englishCount, analysis.englishCourses.length, state.requirements.englishCourses, true),
  ];

  state.categories.forEach((category) => {
    blocks.push(buildProgressBlock(category.title, analysis.categoryCredits.get(category.id) || 0, category.requirement, false));
  });

  progressList.replaceChildren(...blocks);
}

function buildProgressBlock(title, earned, target, isCount) {
  const percent = target ? Math.min(100, (earned / target) * 100) : 0;
  const unit = isCount ? "\uAC1C" : UI.creditsUnit;
  const item = document.createElement("div");
  item.className = "progress-item";
  item.innerHTML = `
    <div class="progress-item__head">
      <strong>${title}</strong>
      <span>${earned}/${target}${unit} (${percent.toFixed(1)}%)</span>
    </div>
    <div class="progress-track"><span style="width:${percent}%"></span></div>
  `;
  return item;
}

function renderChart(analysis) {
  const width = 560;
  const height = 260;
  const padding = { top: 24, right: 24, bottom: 34, left: 38 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const overallPoints = [];
  const majorPoints = [];

  state.terms.forEach((term, index) => {
    const records = analysis.countedCourses.filter((course) => course.term === term);
    overallPoints.push({ index, value: calculateGpa(records) });
    majorPoints.push({ index, value: calculateGpa(records.filter((course) => course.major)) });
  });

  const yScale = (value) => padding.top + innerHeight - ((value - 1.5) / 3) * innerHeight;
  const xScale = (index) => padding.left + (state.terms.length === 1 ? innerWidth / 2 : (innerWidth / (state.terms.length - 1)) * index);

  const gridLines = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5].map((value) => {
    const y = yScale(value);
    return `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="currentColor" opacity="0.12"/>
      <text x="10" y="${y + 4}" fill="currentColor" opacity="0.58" font-size="12">${value.toFixed(1)}</text>
    `;
  }).join("");

  const labels = state.terms.map((term, index) => {
    const x = xScale(index);
    return `<text x="${x}" y="${height - 10}" text-anchor="middle" fill="currentColor" opacity="0.62" font-size="12">${term}</text>`;
  }).join("");

  chart.innerHTML = `
    <g color="currentColor">
      ${gridLines}
      ${buildPath(overallPoints, xScale, yScale, "var(--good)")}
      ${buildPath(majorPoints, xScale, yScale, "var(--accent)")}
      ${labels}
    </g>
  `;
}

function analyzeCourses() {
  const records = getAllCourseRecords();
  const grouped = new Map();
  const courseStatus = new Map();

  records.forEach((record) => {
    if (record.excluded) {
      courseStatus.set(record.id, { excluded: true, replaced: false });
      return;
    }
    const key = getRetakeGroupKey(record);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(record);
  });

  grouped.forEach((group) => {
    const winner = [...group].sort(compareRetakePriority)[0];
    group.forEach((record) => {
      courseStatus.set(record.id, { excluded: false, replaced: record.id !== winner.id });
    });
  });

  const countedCourses = records.filter((record) => {
    const status = courseStatus.get(record.id);
    return status && !status.excluded && !status.replaced;
  });
  const earnedCourses = countedCourses.filter(isEarnedCourse);
  const majorCourses = earnedCourses.filter((course) => course.major);
  const englishCourses = earnedCourses.filter((course) => course.english);
  const categoryCredits = new Map();
  earnedCourses.forEach((course) => {
    categoryCredits.set(course.categoryId, (categoryCredits.get(course.categoryId) || 0) + course.credits);
  });

  return {
    countedCourses,
    earnedCourses,
    majorCourses,
    englishCourses,
    earnedCredits: earnedCourses.reduce((sum, course) => sum + course.credits, 0),
    majorCredits: majorCourses.reduce((sum, course) => sum + course.credits, 0),
    categoryCredits,
    courseStatus,
  };
}

function getAllCourseRecords() {
  const records = [];
  state.categories.forEach((category) => {
    state.terms.forEach((term, termIndex) => {
      (category.courses[term] || []).forEach((course, courseIndex) => {
        records.push({ ...course, categoryId: category.id, term, termIndex, courseIndex });
      });
    });
  });
  return records;
}

function getRetakeGroupKey(course) {
  const key = course.retakeKey.trim().toLowerCase();
  if (key) return `retake:${key}`;
  if (course.retake) return `retake:${course.name.trim().toLowerCase()}`;
  return `single:${course.id}`;
}

function compareRetakePriority(left, right) {
  const scoreDiff = getComparableGrade(right.grade) - getComparableGrade(left.grade);
  if (scoreDiff !== 0) return scoreDiff;
  const termDiff = right.termIndex - left.termIndex;
  if (termDiff !== 0) return termDiff;
  return right.courseIndex - left.courseIndex;
}

function getComparableGrade(grade) {
  const value = gradeScale[grade];
  return typeof value === "number" ? value : -1;
}

function isEarnedCourse(course) {
  return course.grade !== "Planned" && course.grade !== "F";
}

function calculateGpa(source) {
  const scored = source.filter((course) => typeof gradeScale[course.grade] === "number");
  const totalCredits = scored.reduce((sum, course) => sum + course.credits, 0);
  if (!totalCredits) return null;
  const weighted = scored.reduce((sum, course) => sum + gradeScale[course.grade] * course.credits, 0);
  return weighted / totalCredits;
}

function getTermStats(term, analysis) {
  const earned = analysis.earnedCourses.filter((course) => course.term === term);
  const gpa = calculateGpa(analysis.countedCourses.filter((course) => course.term === term));
  return {
    credits: earned.reduce((sum, course) => sum + course.credits, 0),
    gpaLabel: gpa === null ? UI.gpaPending : `GPA ${gpa.toFixed(2)}`,
  };
}

function handlePlannerClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  if (target.dataset.action === "add-course") {
    uiState.activeCategoryId = target.dataset.categoryId;
    uiState.activeTerm = target.dataset.term;
    uiState.editingCourseId = null;
    openCourseDialog();
    return;
  }
  if (target.dataset.action === "edit-course") {
    uiState.activeCategoryId = target.dataset.categoryId;
    uiState.activeTerm = target.dataset.term;
    uiState.editingCourseId = target.dataset.courseId;
    openCourseDialog(findCourse(uiState.activeCategoryId, uiState.activeTerm, uiState.editingCourseId));
  }
}

function handlePlannerDragStart(event) {
  const card = event.target.closest(".course-card");
  if (!card) return;

  dragState = {
    courseId: card.dataset.courseId,
    fromCategoryId: card.dataset.categoryId,
    fromTerm: card.dataset.term,
  };

  card.classList.add("is-dragging");
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify(dragState));
  }
}

function handlePlannerDragOver(event) {
  const cell = event.target.closest(".term-cell");
  if (!cell || !dragState) return;
  event.preventDefault();
  cell.classList.add("is-drop-target");
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
}

function handlePlannerDragLeave(event) {
  const cell = event.target.closest(".term-cell");
  if (!cell) return;
  const related = event.relatedTarget;
  if (related && cell.contains(related)) return;
  cell.classList.remove("is-drop-target");
}

function handlePlannerDrop(event) {
  const cell = event.target.closest(".term-cell");
  if (!cell || !dragState) return;
  event.preventDefault();
  cell.classList.remove("is-drop-target");

  const toCategoryId = cell.dataset.dropCategoryId;
  const toTerm = cell.dataset.dropTerm;

  if (dragState.fromCategoryId === toCategoryId && dragState.fromTerm === toTerm) {
    dragState = null;
    render();
    return;
  }

  moveCourse(dragState.fromCategoryId, dragState.fromTerm, dragState.courseId, toCategoryId, toTerm);
  dragState = null;
  render();
}

function handlePlannerDragEnd() {
  plannerGrid.querySelectorAll(".is-drop-target").forEach((node) => node.classList.remove("is-drop-target"));
  plannerGrid.querySelectorAll(".is-dragging").forEach((node) => node.classList.remove("is-dragging"));
  dragState = null;
}

function handleTermSubmit(event) {
  event.preventDefault();
  submitTermForm();
}

function submitTermForm() {
  const term = termNameInput.value.trim() || `${state.terms.length + 1}-1`;
  if (!term || state.terms.includes(term)) return;
  state.terms.push(term);
  termNameInput.value = "";
  render();
}

function handleCategorySubmit(event) {
  event.preventDefault();
  submitCategoryForm();
}

function submitCategoryForm() {
  const title = categoryNameInput.value.trim() || "\uC790\uC720\uC120\uD0DD";
  state.categories.push({ id: crypto.randomUUID(), title, requirement: 12, hint: "\uC0AC\uC6A9\uC790 \uC815\uC758", courses: {} });
  categoryNameInput.value = "";
  render();
}

function handleRequirementInput() {
  state.requirements.totalCredits = Number(totalCreditsTarget.value) || 0;
  state.requirements.majorCredits = Number(majorCreditsTarget.value) || 0;
  state.requirements.englishCourses = Number(englishTarget.value) || 0;
  render();
}

function handleTermManagerClick(event) {
  const button = event.target.closest("[data-action='remove-term']");
  if (!button) return;
  const term = button.dataset.term;
  const hasCourses = state.categories.some((category) => (category.courses[term] || []).length > 0);
  const okay = window.confirm(hasCourses ? "\uD574\uB2F9 \uD559\uAE30 \uB0B4 \uACFC\uBAA9\uB3C4 \uD568\uAED8 \uC0AD\uC81C\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?" : "\uD559\uAE30\uB97C \uC0AD\uC81C\uD560\uAE4C\uC694?");
  if (!okay) return;
  state.terms = state.terms.filter((item) => item !== term);
  state.categories.forEach((category) => delete category.courses[term]);
  render();
}

function handleTermManagerChange(event) {
  const input = event.target.closest("[data-role='term-name']");
  if (!input) return;
  const oldTerm = input.dataset.term;
  const nextTerm = input.value.trim();
  if (!nextTerm || nextTerm === oldTerm || state.terms.includes(nextTerm)) {
    render();
    return;
  }
  const index = state.terms.indexOf(oldTerm);
  state.terms[index] = nextTerm;
  state.categories.forEach((category) => {
    if (category.courses[oldTerm]) {
      category.courses[nextTerm] = category.courses[oldTerm];
      delete category.courses[oldTerm];
    }
  });
  render();
}

function handleCategoryManagerClick(event) {
  const button = event.target.closest("[data-action='remove-category']");
  if (!button) return;
  const okay = window.confirm("\uCE74\uD14C\uACE0\uB9AC\uC640 \uD558\uC704 \uACFC\uBAA9\uC744 \uBAA8\uB450 \uC0AD\uC81C\uD560\uAE4C\uC694?");
  if (!okay) return;
  state.categories = state.categories.filter((category) => category.id !== button.dataset.categoryId);
  render();
}

function handleCategoryManagerChange(event) {
  const target = event.target;
  const categoryId = target.dataset.categoryId;
  if (!categoryId) return;
  const category = state.categories.find((item) => item.id === categoryId);
  if (!category) return;
  if (target.dataset.role === "category-title") category.title = target.value.trim() || category.title;
  if (target.dataset.role === "category-hint") category.hint = target.value.trim();
  if (target.dataset.role === "category-requirement") category.requirement = Number(target.value) || 0;
  render();
}

function openCourseDialog(course) {
  modalTitle.textContent = course ? UI.editCourse : UI.saveCourse;
  deleteCourseBtn.hidden = !course;
  courseForm.reset();
  if (course) {
    courseName.value = course.name;
    courseCredits.value = course.credits;
    courseGrade.value = course.grade;
    courseBadge.value = course.badge || "";
    courseRetakeKey.value = course.retakeKey || "";
    courseMemo.value = course.memo || "";
    courseMajor.checked = course.major;
    courseEnglish.checked = course.english;
    courseRetake.checked = course.retake;
    courseExcluded.checked = course.excluded;
  } else {
    courseCredits.value = 3;
    courseGrade.value = "Planned";
  }
  courseDialog.showModal();
}

function handleCourseSubmit(event) {
  event.preventDefault();
  const payload = {
    id: uiState.editingCourseId || crypto.randomUUID(),
    name: courseName.value.trim(),
    credits: Number(courseCredits.value),
    grade: courseGrade.value,
    badge: courseBadge.value.trim(),
    retakeKey: courseRetakeKey.value.trim(),
    memo: courseMemo.value.trim(),
    major: courseMajor.checked,
    english: courseEnglish.checked,
    retake: courseRetake.checked,
    excluded: courseExcluded.checked,
  };
  if (!payload.name) return;
  const category = state.categories.find((item) => item.id === uiState.activeCategoryId);
  if (!category) return;
  category.courses[uiState.activeTerm] ||= [];
  if (uiState.editingCourseId) {
    const index = category.courses[uiState.activeTerm].findIndex((item) => item.id === uiState.editingCourseId);
    if (index >= 0) category.courses[uiState.activeTerm][index] = payload;
  } else {
    category.courses[uiState.activeTerm].push(payload);
  }
  courseDialog.close();
  render();
}

function deleteCurrentCourse() {
  if (!uiState.editingCourseId) return;
  const category = state.categories.find((item) => item.id === uiState.activeCategoryId);
  if (!category) return;
  category.courses[uiState.activeTerm] = (category.courses[uiState.activeTerm] || []).filter((item) => item.id !== uiState.editingCourseId);
  courseDialog.close();
  render();
}

function findCourse(categoryId, term, courseId) {
  const category = state.categories.find((item) => item.id === categoryId);
  return category ? (category.courses[term] || []).find((item) => item.id === courseId) || null : null;
}

function moveCourse(fromCategoryId, fromTerm, courseId, toCategoryId, toTerm) {
  const fromCategory = state.categories.find((item) => item.id === fromCategoryId);
  const toCategory = state.categories.find((item) => item.id === toCategoryId);
  if (!fromCategory || !toCategory) return;

  const sourceCourses = fromCategory.courses[fromTerm] || [];
  const courseIndex = sourceCourses.findIndex((item) => item.id === courseId);
  if (courseIndex < 0) return;

  const [course] = sourceCourses.splice(courseIndex, 1);
  toCategory.courses[toTerm] ||= [];
  toCategory.courses[toTerm].push(course);
}

function buildPath(points, xScale, yScale, color) {
  const valid = points.filter((point) => point.value !== null);
  if (!valid.length) return "";
  const d = valid.map((point, index) => `${index === 0 ? "M" : "L"} ${xScale(point.index)} ${yScale(point.value)}`).join(" ");
  const circles = valid.map((point) => `<circle cx="${xScale(point.index)}" cy="${yScale(point.value)}" r="4.5" fill="${color}"/>`).join("");
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${circles}`;
}

function formatGpa(value) {
  return value === null ? "N/A" : value.toFixed(2);
}

function formatNumber(value) {
  return Number.isInteger(value) ? value : value.toFixed(1);
}

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}


