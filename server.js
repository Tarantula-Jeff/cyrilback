const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files if necessary
app.use(express.static("public"));

// Email handler
app.post("/send-email", (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  console.log("Received data:", req.body); // Log the received data for debugging

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cyrillisk889@gmail.com", // Replace with your email
      pass: "pvkb xzln xrse tmzc",    // Replace with your Gmail App Password
    },
  });

  const mailOptions = {
    from: email, // User's email address
    to: "cyrillisk889@gmail.com",  // Replace with your receiving email
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

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      return res.status(500).send("An error occurred while sending the email.");
    }
    console.log("Email sent:", info); // Log email sent info
    res.sendFile(path.resolve(__dirname, "success.html"));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
