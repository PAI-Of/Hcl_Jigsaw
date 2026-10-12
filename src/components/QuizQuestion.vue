<template>
  <div class="quiz-card card">
    <div class="quiz-header">
      <div class="quiz-icon-wrapper">
        <HelpCircle :size="18" />
      </div>
      <div>
        <span class="quiz-badge">Knowledge Check</span>
        <h4 class="quiz-title">Test Your Understanding</h4>
      </div>
    </div>

    <p class="quiz-question-text">{{ quiz.question }}</p>

    <!-- Options List -->
    <div class="options-group" role="radiogroup">
      <button
        v-for="(option, idx) in quiz.options"
        :key="idx"
        type="button"
        class="quiz-option-btn"
        :class="{
          'option-selected': selectedIndex === idx,
          'option-correct': isSubmitted && idx === quiz.correctAnswerIndex,
          'option-incorrect': isSubmitted && selectedIndex === idx && idx !== quiz.correctAnswerIndex
        }"
        :disabled="isSubmitted"
        @click="selectOption(idx)"
        role="radio"
        :aria-checked="selectedIndex === idx"
      >
        <span class="option-marker">{{ String.fromCharCode(65 + idx) }}</span>
        <span class="option-text">{{ option }}</span>
        <CheckCircle2 v-if="isSubmitted && idx === quiz.correctAnswerIndex" :size="18" class="feedback-icon icon-correct" />
        <XCircle v-else-if="isSubmitted && selectedIndex === idx && idx !== quiz.correctAnswerIndex" :size="18" class="feedback-icon icon-incorrect" />
      </button>
    </div>

    <!-- Actions & Immediate Explanation -->
    <div class="quiz-footer">
      <div v-if="!isSubmitted" class="quiz-actions">
        <button
          type="button"
          class="btn btn-primary"
          :disabled="selectedIndex === null"
          @click="submitAnswer"
        >
          Check Answer
        </button>
      </div>

      <div v-else class="explanation-box" :class="isCorrect ? 'explanation-success' : 'explanation-error'">
        <div class="explanation-header">
          <CheckCircle2 v-if="isCorrect" :size="18" />
          <AlertTriangle v-else :size="18" />
          <strong>{{ isCorrect ? 'Correct!' : 'Incorrect — Review below:' }}</strong>
        </div>
        <p class="explanation-body">{{ quiz.explanation }}</p>
        <button type="button" class="btn btn-secondary btn-sm" @click="resetQuiz">
          <RotateCcw :size="14" />
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { HelpCircle, CheckCircle2, XCircle, AlertTriangle, RotateCcw } from 'lucide-vue-next';

const props = defineProps({
  quiz: {
    type: Object,
    required: true
  }
});

const selectedIndex = ref(null);
const isSubmitted = ref(false);

const isCorrect = computed(() => {
  return selectedIndex.value === props.quiz.correctAnswerIndex;
});

function selectOption(index) {
  if (isSubmitted.value) return;
  selectedIndex.value = index;
}

function submitAnswer() {
  if (selectedIndex.value === null) return;
  isSubmitted.value = true;
}

function resetQuiz() {
  selectedIndex.value = null;
  isSubmitted.value = false;
}
</script>

<style scoped>
.quiz-card {
  margin: 2rem 0;
  border-left: 5px solid var(--color-primary);
  background-color: var(--color-surface);
}

.quiz-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.quiz-icon-wrapper {
  color: var(--color-primary);
  display: flex;
  align-items: center;
}

.quiz-badge {
  font-size: 0.725rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-muted);
  letter-spacing: 0.04em;
}

.quiz-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
}

.quiz-question-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.options-group {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
}

.quiz-option-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  min-height: 48px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.925rem;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
  width: 100%;
}

.quiz-option-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  background-color: #FAFCFA;
}

.option-marker {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text);
  flex-shrink: 0;
}

.option-text {
  flex-grow: 1;
  line-height: 1.45;
}

.option-selected {
  border-color: var(--color-primary);
  background-color: #F3F7F4;
}

.option-selected .option-marker {
  background-color: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
}

.option-correct {
  border-color: #A6F4C5 !important;
  background-color: #F6FEF9 !important;
}

.option-correct .option-marker {
  background-color: var(--color-success);
  color: #FFFFFF;
}

.option-incorrect {
  border-color: #FECDCA !important;
  background-color: #FEF8F8 !important;
}

.option-incorrect .option-marker {
  background-color: var(--color-danger);
  color: #FFFFFF;
}

.feedback-icon {
  flex-shrink: 0;
}

.icon-correct {
  color: var(--color-success);
}

.icon-incorrect {
  color: var(--color-danger);
}

.explanation-box {
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.explanation-success {
  background-color: #F6FEF9;
  border: 1px solid #A6F4C5;
  color: #0b5735;
}

.explanation-error {
  background-color: #FEF8F8;
  border: 1px solid #FECDCA;
  color: #7A1910;
}

.explanation-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.explanation-body {
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--color-text);
}

.btn-sm {
  align-self: flex-start;
  min-height: 38px;
  padding: 0.4rem 0.85rem;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}
</style>
