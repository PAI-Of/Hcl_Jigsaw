<template>
  <div class="screenshot-upload-container">
    <!-- Dropzone / File Picker (when no image selected) -->
    <div
      v-if="!selectedImage"
      class="upload-dropzone"
      :class="{ 'dropzone-active': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleFileDrop"
      @click="triggerFileInput"
      tabindex="0"
      role="button"
      aria-label="Upload a screenshot of a suspicious message"
      @keydown.enter="triggerFileInput"
      @keydown.space.prevent="triggerFileInput"
    >
      <input
        ref="fileInputRef"
        type="file"
        class="hidden-file-input"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        @change="handleFileInputChange"
      />
      <div class="dropzone-icon">
        <ImagePlus :size="32" />
      </div>
      <div class="dropzone-content">
        <span class="dropzone-heading">Click or drop a screenshot here</span>
        <span class="dropzone-sub">Supports PNG, JPG, JPEG, WebP up to {{ maxMb }}MB</span>
      </div>
    </div>

    <!-- Image Preview & Controls (when image is selected) -->
    <div v-else class="preview-panel">
      <div class="preview-header">
        <div class="file-info">
          <FileImage :size="16" />
          <span class="file-name">{{ selectedImage.name }}</span>
          <span class="file-size">({{ formattedFileSize }})</span>
        </div>
        <div class="preview-actions">
          <button
            type="button"
            class="btn-action-icon"
            @click="triggerFileInput"
            title="Replace screenshot"
            aria-label="Replace screenshot"
          >
            <RefreshCw :size="16" />
            <span class="btn-text">Replace</span>
          </button>
          <button
            type="button"
            class="btn-action-icon btn-action-danger"
            @click="removeImage"
            title="Remove screenshot"
            aria-label="Remove screenshot"
          >
            <Trash2 :size="16" />
            <span class="btn-text">Remove</span>
          </button>
        </div>
      </div>

      <!-- Hidden input for replacement -->
      <input
        ref="fileInputRef"
        type="file"
        class="hidden-file-input"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        @change="handleFileInputChange"
      />

      <!-- Image thumbnail -->
      <div class="preview-image-wrapper">
        <img :src="selectedImage.previewUrl" :alt="selectedImage.name" class="preview-img" />
      </div>

      <!-- Multimodal Model Evaluation Alert -->
      <div class="vision-notice" :class="modelReadiness.canAnalyze ? 'vision-supported' : 'vision-unsupported'">
        <div class="notice-icon">
          <Info v-if="modelReadiness.canAnalyze" :size="18" />
          <AlertTriangle v-else :size="18" />
        </div>
        <div class="notice-content">
          <strong class="notice-title">
            {{ modelReadiness.canAnalyze ? 'Vision Engine Active' : 'Notice: E-MMPROJ' }}
          </strong>
          <p class="notice-body">{{ modelReadiness.message }}</p>
        </div>
      </div>

      <!-- Screenshot Inspection CTA -->
      <div class="preview-footer">
        <button
          type="button"
          class="btn btn-primary"
          :disabled="!modelReadiness.canAnalyze"
          @click="startScreenshotAnalysis"
        >
          <ScanSearch :size="18" />
          Analyze Screenshot
        </button>
        <button type="button" class="btn btn-secondary" @click="removeImage">
          Cancel
        </button>
      </div>
    </div>

    <!-- Error notice -->
    <div v-if="validationError" class="validation-error-box" role="alert">
      <AlertCircle :size="16" />
      <span>{{ validationError }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ImagePlus, FileImage, RefreshCw, Trash2, Info, AlertTriangle, ScanSearch, AlertCircle } from 'lucide-vue-next';
import appConfig from '../config/app.config.json';
import { evaluateScreenshotReadiness } from '../services/analysis.service.js';
import { chatStore } from '../stores/chatStore.js';

const router = useRouter();
const fileInputRef = ref(null);
const isDragging = ref(false);
const validationError = ref('');
const selectedImage = ref(null);

const maxBytes = appConfig.ai.maxScreenshotSizeBytes || 5242880;
const maxMb = Math.round(maxBytes / (1024 * 1024));

const modelReadiness = computed(() => {
  return evaluateScreenshotReadiness(selectedImage.value ? selectedImage.value.file : null);
});

const formattedFileSize = computed(() => {
  if (!selectedImage.value) return '';
  const kb = Math.round(selectedImage.value.size / 1024);
  if (kb > 1024) return (kb / 1024).toFixed(1) + ' MB';
  return kb + ' KB';
});

function triggerFileInput() {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
}

function validateAndLoadFile(file) {
  validationError.value = '';
  if (!file) return;

  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    validationError.value = `[E-FILE-UNSUPPORTED] Unsupported file type: "${file.type || 'unknown'}". Please select a PNG, JPG, or WebP image.`;
    return;
  }

  if (file.size > maxBytes) {
    validationError.value = `[E-FILE-TOOLARGE] File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum limit of ${maxMb}MB.`;
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  selectedImage.value = {
    file,
    previewUrl,
    name: file.name,
    size: file.size
  };
}

function handleFileInputChange(e) {
  const file = e.target.files?.[0];
  if (file) validateAndLoadFile(file);
}

function handleFileDrop(e) {
  isDragging.value = false;
  const file = e.dataTransfer.files?.[0];
  if (file) validateAndLoadFile(file);
}

function removeImage() {
  if (selectedImage.value?.previewUrl) {
    URL.revokeObjectURL(selectedImage.value.previewUrl);
  }
  selectedImage.value = null;
  validationError.value = '';
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}

function startScreenshotAnalysis() {
  if (!selectedImage.value) return;
  chatStore.selectedScreenshot = selectedImage.value;
  router.push('/chat');
}
</script>

<style scoped>
.screenshot-upload-container {
  margin-top: 1rem;
}

.hidden-file-input {
  display: none;
}

.upload-dropzone {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: var(--color-surface);
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
  min-height: 140px;
}

.upload-dropzone:hover,
.dropzone-active {
  border-color: var(--color-primary);
  background-color: #FAFCFA;
}

.dropzone-icon {
  color: var(--color-primary);
}

.dropzone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;
}

.dropzone-heading {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
}

.dropzone-sub {
  font-size: 0.8rem;
  color: var(--color-muted);
}

/* Preview Panel */
.preview-panel {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

.file-size {
  color: var(--color-muted);
  font-weight: normal;
  font-size: 0.8rem;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-action-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  min-height: 44px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
}

.btn-action-icon:hover {
  background-color: rgba(24, 59, 53, 0.05);
}

.btn-action-danger {
  color: var(--color-danger);
  border-color: #FECDCA;
}

.btn-action-danger:hover {
  background-color: var(--color-danger-bg);
}

.preview-image-wrapper {
  max-height: 280px;
  overflow: hidden;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
}

.preview-img {
  max-width: 100%;
  max-height: 280px;
  object-fit: contain;
}

/* Vision notice */
.vision-notice {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  font-size: 0.85rem;
  line-height: 1.5;
}

.vision-unsupported {
  background-color: #FFFDF5;
  border-color: #FEDF89;
  color: #7A4D05;
}

.vision-supported {
  background-color: #F6FEF9;
  border-color: #A6F4C5;
  color: #0b5735;
}

.notice-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.notice-title {
  display: block;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.notice-body {
  color: inherit;
  font-size: 0.825rem;
}

.preview-footer {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.validation-error-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: var(--color-danger-bg);
  border: 1px solid #FECDCA;
  border-radius: var(--radius-md);
  color: var(--color-danger);
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.75rem;
}
</style>
