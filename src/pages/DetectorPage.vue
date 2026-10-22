<template>
  <div class="detector-page-container">
    <div class="container">
      <div class="detector-layout">
        <!-- Main Chat Panel -->
        <main class="chat-viewport card">
          <!-- Chat Top Navigation & Controls -->
          <div class="chat-top-bar">
            <div class="chat-brand-meta">
              <div class="status-indicator-badge">
                <ShieldCheck :size="18" />
              </div>
              <div class="chat-title-group">
                <h2 class="chat-title">AI Scam Detector</h2>
                <span class="chat-subtitle">Automated threat assessment & fraud pattern verification</span>
              </div>
            </div>

            <div class="chat-controls">
              <router-link to="/check-website" class="btn-control-ghost" title="Check Website Genuineness">
                <Globe :size="15" />
                <span>Verify Website URL</span>
              </router-link>
              <button
                v-if="messages.length > 0"
                type="button"
                class="btn-control-ghost"
                @click="confirmClearChat"
                title="Clear current conversation"
                aria-label="Clear current conversation"
              >
                <Trash2 :size="16" />
                <span>Clear Chat</span>
              </button>
            </div>
          </div>

          <!-- Conversation Message Stream -->
          <div ref="chatScrollContainer" class="messages-stream" tabindex="0" aria-label="Conversation messages history">
            <!-- Empty State when no messages -->
            <div v-if="messages.length === 0" class="empty-chat-state">
              <div class="empty-icon-circle">
                <ShieldAlert :size="36" />
              </div>
              <h3 class="empty-title">Scam Detection Workspace</h3>
              <p class="empty-desc">
                Paste an SMS, suspicious link, or job offer below to receive an evidence-based risk assessment.
              </p>

              <!-- Example starter questions -->
              <div class="starter-queries">
                <span class="starter-label">Or explore these common cyber safety inquiries:</span>
                <div class="starter-chips">
                  <button
                    v-for="(query, idx) in sampleStarterQueries"
                    :key="idx"
                    type="button"
                    class="starter-chip"
                    @click="sendQuickQuery(query)"
                  >
                    <HelpCircle :size="14" />
                    <span>{{ query }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Rendered Messages List -->
            <template v-else>
              <ChatMessage
                v-for="msg in messages"
                :key="msg.id"
                :message="msg"
                @select-follow-up="sendQuickQuery"
              />
            </template>

            <!-- Loading Indicator -->
            <div v-if="isLoading" class="loading-bubble-row">
              <div class="loading-avatar">
                <ShieldCheck :size="18" />
              </div>
              <div class="loading-bubble">
                <div class="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span class="loading-label">Analyzing message evidence...</span>
              </div>
            </div>

            <!-- Error Banner with Retry -->
            <div v-if="lastError" class="chat-error-card" role="alert">
              <div class="error-header">
                <AlertOctagon :size="20" class="error-icon" />
                <div class="error-text-group">
                  <strong class="error-title">Analysis Service Notice</strong>
                  <p class="error-body">{{ lastError }}</p>
                </div>
              </div>
              <div class="error-actions">
                <button type="button" class="btn btn-secondary btn-sm" @click="handleRetry">
                  <RotateCw :size="14" />
                  Retry Request
                </button>
              </div>
            </div>
          </div>

          <!-- Chat Input Composer -->
          <div class="composer-container">
            <!-- Sensitive Data Warning if typed in composer -->
            <div v-if="activeSensitiveWarnings.length > 0" class="composer-sensitive-notice">
              <AlertTriangle :size="14" />
              <span>Sensitive data detected: Never share real passwords, OTPs, or CVVs.</span>
            </div>

            <div class="composer-input-row">
              <textarea
                ref="composerTextareaRef"
                v-model="composerText"
                class="composer-textarea"
                placeholder="Ask a question or paste a suspicious message (Enter to send, Shift+Enter for new line)..."
                rows="2"
                :disabled="isLoading"
                @keydown.enter="handleKeyDown"
              ></textarea>

              <button
                type="button"
                class="btn btn-primary btn-send"
                :disabled="!composerText.trim() || isLoading"
                @click="submitComposerMessage"
                aria-label="Send message to AI"
              >
                <Send :size="18" />
                <span class="send-label">Send</span>
              </button>
            </div>
            <div class="composer-meta">
              <span class="meta-hint">Press Enter to send &bull; Shift+Enter for a new line</span>
              <span class="meta-disclaimer">Zero Cloud Retention &bull; Strictly Educational</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { ShieldCheck, ShieldAlert, Trash2, Send, HelpCircle, AlertOctagon, AlertTriangle, RotateCw, Globe } from 'lucide-vue-next';
import { chatStore } from '../stores/chatStore.js';
import { inspectForSensitiveData } from '../services/analysis.service.js';
import ChatMessage from '../components/ChatMessage.vue';

const composerText = ref('');
const chatScrollContainer = ref(null);
const composerTextareaRef = ref(null);

const messages = computed(() => chatStore.messages);
const isLoading = computed(() => chatStore.isLoading);
const lastError = computed(() => chatStore.lastError);

const sampleStarterQueries = [
  'What should I do if I clicked a fake parcel delivery link?',
  'Why does someone ask for a UPI PIN to send money?',
  'What is the difference between reporting on 1930 and cybercrime.gov.in?',
  'How do scammers forge caller IDs and SMS sender headers?'
];

const activeSensitiveWarnings = computed(() => {
  return inspectForSensitiveData(composerText.value).warnings;
});

function scrollToBottom() {
  nextTick(() => {
    if (chatScrollContainer.value) {
      chatScrollContainer.value.scrollTop = chatScrollContainer.value.scrollHeight;
    }
  });
}

function handleKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    submitComposerMessage();
  }
}

async function submitComposerMessage() {
  const text = composerText.value.trim();
  if (!text || isLoading.value) return;

  composerText.value = '';
  await chatStore.submitUserMessage(text);
  scrollToBottom();
}

async function sendQuickQuery(query) {
  if (isLoading.value) return;
  await chatStore.submitUserMessage(query);
  scrollToBottom();
}

function handleRetry() {
  chatStore.retryLastMessage();
  scrollToBottom();
}

function confirmClearChat() {
  if (window.confirm('Are you sure you want to clear this scam inspection conversation?')) {
    chatStore.clearConversation();
  }
}

onMounted(async () => {
  // If user entered from Home page or Course page with pending text
  if (chatStore.pendingInputText) {
    const textToInspect = chatStore.pendingInputText;
    chatStore.pendingInputText = '';
    await chatStore.submitUserMessage(textToInspect);
    scrollToBottom();
  }

  // Focus composer
  nextTick(() => {
    if (composerTextareaRef.value) {
      composerTextareaRef.value.focus();
    }
  });
});
</script>

<style scoped>
.detector-page-container {
  padding: 1.5rem 0 3rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.detector-layout {
  display: flex;
  flex-direction: column;
  max-width: 920px;
  margin: 0 auto;
  width: 100%;
}

.chat-viewport {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 170px);
  min-height: 580px;
  padding: 0;
  overflow: hidden;
  background-color: var(--color-surface);
}

/* Top bar */
.chat-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  background-color: #FAFCFA;
}

.chat-brand-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-indicator-badge {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-title-group {
  display: flex;
  flex-direction: column;
}

.chat-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
}

.chat-subtitle {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.btn-control-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  min-height: 44px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.btn-control-ghost:hover {
  color: var(--color-danger);
  border-color: #FECDCA;
  background-color: var(--color-danger-bg);
}

/* Messages stream */
.messages-stream {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
}

/* Empty State */
.empty-chat-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: auto;
  max-width: 580px;
  padding: 2rem 1rem;
}

.empty-icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #EBF2EC;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.empty-desc {
  font-size: 0.95rem;
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: 1.75rem;
}

.starter-queries {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.starter-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.starter-chips {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.starter-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  min-height: 44px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.starter-chip:hover {
  border-color: var(--color-primary);
  background-color: #FAFCFA;
  color: var(--color-primary);
}

/* Loading bubble */
.loading-bubble-row {
  display: flex;
  gap: 0.875rem;
  margin-bottom: 1rem;
  align-items: center;
}

.loading-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-bubble {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: 0.85rem;
  color: var(--color-muted);
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-primary);
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Error card */
.chat-error-card {
  padding: 1rem 1.25rem;
  background-color: #FEF8F8;
  border: 1px solid #FECDCA;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.error-header {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.error-icon {
  color: var(--color-danger);
  flex-shrink: 0;
  margin-top: 2px;
}

.error-text-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.error-title {
  font-size: 0.95rem;
  color: var(--color-danger);
}

.error-body {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-text);
}

.error-actions {
  display: flex;
  justify-content: flex-end;
}

/* Composer */
.composer-container {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--color-border);
  background-color: #FAFCFA;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.composer-sensitive-notice {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.775rem;
  color: #7A4D05;
  background-color: #FFFDF5;
  border: 1px solid #FEDF89;
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-sm);
}

.composer-input-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
}

.composer-textarea {
  flex: 1;
  min-height: 52px;
  max-height: 140px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  font-size: 0.95rem;
  line-height: 1.5;
  resize: none;
}

.composer-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.btn-send {
  height: 52px;
  padding: 0 1.25rem;
}

.composer-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.725rem;
  color: var(--color-muted);
}

@media (max-width: 640px) {
  .chat-viewport {
    height: calc(100vh - 120px);
  }
  .send-label {
    display: none;
  }
  .btn-send {
    padding: 0 0.85rem;
  }
}
</style>
