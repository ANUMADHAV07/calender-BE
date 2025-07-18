# Calendar Backend

This is the backend server for the **Calendar App**, built using **Express.js**, **TypeScript**, and **Node.js**. It integrates with the Google Calendar API, Twilio for phone calls, and uses session-based authentication.

---

## 🚀 Features

- 🌐 RESTful API with Express.js
- 🔐 Google OAuth 2.0 integration
- 📅 Google Calendar API support
- 📞 Twilio API for phone call reminders
- 📦 MongoDB (or your preferred DB) connection
- 🔐 Session management with secrets
- 🧪 Dev, build, and production-ready scripts
- ✅ Linting with ESLint

---

## 🧠 Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Google APIs](https://developers.google.com/calendar)
- [Twilio](https://www.twilio.com/)
- [MongoDB](https://www.mongodb.com/) or compatible DB
- [dotenv](https://github.com/motdotla/dotenv)
- [Nodemon](https://nodemon.io/)
- [ts-node](https://typestrong.org/ts-node/)
- [ESLint](https://eslint.org/)

---

## 📁 Environment Variables

Create a `.env` file in the root of your project with the following content:

```env
PORT=3001
NODE_ENV=development

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

SESSION_SECRET="secret"

CLIENT_URL=http://localhost:3000

DB_URL=your_database_connection_string

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
USER_PHONE_NUMBER=+91xxxxxxxxxx


📦 Installation

git clone https://github.com/your-username/calendar-backend.git
cd calendar-backend
npm install

🧪 Development
Run the server in development mode with hot reload:

npm run dev

🏗️ Build
Compile the TypeScript code to JavaScript:

npm run build

🚀 Start (Production)

npm run start
