<template>
  <div class="connection-status-container">
    <button
      type="button"
      class="status-pill"
      :class="{
        'status-online': status.isOnline,
        'status-offline': !status.isOnline && status.checked,
        'status-checking': isChecking
      }"
      @click="runCheck"
      :title="tooltipText"
      aria-label="AI Service Status"
    >
      <span class="status-indicator-dot"></span>
      <span class="status-label">
        <template v-if="isChecking">Checking Engine...</template>
        <template v-else-if="status.isOnline">Threat Engine Active ({{ status.latencyMs }}ms)</template>
        <template v-else>[E-SERVER-UNAVAILABLE] Engine Offline</template>
      </span>
      <RotateCw v-if="isChecking" class="spin-icon" :size="14" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { RotateCw } from 'lucide-vue-next';
import { checkAiHealth } from '../services/ai.service.js';
import { chatStore } from '../stores/chatStore.js';
import appConfig from '../config/app.config.json';

const isChecking = ref(false);
const status = computed(() => chatStore.connectionState);

const tooltipText = computed(() => {
  if (isChecking.value) return 'Testing connection to threat analysis engine...';
  if (status.value.isOnline) {
    return `Threat Analysis Engine Active (${status.value.latencyMs}ms). Click to re-check.`;
  }
  return `[E-SERVER-UNAVAILABLE] Threat analysis engine is unreachable. Click to retry.`;
});

async function runCheck() {
  if (isChecking.value) return;
  isChecking.value = true;
  try {
    const res = await checkAiHealth();
    chatStore.connectionState.checked = true;
    chatStore.connectionState.isOnline = res.ok;
    chatStore.connectionState.latencyMs = res.latencyMs || null;
    chatStore.connectionState.error = res.error || null;
  } catch (err) {
    chatStore.connectionState.checked = true;
    chatStore.connectionState.isOnline = false;
    chatStore.connectionState.error = err.message;
  } finally {
    isChecking.value = false;
  }
}

onMounted(() => {
  if (!chatStore.connectionState.checked) {
    runCheck();
  }
});
</script>

<style scoped>
.connection-status-container {
  display: inline-flex;
  align-items: center;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  min-height: 44px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.status-pill:hover {
  background-color: rgba(24, 59, 53, 0.04);
}

.status-indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-muted);
  flex-shrink: 0;
}

.status-online .status-indicator-dot {
  background-color: var(--color-success);
}

.status-online {
  border-color: #A6F4C5;
  background-color: #F6FEF9;
  color: #0b5735;
}

.status-offline .status-indicator-dot {
  background-color: var(--color-danger);
}

.status-offline {
  border-color: #FECDCA;
  background-color: #FEF8F8;
  color: #7A1910;
}

.status-checking .status-indicator-dot {
  background-color: var(--color-warning);
}

.spin-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .status-label {
    display: none;
  }
  .status-pill {
    padding: 0.4rem;
    min-width: 44px;
    justify-content: center;
  }
}
</style>
