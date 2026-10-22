<template>
  <div class="home-page-container">
    <!-- Hero Workspace Section -->
    <section class="section-hero">
      <div class="container">
        <div class="hero-grid">
          <!-- Main Input Workspace -->
          <div class="hero-main">
            <div class="hero-copy">
              <span class="hero-badge badge badge-default">
                <Shield :size="14" />
                AI Scam Detection & Cyber Safety
              </span>
              <h1 class="hero-title">Not Sure It's Legit? Check Before You Click.</h1>
              <p class="hero-subtitle">
                Analyze suspicious messages, spot warning signs, and learn how to protect yourself.
              </p>
            </div>

            <!-- Central Message Input Workspace -->
            <MessageInput />
          </div>

          <!-- Side Editorial Guidelines Column -->
          <aside class="hero-sidebar" aria-label="Quick Verification Guidelines">
            <!-- Website Verifier Callout -->
            <div class="sidebar-box website-verifier-box">
              <div class="box-icon-row">
                <Globe :size="20" />
                <span class="box-tag">New Tool</span>
              </div>
              <h3 class="box-title">Website Genuineness Verifier</h3>
              <p class="box-desc">
                Paste any web address to check HTTPS security, DuckDuckGo reputation overview, and Cheerio-scraped plain text.
              </p>
              <router-link to="/check-website" class="btn btn-primary btn-full">
                Verify Website Now <ArrowRight :size="14" />
              </router-link>
            </div>

            <!-- Emergency Helpline Callout -->
            <div class="sidebar-box emergency-box">
              <div class="box-icon-row">
                <PhoneCall :size="20" />
                <span class="box-tag">Emergency Action</span>
              </div>
              <h3 class="box-title">Cyber Financial Helpline: 1930</h3>
              <p class="box-desc">
                If you lost money in a fraudulent UPI or card transaction, dial 1930 immediately to freeze funds before transfer chains settle.
              </p>
              <router-link to="/learn/report-cybercrime" class="sidebar-link">
                Read Reporting Guide <ArrowRight :size="14" />
              </router-link>
            </div>

            <!-- Three Concrete Red Flags -->
            <div class="sidebar-box flags-box">
              <div class="box-icon-row">
                <AlertOctagon :size="20" />
                <span class="box-tag">Common Red Flags</span>
              </div>
              <h3 class="box-title">Three Signs of Immediate Fraud</h3>
              <ul class="flags-checklist">
                <li>
                  <strong>1. UPI PIN for Receiving Money:</strong> You never need to enter your PIN to receive funds.
                </li>
                <li>
                  <strong>2. "Digital Arrest" Threats:</strong> Police and CBI never hold trials over Skype or WhatsApp calls.
                </li>
                <li>
                  <strong>3. Unearned Jackpots & Grants:</strong> Genuine awards never require upfront processing fees.
                </li>
              </ul>
            </div>

            <!-- Academy Teaser -->
            <div class="sidebar-box academy-teaser-box">
              <div class="box-icon-row">
                <GraduationCap :size="20" />
                <span class="box-tag">Safety Academy</span>
              </div>
              <h3 class="box-title">Master 10 Scam Patterns</h3>
              <p class="box-desc">
                Learn step-by-step prevention guides and take quick interactive knowledge checks.
              </p>
              <router-link to="/learn" class="btn btn-secondary btn-full">
                Explore Scam Guides
              </router-link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Shield, PhoneCall, AlertOctagon, GraduationCap, ArrowRight, Globe } from 'lucide-vue-next';
import MessageInput from '../components/MessageInput.vue';
</script>

<style scoped>
.home-page-container {
  display: flex;
  flex-direction: column;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2.25rem;
  align-items: start;
}

.hero-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hero-badge {
  width: fit-content;
}

.hero-title {
  font-size: 2.35rem;
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.035em;
  color: var(--color-primary);
}

.hero-subtitle {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--color-muted);
}

/* Sidebar Styling */
.hero-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sidebar-box {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.website-verifier-box {
  border-left: 4px solid var(--color-primary);
  background-color: #F8FAF8;
}
.website-verifier-box .box-icon-row {
  color: var(--color-primary);
}

.emergency-box {
  border-left: 4px solid var(--color-danger);
  background-color: #FEF8F8;
}
.emergency-box .box-icon-row {
  color: var(--color-danger);
}

.flags-box {
  border-left: 4px solid var(--color-warning);
}
.flags-box .box-icon-row {
  color: var(--color-warning);
}

.academy-teaser-box {
  border-left: 4px solid var(--color-primary);
}
.academy-teaser-box .box-icon-row {
  color: var(--color-primary);
}

.box-icon-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-tag {
  font-size: 0.725rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-muted);
}

.box-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.3;
}

.box-desc {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-muted);
}

.sidebar-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.825rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-top: 0.25rem;
}

.flags-checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 0.25rem;
}

.flags-checklist li {
  font-size: 0.825rem;
  line-height: 1.45;
  color: var(--color-text);
}

.btn-full {
  width: 100%;
  margin-top: 0.5rem;
}

@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 1.85rem;
  }
}
</style>
