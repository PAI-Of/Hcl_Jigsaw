<template>
  <div v-if="questions && questions.length > 0" class="follow-up-container">
    <div class="follow-up-header">
      <HelpCircle :size="15" />
      <span class="follow-up-label">Helpful Clarifications & Follow-up Questions:</span>
    </div>
    <div class="questions-chips">
      <button
        v-for="(q, idx) in questions"
        :key="idx"
        type="button"
        class="question-chip"
        @click="$emit('select-question', q)"
        :aria-label="`Ask follow-up question: ${q}`"
      >
        <span>{{ q }}</span>
        <ArrowUpRight :size="14" class="chip-arrow" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { HelpCircle, ArrowUpRight } from 'lucide-vue-next';

defineProps({
  questions: {
    type: Array,
    default: () => []
  }
});

defineEmits(['select-question']);
</script>

<style scoped>
.follow-up-container {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 0.75rem;
}

.follow-up-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-muted);
}

.questions-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.question-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  min-height: 44px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.question-chip:hover {
  background-color: #FAFCFA;
  border-color: var(--color-primary);
}

.chip-arrow {
  flex-shrink: 0;
  color: var(--color-muted);
}

.question-chip:hover .chip-arrow {
  color: var(--color-primary);
}
</style>
