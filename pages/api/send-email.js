const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { firstName, lastName, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Environment variable for email
      pass: process.env.GMAIL_PASSWORD, // Environment variable for app password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL, // Receiver's email as an environment variable
    subject: `New Contact Form Submission from ${firstName} ${lastName}`,
    text: `
      BOOKING MESSAGE
      -----------------------

      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || "N/A"}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err); // Log the error
      return res.status(500).json({ message: "Failed to send email", error: err.message });
    }
    console.log("Email sent successfully:", info.response);
    res.status(200).json({ message: "Email sent successfully" });
  });
}  