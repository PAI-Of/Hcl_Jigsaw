<template>
  <div class="academy-page-container">
    <!-- Academy Header Banner -->
    <section class="section-academy-header">
      <div class="container">
        <div class="academy-intro">
          <span class="badge badge-accent">
            <GraduationCap :size="14" />
            Cyber Safety Academy
          </span>
          <h1 class="academy-title">Recognize Fraud Before It Strikes</h1>
          <p class="academy-subtitle">
            Comprehensive, evidence-based guides for common scam vectors targeting Indian digital users.
          </p>

          <!-- Search & Filter Controls -->
          <div class="search-filter-bar">
            <div class="search-input-wrapper">
              <Search :size="18" class="search-icon" />
              <input
                v-model="searchQuery"
                type="text"
                class="search-input"
                placeholder="Search scams by keyword (e.g., UPI PIN, KYC, digital arrest, APK)..."
                aria-label="Search scam guides"
              />
              <button
                v-if="searchQuery"
                type="button"
                class="clear-search-btn"
                @click="searchQuery = ''"
                aria-label="Clear search query"
              >
                <X :size="14" />
              </button>
            </div>

            <!-- Category Pills -->
            <div class="category-filter-pills" role="tablist" aria-label="Filter by scam category">
              <button
                v-for="cat in categories"
                :key="cat"
                type="button"
                class="category-pill"
                :class="{ 'category-pill-active': selectedCategory === cat }"
                @click="selectedCategory = cat"
                role="tab"
                :aria-selected="selectedCategory === cat"
              >
                {{ cat }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prominent Indian Cybercrime Reporting Banner -->
    <section class="reporting-highlight-section">
      <div class="container">
        <div class="reporting-highlight-card">
          <div class="reporting-card-left">
            <div class="badge-row">
              <span class="badge badge-danger">Official Action Protocol</span>
              <span class="badge badge-default">Government of India</span>
            </div>
            <h2 class="reporting-highlight-title">Victim of Financial Cyber Fraud? Dial 1930</h2>
            <p class="reporting-highlight-desc">
              Understand the "Golden Hour" response protocol, transaction freezing workflow, and formal complaint filing on cybercrime.gov.in.
            </p>
          </div>
          <div class="reporting-card-right">
            <router-link to="/learn/report-cybercrime" class="btn btn-primary">
              <FileText :size="18" />
              Open Reporting Guide
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Academy Topics Directory -->
    <section class="section-academy">
      <div class="container">
        <!-- Section title and result count -->
        <div class="directory-header">
          <h2 class="directory-heading">Explore Educational Topics</h2>
          <span class="directory-count">{{ filteredCourses.length }} Guides Available</span>
        </div>

        <!-- Empty search results state -->
        <div v-if="filteredCourses.length === 0" class="no-results-box card">
          <AlertCircle :size="32" class="no-results-icon" />
          <h3>No matching scam guides found</h3>
          <p>No educational guides matched "{{ searchQuery }}". Try searching for "UPI", "KYC", or "Police".</p>
          <button type="button" class="btn btn-secondary" @click="resetFilters">
            Reset Filters
          </button>
        </div>

        <!-- Varied Layout: Cards Grid for Standard Courses -->
        <div v-else class="courses-grid">
          <CourseCard
            v-for="course in filteredCourses"
            :key="course.slug"
            :course="course"
          />
        </div>
      </div>
    </section>

    <!-- Editorial Comparison Section: Scam vs Legitimate Communication -->
    <section class="comparison-section">
      <div class="container">
        <div class="comparison-container card">
          <div class="comparison-header">
            <h2 class="comparison-title">Communication Anatomy: Scam vs Legitimate</h2>
            <p class="comparison-subtitle">
              Learn how to quickly distinguish genuine institutional notices from fraudulent social engineering.
            </p>
          </div>

          <div class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Factor</th>
                  <th scope="col" class="th-scam">Fraudulent Message</th>
                  <th scope="col" class="th-legit">Genuine Institutional Alert</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Urgency</th>
                  <td class="td-scam">Extreme artificial deadline ("within 2 hours or permanent block").</td>
                  <td class="td-legit">Informational notice with regular billing cycles or routine dates.</td>
                </tr>
                <tr>
                  <th scope="row">Links & URLs</th>
                  <td class="td-scam">Lookalike domains (e.g. "sbi-kyc-now.example" or shortened links).</td>
                  <td class="td-legit">Official verified domains (e.g. "onlinesbi.sbi" or "gov.in").</td>
                </tr>
                <tr>
                  <th scope="row">UPI & Payments</th>
                  <td class="td-scam">Asks you to scan QR codes or enter UPI PIN to "receive" funds.</td>
                  <td class="td-legit">Never requires entering a UPI PIN to receive money.</td>
                </tr>
                <tr>
                  <th scope="row">Credentials</th>
                  <td class="td-scam">Demands OTPs, passwords, or remote screen sharing (AnyDesk).</td>
                  <td class="td-legit">Explicitly reminds users that bank staff never ask for OTPs or PINs.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { GraduationCap, Search, X, FileText, AlertCircle } from 'lucide-vue-next';
import { courseCatalog } from '../data/courses.js';
import CourseCard from '../components/CourseCard.vue';

const searchQuery = ref('');
const selectedCategory = ref('All');

const courses = courseCatalog;

const categories = computed(() => {
  const cats = new Set(courses.map(c => c.category));
  return ['All', ...Array.from(cats)];
});

const filteredCourses = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const category = selectedCategory.value;

  return courses.filter(course => {
    const matchesCategory = category === 'All' || course.category === category;
    if (!matchesCategory) return false;

    if (!query) return true;

    const inTitle = course.title.toLowerCase().includes(query);
    const inDesc = course.shortDescription.toLowerCase().includes(query);
    const inTags = course.tags.some(t => t.toLowerCase().includes(query));

    return inTitle || inDesc || inTags;
  });
});

function resetFilters() {
  searchQuery.value = '';
  selectedCategory.value = 'All';
}
</script>

<style scoped>
.academy-page-container {
  display: flex;
  flex-direction: column;
}

.section-academy-header {
  padding: 2.5rem 0 1.5rem;
  background-color: #FAFCFA;
  border-bottom: 1px solid var(--color-border);
}

.academy-intro {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 820px;
}

.academy-title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-primary);
  line-height: 1.2;
}

.academy-subtitle {
  font-size: 1.05rem;
  color: var(--color-muted);
  line-height: 1.6;
}

/* Search and Filters */
.search-filter-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 600px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--color-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 48px;
  padding: 0 2.5rem 0 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  font-size: 0.95rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.clear-search-btn {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  color: var(--color-muted);
  min-height: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.category-filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-pill {
  padding: 0.35rem 0.85rem;
  min-height: 44px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--color-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.category-pill:hover {
  color: var(--color-text);
  border-color: var(--color-primary);
}

.category-pill-active {
  background-color: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
}

/* Reporting highlight card */
.reporting-highlight-section {
  padding: 1.5rem 0 0.5rem;
}

.reporting-highlight-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background-color: #FEF8F8;
  border: 1px solid #FECDCA;
  border-left: 6px solid var(--color-danger);
  border-radius: var(--radius-lg);
  flex-wrap: wrap;
}

.reporting-card-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 680px;
}

.badge-row {
  display: flex;
  gap: 0.5rem;
}

.reporting-highlight-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-text);
}

.reporting-highlight-desc {
  font-size: 0.9rem;
  color: var(--color-muted);
  line-height: 1.5;
}

/* Directory Section */
.directory-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.directory-heading {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--color-text);
}

.directory-count {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-muted);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.no-results-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 1.5rem;
  gap: 0.75rem;
}

.no-results-icon {
  color: var(--color-muted);
}

/* Comparison section */
.comparison-section {
  padding: 1rem 0 4rem;
}

.comparison-container {
  padding: 2rem;
}

.comparison-header {
  margin-bottom: 1.5rem;
}

.comparison-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-text);
}

.comparison-subtitle {
  font-size: 0.9rem;
  color: var(--color-muted);
}

.comparison-table-wrapper {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  text-align: left;
}

.comparison-table th,
.comparison-table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
  line-height: 1.5;
}

.comparison-table thead th {
  background-color: #FAFCFA;
  font-weight: 700;
  color: var(--color-text);
  border-top: 1px solid var(--color-border);
}

.th-scam {
  color: var(--color-danger) !important;
}

.th-legit {
  color: var(--color-success) !important;
}

.td-scam {
  color: #7A1910;
  background-color: #FFFBFB;
}

.td-legit {
  color: #0b5735;
  background-color: #F8FCF9;
}
</style>
