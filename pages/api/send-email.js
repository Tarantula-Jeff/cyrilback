const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, phone, message } = req.body;

    console.log("Received data:", req.body); // Log received data

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cyrillisk889@gmail.com", // Your Gmail
        pass: "pvkb xzln xrse tmzc",    // Your Gmail App Password
      },
      logger: true,  // Logs to console for debugging
      debug: true, 
    });

    const mailOptions = {
      from: email, // Sender's email
      to: "cyrillisk889@gmail.com", // Your receiving email
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `
               BOOKING MESSAGE
      -------------------------------------

      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || "N/A"}
      Message: ${message}
    `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info);
      res.status(200).send("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("An error occurred while sending the email.");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
