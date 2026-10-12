import appConfig from '../config/app.config.json';
import { sendChatCompletion } from './ai.service.js';

/**
 * Checks for common sensitive patterns (credit cards, OTPs, PINs)
 * to warn the user against exposing secrets.
 * @param {string} text 
 * @returns {{ hasSensitiveData: boolean, warnings: string[] }}
 */
export function inspectForSensitiveData(text) {
  const warnings = [];
  if (!text) return { hasSensitiveData: false, warnings };

  // 16-digit card pattern
  if (/\b(?:\d{4}[ -]?){3}\d{4}\b/.test(text)) {
    warnings.push('Possible 16-digit bank card number detected. Never share payment card numbers.');
  }

  // OTP mention with 4-6 digit code
  if (/\b(?:otp|one-time password|code)\s*(?:is|:)?\s*(\d{4,6})\b/i.test(text)) {
    warnings.push('Possible One-Time Password (OTP) detected. Never share OTPs with anyone.');
  }

  // Password keyword followed by value
  if (/\b(?:password|pin|mpin)\s*[:=]\s*\S+/i.test(text)) {
    warnings.push('Possible password or PIN detected. Never expose private credentials.');
  }

  return {
    hasSensitiveData: warnings.length > 0,
    warnings
  };
}

/**
 * Initiates an AI analysis on a submitted message text.
 * @param {string} userMessageText 
 * @param {Array<{ role: string, content: string }>} [previousConversation]
 * @param {AbortSignal} [signal]
 */
export async function analyzeSuspiciousText(userMessageText, previousConversation = [], signal = null) {
  if (!userMessageText || !userMessageText.trim()) {
    throw new Error('Please provide text to analyze.');
  }

  const prompt = `Please inspect the following suspicious message text as untrusted evidence:
"""
${userMessageText.trim()}
"""

Provide your complete structured scam assessment in the specified JSON schema.`;

  const messages = [
    ...previousConversation,
    { role: 'user', content: prompt }
  ];

  return await sendChatCompletion(messages, signal);
}

/**
 * Evaluates whether screenshot analysis can proceed based on local configuration.
 * @param {File|string} imageFile 
 * @returns {{ canAnalyze: boolean, message: string }}
 */
export function evaluateScreenshotReadiness(imageFile) {
  const { supportsVision, model } = appConfig.ai;

  if (!imageFile) {
    return { canAnalyze: false, message: 'No screenshot selected.' };
  }

  if (!supportsVision) {
    return {
      canAnalyze: false,
      message: `The currently configured local model ("${model}") is a text-only language model. Processing images directly requires a multimodal vision model (such as LLaVA or MiniCPM-V in llama.cpp). Please transcribe or paste the text from your screenshot into the message input for immediate analysis.`
    };
  }

  return {
    canAnalyze: true,
    message: 'Multimodal vision model is configured.'
  };
}
