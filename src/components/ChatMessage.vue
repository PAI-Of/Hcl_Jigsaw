<template>
  <div class="chat-message-row" :class="`message-role-${message.role}`">
    <!-- Avatar / Role Icon -->
    <div class="message-avatar" :class="`avatar-${message.role}`">
      <User v-if="message.role === 'user'" :size="18" />
      <ShieldCheck v-else :size="18" />
    </div>

    <!-- Message Bubble -->
    <div class="message-bubble-wrapper">
      <div class="message-meta-header">
        <span class="message-author">
          {{ message.role === 'user' ? 'You' : 'CyberShield AI' }}
        </span>
        <span class="message-time">{{ message.timestamp }}</span>
      </div>

      <!-- User Message Content -->
      <div v-if="message.role === 'user'" class="bubble-user">
        <p class="bubble-text">{{ message.content }}</p>

        <!-- Sensitive Data Warning if detected on user message -->
        <div v-if="message.sensitiveWarnings && message.sensitiveWarnings.length > 0" class="sensitive-flag">
          <AlertTriangle :size="14" />
          <span>{{ message.sensitiveWarnings[0] }}</span>
        </div>
      </div>

      <!-- Assistant / AI Message Content -->
      <div v-else class="bubble-assistant">
        <!-- Render structured risk report if available -->
        <RiskAssessment v-if="message.structured" :assessment="message.structured" />

        <!-- Render text reply if not structured -->
        <div v-else class="assistant-plain-text">
          <p v-for="(paragraph, idx) in formattedParagraphs" :key="idx" class="bubble-text">
            {{ paragraph }}
          </p>
        </div>

        <!-- Raw model output toggle -->
        <div v-if="message.structured" class="raw-toggle-wrapper">
          <button
            type="button"
            class="btn-toggle-raw"
            @click="showRaw = !showRaw"
            :aria-expanded="showRaw"
          >
            <Code :size="13" />
            <span>{{ showRaw ? 'Hide raw model output' : 'View raw JSON output' }}</span>
          </button>
          <pre v-if="showRaw" class="raw-output-box"><code>{{ message.content }}</code></pre>
        </div>

        <!-- Render Follow-Up Questions if provided in structured output -->
        <FollowUpQuestions
          v-if="message.structured?.followUpQuestions?.length"
          :questions="message.structured.followUpQuestions"
          @select-question="$emit('select-follow-up', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { User, ShieldCheck, AlertTriangle, Code } from 'lucide-vue-next';
import RiskAssessment from './RiskAssessment.vue';
import FollowUpQuestions from './FollowUpQuestions.vue';

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});

const showRaw = ref(false);

defineEmits(['select-follow-up']);

const formattedParagraphs = computed(() => {
  if (!props.message.content) return [];
  // Split on multiple newlines
  return props.message.content
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
});
</script>

<style scoped>
.chat-message-row {
  display: flex;
  gap: 0.875rem;
  margin-bottom: 1.5rem;
  width: 100%;
}

.message-role-user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-user {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.avatar-assistant {
  background-color: var(--color-primary);
  color: #FFFFFF;
}

.message-bubble-wrapper {
  max-width: 85%;
  display: flex;
  flex-direction: column;
}

.message-role-user .message-bubble-wrapper {
  align-items: flex-end;
}

.message-meta-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.775rem;
  color: var(--color-muted);
}

.message-author {
  font-weight: 700;
  color: var(--color-text);
}

.bubble-user {
  background-color: #EBF2EC;
  color: var(--color-text);
  padding: 0.875rem 1.125rem;
  border-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-sm);
  border: 1px solid #D5E2D7;
}

.bubble-assistant {
  width: 100%;
}

.assistant-plain-text {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  border-top-left-radius: var(--radius-sm);
  padding: 1rem 1.25rem;
  box-shadow: var(--shadow-card);
}

.bubble-text {
  font-size: 0.9375rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.bubble-text + .bubble-text {
  margin-top: 0.75rem;
}

.sensitive-flag {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: #925C08;
  background-color: #FEF0C7;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  margin-top: 0.5rem;
  font-weight: 600;
}

.raw-toggle-wrapper {
  margin-top: 0.5rem;
}

.btn-toggle-raw {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0;
  min-height: 32px;
}

.btn-toggle-raw:hover {
  color: var(--color-primary);
}

.raw-output-box {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  margin-top: 0.25rem;
}

@media (max-width: 640px) {
  .message-bubble-wrapper {
    max-width: 100%;
  }
}
</style>
