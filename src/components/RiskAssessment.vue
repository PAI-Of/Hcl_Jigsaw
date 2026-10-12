<template>
  <div class="assessment-container" :class="verdictThemeClass">
    <!-- Header with Verdict & Meters -->
    <div class="assessment-header">
      <div class="verdict-banner">
        <component :is="verdictIcon" :size="24" class="verdict-icon" />
        <div class="verdict-titles">
          <span class="verdict-subtitle">Estimated Threat Assessment</span>
          <h3 class="verdict-title">{{ verdictLabel }}</h3>
        </div>
      </div>

      <!-- Risk Score & Confidence Gauges -->
      <div class="metrics-block">
        <!-- Risk Percentage -->
        <div class="metric-item">
          <div class="metric-meta">
            <span class="metric-label">Estimated Risk</span>
            <span class="metric-value font-mono">{{ assessment.riskScore }}%</span>
          </div>
          <div class="meter-bar-track" role="progressbar" :aria-valuenow="assessment.riskScore" aria-valuemin="0" aria-valuemax="100">
            <div class="meter-bar-fill" :style="{ width: `${assessment.riskScore}%` }"></div>
          </div>
          <span class="risk-tier-label">{{ riskTierDescription }}</span>
        </div>

        <!-- Model Confidence (Separate measure) -->
        <div class="metric-item">
          <div class="metric-meta">
            <span class="metric-label">Model Confidence</span>
            <span class="metric-value font-mono">{{ assessment.confidence }}%</span>
          </div>
          <div class="meter-bar-track confidence-track" role="progressbar" :aria-valuenow="assessment.confidence" aria-valuemin="0" aria-valuemax="100">
            <div class="meter-bar-fill confidence-fill" :style="{ width: `${assessment.confidence}%` }"></div>
          </div>
          <span class="risk-tier-label">Confidence in available text cues</span>
        </div>
      </div>
    </div>

    <!-- Summary Box -->
    <div class="summary-section">
      <p class="summary-text">{{ assessment.summary }}</p>
    </div>

    <!-- Evidence Breakdown -->
    <div v-if="assessment.evidence && assessment.evidence.length > 0" class="assessment-section">
      <h4 class="section-title">
        <AlertTriangle :size="16" />
        Detected Evidence & Warning Signs
      </h4>
      <div class="evidence-list">
        <div v-for="(item, idx) in assessment.evidence" :key="idx" class="evidence-card">
          <span class="evidence-tag badge" :class="getEvidenceBadgeClass(item.type)">
            {{ formatEvidenceType(item.type) }}
          </span>
          <p class="evidence-detail">{{ item.detail }}</p>
        </div>
      </div>
    </div>

    <!-- Recommended Immediate Actions -->
    <div v-if="assessment.recommendedActions && assessment.recommendedActions.length > 0" class="assessment-section">
      <h4 class="section-title">
        <CheckCircle2 :size="16" />
        Recommended Actions
      </h4>
      <ul class="action-checklist">
        <li v-for="(action, idx) in assessment.recommendedActions" :key="idx" class="action-item">
          <ShieldAlert :size="16" class="check-bullet" />
          <span>{{ action }}</span>
        </li>
      </ul>
    </div>

    <!-- Independent Verification Steps -->
    <div v-if="assessment.verificationSteps && assessment.verificationSteps.length > 0" class="assessment-section">
      <h4 class="section-title">
        <Search :size="16" />
        How to Verify Independently
      </h4>
      <ul class="action-checklist">
        <li v-for="(step, idx) in assessment.verificationSteps" :key="idx" class="action-item">
          <ArrowRight :size="16" class="check-bullet" />
          <span>{{ step }}</span>
        </li>
      </ul>
    </div>

    <!-- Limitations Notice -->
    <div v-if="assessment.limitations && assessment.limitations.length > 0" class="limitations-note">
      <Info :size="14" class="limitations-icon" />
      <div class="limitations-content">
        <strong>Assessment Scope & Limitations:</strong>
        <p v-for="(lim, idx) in assessment.limitations" :key="idx">{{ lim }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ShieldCheck, ShieldAlert, AlertTriangle, HelpCircle, CheckCircle2, Search, ArrowRight, Info } from 'lucide-vue-next';

const props = defineProps({
  assessment: {
    type: Object,
    required: true
  }
});

const verdictLabel = computed(() => {
  switch (props.assessment.verdict) {
    case 'likely_legitimate':
      return 'Likely Legitimate Notification';
    case 'suspicious':
      return 'Suspicious — Exercise Caution';
    case 'likely_scam':
      return 'High Probability Scam';
    case 'inconclusive':
    default:
      return 'Inconclusive Evidence';
  }
});

const verdictThemeClass = computed(() => {
  switch (props.assessment.verdict) {
    case 'likely_legitimate':
      return 'theme-legit';
    case 'suspicious':
      return 'theme-suspicious';
    case 'likely_scam':
      return 'theme-scam';
    case 'inconclusive':
    default:
      return 'theme-inconclusive';
  }
});

const verdictIcon = computed(() => {
  switch (props.assessment.verdict) {
    case 'likely_legitimate':
      return ShieldCheck;
    case 'suspicious':
      return AlertTriangle;
    case 'likely_scam':
      return ShieldAlert;
    case 'inconclusive':
    default:
      return HelpCircle;
  }
});

const riskTierDescription = computed(() => {
  const score = props.assessment.riskScore;
  if (score <= 19) return '0–19%: Lower apparent risk';
  if (score <= 49) return '20–49%: Some warning signs';
  if (score <= 79) return '50–79%: High risk';
  return '80–100%: Very high risk';
});

function formatEvidenceType(type = '') {
  return type
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

function getEvidenceBadgeClass(type = '') {
  if (type.includes('reassuring') || type.includes('legit')) return 'badge-success';
  if (type.includes('urgency') || type.includes('link') || type.includes('payment') || type.includes('impersonation')) {
    return 'badge-danger';
  }
  return 'badge-warning';
}
</script>

<style scoped>
.assessment-container {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 0.5rem;
}

/* Theme variations */
.theme-scam {
  border-left: 6px solid var(--color-danger);
}
.theme-scam .verdict-icon {
  color: var(--color-danger);
}
.theme-scam .meter-bar-fill {
  background-color: var(--color-danger);
}

.theme-suspicious {
  border-left: 6px solid var(--color-warning);
}
.theme-suspicious .verdict-icon {
  color: var(--color-warning);
}
.theme-suspicious .meter-bar-fill {
  background-color: var(--color-warning);
}

.theme-legit {
  border-left: 6px solid var(--color-success);
}
.theme-legit .verdict-icon {
  color: var(--color-success);
}
.theme-legit .meter-bar-fill {
  background-color: var(--color-success);
}

.theme-inconclusive {
  border-left: 6px solid var(--color-muted);
}
.theme-inconclusive .verdict-icon {
  color: var(--color-muted);
}
.theme-inconclusive .meter-bar-fill {
  background-color: var(--color-muted);
}

/* Header & Gauges */
.assessment-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.verdict-banner {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.verdict-titles {
  display: flex;
  flex-direction: column;
}

.verdict-subtitle {
  font-size: 0.775rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-muted);
}

.verdict-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-text);
  margin-top: 0.15rem;
}

.metrics-block {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 170px;
}

.metric-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.metric-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
}

.metric-value {
  font-size: 0.95rem;
  font-weight: 800;
}

.meter-bar-track {
  width: 100%;
  height: 8px;
  background-color: #E7ECE7;
  border-radius: var(--radius-full);
  overflow: hidden;
}

.meter-bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.confidence-fill {
  background-color: var(--color-primary);
}

.risk-tier-label {
  font-size: 0.725rem;
  color: var(--color-muted);
}

/* Summary */
.summary-section {
  padding: 0.875rem 1rem;
  background-color: var(--color-background);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.summary-text {
  font-size: 0.925rem;
  line-height: 1.55;
  color: var(--color-text);
}

/* Section titles */
.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

/* Evidence cards */
.evidence-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.evidence-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.evidence-tag {
  flex-shrink: 0;
}

.evidence-detail {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text);
}

/* Checklists */
.action-checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text);
}

.check-bullet {
  flex-shrink: 0;
  margin-top: 3px;
  color: var(--color-primary);
}

/* Limitations */
.limitations-note {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  background-color: var(--color-background);
  border-radius: var(--radius-md);
  border: 1px dashed var(--color-border);
  font-size: 0.8rem;
  color: var(--color-muted);
  line-height: 1.45;
}

.limitations-icon {
  flex-shrink: 0;
  margin-top: 2px;
}
</style>
