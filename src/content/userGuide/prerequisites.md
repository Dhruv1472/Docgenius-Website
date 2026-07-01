# Prerequisites

Before using DocGenius, ensure that Salesforce is configured with the required settings. Follow these steps to set up the Connected App, Trusted URLs, and Lightning Web Security.

---

## 1. Create a Connected App in Salesforce

A Connected App allows DocGenius to securely authenticate with your Salesforce org via OAuth 2.0.

### Steps

1. Go to **Setup** in Salesforce.
2. Search for **App Manager** in the Quick Find box.
3. Click **New Connected App** in the top-right corner.
4. Fill in the **Basic Information**:
   - **Connected App Name** — e.g., `DocGenius`
   - **API Name** — auto-filled
   - **Contact Email** — your admin email
5. Under **API (Enable OAuth Settings)**, check **Enable OAuth Settings**.
6. Set the **Callback URL** to your DocGenius redirect URL.
7. Add the following **OAuth Scopes**:
   - `Full access (full)`
   - `Perform requests at any time (refresh_token, offline_access)`
8. Click **Save** and wait a few minutes for changes to propagate.

> **Note:** After saving, copy the **Consumer Key** and **Consumer Secret** — you will need these when configuring DocGenius.

![Connected App Setup](https://docgenius.s3.us-east-1.amazonaws.com/User_Guide_Images/Prerequisites_1.png)

---

## 2. Configure Trusted URLs

Trusted URLs allow DocGenius to make cross-origin requests from your Salesforce org.

### Steps

1. Go to **Setup** → search **Trusted URLs** in Quick Find.
2. Click **New Trusted URL**.
3. Add the DocGenius domain:
   - **API Name** — `DocGenius`
   - **URL** — `https://docgenius.ai` (or your custom domain)
4. Check all the **CSP Directives** checkboxes:
   - connect-src
   - font-src
   - frame-src
   - img-src
   - media-src
   - script-src
   - style-src
5. Click **Save**.

![Trusted URLs Configuration](https://docgenius.s3.us-east-1.amazonaws.com/User_Guide_Images/Prerequisites_2.png)

---

## 3. Enable Lightning Web Security

Lightning Web Security (LWS) must be enabled for DocGenius components to function correctly in Lightning Experience.

### Steps

1. Go to **Setup** → search **Session Settings** in Quick Find.
2. Scroll down to the **Lightning Web Security** section.
3. Enable **Use Lightning Web Security for Lightning web components and Aura components**.
4. Click **Save**.

![Lightning Web Security Setting](https://docgenius.s3.us-east-1.amazonaws.com/User_Guide_Images/Prerequisites_3.png)

---

## 4. Install the DocGenius Package

1. Use the installation link provided by the DocGenius team.
2. Choose **Install for All Users** (recommended) or **Install for Admins Only**.
3. Grant access to required third-party websites when prompted.
4. Click **Install** and wait for the confirmation email.

![Package Installation](https://docgenius.s3.us-east-1.amazonaws.com/User_Guide_Images/Prerequisites_4.png)

---

## 5. Add DocGenius to Your Lightning App

1. Go to **Setup** → **App Manager**.
2. Find your Lightning App and click **Edit**.
3. Under **Navigation Items**, add the **DocGenius** tab.
4. Save and reload.

![Adding to Lightning App](https://docgenius.s3.us-east-1.amazonaws.com/User_Guide_Images/Prerequisites_5.png)

---

## Checklist Before Starting

| Requirement | Status |
|---|---|
| Connected App created with OAuth scopes | ✅ |
| Consumer Key & Secret copied | ✅ |
| Trusted URL added for DocGenius domain | ✅ |
| Lightning Web Security enabled | ✅ |
| DocGenius package installed | ✅ |
| DocGenius tab added to Lightning App | ✅ |

> **Tip:** If you encounter any issues during setup, contact [support-dg@mvclouds.com](mailto:support-dg@mvclouds.com).
