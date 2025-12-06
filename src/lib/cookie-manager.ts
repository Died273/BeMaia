import { ANALYTICS_CONFIG } from '@/config/analytics';

export type CookiePreferences = {
  analytics: boolean;
  // Note: necessary cookies are always enabled by default
};

// Get GA Measurement ID from environment variable
const GA_MEASUREMENT_ID = ANALYTICS_CONFIG.GA_MEASUREMENT_ID;

export const getCookiePreferences = (): CookiePreferences | null => {
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) return null;
  
  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
};

export const hasConsented = (): boolean => {
  return localStorage.getItem("cookieConsent") !== null;
};

export const canUseAnalytics = (): boolean => {
  const prefs = getCookiePreferences();
  return prefs?.analytics ?? false;
};

export const resetCookieConsent = (): void => {
  localStorage.removeItem("cookieConsent");
  localStorage.removeItem("cookieConsentDate");
  clearAnalyticsCookies();
  // Reload the page to show banner again
  window.location.reload();
};

const clearAnalyticsCookies = (): void => {
  // Clear Google Analytics cookies if present
  const cookies = document.cookie.split(";");
  const domain = window.location.hostname;
  
  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    
    // Remove Google Analytics cookies
    if (
      cookieName.startsWith("_ga") ||
      cookieName.startsWith("_gid") ||
      cookieName.startsWith("_gat")
    ) {
      // Clear for current path
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      
      // Clear for root domain
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      
      // Clear for parent domain (handles subdomains)
      if (domain.includes('.')) {
        const parentDomain = '.' + domain.split('.').slice(-2).join('.');
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${parentDomain};`;
      }
    }
  });
};

// Initialize Google Analytics conditionally
export const initializeAnalytics = (): void => {
  try {
    if (typeof window === "undefined" || !(window as any).gtag) {
      console.warn("Google Analytics not loaded yet");
      return;
    }

    if (canUseAnalytics()) {
      // Update Google Analytics consent mode
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
      console.log("Google Analytics consent granted");
    } else {
      // Explicitly deny analytics
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  } catch (error) {
    console.error("Error initializing analytics:", error);
  }
};

// Track page views (only if analytics is enabled)
export const trackPageView = (url: string): void => {
  try {
    if (!canUseAnalytics() || typeof window === "undefined" || !(window as any).gtag || !GA_MEASUREMENT_ID) {
      return;
    }
    
    // Use proper page_view event instead of config
    (window as any).gtag("event", "page_view", {
      page_path: url,
    });
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
};

// Track events (only if analytics is enabled)
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  try {
    if (!canUseAnalytics() || typeof window === "undefined" || !(window as any).gtag) {
      return;
    }
    
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};
