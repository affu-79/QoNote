const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // index.html in root
const OTP_STORE = {}; // In-memory store for OTPs

// ===== 1. Serve index.html =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ===== 2. Send OTP =====
app.post("/send-otp", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  OTP_STORE[email] = otp;

  console.log(`OTP for ${email} is: ${otp}`); // show in console

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `QoNote <${process.env.EMAIL_ID}>`,
    to: email,
    subject: "Your OTP for QoNote",
    html: `<p>Your One-Time Password (OTP) is: <b>${otp}</b></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

// ===== 3. Verify OTP =====
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (OTP_STORE[email] === otp) {
    saveVerifiedEmail(email);
    delete OTP_STORE[email];
    return res.json({ success: true });
  }
  res.json({ success: false });
});

// ===== 4. Check if email is verified =====
app.post("/verify-entered-email", (req, res) => {
  const { enteredEmail } = req.body;
  const list = getVerifiedEmails();
  const verified = list.includes(enteredEmail);
  res.json({ success: true, verified });
});

// ===== 5. Store verified emails in JSON =====
const DATA_PATH = path.join(__dirname, "data", "orders.json");

function getVerifiedEmails() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const orders = JSON.parse(raw);
    return orders.map(order => order.email);
  } catch (e) {
    return [];
  }
}

function saveVerifiedEmail(email) {
  const orders = getVerifiedEmails().map(e => ({ email: e }));
  if (!orders.find(o => o.email === email)) {
    orders.push({ email });
    fs.writeFileSync(DATA_PATH, JSON.stringify(orders, null, 2));
  }
}

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
