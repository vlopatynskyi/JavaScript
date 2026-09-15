const STORAGE_KEY = 'nutrition-tracker-data';

const dateInput = document.getElementById('selected-date');
const mealForm = document.getElementById('meal-form');
const mealNameInput = document.getElementById('meal-name');
const caloriesInput = document.getElementById('calories');
const proteinsInput = document.getElementById('proteins');
const fatsInput = document.getElementById('fats');
const carbsInput = document.getElementById('carbs');
const entriesList = document.getElementById('entries-list');
const emptyState = document.getElementById('empty-state');

const totalCalories = document.getElementById('total-calories');
const totalProteins = document.getElementById('total-proteins');
const totalFats = document.getElementById('total-fats');
const totalCarbs = document.getElementById('total-carbs');

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return stored && typeof stored === 'object' ? stored : {};
  } catch (error) {
    return {};
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getSelectedDate() {
  return dateInput.value || getTodayString();
}

function getEntriesForDate(dateKey) {
  const data = loadData();
  return Array.isArray(data[dateKey]) ? data[dateKey] : [];
}

function saveEntriesForDate(dateKey, entries) {
  const data = loadData();
  data[dateKey] = entries;
  saveData(data);
}

function getTotals(entries) {
  return entries.reduce(
    (totals, entry) => {
      totals.calories += parseNumber(entry.calories);
      totals.proteins += parseNumber(entry.proteins);
      totals.fats += parseNumber(entry.fats);
      totals.carbs += parseNumber(entry.carbs);
      return totals;
    },
    { calories: 0, proteins: 0, fats: 0, carbs: 0 }
  );
}

function renderSummary(entries) {
  const totals = getTotals(entries);

  totalCalories.textContent = Math.round(totals.calories);
  totalProteins.textContent = totals.proteins.toFixed(1).replace(/\.0$/, '');
  totalFats.textContent = totals.fats.toFixed(1).replace(/\.0$/, '');
  totalCarbs.textContent = totals.carbs.toFixed(1).replace(/\.0$/, '');
}

function renderEntries(entries) {
  entriesList.innerHTML = '';

  if (!entries.length) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  entries.forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'record-card';
    card.innerHTML = `
      <div>
        <h3 class="record-name">${escapeHtml(entry.name)}</h3>
        <div class="record-macros">
          <span>К: ${Math.round(parseNumber(entry.calories))} kcal</span>
          <span>Б: ${parseNumber(entry.proteins).toFixed(1).replace(/\.0$/, '')} г</span>
          <span>Ж: ${parseNumber(entry.fats).toFixed(1).replace(/\.0$/, '')} г</span>
          <span>В: ${parseNumber(entry.carbs).toFixed(1).replace(/\.0$/, '')} г</span>
        </div>
      </div>
      <button type="button" class="delete-btn" data-entry-id="${entry.id}">Видалити</button>
    `;
    entriesList.appendChild(card);
  });
}

function render() {
  const selectedDate = getSelectedDate();
  const entries = getEntriesForDate(selectedDate);
  renderSummary(entries);
  renderEntries(entries);
}

function addMeal(event) {
  event.preventDefault();

  const name = mealNameInput.value.trim();
  const calories = parseNumber(caloriesInput.value);
  const proteins = parseNumber(proteinsInput.value);
  const fats = parseNumber(fatsInput.value);
  const carbs = parseNumber(carbsInput.value);

  if (!name || (!calories && !proteins && !fats && !carbs)) {
    return;
  }

  const selectedDate = getSelectedDate();
  const entries = getEntriesForDate(selectedDate);

  entries.push({
    id: Date.now().toString(),
    name,
    calories,
    proteins,
    fats,
    carbs,
  });

  saveEntriesForDate(selectedDate, entries);
  mealForm.reset();
  mealNameInput.focus();
  render();
}

function removeMeal(event) {
  const deleteButton = event.target.closest('.delete-btn');
  if (!deleteButton) return;

  const selectedDate = getSelectedDate();
  const entryId = deleteButton.dataset.entryId;
  const entries = getEntriesForDate(selectedDate).filter((entry) => entry.id !== entryId);

  saveEntriesForDate(selectedDate, entries);
  render();
}

function initializeDate() {
  dateInput.value = getTodayString();
  render();
}

dateInput.addEventListener('change', render);
mealForm.addEventListener('submit', addMeal);
entriesList.addEventListener('click', removeMeal);

initializeDate();
