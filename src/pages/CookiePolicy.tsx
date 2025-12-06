import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { resetCookieConsent } from "@/lib/cookie-manager";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen page-bg">
      <Header />
      
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-5">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-6">
              Last updated December 06, 2025
            </p>
            <Button onClick={resetCookieConsent} variant="outline">
              Manage Cookie Preferences
            </Button>
          </div>

          {/* Introduction */}
          <section className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">What Are Cookies?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
              <p>
                This Cookie Policy explains what cookies are, how we use them, the types of cookies we use, and how you can control your cookie preferences.
              </p>
              <p>
                This Cookie Policy is part of our{" "}
                <a href="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </a>
                {" "}and should be read in conjunction with our{" "}
                <a href="/terms" className="text-accent hover:underline">
                  Terms and Conditions
                </a>
                . For more information about how we collect, use, and protect your data, please review these documents.
              </p>
            </div>
          </section>

          {/* Types of Cookies */}
          <section className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Types of Cookies We Use</h2>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">1. Necessary Cookies</h3>
                <p className="mb-2">
                  These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
                </p>
                <p className="text-sm">
                  <strong>Examples:</strong> Session cookies, authentication cookies, security cookies
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">2. Analytics Cookies</h3>
                <p className="mb-2">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and provide better services.
                </p>
                <p className="text-sm mb-2">
                  <strong>Examples:</strong> Google Analytics cookies (_ga, _gid, _gat)
                </p>
                <p className="text-sm mb-2">
                  <strong>Purpose:</strong> Track page views, user behavior, traffic sources, and site performance
                </p>
                <p className="text-sm">
                  <strong>Third Party:</strong> We only use Google Analytics for website analytics. We do not use any advertising, marketing, or social media tracking cookies.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Cookies */}
          <section className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">How We Use Cookies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>To remember your cookie preferences and settings</li>
                <li>To understand how you use our website and improve your experience</li>
                <li>To analyze website traffic and performance</li>
                <li>To improve our services based on user behavior</li>
                <li>To ensure the security of your account and prevent fraud</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Third-Party Services</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We only use Google Analytics as a third-party service to help us understand how visitors use our website.
              </p>
              <p>
                <strong>Google Analytics:</strong> Google Analytics uses cookies to collect information about website usage. This information is used to compile reports on website activity and provide other services relating to website activity and internet usage. Google Analytics collects information anonymously and reports website trends without identifying individual visitors.
              </p>
              <p>
                We do not use any third-party cookies for advertising, marketing, or social media tracking purposes.
              </p>
            </div>
          </section>

          {/* Cookie Duration */}
          <section className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Cookie Duration</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Cookies can be either "session" cookies or "persistent" cookies:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser. They are used to remember your actions during a single browsing session.
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them. They are used to remember your preferences and settings for future visits.
                </li>
              </ul>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">How to Manage Your Cookie Preferences</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in several ways:
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg my-4">
                <h4 className="font-semibold text-foreground mb-2">Using Our Cookie Consent Tool</h4>
                <p className="mb-3">
                  You can manage your cookie preferences at any time using our cookie consent tool. Click the button below to update your preferences:
                </p>
                <Button onClick={resetCookieConsent} variant="default">
                  Manage Cookie Preferences
                </Button>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Browser Settings</h4>
                <p className="mb-2">
                  Most web browsers allow you to control cookies through their settings. You can set your browser to:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Refuse all cookies</li>
                  <li>Accept cookies only from specific websites</li>
                  <li>Delete cookies when you close your browser</li>
                  <li>Notify you when a website tries to place a cookie</li>
                </ul>
                <p className="mt-4">
                  Please note that if you disable cookies, some features of our website may not function properly, and your experience may be affected.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Browser-Specific Instructions</h4>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                  </li>
                  <li>
                    <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Do Not Track */}
          <section className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Do Not Track Signals</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want your online activity tracked. Currently, there is no uniform standard for recognizing and implementing DNT signals. We currently do not respond to DNT signals, but we respect your cookie preferences set through our cookie consent tool.
              </p>
            </div>
          </section>

          {/* Updates */}
          <section className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Updates to This Cookie Policy</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by updating the "Last updated" date at the top of this policy.
              </p>
              <p>
                We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.
              </p>
            </div>
          </section>

          {/* Related Policies */}
          <section className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Related Policies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This Cookie Policy works together with our other legal documents:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <a href="/privacy" className="text-accent hover:underline font-semibold">
                    Privacy Policy
                  </a>
                  {" "}- Learn how we collect, use, and protect your personal information
                </li>
                <li>
                  <a href="/terms" className="text-accent hover:underline font-semibold">
                    Terms and Conditions
                  </a>
                  {" "}- Understand the terms governing your use of our services
                </li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
              <p>
                <strong>BeMaia</strong><br/>
                <strong>Van Tuyll van Serooskerkenweg 18-3</strong><br/>
                <strong>Amsterdam, Noord-Holland 1076 CE</strong><br/>
                <strong>Netherlands</strong><br/>
                <strong>Email:</strong> info@bemaia.nl
              </p>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
