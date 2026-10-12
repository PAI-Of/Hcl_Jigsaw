import { reactive, ref } from 'vue';
import { sendChatCompletion } from '../services/ai.service.js';
import { analyzeSuspiciousText, inspectForSensitiveData } from '../services/analysis.service.js';

/**
 * Global reactive store for chat conversation and analysis workflow
 */
export const chatStore = reactive({
  messages: [],
  isLoading: false,
  pendingInputText: '',
  selectedScreenshot: null, // { file, previewUrl, name, size }
  lastError: null,
  connectionState: {
    checked: false,
    isOnline: false,
    latencyMs: null,
    error: null
  },

  /**
   * Clears the current conversation
   */
  clearConversation() {
    this.messages = [];
    this.lastError = null;
  },

  /**
   * Sets text to be analyzed, optionally auto-triggering navigation
   */
  prepareTextForAnalysis(text) {
    this.pendingInputText = text || '';
  },

  /**
   * Sends user message to the local llama.cpp server
   */
  async submitUserMessage(userText) {
    if (!userText || !userText.trim()) return;

    const trimmed = userText.trim();
    this.lastError = null;

    // Add user message to history
    const userMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sensitiveWarnings: inspectForSensitiveData(trimmed).warnings
    };

    this.messages.push(userMessage);
    this.isLoading = true;

    try {
      // Build conversation payload for AI
      const apiMessages = this.messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // Call llama.cpp
      const response = await sendChatCompletion(apiMessages);

      // Add AI reply to history
      this.messages.push({
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: response.text,
        structured: response.structured,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.connectionState.isOnline = true;
    } catch (err) {
      this.lastError = err.message || 'An error occurred during AI analysis.';
      this.connectionState.isOnline = false;
      this.connectionState.error = this.lastError;
    } finally {
      this.isLoading = false;
    }
  },

  /**
   * Retries the last failed message analysis
   */
  async retryLastMessage() {
    if (this.messages.length === 0) return;
    const lastMsg = this.messages[this.messages.length - 1];
    
    if (lastMsg.role === 'user') {
      this.isLoading = true;
      this.lastError = null;
      try {
        const apiMessages = this.messages.map(m => ({
          role: m.role,
          content: m.content
        }));
        const response = await sendChatCompletion(apiMessages);
        this.messages.push({
          id: 'msg-' + Date.now(),
          role: 'assistant',
          content: response.text,
          structured: response.structured,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        this.connectionState.isOnline = true;
      } catch (err) {
        this.lastError = err.message;
        this.connectionState.isOnline = false;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
