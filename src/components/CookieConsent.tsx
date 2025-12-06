import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { initializeAnalytics, trackEvent } from "@/lib/cookie-manager";

type CookiePreferences = {
  analytics: boolean;
};

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    const consentDate = localStorage.getItem("cookieConsentDate");
    
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Check if consent has expired (12 months)
      const hasExpired = consentDate ? isConsentExpired(consentDate) : true;
      
      if (hasExpired) {
        // Clear expired consent and show banner again
        localStorage.removeItem("cookieConsent");
        localStorage.removeItem("cookieConsentDate");
        setTimeout(() => setShowBanner(true), 1000);
      } else {
        // Load saved preferences
        const saved = JSON.parse(consent);
        setPreferences(saved);
        initializeAnalytics();
      }
    }
  }, []);

  const isConsentExpired = (consentDate: string): boolean => {
    try {
      const date = new Date(consentDate);
      const now = new Date();
      const monthsDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30);
      return monthsDiff >= 12;
    } catch {
      return true; // If date is invalid, consider it expired
    }
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      analytics: true,
    };
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      analytics: false,
    };
    savePreferences(necessaryOnly);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem("cookieConsent", JSON.stringify(prefs));
      localStorage.setItem("cookieConsentDate", new Date().toISOString());
      setPreferences(prefs);
      initializeAnalytics();
      
      // Track the consent choice (only if analytics was accepted)
      if (prefs.analytics) {
        // Small delay to ensure gtag is initialized
        setTimeout(() => {
          trackEvent("cookie_consent", "consent_action", 
            prefs.analytics ? "accepted" : "rejected");
        }, 500);
      }
      
      setShowBanner(false);
      setShowSettings(false);
    } catch (error) {
      console.error("Error saving cookie preferences:", error);
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-background/95 backdrop-blur-lg border-t shadow-lg"
        role="dialog"
        aria-label="Cookie consent banner"
        aria-describedby="cookie-description"
      >
        <div className="container mx-auto max-w-6xl">
          {!showSettings ? (
            // Simple Banner View
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">🍪 We use cookies</h3>
                <p id="cookie-description" className="text-sm text-muted-foreground">
                  We use cookies to enhance your browsing experience and analyze our website traffic using Google Analytics. 
                  By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                  <a href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/cookies" className="text-accent hover:underline">
                    Cookie Policy
                  </a>{" "}
                  for more information.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  className="text-sm"
                >
                  Customize
                </Button>
                <Button
                  variant="outline"
                  onClick={acceptNecessary}
                  className="text-sm"
                >
                  Necessary Only
                </Button>
                <Button
                  onClick={acceptAll}
                  className="text-sm"
                >
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            // Settings View
            <div className="relative" role="region" aria-label="Cookie settings">
              <button
                onClick={() => setShowSettings(false)}
                className="absolute top-0 right-0 p-2 hover:bg-accent/10 rounded-full transition-colors"
                aria-label="Close cookie settings"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-semibold mb-4">Cookie Settings</h3>
              
              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">Necessary Cookies</h4>
                      <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">
                        Always Active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      These cookies are essential for the website to function properly. 
                      They enable basic functions like page navigation and access to secure areas.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1 pr-4">
                    <h4 className="font-semibold mb-2">Analytics Cookies (Google Analytics)</h4>
                    <p className="text-sm text-muted-foreground">
                      We use Google Analytics to understand how visitors interact with our website 
                      by collecting and reporting information anonymously. This helps us improve our services.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                      className="sr-only peer"
                      aria-label="Toggle analytics cookies"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>
              

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={acceptNecessary}
                >
                  Necessary Only
                </Button>
                <Button onClick={saveCustomPreferences}>
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
