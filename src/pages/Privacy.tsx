import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen page-bg">
    <Header />
    
    <section className="py-32 pt-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-5">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-6">
            Last updated December 05, 2025
          </p>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto text-left space-y-4">
            <p>
              This Privacy Notice for BeMaia ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>"), describes how and why we might access, collect, store, use, and/or share ("<strong>process</strong>") your personal information when you use our services ("<strong>Services</strong>"), including when you:
            </p>
            <ul className="list-disc ml-6">
              <li>Visit our website at http://www.bemaia.nl or any website of ours that links to this Privacy Notice</li>
              <li>Engage with us in other related ways, including any marketing or events</li>
            </ul>
            <p>
              <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at info@bemaia.nl.
            </p>
          </div>
        </div>

        {/* Summary of Key Points */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">SUMMARY OF KEY POINTS</h2>
          <p className="mb-4 italic">
            <strong>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</strong>
          </p>
          <ul className="list-disc ml-6 text-muted-foreground space-y-2">
            <li><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</li>
            <li><strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law.</li>
            <li><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</li>
            <li><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.</li>
            <li><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.</li>
            <li><strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.</li>
            <li><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</li>
            <li><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by visiting http://www.bemaia.nl/profile, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</li>
          </ul>
        </section>

        {/* Table of Contents */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">TABLE OF CONTENTS</h2>
          <ol className="list-decimal ml-6 text-muted-foreground space-y-1">
            <li><a href="#section-1" className="hover:text-accent transition-colors">WHAT INFORMATION DO WE COLLECT?</a></li>
            <li><a href="#section-2" className="hover:text-accent transition-colors">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
            <li><a href="#section-3" className="hover:text-accent transition-colors">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
            <li><a href="#section-4" className="hover:text-accent transition-colors">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
            <li><a href="#section-5" className="hover:text-accent transition-colors">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
            <li><a href="#section-6" className="hover:text-accent transition-colors">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
            <li><a href="#section-7" className="hover:text-accent transition-colors">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
            <li><a href="#section-8" className="hover:text-accent transition-colors">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
            <li><a href="#section-9" className="hover:text-accent transition-colors">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
            <li><a href="#section-10" className="hover:text-accent transition-colors">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
            <li><a href="#section-11" className="hover:text-accent transition-colors">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
            <li><a href="#section-12" className="hover:text-accent transition-colors">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
            <li><a href="#section-13" className="hover:text-accent transition-colors">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
          </ol>
        </section>

        {/* 1. What Information Do We Collect */}
        <section id="section-1" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>
          
          <h3 className="text-2xl font-bold mb-2">Personal information you disclose to us</h3>
          <p className="mb-2 italic"><strong>In Short:</strong> We collect personal information that you provide to us.</p>
          <p className="mb-4">
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
          </p>
          
          <p className="mb-2"><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
          <ul className="list-disc ml-6 text-muted-foreground mb-4">
            <li>email addresses</li>
            <li>job titles</li>
            <li>passwords</li>
            <li>contact or authentication data</li>
            <li>company name</li>
            <li>survey responses</li>
            <li>survey metadata</li>
            <li>consent records</li>
          </ul>
          
          <p className="mb-2"><strong>Sensitive Information.</strong> When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:</p>
          <ul className="list-disc ml-6 text-muted-foreground mb-4">
            <li>health data</li>
          </ul>
          
          <p className="mb-4">
            All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
          </p>
          
          <h3 className="text-2xl font-bold mb-2">Information automatically collected</h3>
          <p className="mb-2 italic"><strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</p>
          <p className="mb-4">
            We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
          </p>
          
          <p className="mb-4">
            Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Notice: <a href="/cookies" className="text-accent hover:underline">bemaia.nl/cookies</a>.
          </p>
          
          <p className="mb-2">The information we collect includes:</p>
          <ul className="list-disc ml-6 text-muted-foreground space-y-2 mb-4">
            <li><strong>Log and Usage Data.</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).</li>
            <li><strong>Device Data.</strong> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.</li>
            <li><strong>Location Data.</strong> We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.</li>
          </ul>
        </section>

        {/* 2. How Do We Process Your Information */}
        <section id="section-2" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
          <p className="mb-2 italic"><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
          <p className="mb-2">We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
          <ul className="list-disc ml-6 text-muted-foreground space-y-2">
            <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
            <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
            <li><strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.</li>
          </ul>
        </section>

        {/* 3. Legal Bases */}
        <section id="section-3" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
          <p className="mb-4 italic"><strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</p>
          <p className="mb-2">
            The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
          </p>
          <ul className="list-disc ml-6 text-muted-foreground space-y-2">
            <li><strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
            <li><strong>Performance of a Contract.</strong> We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.</li>
            <li><strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
            <li><strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
          </ul>
        </section>

        {/* 4. When and With Whom */}
        <section id="section-4" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
          <p className="mb-4 italic"><strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.</p>
          <p className="mb-2">We may need to share your personal information in the following situations:</p>
          <ul className="list-disc ml-6 text-muted-foreground space-y-2">
            <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>Business Partners.</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
          </ul>
        </section>

        {/* 5. Cookies and Tracking */}
        <section id="section-5" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
          <p className="mb-4 italic"><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</p>
          <p className="mb-4">
            We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
          </p>
          <p className="mb-4">
            We use Google Analytics to help us understand how visitors interact with our Services. Google Analytics uses cookies to collect information anonymously and report website usage statistics. This helps us improve our Services and provide a better user experience.
          </p>
          <p className="mb-4">
            Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice: <a href="/cookies" className="text-accent hover:underline">bemaia.nl/cookies</a>.
          </p>
          <h3 className="text-xl font-bold mb-2">Google Analytics</h3>
          <p>
            We use Google Analytics to track and analyze the use of our Services. Google Analytics collects information such as how often users visit our site, what pages they visit, and what other sites they used prior to coming to our site. We use the information we get from Google Analytics only to improve our Services. Google Analytics collects only the IP address assigned to you on the date you visit our site, rather than your name or other identifying information. To opt out of being tracked by Google Analytics across all websites, visit https://tools.google.com/dlpage/gaoptout. For more information on the privacy practices of Google, please visit the Google Privacy & Terms page.
          </p>
        </section>

        {/* 6. How Long */}
        <section id="section-6" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
          <p className="mb-4 italic"><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
          <p className="mb-4">
            We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
          </p>
          <p>
            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
          </p>
        </section>

        {/* 7. How We Keep Info Safe */}
        <section id="section-7" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
          <p className="mb-4 italic"><strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.</p>
          <p>
            We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
          </p>
        </section>

        {/* 8. Minors */}
        <section id="section-8" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
          <p className="mb-4 italic"><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</p>
          <p>
            We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at info@bemaia.nl.
          </p>
        </section>

        {/* 9. Privacy Rights */}
        <section id="section-9" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
          <p className="mb-4 italic"><strong>In Short:</strong> In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Switzerland, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>
          <p className="mb-4">
            In some regions (like the EEA, UK, and Switzerland), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
          </p>
          <p className="mb-4">
            We will consider and act upon any request in accordance with applicable data protection laws.
          </p>
          <p className="mb-4">
            If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your Member State data protection authority or UK data protection authority.
          </p>
          <p className="mb-4">
            If you are located in Switzerland, you may contact the Federal Data Protection and Information Commissioner.
          </p>
          <p className="mb-4">
            <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below or updating your preferences.
          </p>
          <p className="mb-4">
            However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
          </p>
          
          <h3 className="text-xl font-bold mb-2">Account Information</h3>
          <p className="mb-2">If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
          <ul className="list-disc ml-6 text-muted-foreground mb-4">
            <li>Log in to your account settings and update your user account.</li>
            <li>Contact us using the contact information provided.</li>
          </ul>
          <p className="mb-4">
            Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
          </p>
          
          <p className="mb-4">
            <strong>Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. For further information, please see our Cookie Notice: <a href="/cookies" className="text-accent hover:underline">bemaia.nl/cookies</a>.
          </p>
          
          <p>
            If you have questions or comments about your privacy rights, you may email us at info@bemaia.nl.
          </p>
        </section>

        {/* 10. Do-Not-Track */}
        <section id="section-10" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
          <p>
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
          </p>
        </section>

        {/* 11. Updates to Notice */}
        <section id="section-11" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">11. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
          <p className="mb-4 italic"><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
          <p>
            We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
          </p>
        </section>

        {/* 12. Contact Us */}
        <section id="section-12" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
          <p className="mb-2">If you have questions or comments about this notice, you may email us at info@bemaia.nl or contact us by post at:</p>
          <p>
            BeMaia<br/>
            Van Tuyll van Serooskerkenweg 18-3<br/>
            Amsterdam, Noord-Holland 1076 CE<br/>
            Netherlands
          </p>
        </section>

        {/* 13. Review, Update, or Delete */}
        <section id="section-13" className="mb-12 max-w-4xl mx-auto scroll-mt-32">
          <h2 className="text-3xl font-bold mb-4">13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
          <p>
            You have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please visit: http://www.bemaia.nl/profile.
          </p>
        </section>
      </div>
    </section>

    <Footer />
  </div>
);

export default PrivacyPolicy;
