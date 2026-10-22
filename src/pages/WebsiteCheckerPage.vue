<template>
  <div class="website-checker-page">
    <div class="container">
      <!-- Breadcrumb & Header -->
      <div class="page-header">
        <div class="header-badge-row">
          <span class="badge badge-default">
            <Globe :size="14" />
            Website Genuineness Verifier
          </span>
          <span class="engine-badge badge" :class="aiStatusClass">
            <component :is="isEngineOnline ? CheckCircle : AlertCircle" :size="13" />
            {{ isEngineOnline ? 'AI Threat Engine Ready' : 'Heuristic Safety Engine Active' }}
          </span>
        </div>
        <h1 class="page-title">Verify Website Legitimacy</h1>
        <p class="page-subtitle">
          Check if a website is genuine or a fraudulent clone before visiting. Performs live HTTPS presence checks, DuckDuckGo reputation queries, and token-optimized visible text extraction with Cheerio.
        </p>
      </div>

      <!-- Main Input Section -->
      <div class="checker-input-card card">
        <form @submit.prevent="handleCheckWebsite" class="checker-form">
          <div class="input-group-row">
            <div class="url-input-wrapper">
              <div class="input-icon-prefix">
                <Globe :size="18" />
              </div>
              <input
                v-model="inputUrl"
                type="text"
                class="url-input"
                placeholder="Enter website URL or domain (e.g., https://example.com or wikipedia.org)"
                :disabled="isLoading"
                autocomplete="off"
                spellcheck="false"
                required
              />
              <button
                v-if="inputUrl && !isLoading"
                type="button"
                class="clear-input-btn"
                @click="inputUrl = ''"
                title="Clear input"
                aria-label="Clear input"
              >
                <X :size="16" />
              </button>
            </div>
            <button
              type="submit"
              class="btn btn-primary check-submit-btn"
              :disabled="isLoading || !inputUrl.trim()"
            >
              <RotateCw v-if="isLoading" class="spin-icon" :size="18" />
              <ShieldCheck v-else :size="18" />
              <span>{{ isLoading ? 'Verifying Site...' : 'Check Genuineness' }}</span>
            </button>
          </div>

          <!-- Suggested Quick Example Queries -->
          <div class="sample-queries-row">
            <span class="sample-label">Try quick samples:</span>
            <div class="sample-chips">
              <button
                v-for="(sample, idx) in sampleWebsites"
                :key="idx"
                type="button"
                class="sample-chip"
                :disabled="isLoading"
                @click="selectSample(sample.url)"
              >
                <span class="chip-name">{{ sample.name }}</span>
                <span class="chip-tag" :class="sample.typeClass">{{ sample.tag }}</span>
              </button>
            </div>
          </div>
        </form>

        <!-- Loading / Progress Steps -->
        <div v-if="isLoading" class="verification-progress-card">
          <div class="progress-header">
            <div class="pulse-beacon"></div>
            <h4 class="progress-title">Running Multi-Stage Verification Pipeline...</h4>
          </div>
          <div class="pipeline-steps">
            <div class="pipeline-step active">
              <div class="step-icon"><Lock :size="14" /></div>
              <div class="step-meta">
                <strong>1. Checking HTTPS Protocol</strong>
                <span>Testing encryption status and SSL handshake</span>
              </div>
            </div>
            <div class="pipeline-step active">
              <div class="step-icon"><Search :size="14" /></div>
              <div class="step-meta">
                <strong>2. DuckDuckGo Reputation Overview</strong>
                <span>Querying search snippets for scam warnings and entity records</span>
              </div>
            </div>
            <div class="pipeline-step active">
              <div class="step-icon"><Code2 :size="14" /></div>
              <div class="step-meta">
                <strong>3. Scraping with Cheerio (Token-Optimized)</strong>
                <span>Extracting plain visible human text only (excluding all HTML tags & styles)</span>
              </div>
            </div>
            <div class="pipeline-step active">
              <div class="step-icon"><Cpu :size="14" /></div>
              <div class="step-meta">
                <strong>4. AI Threat Assessment</strong>
                <span>Synthesizing evidence and computing risk probability</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Alert -->
        <div v-if="errorMessage" class="error-alert-box" role="alert">
          <AlertOctagon :size="20" class="error-icon" />
          <div class="error-content">
            <strong>Verification Encountered An Issue</strong>
            <p>{{ errorMessage }}</p>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" @click="handleCheckWebsite">
            Retry Check
          </button>
        </div>
      </div>

      <!-- Verification Results Display -->
      <section v-if="result && !isLoading" class="results-container">
        <!-- Verdict Overview Banner -->
        <div class="verdict-card card" :class="verdictThemeClass">
          <div class="verdict-main-row">
            <div class="verdict-status-block">
              <div class="verdict-icon-bubble">
                <component :is="verdictIcon" :size="32" />
              </div>
              <div class="verdict-meta">
                <span class="verdict-pretitle">CyberShield Verification Verdict</span>
                <h2 class="verdict-heading">{{ verdictLabel }}</h2>
                <div class="domain-target-badge">
                  <Globe :size="14" />
                  <span class="target-url-text font-mono">{{ result.url }}</span>
                </div>
              </div>
            </div>

            <!-- Risk Meter & Confidence -->
            <div class="risk-stats-group">
              <div class="risk-meter-box">
                <div class="risk-meter-meta">
                  <span class="meter-label">Threat Risk Score</span>
                  <span class="meter-percentage font-mono">{{ result.assessment.riskScore }}%</span>
                </div>
                <div class="meter-track" role="progressbar" :aria-valuenow="result.assessment.riskScore" aria-valuemin="0" aria-valuemax="100">
                  <div class="meter-fill" :style="{ width: `${result.assessment.riskScore}%` }"></div>
                </div>
                <span class="meter-tier-caption">{{ riskTierText }}</span>
              </div>

              <div class="confidence-box">
                <div class="confidence-meta">
                  <span class="confidence-label">Confidence</span>
                  <span class="confidence-percentage font-mono">{{ result.assessment.confidence }}%</span>
                </div>
                <span class="confidence-caption">Based on live HTTPS, DDG overview & scraped text cues</span>
              </div>
            </div>
          </div>

          <!-- Executive Summary -->
          <div class="summary-callout">
            <p class="summary-text">{{ result.assessment.summary }}</p>
          </div>
        </div>

        <!-- Three Technical Inspection Pillars -->
        <div class="pillars-grid">
          <!-- Pillar 1: HTTPS Presence -->
          <div class="pillar-card card" :class="result.hasHttps ? 'pillar-secure' : 'pillar-danger'">
            <div class="pillar-header">
              <div class="pillar-icon-box">
                <component :is="result.hasHttps ? Lock : Unlock" :size="20" />
              </div>
              <div class="pillar-title-block">
                <h3 class="pillar-title">HTTPS Security Presence</h3>
                <span class="pillar-status-badge badge" :class="result.hasHttps ? 'badge-success' : 'badge-danger'">
                  {{ result.hasHttps ? 'HTTPS Present (Encrypted)' : 'Insecure HTTP (Unencrypted)' }}
                </span>
              </div>
            </div>
            <div class="pillar-body">
              <p class="pillar-explanation">
                {{ result.assessment.httpsStatus?.details || (result.hasHttps ? 'The website provides TLS/SSL encryption for data in transit.' : 'Data sent to this website is transmitted unencrypted.') }}
              </p>
              <div class="pillar-indicator-list">
                <div class="indicator-item">
                  <Check v-if="result.hasHttps" :size="16" class="icon-good" />
                  <AlertTriangle v-else :size="16" class="icon-bad" />
                  <span>{{ result.hasHttps ? 'Encrypted connection established' : 'No HTTPS encryption detected' }}</span>
                </div>
                <div class="indicator-item">
                  <Check v-if="result.hasHttps" :size="16" class="icon-good" />
                  <AlertTriangle v-else :size="16" class="icon-bad" />
                  <span>{{ result.hasHttps ? 'Safe for transport security' : 'High risk of credential interception on public networks' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pillar 2: DuckDuckGo Overview (#1 Requirement) -->
          <div class="pillar-card card" :class="getDdgThemeClass(result.duckDuckGoOverview.reputation)">
            <div class="pillar-header">
              <div class="pillar-icon-box">
                <Search :size="20" />
              </div>
              <div class="pillar-title-block">
                <h3 class="pillar-title">DuckDuckGo Reputation Overview</h3>
                <span class="pillar-status-badge badge" :class="getDdgBadgeClass(result.duckDuckGoOverview.reputation)">
                  {{ formatDdgReputation(result.duckDuckGoOverview.reputation) }}
                </span>
              </div>
            </div>
            <div class="pillar-body">
              <p class="pillar-explanation">{{ result.duckDuckGoOverview.summary }}</p>

              <!-- Negative warning indicators found on DuckDuckGo -->
              <div v-if="result.duckDuckGoOverview.negativeSignals && result.duckDuckGoOverview.negativeSignals.length > 0" class="negative-signals-box">
                <div class="negative-signals-title">
                  <AlertOctagon :size="14" />
                  <span>Cautionary Keywords in DDG Results:</span>
                </div>
                <div class="negative-tags">
                  <span v-for="(sig, idx) in result.duckDuckGoOverview.negativeSignals" :key="idx" class="negative-tag badge badge-danger">
                    {{ sig }}
                  </span>
                </div>
              </div>

              <!-- DuckDuckGo Snippets Toggle -->
              <div v-if="result.duckDuckGoOverview.snippets && result.duckDuckGoOverview.snippets.length > 0" class="snippets-container">
                <button
                  type="button"
                  class="btn-text-toggle"
                  @click="showDdgSnippets = !showDdgSnippets"
                >
                  <ChevronDown v-if="!showDdgSnippets" :size="16" />
                  <ChevronUp v-else :size="16" />
                  <span>{{ showDdgSnippets ? 'Hide DuckDuckGo Snippets' : `View ${result.duckDuckGoOverview.snippets.length} DuckDuckGo Search Snippets` }}</span>
                </button>

                <div v-if="showDdgSnippets" class="snippets-drawer">
                  <div v-for="(snippet, sIdx) in result.duckDuckGoOverview.snippets" :key="sIdx" class="snippet-item">
                    <strong class="snippet-title">{{ snippet.title }}</strong>
                    <p class="snippet-snippet">{{ snippet.snippet }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pillar 3: Cheerio Scraping & Token-Saving Plain Text (#2 Requirement) -->
          <div class="pillar-card card pillar-cheerio">
            <div class="pillar-header">
              <div class="pillar-icon-box">
                <Code2 :size="20" />
              </div>
              <div class="pillar-title-block">
                <h3 class="pillar-title">Cheerio Content Scraping</h3>
                <span class="pillar-status-badge badge badge-default">
                  Token-Optimized Plain Text
                </span>
              </div>
            </div>
            <div class="pillar-body">
              <div class="token-saving-stats">
                <div class="stat-pill">
                  <span class="stat-num">{{ result.scrapedData.cleanTexts?.length || 0 }}</span>
                  <span class="stat-desc">Clean Text Elements</span>
                </div>
                <div class="stat-pill">
                  <span class="stat-num">{{ result.scrapedData.totalChars || 0 }}</span>
                  <span class="stat-desc">Tokens/Chars Sent</span>
                </div>
                <div class="stat-pill">
                  <span class="stat-num font-mono">0</span>
                  <span class="stat-desc">Raw HTML Tags Fed</span>
                </div>
              </div>

              <p class="pillar-explanation">
                {{ result.assessment.scrapedContentFindings?.summary || 'Cheerio stripped all markup, scripts, and styling attributes, passing pure visible text to the model.' }}
              </p>

              <!-- Page Title if found -->
              <div v-if="result.scrapedData.pageTitle" class="scraped-title-row">
                <span class="scraped-label">Page Title:</span>
                <span class="scraped-value font-mono">"{{ result.scrapedData.pageTitle }}"</span>
              </div>

              <!-- Flagged phrases -->
              <div v-if="result.assessment.scrapedContentFindings?.suspiciousPhrases?.length" class="flagged-phrases-box">
                <span class="flagged-label">Suspicious Text Phrases Detected:</span>
                <div class="flagged-chips">
                  <span v-for="(phrase, pIdx) in result.assessment.scrapedContentFindings.suspiciousPhrases" :key="pIdx" class="badge badge-warning">
                    "{{ phrase }}"
                  </span>
                </div>
              </div>

              <!-- Expandable Plain Text Viewer -->
              <div class="clean-text-drawer-wrapper">
                <button
                  type="button"
                  class="btn-text-toggle"
                  @click="showScrapedTexts = !showScrapedTexts"
                >
                  <ChevronDown v-if="!showScrapedTexts" :size="16" />
                  <ChevronUp v-else :size="16" />
                  <span>{{ showScrapedTexts ? 'Hide Extracted Text Stream' : `Inspect Extracted Plain Text (${result.scrapedData.cleanTexts?.length || 0} items)` }}</span>
                </button>

                <div v-if="showScrapedTexts" class="clean-texts-stream">
                  <div class="clean-texts-banner">
                    <Info :size="14" />
                    <span>Pure visible strings without HTML attributes or styles:</span>
                  </div>
                  <ul class="clean-texts-list">
                    <li v-for="(txt, tIdx) in result.scrapedData.cleanTexts" :key="tIdx" class="clean-text-line">
                      <span class="line-index font-mono">{{ tIdx + 1 }}.</span>
                      <span class="line-content">{{ txt }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Evidence & Recommended Actions Section -->
        <div class="details-split-grid">
          <!-- Detected Evidence Items -->
          <div class="evidence-panel card">
            <div class="panel-header">
              <AlertTriangle :size="18" class="panel-icon" />
              <h3 class="panel-title">Detected Threat Indicators & Evidence</h3>
            </div>
            <div v-if="result.assessment.evidence && result.assessment.evidence.length > 0" class="evidence-list">
              <div v-for="(item, idx) in result.assessment.evidence" :key="idx" class="evidence-card">
                <span class="evidence-tag badge" :class="getEvidenceBadgeClass(item.type)">
                  {{ formatEvidenceType(item.type) }}
                </span>
                <p class="evidence-text">{{ item.detail }}</p>
              </div>
            </div>
            <div v-else class="empty-evidence">
              <CheckCircle :size="24" class="icon-good" />
              <p>No critical fraudulent indicators observed in extracted text or reputation check.</p>
            </div>
          </div>

          <!-- Recommendations & Verification Actions -->
          <div class="actions-panel card">
            <div class="panel-header">
              <ShieldCheck :size="18" class="panel-icon" />
              <h3 class="panel-title">Recommended Safety Precautions</h3>
            </div>
            <ul class="actions-list">
              <li v-for="(action, idx) in result.assessment.recommendedActions" :key="'act-' + idx" class="action-item">
                <CheckCircle2 :size="16" class="action-icon" />
                <span>{{ action }}</span>
              </li>
            </ul>

            <div class="verification-steps-box">
              <h4 class="steps-heading">
                <Search :size="15" />
                Independent Verification Guide
              </h4>
              <ul class="steps-list">
                <li v-for="(step, sIdx) in result.assessment.verificationSteps" :key="'step-' + sIdx" class="step-item">
                  <span class="step-bullet font-mono">{{ sIdx + 1 }}</span>
                  <span>{{ step }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Bottom Action Bar -->
        <div class="bottom-actions-card card">
          <div class="bottom-left">
            <span class="source-tag">
              Assessment Source: <strong>{{ result.source === 'ai_engine' ? 'Local AI Inference Engine' : 'Rule-Based Heuristic Safety Engine' }}</strong>
            </span>
          </div>
          <div class="bottom-right">
            <button type="button" class="btn btn-secondary btn-sm" @click="handleCopyReport">
              <Copy :size="15" />
              <span>{{ copyStatusText }}</span>
            </button>
            <button type="button" class="btn btn-primary btn-sm" @click="resetAndCheckAnother">
              <Plus :size="15" />
              <span>Verify Another Website</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  Globe,
  Lock,
  Unlock,
  Search,
  Code2,
  Cpu,
  RotateCw,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Copy,
  Plus
} from 'lucide-vue-next';
import { checkWebsiteGenuineness } from '../services/websiteChecker.service.js';
import { chatStore } from '../stores/chatStore.js';

const inputUrl = ref('');
const isLoading = ref(false);
const errorMessage = ref(null);
const result = ref(null);
const showDdgSnippets = ref(false);
const showScrapedTexts = ref(false);
const copyStatusText = ref('Copy Report');

const isEngineOnline = computed(() => chatStore.connectionState.isOnline);
const aiStatusClass = computed(() => isEngineOnline.value ? 'badge-success' : 'badge-default');

const sampleWebsites = [
  { name: 'wikipedia.org', url: 'https://wikipedia.org', tag: 'Legitimate Knowledge', typeClass: 'badge-success' },
  { name: 'example.com', url: 'https://example.com', tag: 'Documentation Domain', typeClass: 'badge-default' },
  { name: 'sbi-kyc-verify-alert.net', url: 'https://sbi-kyc-verify-alert.net', tag: 'Simulated Phishing', typeClass: 'badge-danger' },
  { name: 'http://insecure-portal.test', url: 'http://insecure-portal.test', tag: 'Insecure Plain HTTP', typeClass: 'badge-warning' }
];

function selectSample(url) {
  inputUrl.value = url;
  handleCheckWebsite();
}

async function handleCheckWebsite() {
  if (!inputUrl.value || !inputUrl.value.trim() || isLoading.value) return;

  isLoading.value = true;
  errorMessage.value = null;
  result.value = null;
  showDdgSnippets.value = false;
  showScrapedTexts.value = false;

  try {
    const verified = await checkWebsiteGenuineness(inputUrl.value.trim());
    result.value = verified;
  } catch (err) {
    errorMessage.value = err.message || 'An error occurred while verifying the website.';
  } finally {
    isLoading.value = false;
  }
}

function resetAndCheckAnother() {
  inputUrl.value = '';
  result.value = null;
  errorMessage.value = null;
}

// Verdict UI Helpers
const verdictLabel = computed(() => {
  if (!result.value) return '';
  switch (result.value.assessment.verdict) {
    case 'likely_legitimate':
      return 'Likely Genuine Website';
    case 'suspicious':
      return 'Caution: Suspicious Indicators Detected';
    case 'likely_scam':
      return 'High Risk: Likely Scam or Phishing Site';
    default:
      return 'Inconclusive / Neutral Record';
  }
});

const verdictThemeClass = computed(() => {
  if (!result.value) return '';
  switch (result.value.assessment.verdict) {
    case 'likely_legitimate':
      return 'theme-legitimate';
    case 'suspicious':
      return 'theme-suspicious';
    case 'likely_scam':
      return 'theme-scam';
    default:
      return 'theme-inconclusive';
  }
});

const verdictIcon = computed(() => {
  if (!result.value) return ShieldCheck;
  switch (result.value.assessment.verdict) {
    case 'likely_legitimate':
      return ShieldCheck;
    case 'suspicious':
      return AlertTriangle;
    case 'likely_scam':
      return AlertOctagon;
    default:
      return Info;
  }
});

const riskTierText = computed(() => {
  if (!result.value) return '';
  const score = result.value.assessment.riskScore;
  if (score >= 80) return 'Critical Risk: Severe threat or fake clone';
  if (score >= 50) return 'High Risk: Major warning signals detected';
  if (score >= 20) return 'Moderate Risk: Exercise caution';
  return 'Low Risk: Consistent with normal legitimate site';
});

function getDdgThemeClass(rep) {
  if (rep === 'negative') return 'pillar-danger';
  if (rep === 'positive') return 'pillar-secure';
  if (rep === 'suspicious') return 'pillar-warning';
  return 'pillar-neutral';
}

function getDdgBadgeClass(rep) {
  if (rep === 'negative') return 'badge-danger';
  if (rep === 'positive') return 'badge-success';
  if (rep === 'suspicious') return 'badge-warning';
  return 'badge-default';
}

function formatDdgReputation(rep) {
  switch (rep) {
    case 'positive':
      return 'Recognized Entity';
    case 'negative':
      return 'Negative / Warning Reports';
    case 'suspicious':
      return 'Cautionary Mentions';
    default:
      return 'Neutral / Unindexed';
  }
}

function formatEvidenceType(type) {
  const map = {
    https: 'HTTPS Protocol',
    ddg_reputation: 'DuckDuckGo Reputation',
    domain: 'Domain Structure',
    content: 'Content Analysis',
    phishing_indicators: 'Phishing Pattern',
    credential_harvesting: 'Credential Request',
    urgency: 'Urgency Pressure'
  };
  return map[type] || 'Indicator';
}

function getEvidenceBadgeClass(type) {
  if (type === 'https' || type === 'phishing_indicators' || type === 'credential_harvesting') {
    return 'badge-danger';
  }
  if (type === 'ddg_reputation' || type === 'domain' || type === 'urgency') {
    return 'badge-warning';
  }
  return 'badge-default';
}

async function handleCopyReport() {
  if (!result.value) return;
  const rep = `CYBERSHIELD WEBSITE VERIFICATION REPORT
Target URL: ${result.value.url}
Verdict: ${verdictLabel.value} (Risk: ${result.value.assessment.riskScore}%, Confidence: ${result.value.assessment.confidence}%)
HTTPS Status: ${result.value.hasHttps ? 'HTTPS Present (Encrypted)' : 'Missing HTTPS (Insecure HTTP)'}
DuckDuckGo Overview: ${result.value.duckDuckGoOverview.summary}
Scraped Clean Texts: ${result.value.scrapedData.cleanTexts?.length || 0} elements checked
Summary: ${result.value.assessment.summary}

Recommended Actions:
${result.value.assessment.recommendedActions.map(a => `- ${a}`).join('\n')}
`;

  try {
    await navigator.clipboard.writeText(rep);
    copyStatusText.value = 'Report Copied!';
    setTimeout(() => {
      copyStatusText.value = 'Copy Report';
    }, 2500);
  } catch (err) {
    copyStatusText.value = 'Copy Failed';
  }
}
</script>

<style scoped>
.website-checker-page {
  padding: 2rem 0 4rem;
}

.page-header {
  margin-bottom: 2rem;
}

.header-badge-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  letter-spacing: var(--letter-spacing-heading);
}

.page-subtitle {
  font-size: 1.0625rem;
  color: var(--color-muted);
  max-width: 780px;
  line-height: var(--lh-body);
}

/* Input Card */
.checker-input-card {
  padding: 1.75rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  margin-bottom: 2rem;
}

.input-group-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.url-input-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.input-icon-prefix {
  position: absolute;
  left: 1rem;
  color: var(--color-muted);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.url-input {
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 2.75rem 0.75rem 2.75rem;
  font-size: 1rem;
  font-family: var(--font-body);
  color: var(--color-text);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.url-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background-color: #FFFFFF;
}

.clear-input-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  border-radius: var(--radius-sm);
}

.clear-input-btn:hover {
  color: var(--color-text);
}

.check-submit-btn {
  min-height: 48px;
  padding: 0 1.5rem;
  font-weight: 700;
}

/* Sample Queries */
.sample-queries-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.sample-label {
  color: var(--color-muted);
  font-weight: 500;
}

.sample-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sample-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.3125rem 0.625rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.15s ease;
}

.sample-chip:hover:not(:disabled) {
  border-color: var(--color-primary);
  background-color: rgba(24, 59, 53, 0.05);
}

.chip-tag {
  font-size: 0.6875rem;
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-full);
}

/* Progress Pipeline Card */
.verification-progress-card {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.progress-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.pulse-beacon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-primary);
  box-shadow: 0 0 0 0 rgba(24, 59, 53, 0.7);
  animation: pulse-ring 1.5s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(24, 59, 53, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(24, 59, 53, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(24, 59, 53, 0); }
}

.progress-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.pipeline-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

.pipeline-step {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.75rem;
  background-color: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.step-icon {
  margin-top: 0.125rem;
  color: var(--color-primary);
}

.step-meta strong {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-text);
  margin-bottom: 0.125rem;
}

.step-meta span {
  font-size: 0.75rem;
  color: var(--color-muted);
  line-height: 1.3;
}

/* Error Alert */
.error-alert-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.25rem;
  padding: 1rem;
  background-color: var(--color-danger-bg);
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-md);
  color: var(--color-danger);
}

.error-content {
  flex: 1;
}

.error-content strong {
  display: block;
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
}

.error-content p {
  font-size: 0.875rem;
  margin: 0;
}

/* Results Layout */
.results-container {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* Verdict Banner */
.verdict-card {
  padding: 2rem;
  border-radius: var(--radius-lg);
  border-left: 6px solid var(--color-border);
}

.theme-legitimate {
  border-left-color: var(--color-success);
  background-color: #F8FCF9;
}

.theme-suspicious {
  border-left-color: var(--color-warning);
  background-color: #FFFCF5;
}

.theme-scam {
  border-left-color: var(--color-danger);
  background-color: #FFF8F7;
}

.theme-inconclusive {
  border-left-color: var(--color-muted);
  background-color: #FAFAFA;
}

.verdict-main-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.verdict-status-block {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}

.verdict-icon-bubble {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.theme-legitimate .verdict-icon-bubble {
  background-color: var(--color-success-bg);
  color: var(--color-success);
}

.theme-suspicious .verdict-icon-bubble {
  background-color: var(--color-warning-bg);
  color: var(--color-warning);
}

.theme-scam .verdict-icon-bubble {
  background-color: var(--color-danger-bg);
  color: var(--color-danger);
}

.theme-inconclusive .verdict-icon-bubble {
  background-color: #EEEEEE;
  color: var(--color-muted);
}

.verdict-pretitle {
  display: block;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: var(--color-muted);
  margin-bottom: 0.25rem;
}

.verdict-heading {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.domain-target-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.625rem;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
}

.target-url-text {
  font-weight: 600;
  color: var(--color-text);
}

/* Risk Stats Block */
.risk-stats-group {
  display: flex;
  gap: 1.5rem;
  min-width: 320px;
}

.risk-meter-box, .confidence-box {
  flex: 1;
  background-color: #FFFFFF;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.risk-meter-meta, .confidence-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.meter-label, .confidence-label {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-muted);
  text-transform: uppercase;
}

.meter-percentage, .confidence-percentage {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
}

.meter-track {
  width: 100%;
  height: 8px;
  background-color: var(--color-background);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 0.375rem;
}

.meter-fill {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.4s ease;
}

.theme-legitimate .meter-fill { background-color: var(--color-success); }
.theme-suspicious .meter-fill { background-color: var(--color-warning); }
.theme-scam .meter-fill { background-color: var(--color-danger); }

.meter-tier-caption, .confidence-caption {
  display: block;
  font-size: 0.75rem;
  color: var(--color-muted);
  line-height: 1.3;
}

.summary-callout {
  padding-top: 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.summary-text {
  font-size: 1.0625rem;
  color: var(--color-text);
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
}

/* 3 Pillars Grid */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.pillar-card {
  padding: 1.5rem;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.pillar-secure {
  border-top: 4px solid var(--color-success);
}

.pillar-warning {
  border-top: 4px solid var(--color-warning);
}

.pillar-danger {
  border-top: 4px solid var(--color-danger);
}

.pillar-neutral {
  border-top: 4px solid var(--color-muted);
}

.pillar-cheerio {
  border-top: 4px solid var(--color-primary);
}

.pillar-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.pillar-icon-box {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background-color: var(--color-background);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pillar-title-block {
  flex: 1;
}

.pillar-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 0.25rem 0;
}

.pillar-explanation {
  font-size: 0.9375rem;
  color: var(--color-text);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.pillar-indicator-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}

.indicator-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.icon-good {
  color: var(--color-success);
}

.icon-bad {
  color: var(--color-danger);
}

/* DuckDuckGo Pillar */
.negative-signals-box {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: var(--color-danger-bg);
  border-radius: var(--radius-md);
}

.negative-signals-title {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-danger);
  margin-bottom: 0.375rem;
}

.negative-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.btn-text-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: none;
  border: none;
  padding: 0.375rem 0;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
}

.btn-text-toggle:hover {
  text-decoration: underline;
}

.snippets-drawer {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  max-height: 240px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.snippet-item {
  padding: 0.625rem;
  background-color: var(--color-background);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.snippet-title {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.snippet-snippet {
  font-size: 0.75rem;
  color: var(--color-muted);
  line-height: 1.4;
  margin: 0;
}

/* Cheerio Pillar */
.token-saving-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stat-pill {
  padding: 0.5rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  text-align: center;
}

.stat-num {
  display: block;
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--color-primary);
}

.stat-desc {
  font-size: 0.6875rem;
  color: var(--color-muted);
}

.scraped-title-row {
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background-color: var(--color-background);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
}

.scraped-label {
  font-weight: 700;
  color: var(--color-muted);
  margin-right: 0.375rem;
}

.scraped-value {
  color: var(--color-text);
}

.flagged-phrases-box {
  margin-bottom: 0.75rem;
}

.flagged-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-warning);
  margin-bottom: 0.375rem;
}

.flagged-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.clean-texts-stream {
  margin-top: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-background);
  max-height: 250px;
  overflow-y: auto;
}

.clean-texts-banner {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  background-color: #ECEEEA;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-muted);
}

.clean-texts-list {
  list-style: none;
  padding: 0.5rem 0.75rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.clean-text-line {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--color-text);
}

.line-index {
  color: var(--color-muted);
  min-width: 22px;
}

/* Split Grid for Evidence & Actions */
.details-split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.evidence-panel, .actions-panel {
  padding: 1.75rem;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
}

.panel-icon {
  color: var(--color-primary);
}

.panel-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
}

.evidence-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.evidence-card {
  padding: 0.875rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.evidence-tag {
  display: inline-block;
  margin-bottom: 0.375rem;
  font-size: 0.75rem;
}

.evidence-text {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.45;
  margin: 0;
}

.empty-evidence {
  text-align: center;
  padding: 2rem;
  color: var(--color-muted);
}

.actions-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.9375rem;
  color: var(--color-text);
  line-height: 1.45;
}

.action-icon {
  color: var(--color-primary);
  margin-top: 0.1875rem;
  flex-shrink: 0;
}

.verification-steps-box {
  padding: 1rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.steps-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 0.75rem 0;
}

.steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.8125rem;
  color: var(--color-text);
  line-height: 1.4;
}

.step-bullet {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;
}

/* Bottom Bar */
.bottom-actions-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.75rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.source-tag {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.bottom-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

@media (max-width: 900px) {
  .verdict-main-row {
    flex-direction: column;
  }
  .risk-stats-group {
    width: 100%;
    min-width: unset;
  }
  .details-split-grid {
    grid-template-columns: 1fr;
  }
  .bottom-actions-card {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .input-group-row {
    flex-direction: column;
  }
  .check-submit-btn {
    width: 100%;
  }
  .pillars-grid {
    grid-template-columns: 1fr;
  }
}
</style>
