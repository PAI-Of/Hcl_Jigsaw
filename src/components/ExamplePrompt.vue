<template>
  <div class="example-prompts-wrapper">
    <div class="prompts-header">
      <span class="prompts-title">Test with fictional training examples:</span>
      <span class="prompts-note">Click any sample to load it into the input area for inspection</span>
    </div>
    <div class="prompts-grid">
      <button
        v-for="example in examples"
        :key="example.id"
        type="button"
        class="example-card"
        :class="{ 'example-card-legit': example.id === 'legitimate' }"
        @click="$emit('select-example', example.text)"
        :aria-label="`Load example: ${example.title}`"
      >
        <div class="example-meta">
          <span class="example-category">{{ example.category }}</span>
          <span class="example-tag">{{ example.id === 'legitimate' ? 'Benign' : 'Suspicious' }}</span>
        </div>
        <p class="example-text">"{{ example.text }}"</p>
        <div class="example-hint">
          <Info :size="13" class="hint-icon" />
          <span>{{ example.hint }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Info } from 'lucide-vue-next';
import { exampleMessages } from '../data/examples.js';

defineEmits(['select-example']);

const examples = exampleMessages;
</script>

<style scoped>
.example-prompts-wrapper {
  margin-top: 1.5rem;
}

.prompts-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.875rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.prompts-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
}

.prompts-note {
  font-size: 0.775rem;
  color: var(--color-muted);
}

.prompts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.875rem;
}

.example-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 0.875rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  min-height: var(--min-touch-target);
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.example-card:hover {
  border-color: var(--color-primary);
  background-color: #FAFCFA;
}

.example-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.35rem;
}

.example-category {
  font-size: 0.725rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-primary);
  letter-spacing: 0.02em;
}

.example-tag {
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-danger-bg);
  color: var(--color-danger);
  font-weight: 600;
}

.example-card-legit .example-tag {
  background-color: var(--color-success-bg);
  color: var(--color-success);
}

.example-text {
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  flex-grow: 1;
}

.example-hint {
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  font-size: 0.725rem;
  color: var(--color-muted);
  line-height: 1.35;
  padding-top: 0.35rem;
  border-top: 1px dashed var(--color-border);
  width: 100%;
}

.hint-icon {
  flex-shrink: 0;
  margin-top: 2px;
}
</style>
