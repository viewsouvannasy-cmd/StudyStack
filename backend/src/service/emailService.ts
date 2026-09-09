import sgMail from "../config/sendGrid.js";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendMailOtp = async (user_email: string, otpCode: string) => {
  try {
    // email message
    const msg = {
      to: user_email,
      from: {
        email: "studystack.ssd@gmail.com",
        name: "StudyStack",
      },
      subject: "Your Verification Code (OTP)",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <h2>Verify Your Emaill Address</h2>
          <p>Your OTP code for registration is:</p>
          <h1 style="color: #111111; letter-spacing: 5px;">${otpCode}</h1>
          <p>this code will expire in <b>5 minutes</b></p>
          <p>If you did not request this code, please igorne this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.log(`Failed to send email otp ${error}`);
    return false;
  }
};

export { generateOtp, sendMailOtp };
