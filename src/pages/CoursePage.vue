<template>
  <div class="course-page-wrapper">
    <!-- Breadcrumb bar -->
    <div class="breadcrumb-bar">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumb navigation">
          <router-link to="/">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link to="/learn">Safety Academy</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ topic?.title || 'Guide' }}</span>
        </nav>
      </div>
    </div>

    <!-- Topic Not Found State -->
    <div v-if="!topic" class="container not-found-container">
      <div class="card not-found-card">
        <AlertTriangle :size="36" class="not-found-icon" />
        <h2>Topic Not Found</h2>
        <p>The requested cyber safety topic could not be located in our academy database.</p>
        <router-link to="/learn" class="btn btn-primary">
          Return to Safety Academy
        </router-link>
      </div>
    </div>

    <!-- Active Topic View -->
    <main v-else class="course-main-content">
      <div class="container container-narrow">
        <!-- Topic Header -->
        <header class="topic-header">
          <div class="topic-meta-row">
            <span class="badge badge-accent">{{ topic.category }}</span>
            <span class="topic-read-time">
              <Clock :size="14" />
              {{ topic.readTime }}
            </span>
          </div>

          <h1 class="topic-title">{{ topic.title }}</h1>
          <p class="topic-overview">{{ topic.overview }}</p>

          <!-- Direct Action to test this pattern in AI detector -->
          <div class="topic-action-banner">
            <div class="action-banner-text">
              <strong>Have you received a message like this?</strong>
              <span>Test it directly in our AI detection model.</span>
            </div>
            <button type="button" class="btn btn-primary btn-sm" @click="testWithAiDetector">
              <ShieldAlert :size="16" />
              Inspect Sample in AI
            </button>
          </div>
        </header>

        <!-- Structured 10 Educational Sections with folding & clear sections -->
        <div class="sections-stack">
          <!-- 1. What is this scam? -->
          <section class="topic-section card">
            <div class="section-badge-header">
              <span class="step-num">01</span>
              <h2 class="section-heading">What is this scam?</h2>
            </div>
            <p class="section-body-text">{{ topic.whatIsIt }}</p>
          </section>

          <!-- 2. How does it work? -->
          <section class="topic-section card">
            <div class="section-badge-header">
              <span class="step-num">02</span>
              <h2 class="section-heading">How does it work?</h2>
            </div>
            <ol class="numbered-process-list">
              <li v-for="(step, idx) in topic.howItWorks" :key="idx">
                <span class="step-circle">{{ idx + 1 }}</span>
                <span class="step-content">{{ step }}</span>
              </li>
            </ol>
          </section>

          <!-- 3. Fictional Example -->
          <section class="topic-section card example-section-card">
            <div class="section-badge-header">
              <span class="step-num">03</span>
              <h2 class="section-heading">Fictional Incident Example</h2>
            </div>
            <div class="incident-box">
              <div class="incident-header">
                <span class="incident-channel">Channel: {{ topic.fictionalExample.channel }}</span>
                <span class="incident-sender">Sender: {{ topic.fictionalExample.sender }}</span>
              </div>
              <div class="incident-bubble">
                <p class="incident-text">"{{ topic.fictionalExample.messageText }}"</p>
              </div>
              <div class="incident-breakdown">
                <AlertCircle :size="16" class="breakdown-icon" />
                <p><strong>Anatomy Breakdown:</strong> {{ topic.fictionalExample.breakdown }}</p>
              </div>
            </div>
          </section>

          <!-- 4. Warning Signs (Checklist) -->
          <section class="topic-section card warning-signs-card">
            <div class="section-badge-header">
              <span class="step-num">04</span>
              <h2 class="section-heading">Warning Signs Checklist</h2>
            </div>
            <ul class="checklist-grid">
              <li v-for="(sign, idx) in topic.warningSigns" :key="idx" class="checklist-item">
                <AlertTriangle :size="18" class="checklist-icon red-icon" />
                <span>{{ sign }}</span>
              </li>
            </ul>
          </section>

          <!-- 5. How to prevent it -->
          <section class="topic-section card">
            <div class="section-badge-header">
              <span class="step-num">05</span>
              <h2 class="section-heading">Prevention Rules</h2>
            </div>
            <ul class="checklist-grid">
              <li v-for="(rule, idx) in topic.howToPrevent" :key="idx" class="checklist-item">
                <CheckCircle2 :size="18" class="checklist-icon green-icon" />
                <span>{{ rule }}</span>
              </li>
            </ul>
          </section>

          <!-- 6 & 7 & 8: Response Matrix (Encountered vs Affected vs What NOT to do) -->
          <div class="response-matrix-container">
            <!-- 6. Encountered -->
            <section class="topic-section card">
              <div class="section-badge-header">
                <span class="step-num">06</span>
                <h2 class="section-heading">What to do if you encounter it</h2>
              </div>
              <ul class="simple-checklist">
                <li v-for="(action, idx) in topic.whatToDoIfEncountered" :key="idx">
                  <ArrowRight :size="16" class="bullet-arrow" />
                  <span>{{ action }}</span>
                </li>
              </ul>
            </section>

            <!-- 7. Already Affected -->
            <section class="topic-section card alert-border-card">
              <div class="section-badge-header">
                <span class="step-num">07</span>
                <h2 class="section-heading">What to do if already affected</h2>
              </div>
              <ul class="simple-checklist">
                <li v-for="(action, idx) in topic.whatToDoIfAffected" :key="idx">
                  <AlertOctagon :size="16" class="bullet-alert" />
                  <span>{{ action }}</span>
                </li>
              </ul>
            </section>

            <!-- 8. What NOT to do -->
            <section class="topic-section card danger-border-card">
              <div class="section-badge-header">
                <span class="step-num">08</span>
                <h2 class="section-heading">What NOT to do</h2>
              </div>
              <ul class="simple-checklist">
                <li v-for="(dont, idx) in topic.whatNotToDo" :key="idx">
                  <XCircle :size="16" class="bullet-danger" />
                  <span>{{ dont }}</span>
                </li>
              </ul>
            </section>
          </div>

          <!-- 9. Knowledge Check -->
          <section class="knowledge-check-section">
            <div class="section-badge-header">
              <span class="step-num">09</span>
              <h2 class="section-heading">Knowledge Check</h2>
            </div>
            <QuizQuestion :quiz="topic.knowledgeCheck" />
          </section>

          <!-- 10. AI Detector Test Banner -->
          <section class="ai-cta-section card">
            <div class="section-badge-header">
              <span class="step-num">10</span>
              <h2 class="section-heading">Practical Detection Exercise</h2>
            </div>
            <p class="cta-desc">
              Test how the local AI detection model evaluates a simulated suspicious message from this category.
            </p>
            <div class="sample-prompt-box">
              <code>"{{ topic.samplePromptForDetector }}"</code>
            </div>
            <button type="button" class="btn btn-primary" @click="testWithAiDetector">
              <ScanSearch :size="18" />
              Analyze This Scam Message in Detector
            </button>
          </section>
        </div>

        <!-- Pagination / Topic Navigation -->
        <nav class="topic-nav-footer" aria-label="Topic navigation">
          <router-link v-if="prevTopic" :to="`/learn/${prevTopic.slug}`" class="nav-topic-btn nav-topic-prev">
            <ArrowLeft :size="16" />
            <div class="nav-topic-text">
              <span class="nav-dir">Previous Guide</span>
              <span class="nav-name">{{ prevTopic.title }}</span>
            </div>
          </router-link>
          <div v-else></div>

          <router-link v-if="nextTopic" :to="`/learn/${nextTopic.slug}`" class="nav-topic-btn nav-topic-next">
            <div class="nav-topic-text text-right">
              <span class="nav-dir">Next Guide</span>
              <span class="nav-name">{{ nextTopic.title }}</span>
            </div>
            <ArrowRight :size="16" />
          </router-link>
        </nav>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Clock,
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  XCircle,
  ScanSearch
} from 'lucide-vue-next';
import { scamTopics } from '../data/scams.js';
import { courseCatalog } from '../data/courses.js';
import { chatStore } from '../stores/chatStore.js';
import QuizQuestion from '../components/QuizQuestion.vue';

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.slug);
const topic = computed(() => scamTopics[slug.value] || null);

// Navigation between catalog topics
const currentIndex = computed(() => {
  return courseCatalog.findIndex(c => c.slug === slug.value);
});

const prevTopic = computed(() => {
  if (currentIndex.value > 0) {
    return courseCatalog[currentIndex.value - 1];
  }
  return null;
});

const nextTopic = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < courseCatalog.length - 1) {
    return courseCatalog[currentIndex.value + 1];
  }
  return null;
});

function testWithAiDetector() {
  if (!topic.value) return;
  chatStore.prepareTextForAnalysis(topic.value.samplePromptForDetector);
  router.push('/chat');
}
</script>

<style scoped>
.course-page-wrapper {
  display: flex;
  flex-direction: column;
}

.breadcrumb-bar {
  background-color: #FAFCFA;
  border-bottom: 1px solid var(--color-border);
  padding: 0.75rem 0;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.825rem;
  color: var(--color-muted);
}

.breadcrumbs a {
  color: var(--color-muted);
  text-decoration: none;
}

.breadcrumbs a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.breadcrumb-separator {
  color: var(--color-border);
}

.breadcrumb-current {
  color: var(--color-text);
  font-weight: 600;
}

/* Not found */
.not-found-container {
  padding: 4rem 1.25rem;
}
.not-found-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}
.not-found-icon {
  color: var(--color-warning);
}

/* Topic Header */
.course-main-content {
  padding: 2.5rem 0 4rem;
}

.topic-header {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 2.5rem;
}

.topic-meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.topic-read-time {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: var(--color-muted);
  font-weight: 600;
}

.topic-title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-primary);
  line-height: 1.2;
}

.topic-overview {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-muted);
}

.topic-action-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  background-color: #FAFCFA;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.action-banner-text {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  color: var(--color-text);
}

.btn-sm {
  min-height: 38px;
  padding: 0.4rem 0.85rem;
}

/* Sections stack */
.sections-stack {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.topic-section {
  padding: 1.75rem;
}

.section-badge-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.step-num {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--color-primary);
  background-color: #EBF2EC;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
}

.section-heading {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-text);
}

.section-body-text {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text);
}

/* Numbered process list */
.numbered-process-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.numbered-process-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  font-size: 0.925rem;
  line-height: 1.6;
  color: var(--color-text);
}

.step-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Incident example */
.example-section-card {
  border-left: 5px solid var(--color-warning);
}

.incident-box {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.incident-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-muted);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.incident-bubble {
  padding: 0.875rem 1rem;
  background-color: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.incident-text {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-text);
  font-style: italic;
}

.incident-breakdown {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-text);
}

.breakdown-icon {
  flex-shrink: 0;
  color: var(--color-warning);
  margin-top: 2px;
}

/* Warning signs checklist */
.warning-signs-card {
  border-left: 5px solid var(--color-danger);
}

.checklist-grid {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.925rem;
  line-height: 1.55;
  color: var(--color-text);
}

.checklist-icon {
  flex-shrink: 0;
  margin-top: 3px;
}

.red-icon {
  color: var(--color-danger);
}

.green-icon {
  color: var(--color-success);
}

/* Response Matrix */
.response-matrix-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.alert-border-card {
  border-left: 5px solid var(--color-danger);
}

.danger-border-card {
  border-left: 5px solid #7A1910;
  background-color: #FFFBFB;
}

.simple-checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.simple-checklist li {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--color-text);
}

.bullet-arrow {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 3px;
}

.bullet-alert {
  color: var(--color-danger);
  flex-shrink: 0;
  margin-top: 3px;
}

.bullet-danger {
  color: #7A1910;
  flex-shrink: 0;
  margin-top: 3px;
}

/* Knowledge check section */
.knowledge-check-section {
  margin-top: 0.5rem;
}

/* AI CTA Section */
.ai-cta-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
  background-color: #FAFCFA;
  border-left: 5px solid var(--color-primary);
}

.cta-desc {
  font-size: 0.925rem;
  color: var(--color-muted);
}

.sample-prompt-box {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text);
}

/* Topic Navigation Footer */
.topic-nav-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-topic-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  min-height: 48px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text);
  transition: all 0.15s ease;
}

.nav-topic-btn:hover {
  border-color: var(--color-primary);
  background-color: #FAFCFA;
}

.nav-topic-text {
  display: flex;
  flex-direction: column;
}

.nav-dir {
  font-size: 0.75rem;
  color: var(--color-muted);
  font-weight: 600;
  text-transform: uppercase;
}

.nav-name {
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--color-primary);
}

.text-right {
  text-align: right;
}
</style>
