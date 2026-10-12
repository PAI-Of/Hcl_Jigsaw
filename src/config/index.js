import appConfig from './app.config.json';

/**
 * Validates the loaded application configuration
 * @param {typeof appConfig} config 
 */
export function validateConfig(config) {
  const errors = [];
  
  if (!config?.app?.name) errors.push('app.name is required');
  if (!config?.ai?.baseUrl) errors.push('ai.baseUrl is required');
  if (!config?.ai?.chatEndpoint) errors.push('ai.chatEndpoint is required');
  if (typeof config?.ai?.temperature !== 'number') errors.push('ai.temperature must be a number');
  if (!config?.theme?.primary) errors.push('theme.primary is required');
  if (!config?.theme?.background) errors.push('theme.background is required');

  if (errors.length > 0) {
    console.warn('[CyberShield Config Warning]: Found configuration issues:\n' + errors.join('\n'));
  }
  return errors.length === 0;
}

/**
 * Injects theme colors from configuration into document CSS custom properties
 * @param {typeof appConfig.theme} theme 
 */
export function applyThemeToCssVariables(theme = appConfig.theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-background', theme.background);
  root.style.setProperty('--color-surface', theme.surface);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-muted', theme.muted);
  root.style.setProperty('--color-border', theme.border);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-danger', theme.danger);
  root.style.setProperty('--color-warning', theme.warning);
  root.style.setProperty('--color-success', theme.success);
}

// Validate on load
validateConfig(appConfig);

export default appConfig;
