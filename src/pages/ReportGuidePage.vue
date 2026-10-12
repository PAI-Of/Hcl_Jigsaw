<template>
  <div class="report-guide-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumb navigation">
          <router-link to="/">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link to="/learn">Safety Academy</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Official Indian Cybercrime Reporting Protocol</span>
        </nav>
      </div>
    </div>

    <main class="guide-main">
      <div class="container container-narrow">
        <!-- Header Banner -->
        <header class="guide-header">
          <div class="badge-row">
            <span class="badge badge-danger">Official Protocol</span>
            <span class="badge badge-default">Ministry of Home Affairs &bull; I4C</span>
          </div>
          <h1 class="guide-title">How to Report Cybercrime in India</h1>
          <p class="guide-subtitle">
            Authoritative, step-by-step instructions for reporting financial fraud, preserving digital evidence, and activating bank freezes.
          </p>

          <!-- Emergency Action Box -->
          <div class="emergency-banner-card">
            <div class="emergency-icon-circle">
              <PhoneCall :size="24" />
            </div>
            <div class="emergency-content">
              <span class="emergency-tag">National Financial Cyber Fraud Helpline</span>
              <h2 class="emergency-number">Dial 1930 Immediately</h2>
              <p class="emergency-note">
                Operated by the Indian Cyber Crime Coordination Centre (I4C). Coordinates directly with banks to freeze unauthorized transactions during the "Golden Hour".
              </p>
            </div>
            <div class="emergency-action">
              <a href="tel:1930" class="btn btn-danger">
                <PhoneCall :size="16" />
                Call 1930 Now
              </a>
            </div>
          </div>
        </header>

        <!-- Timeline / Step-by-Step Reporting Roadmap -->
        <section class="guide-section">
          <div class="section-title-row">
            <Clock :size="20" class="section-icon" />
            <h2 class="section-heading">Step-by-Step Incident Response Protocol</h2>
          </div>

          <div class="timeline-stack">
            <!-- Step 1 -->
            <div class="timeline-step card">
              <div class="step-counter">01</div>
              <div class="step-detail">
                <h3 class="step-title">The "Golden Hour": Dial 1930</h3>
                <p class="step-text">
                  The first 1 to 2 hours following a fraudulent transaction are the most critical window. When you dial 1930, the citizen reporting system triggers an alert to the beneficiary banks, payment wallets, or merchants (Flipkart, Amazon, crypto gateways) to freeze the transaction before the fraudster withdraws the cash from an ATM.
                </p>
                <div class="step-checklist-box">
                  <strong>Have these ready before dialing:</strong>
                  <ul>
                    <li>Your bank name and account number</li>
                    <li>Transaction reference / UTR number from debit SMS</li>
                    <li>Beneficiary account number, UPI VPA, or mobile number</li>
                    <li>Exact date, time, and debit amount</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="timeline-step card">
              <div class="step-counter">02</div>
              <div class="step-detail">
                <h3 class="step-title">Contact Bank Immediately to Freeze Channels</h3>
                <p class="step-text">
                  Call your bank's 24/7 fraud helpline or visit net banking to immediately block your debit/credit card, disable internet banking, and reset UPI PINs.
                </p>
                <div class="callout callout-warning">
                  <strong>RBI Limited Liability Rule:</strong> Under Reserve Bank of India circulars, notifying your bank within <strong>3 working days</strong> of unauthorized electronic fraud establishes zero or limited customer liability, provided you did not share confidential credentials like OTP or PINs.
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="timeline-step card">
              <div class="step-counter">03</div>
              <div class="step-detail">
                <h3 class="step-title">Register Complaint on cybercrime.gov.in</h3>
                <p class="step-text">
                  Submit a formal complaint on the official National Cyber Crime Reporting Portal.
                </p>
                <div class="portal-cta-box">
                  <div class="portal-info">
                    <Globe :size="20" />
                    <div>
                      <strong>Official Government Portal:</strong>
                      <span>https://cybercrime.gov.in</span>
                    </div>
                  </div>
                  <a
                    :href="config.content.cyberCrimePortal"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-primary btn-sm"
                  >
                    Open cybercrime.gov.in <ExternalLink :size="14" />
                  </a>
                </div>
                <p class="portal-disclaimer">
                  <em>Notice: CyberShield AI does not submit complaints on your behalf. Always file complaints directly through the verified government portal.</em>
                </p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="timeline-step card">
              <div class="step-counter">04</div>
              <div class="step-detail">
                <h3 class="step-title">Retain Acknowledgement & Track Progress</h3>
                <p class="step-text">
                  Upon submission on cybercrime.gov.in, you will receive a unique <strong>Complaint Acknowledgement Number</strong>. Download the PDF copy of the complaint and submit it to your local police station cyber cell and your bank's Nodal Grievance Officer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Evidence Preservation Checklist -->
        <section class="guide-section">
          <div class="section-title-row">
            <Camera :size="20" class="section-icon" />
            <h2 class="section-heading">How to Preserve Digital Evidence</h2>
          </div>

          <div class="card evidence-preservation-card">
            <p class="evidence-intro">
              Do not delete messages or format your phone. Preserve the following artifacts for police forensic inspection:
            </p>
            <div class="evidence-grid">
              <div class="evidence-item">
                <CheckCircle2 :size="18" class="check-icon" />
                <div>
                  <strong>Screenshots of Messages & Chats:</strong>
                  <span>Capture entire conversation threads including sender phone numbers, timestamps, and profile pictures.</span>
                </div>
              </div>
              <div class="evidence-item">
                <CheckCircle2 :size="18" class="check-icon" />
                <div>
                  <strong>Bank Account Statement:</strong>
                  <span>Download bank statement showing the debit entry with UTR / IMPS / UPI transaction reference.</span>
                </div>
              </div>
              <div class="evidence-item">
                <CheckCircle2 :size="18" class="check-icon" />
                <div>
                  <strong>URL & Domain Records:</strong>
                  <span>Copy full suspicious website URLs (including http/https and exact domain spelling).</span>
                </div>
              </div>
              <div class="evidence-item">
                <CheckCircle2 :size="18" class="check-icon" />
                <div>
                  <strong>Call History & Voice Recordings:</strong>
                  <span>Screenshot your call log showing incoming call time and caller number; preserve any call recordings.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Distinguishing Financial Fraud from General Complaints -->
        <section class="guide-section">
          <div class="section-title-row">
            <FileQuestion :size="20" class="section-icon" />
            <h2 class="section-heading">Financial Fraud vs General Cyber Complaints</h2>
          </div>

          <div class="comparison-cards-row">
            <div class="comp-col card">
              <span class="badge badge-danger">Category A</span>
              <h3 class="comp-title">Financial Cyber Fraud</h3>
              <p class="comp-text">Unauthorized debit from bank, UPI fraud, credit card skimming, fake investment portals.</p>
              <div class="comp-action">
                <strong>Primary Action:</strong>
                <span>Dial 1930 immediately &rarr; freeze funds &rarr; file on portal.</span>
              </div>
            </div>

            <div class="comp-col card">
              <span class="badge badge-default">Category B</span>
              <h3 class="comp-title">General Cyber Complaints</h3>
              <p class="comp-text">Identity theft, cyberstalking, harassment, online defamation, hacking of social accounts.</p>
              <div class="comp-action">
                <strong>Primary Action:</strong>
                <span>File report on cybercrime.gov.in under "Report Other Cyber Crime" or "Report Crime Against Women/Children".</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Knowledge Check for Reporting -->
        <section class="guide-section">
          <QuizQuestion :quiz="reportingQuiz" />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { PhoneCall, Clock, Globe, ExternalLink, Camera, CheckCircle2, FileQuestion } from 'lucide-vue-next';
import appConfig from '../config/app.config.json';
import QuizQuestion from '../components/QuizQuestion.vue';

const config = appConfig;

const reportingQuiz = {
  question: 'What is the most effective immediate action within the first 2 hours of suffering an unauthorized bank debit via UPI in India?',
  options: [
    'Wait 48 hours to see if the bank auto-reverses the transaction.',
    'Immediately call the national financial fraud helpline 1930 and inform your bank to trigger an inter-bank freeze.',
    'Pay an online "recovery hacker" on Instagram to trace the scammer.'
  ],
  correctAnswerIndex: 1,
  explanation: 'Calling 1930 immediately within the "Golden Hour" allows the citizen financial fraud management system to alert beneficiary banks and freeze the stolen funds before the criminal withdraws them.'
};
</script>

<style scoped>
.report-guide-page {
  display: flex;
  flex-direction: column;
}

.breadcrumb-bar {
  background-color: #FAFCFA;
  border-bottom: 1px solid var(--color-border);
  padding: 0.75rem 0;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.825rem;
  color: var(--color-muted);
}

.breadcrumbs a {
  color: var(--color-muted);
  text-decoration: none;
}

.breadcrumbs a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.breadcrumb-separator {
  color: var(--color-border);
}

.breadcrumb-current {
  color: var(--color-text);
  font-weight: 600;
}

.guide-main {
  padding: 2.5rem 0 4.5rem;
}

.guide-header {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 2.5rem;
}

.badge-row {
  display: flex;
  gap: 0.5rem;
}

.guide-title {
  font-size: 2.35rem;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: var(--color-primary);
  line-height: 1.2;
}

.guide-subtitle {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-muted);
}

/* Emergency card */
.emergency-banner-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #FEF8F8;
  border: 1px solid #FECDCA;
  border-left: 6px solid var(--color-danger);
  border-radius: var(--radius-lg);
  flex-wrap: wrap;
  margin-top: 0.75rem;
}

.emergency-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-danger);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.emergency-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 260px;
}

.emergency-tag {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-danger);
  letter-spacing: 0.04em;
}

.emergency-number {
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--color-danger);
  line-height: 1.2;
}

.emergency-note {
  font-size: 0.85rem;
  color: var(--color-text);
  line-height: 1.45;
}

.emergency-action {
  flex-shrink: 0;
}

/* Guide section */
.guide-section {
  margin-top: 2.5rem;
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
}

.section-icon {
  color: var(--color-primary);
}

.section-heading {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-text);
}

/* Timeline */
.timeline-stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.timeline-step {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
}

.step-counter {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-primary);
  background-color: #EBF2EC;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-detail {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.step-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
}

.step-text {
  font-size: 0.925rem;
  line-height: 1.6;
  color: var(--color-text);
}

.step-checklist-box {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.875rem 1rem;
  font-size: 0.85rem;
}

.step-checklist-box ul {
  margin: 0.35rem 0 0 1.25rem;
  padding: 0;
  line-height: 1.55;
}

/* Portal CTA Box */
.portal-cta-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background-color: #FAFCFA;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  flex-wrap: wrap;
  gap: 1rem;
}

.portal-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-primary);
  font-size: 0.9rem;
}

.portal-info span {
  display: block;
  font-size: 0.8rem;
  color: var(--color-muted);
}

.portal-disclaimer {
  font-size: 0.8rem;
  color: var(--color-muted);
}

/* Evidence Preservation */
.evidence-preservation-card {
  padding: 1.5rem;
}

.evidence-intro {
  font-size: 0.925rem;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.evidence-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.evidence-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.check-icon {
  color: var(--color-success);
  flex-shrink: 0;
  margin-top: 2px;
}

.evidence-item strong {
  display: block;
  color: var(--color-text);
  margin-bottom: 0.2rem;
}

.evidence-item span {
  color: var(--color-muted);
}

/* Comparison row */
.comparison-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.comp-col {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.5rem;
}

.comp-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text);
}

.comp-text {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.5;
  flex-grow: 1;
}

.comp-action {
  font-size: 0.825rem;
  background-color: var(--color-background);
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.comp-action strong {
  display: block;
  color: var(--color-text);
  margin-bottom: 0.2rem;
}

@media (max-width: 768px) {
  .evidence-grid,
  .comparison-cards-row {
    grid-template-columns: 1fr;
  }
}
</style>
