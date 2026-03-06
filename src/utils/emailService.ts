
// Your business email where you want to receive demo requests
const BUSINESS_EMAIL = "dharmik@mvclouds.com";

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
    data.append('subject', `Docgenius Demo Request from ${formData.firstName} ${formData.lastName}`);
    data.append('company', formData.company);
    // data.append('jobTitle', formData.jobTitle || 'Not provided');
    // data.append('companySize', formData.companyStrength || 'Not provided');
    data.append('country', formData.country);
    data.append('phone', formData.phone || 'Not provided');
    data.append('message', formData.message || 'No additional message');
    
    // FormSubmit settings (disable default redirect, captcha, etc.)
    data.append('_captcha', 'false'); // Disable FormSubmit's captcha (you have your own)
    data.append('_template', 'table'); // Use table format for email
    data.append('_subject', `Docgenius Demo Request from ${formData.firstName} ${formData.lastName}`);
    
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
