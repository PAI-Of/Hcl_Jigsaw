<template>
  <header class="header-wrapper">
    <div class="container">
      <div class="header-content">
        <!-- Logo & Brand -->
        <router-link to="/" class="brand-link" aria-label="CyberShield AI Home">
          <div class="brand-logo-mark">
            <svg class="shield-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">{{ config.app.name }}</span>
            <span class="brand-tagline">{{ config.app.tagline }}</span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <router-link to="/" class="nav-link" active-class="nav-link-active" exact>
            {{ config.navigation.homeLabel }}
          </router-link>
          <router-link to="/chat" class="nav-link" active-class="nav-link-active">
            {{ config.navigation.chatLabel }}
          </router-link>
          <router-link to="/check-website" class="nav-link" active-class="nav-link-active">
            {{ config.navigation.websiteCheckerLabel || 'Website Checker' }}
          </router-link>
          <router-link to="/learn" class="nav-link" active-class="nav-link-active">
            {{ config.navigation.courseLabel }}
          </router-link>
        </nav>

        <!-- Header Actions: Connection Status & Quick Action -->
        <div class="header-actions">
          <ConnectionStatus />
          <router-link to="/chat" class="btn btn-primary btn-sm desktop-only">
            Inspect Suspicious Text
          </router-link>

          <!-- Mobile Hamburger Toggle -->
          <button
            type="button"
            class="mobile-menu-toggle"
            @click="toggleMobileMenu"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <Menu v-if="!isMobileMenuOpen" :size="22" />
            <X v-else :size="22" />
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Navigation -->
      <nav v-if="isMobileMenuOpen" class="mobile-nav-drawer" aria-label="Mobile Navigation">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">
          <Home :size="18" />
          {{ config.navigation.homeLabel }}
        </router-link>
        <router-link to="/chat" class="mobile-nav-link" @click="closeMobileMenu">
          <ShieldAlert :size="18" />
          {{ config.navigation.chatLabel }}
        </router-link>
        <router-link to="/check-website" class="mobile-nav-link" @click="closeMobileMenu">
          <Globe :size="18" />
          {{ config.navigation.websiteCheckerLabel || 'Website Checker' }}
        </router-link>
        <router-link to="/learn" class="mobile-nav-link" @click="closeMobileMenu">
          <GraduationCap :size="18" />
          {{ config.navigation.courseLabel }}
        </router-link>
        <div class="mobile-nav-cta">
          <router-link to="/chat" class="btn btn-primary w-full" @click="closeMobileMenu">
            Inspect Suspicious Text
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { Menu, X, Home, ShieldAlert, GraduationCap, Globe } from 'lucide-vue-next';
import appConfig from '../config/app.config.json';
import ConnectionStatus from './ConnectionStatus.vue';

const config = appConfig;
const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  gap: 1.25rem;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-text);
}

.brand-logo-mark {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.shield-svg {
  width: 22px;
  height: 22px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.025em;
  color: var(--color-primary);
  line-height: 1.2;
}

.brand-tagline {
  font-size: 0.75rem;
  color: var(--color-muted);
  font-weight: 500;
}

/* Desktop Nav */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.nav-link {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  padding: 0.5rem 0.25rem;
  position: relative;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link-active {
  color: var(--color-primary);
}

.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-sm {
  min-height: 40px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 0.5rem;
  border-radius: var(--radius-md);
}

/* Mobile Nav Drawer */
.mobile-nav-drawer {
  display: flex;
  flex-direction: column;
  padding: 1rem 0 1.25rem;
  border-top: 1px solid var(--color-border);
  gap: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 44px;
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  border-radius: var(--radius-md);
}

.mobile-nav-link:hover {
  background-color: rgba(24, 59, 53, 0.05);
}

.mobile-nav-cta {
  padding-top: 0.5rem;
}

.w-full {
  width: 100%;
}

@media (max-width: 820px) {
  .desktop-nav {
    display: none;
  }
  .desktop-only {
    display: none;
  }
  .mobile-menu-toggle {
    display: inline-flex;
  }
}
</style>
