/**
 * Silent Email Service - FormSubmit
 * 
 * This service uses FormSubmit - a completely free email service that requires:
 * - NO registration
 * - NO access keys
 * - NO personal information (except the email where you want to receive messages)
 * - NO backend
 * 
 * How it works:
 * - Sends email silently in the background
 * - User just clicks submit and gets a success message
 * - No email client opens
 * - Completely transparent to the user
 * 
 * Setup: Just put your email in the BUSINESS_EMAIL constant below
 */

// Your business email where you want to receive demo requests
const BUSINESS_EMAIL = "dhruv.k@mvclouds.com";

/**
 * Send email silently using FormSubmit
 * User sees nothing - email is sent in background
 * @param formData Demo request form data
 * @returns Promise<boolean> Success status
 */
export const sendDemoRequest = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  company: string;
  companyStrength?: string;
  country: string;
  phone?: string;
  message?: string;
}): Promise<boolean> => {
  try {
    // FormSubmit endpoint - no registration needed, just use your email in URL
    const formSubmitUrl = `https://formsubmit.co/${BUSINESS_EMAIL}`;
    
    // Prepare form data
    const data = new FormData();
    
    // Add form fields
    data.append('name', `${formData.firstName} ${formData.lastName}`);
    data.append('email', formData.email);
    data.append('subject', `Demo Request from ${formData.company}`);
    data.append('company', formData.company);
    // data.append('jobTitle', formData.jobTitle || 'Not provided');
    // data.append('companySize', formData.companyStrength || 'Not provided');
    data.append('country', formData.country);
    data.append('phone', formData.phone || 'Not provided');
    data.append('message', formData.message || 'No additional message');
    
    // FormSubmit settings (disable default redirect, captcha, etc.)
    data.append('_captcha', 'false'); // Disable FormSubmit's captcha (you have your own)
    data.append('_template', 'table'); // Use table format for email
    data.append('_subject', `Demo Request from ${formData.company}`);
    
    // Send the request
    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      console.log('Email sent successfully via FormSubmit');
      return true;
    } else {
      console.error('FormSubmit error:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
