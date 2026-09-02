// Your business email where you want to receive demo requests
const BUSINESS_EMAIL = "dharmik@mvclouds.com";

export const sendDemoRequest = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  phone?: string;
  message?: string;
}): Promise<boolean> => {
  try {
    const formSubmitUrl = `https://formsubmit.co/${BUSINESS_EMAIL}`;

    const data = new FormData();

    data.append("name", `${formData.firstName} ${formData.lastName}`);
    data.append("email", formData.email);
    data.append(
      "subject",
      `Docgenius 2.0 Demo Request from ${formData.firstName} ${formData.lastName}`
    );
    data.append("company", formData.company);
    data.append("country", formData.country);
    data.append("phone", formData.phone || "Not provided");
    data.append("message", formData.message || "No additional message");

    // FormSubmit settings
    data.append("_captcha", "false");
    data.append("_template", "table");
    data.append(
      "_subject",
      `Docgenius Demo Request from ${formData.firstName} ${formData.lastName}`
    );

    const response = await fetch(formSubmitUrl, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      console.log("Email sent successfully via FormSubmit");
      return true;
    } else {
      console.error("FormSubmit error:", await response.text());
      return false;
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
