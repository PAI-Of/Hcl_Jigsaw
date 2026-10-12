<template>
  <div class="message-input-card card">
    <div class="input-mode-tabs" role="tablist">
      <button
        type="button"
        class="tab-btn"
        :class="{ 'tab-btn-active': activeTab === 'text' }"
        @click="activeTab = 'text'"
        role="tab"
        :aria-selected="activeTab === 'text'"
      >
        <FileText :size="16" />
        Paste Message or Link
      </button>
      <button
        type="button"
        class="tab-btn"
        :class="{ 'tab-btn-active': activeTab === 'screenshot' }"
        @click="activeTab = 'screenshot'"
        role="tab"
        :aria-selected="activeTab === 'screenshot'"
      >
        <Camera :size="16" />
        Upload a Screenshot Instead
      </button>
    </div>

    <!-- Text Input Mode -->
    <div v-if="activeTab === 'text'" class="text-input-body">
      <div class="textarea-header">
        <label for="suspicious-msg-input" class="form-label">
          Suspicious Message, SMS, or Link Text
        </label>
        <span class="char-count" :class="{ 'char-count-warning': charCount > 1800 }">
          {{ charCount }} / {{ maxChars }} chars
        </span>
      </div>

      <textarea
        id="suspicious-msg-input"
        v-model="inputText"
        class="form-textarea message-box"
        placeholder="Paste an SMS, WhatsApp message, email snippet, or suspicious link here (e.g. 'Congratulations! You have won ₹1,00,000 scholarship...')"
        :maxlength="maxChars"
        rows="5"
        @input="onInputChange"
      ></textarea>

      <!-- Sensitive Data Interception Warning -->
      <div v-if="sensitiveWarnings.length > 0" class="sensitive-warning-banner" role="alert">
        <AlertTriangle :size="18" class="warning-icon" />
        <div class="warning-text-group">
          <strong>Privacy Alert:</strong>
          <ul>
            <li v-for="(w, idx) in sensitiveWarnings" :key="idx">{{ w }}</li>
          </ul>
        </div>
      </div>

      <!-- Validation Error -->
      <p v-if="errorMessage" class="error-msg" role="alert">
        <AlertCircle :size="16" />
        <span>{{ errorMessage }}</span>
      </p>

      <!-- Action Buttons -->
      <div class="textarea-footer">
        <button
          type="button"
          class="btn btn-secondary"
          :disabled="!inputText.trim()"
          @click="clearInput"
        >
          <RotateCcw :size="16" />
          Clear
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="!inputText.trim()"
          @click="handleAnalyze"
        >
          <ShieldAlert :size="18" />
          Analyze Message
        </button>
      </div>

      <!-- Starting prompts below input -->
      <ExamplePrompt @select-example="populateExample" />
    </div>

    <!-- Screenshot Upload Mode -->
    <div v-else class="screenshot-input-body">
      <ScreenshotUpload />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { FileText, Camera, ShieldAlert, RotateCcw, AlertTriangle, AlertCircle } from 'lucide-vue-next';
import { inspectForSensitiveData } from '../services/analysis.service.js';
import { chatStore } from '../stores/chatStore.js';
import ExamplePrompt from './ExamplePrompt.vue';
import ScreenshotUpload from './ScreenshotUpload.vue';

const router = useRouter();
const activeTab = ref('text');
const inputText = ref('');
const errorMessage = ref('');
const maxChars = 2000;

const charCount = computed(() => inputText.value.length);
const sensitiveWarnings = computed(() => {
  return inspectForSensitiveData(inputText.value).warnings;
});

function onInputChange() {
  if (errorMessage.value && inputText.value.trim()) {
    errorMessage.value = '';
  }
}

function clearInput() {
  inputText.value = '';
  errorMessage.value = '';
}

function populateExample(text) {
  inputText.value = text;
  errorMessage.value = '';
}

function handleAnalyze() {
  const trimmed = inputText.value.trim();
  if (!trimmed) {
    errorMessage.value = 'Please paste or type a suspicious message or link to analyze.';
    return;
  }
  if (trimmed.length < 5) {
    errorMessage.value = 'Message is too short to inspect. Please provide the full message or context.';
    return;
  }

  // Preserve message and submit in chat
  chatStore.prepareTextForAnalysis(trimmed);
  router.push('/chat');
}
</script>

<style scoped>
.message-input-card {
  padding: 1.5rem;
}

.input-mode-tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  min-height: 44px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab-btn:hover {
  color: var(--color-text);
  background-color: rgba(24, 59, 53, 0.04);
}

.tab-btn-active {
  background-color: var(--color-surface);
  color: var(--color-primary);
  border-color: var(--color-border);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.textarea-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0;
}

.char-count {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.char-count-warning {
  color: var(--color-danger);
  font-weight: 700;
}

.message-box {
  min-height: 120px;
  font-size: 0.95rem;
  line-height: 1.5;
}

.sensitive-warning-banner {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: #FFFDF5;
  border: 1px solid #FEDF89;
  border-radius: var(--radius-md);
  color: #7A4D05;
  font-size: 0.85rem;
  margin-top: 0.75rem;
}

.warning-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.warning-text-group ul {
  margin: 0.25rem 0 0 1rem;
  padding: 0;
}

.warning-text-group li {
  margin-bottom: 0.2rem;
}

.error-msg {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-danger);
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.textarea-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}
</style>
