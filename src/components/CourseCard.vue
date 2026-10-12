<template>
  <router-link :to="`/learn/${course.slug}`" class="course-card-link">
    <div class="course-card card">
      <div class="course-card-top">
        <div class="course-icon-badge">
          <component :is="resolvedIcon" :size="20" />
        </div>
        <div class="course-meta-pills">
          <span class="course-read-time">{{ course.readingTime }}</span>
          <span v-if="course.badge" class="badge badge-accent">{{ course.badge }}</span>
        </div>
      </div>

      <div class="course-card-body">
        <span class="course-category">{{ course.category }}</span>
        <h3 class="course-title">{{ course.title }}</h3>
        <p class="course-description">{{ course.shortDescription }}</p>
      </div>

      <div class="course-card-footer">
        <div class="tags-cluster">
          <span v-for="(tag, idx) in course.tags" :key="idx" class="tag-pill">
            {{ tag }}
          </span>
        </div>
        <div class="learn-link">
          <span>Read Guide</span>
          <ArrowRight :size="14" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import {
  ShieldAlert,
  IndianRupee,
  KeyRound,
  Briefcase,
  GraduationCap,
  UserCheck,
  ShoppingBag,
  HeartHandshake,
  SmartphoneNfc,
  FileText,
  ArrowRight
} from 'lucide-vue-next';

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
});

const iconMap = {
  ShieldAlert,
  IndianRupee,
  KeyRound,
  Briefcase,
  GraduationCap,
  UserCheck,
  ShoppingBag,
  HeartHandshake,
  SmartphoneNfc,
  FileText
};

const resolvedIcon = computed(() => {
  return iconMap[props.course.icon] || ShieldAlert;
});
</script>

<style scoped>
.course-card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
}

.course-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  min-height: 240px;
}

.course-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-floating);
}

.course-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.course-icon-badge {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background-color: #EBF2EC;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-meta-pills {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.course-read-time {
  font-size: 0.775rem;
  color: var(--color-muted);
  font-weight: 600;
}

.course-card-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.course-category {
  font-size: 0.725rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-muted);
  letter-spacing: 0.03em;
  margin-bottom: 0.35rem;
}

.course-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.course-description {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.55;
  margin-bottom: 1rem;
}

.course-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--color-border);
  padding-top: 0.875rem;
  gap: 0.5rem;
}

.tags-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag-pill {
  font-size: 0.725rem;
  padding: 0.15rem 0.45rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-muted);
}

.learn-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-primary);
  flex-shrink: 0;
}
</style>
