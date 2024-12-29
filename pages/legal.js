import { HeroComponent } from "@/components/hero";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import Seo from "@/components/seo";

export default function Home({ repos }) {
  return (
    <>
      <MarkdownRenderer
        content={`
          
#  Contact
Santino Seither and Fabian Stehle, Appsplosion, GbR  

**Represented by:**  
Santino Lopez Seither, Fabian Stehle  

**E-Mail:**  
[appsplosion.help@gmail.com](mailto:appsplosion.help@gmail.com)  

**Tax Identification number**  
Tax Identification number in accordance with § 27 a Umsatzsteuergesetz:  
DE346375923
    
---      
          
# Terms and Conditions


Welcome to Git Invoice (git-invoice.com)!

These terms and conditions outline the rules and regulations for the use of Git Invoice's website and services.

By accessing this website, we assume you accept these terms and conditions. Do not continue to use git-invoice.com if you do not agree to all the terms and conditions stated on this page.

## License

Unless otherwise stated, Git Invoice and/or its licensors own the intellectual property rights for all material on git-invoice.com. All intellectual property rights are reserved. You may access this from git-invoice.com for your own personal use subject to restrictions set in these terms and conditions.

You must not:
- Republish material from git-invoice.com
- Sell, rent, or sub-license material from git-invoice.com
- Reproduce, duplicate, or copy material from git-invoice.com
- Redistribute content from git-invoice.com

## User Accounts

When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding your login credentials, and you agree not to disclose your password to any third party.

We may terminate or suspend your account if you engage in fraudulent, abusive, or harmful behavior or violate these terms.

## GitHub OAuth

By using GitHub OAuth to authenticate, you authorize us to access certain information from your GitHub account to provide our services. We respect your privacy and will not use or share your data beyond the scope necessary for the functionality of git-invoice.com.

## Limitation of Liability

In no event shall Git Invoice, its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
- Your use of or inability to access git-invoice.com;
- Any unauthorized access to or use of our servers or personal information;
- Any errors, bugs, or interruptions in the service.

## Governing Law

These terms and conditions are governed by and construed in accordance with the laws of [Insert Country or State], and you irrevocably submit to the exclusive jurisdiction of the courts in that location.

## Contact Us

If you have any questions about these Terms, please contact us at appsplosion.help@gmail.com.

---

# Privacy Policy

At Git Invoice (git-invoice.com), we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our services.

## Information We Collect

- **GitHub OAuth Data**: When you sign in using GitHub OAuth, we may collect your GitHub username, email address, and repository information to provide our invoice generation services. We only access the minimum required permissions to offer our services. We do not store any repo content, not public not private.
- **Google Analytics Data**: We use Google Analytics to collect anonymous data about website usage, such as page views and session durations, to improve our services.
- **Personal Contact Information**: If you contact us directly via email (appsplosion.help@gmail.com), we may collect information like your name, email address, and the content of your message.

## How We Use Your Information

We use the information we collect to:
- Provide and maintain the services offered on git-invoice.com;
- Improve, personalize, and expand our services;
- Analyze how you use our website and services (via Google Analytics);
- Communicate with you for support, updates, and feedback.

## Data Security

We take data security seriously and use industry-standard measures, such as SSL encryption, to protect your information. However, no method of transmission over the internet or method of electronic storage is 100% secure.

## Sharing of Information

We do not sell or share your personal information with third parties, except:
- **With your consent** or as necessary to provide the services;
- **To comply with legal obligations**;
- **For the use of third-party tools**, such as Google Analytics, which may have their own privacy policies.

## Your Rights

You have the right to:
- Access and update your information;
- Request the deletion of your data;
- Opt out of Google Analytics tracking by using tools like the [Google Analytics opt-out browser add-on](https://tools.google.com/dlpage/gaoptout).

## Changes to This Privacy Policy

We may update our Privacy Policy from time to time. Any changes will be posted on this page with the updated date.

## Contact Us

If you have any questions about this Privacy Policy, please contact us at appsplosion.help@gmail.com.




`}
      />
    </>
  );
}
