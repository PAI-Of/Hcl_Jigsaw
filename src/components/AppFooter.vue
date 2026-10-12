<template>
  <footer class="footer-wrapper">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand & Mission Column -->
        <div class="footer-col brand-col">
          <div class="footer-brand">
            <div class="footer-logo-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <span class="footer-title">{{ config.app.name }}</span>
          </div>
          <p class="footer-description">
            {{ config.app.description }} Designed for cyber safety awareness in {{ config.content.country }}.
          </p>
          <div class="privacy-note">
            <Lock :size="14" />
            <span>Privacy Architecture: Real-time evaluations processed with zero cloud retention.</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-col">
          <h4 class="footer-heading">Scam Academy</h4>
          <ul class="footer-links">
            <li><router-link to="/learn/upi-scams">UPI & QR Fraud</router-link></li>
            <li><router-link to="/learn/phishing">Phishing & Lookalike Links</router-link></li>
            <li><router-link to="/learn/impersonation">Police & Digital Arrest</router-link></li>
            <li><router-link to="/learn/otp-fraud">OTP & Account Hijack</router-link></li>
            <li><router-link to="/learn/job-scams">Job & Work-From-Home</router-link></li>
          </ul>
        </div>

        <!-- Emergency & Government Reporting Column -->
        <div class="footer-col emergency-col">
          <h4 class="footer-heading">Emergency Cyber Reporting</h4>
          <p class="emergency-text">
            For financial cyber fraud in India, dial the national helpline immediately:
          </p>
          <div class="helpline-badge">
            <PhoneCall :size="18" />
            <span class="helpline-number">Dial {{ config.content.emergencyCyberCrimeHelpline }}</span>
          </div>
          <p class="official-portal-link">
            File complaints at:
            <a :href="config.content.cyberCrimePortal" target="_blank" rel="noopener noreferrer">
              cybercrime.gov.in <ExternalLink :size="12" />
            </a>
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright-text">
          &copy; {{ currentYear }} {{ config.app.name }} v{{ config.app.version }}. Developed for HCL Jigsaw Class 9 Cyber Safety Challenge.
        </p>
        <div class="footer-bottom-links">
          <router-link to="/learn/report-cybercrime">Cybercrime Reporting Procedure</router-link>
          <router-link to="/chat">AI Message Inspector</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ShieldCheck, Lock, PhoneCall, ExternalLink } from 'lucide-vue-next';
import appConfig from '../config/app.config.json';

const config = appConfig;
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.25fr;
  gap: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.footer-logo-badge {
  color: var(--color-primary);
  display: flex;
  align-items: center;
}

.footer-title {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--color-primary);
}

.footer-description {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.6;
}

.privacy-note {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.775rem;
  color: var(--color-muted);
  padding: 0.5rem 0.75rem;
  background-color: var(--color-background);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  margin-top: 0.25rem;
}

.footer-heading {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  font-size: 0.875rem;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-links a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.emergency-text {
  font-size: 0.875rem;
  color: var(--color-muted);
}

.helpline-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background-color: var(--color-danger-bg);
  color: var(--color-danger);
  border: 1px solid #FECDCA;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.95rem;
  width: fit-content;
}

.official-portal-link {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.official-portal-link a {
  color: var(--color-primary);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.copyright-text {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.footer-bottom-links {
  display: flex;
  gap: 1.25rem;
  font-size: 0.8125rem;
}

.footer-bottom-links a {
  color: var(--color-muted);
  text-decoration: none;
}

.footer-bottom-links a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

@media (max-width: 820px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
}
</style>
