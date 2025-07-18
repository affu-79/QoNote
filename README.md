
# ⚡ QoNote – Smart Note Selling & Preview Platform

QoNote is a modern, responsive, and dynamic note-sharing web app built for creators and students. It allows users to **preview, verify via email, and unlock PDF notes** — all with zero payment hassle.

> 💡 Ideal for sharing quality educational notes like Java, DSA, HTML, CSS, and more!

---

## 🌐 Live Preview

> Coming soon on GitHub Pages / Netlify

---

## 🎯 Features

- 🔐 Email OTP-based verification (no payment required)
- 🧠 Full PDF preview logic:  
  - First 5 pages are visible  
  - Locked from page 6 with blur + overlay  
- 📤 Auto-download/unlock after email validation
- 🔁 Stores unlocked notes in browser `localStorage`
- 🔍 Note preview selector dropdown
- 📱 Fully responsive design with animated UI
- 📧 Built-in email sending via `nodemailer` (console-logged OTP)
- 📁 Modular folder structure for clean deployment
- 🚀 Deployed-ready for Netlify / GitHub Pages (frontend) and Render / Railway (backend)

---

## 📁 Project Structure

⚙️ Tech Stack
Frontend: HTML, CSS (Bootstrap customized), Vanilla JS

Backend: Node.js + Express.js

Email System: Nodemailer (OTP shown in console)

PDF Preview: PDF.js with custom preview lock logic

Data Storage: JSON files (otps.json, orders.json)

✅ How It Works
1. 🛠 Save Your Info
Users fill their name and email using the form.

2. 🔐 Receive OTP
An OTP is generated and shown in the console (for development testing).

3. 🧾 Verify OTP
If OTP matches → user’s email is marked verified in orders.json.

4. 📘 Unlock PDF
Once verified:

Buy Now button is hidden

Download PDF + Preview link is shown

Unlock info saved in localStorage for session retention

🚀 Local Setup
```bash

git clone https://github.com/affu-79/qonote.git
cd qonote

# Install dependencies
npm install

# Setup environment variables
touch .env
.env file
env

EMAIL_ID=your_email@gmail.com
EMAIL_PASS=your_app_password
BASE_URL=http://localhost:5000

//Start server
```bash

node app.js

//Open http://localhost:5000 in your browser.


QoNote.com/
│
├── app.js                  # Node.js backend (Express server)
├── index.html              # Main frontend (no need to be inside /public)
├── styles.css              # Custom styling using CSS variables
├── .env                    # Contains email credentials (do not upload!)
├── data/
│   ├── otps.json           # Stores OTP for each email temporarily
│   └── orders.json         # Tracks verified/unlocked notes
├── assets/                 # Image assets for note cards
├── notes/                  # All your PDFs and previews
│   ├── java-dsa.pdf
│   ├── css-mastery.pdf
│   ├── html-essentials.pdf
│   └── html-preview.pdf etc.
└── utils/
    └── fileHandler.js      # Utility to read/write JSON files



