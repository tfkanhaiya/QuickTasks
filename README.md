# 📝 QuickTasks – AI-Powered To‑Do List App (Next.js + TypeScript)

**QuickTasks** is a sleek, modern, and intelligent to‑do list application built using **Next.js App Router** and **TypeScript**. With seamless integration of **Google Gemini AI**, this app helps you plan your day with smart suggestions and actionable daily tasks.

---

## 🚀 Features

- ✅ Add, complete, and delete tasks  
- 💡 **AI Suggest Tasks** – powered by Gemini  
- 📅 **AI Plan My Day** – organizes tasks into Morning, Afternoon, Evening  
- 🔄 Auto-persist tasks with **LocalStorage**  
- ⚡ Built with **Next.js App Router** & **TypeScript**  
- 🎨 Styled using **Tailwind CSS**  
- 🔐 Backend API route securely integrates with Gemini  

---

## 🧩 Tech Stack

| Layer        | Tech Used                          |
|--------------|------------------------------------|
| Framework    | Next.js (App Router)               |
| Language     | TypeScript                         |
| Styling      | Tailwind CSS                       |
| AI Integration | Gemini via `@ai-sdk/google`      |
| API Layer    | Next.js API Routes (`app/api/...`) |
| State        | React State + LocalStorage         |
| Deployment   | Vercel or Netlify                  |

---

## 🛠 Folder Structure

```
📁 ai-todo-list/
├── app/
│   └── api/
│       └── suggest/
│           └── route.ts      # Gemini API handler
├── components/               # Optional: shared UI components
├── utils/
│   └── gemini.ts             # Helper to interact with Gemini
├── styles/
│   └── globals.css           # Tailwind setup
├── App.tsx                  # Main app logic
├── page.tsx                 # Root page
├── .env                     # API Key (should be gitignored)
├── .gitignore
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tfkanhaiya/QuickTasks.git
cd QuickTasks
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variable

Create a `.env.local` file and add your Gemini API key:

```env
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

> ✅ **Note**: This key should be kept secret and must not be pushed to GitHub.

### 4. Run the Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧠 How It Works

- **Add Task**: Use the input box to add a new task.  
- **Complete/Delete Task**: Click the task to toggle completion. Click ❌ to delete.  
- **Suggest Tasks (💡)**: Asks Gemini to generate simple tasks.  
- **Plan My Day (📅)**: Uses Gemini to break down the day into Morning, Afternoon, Evening plans.  

---

## 📦 Deployment

This app is optimized for deployment on **Vercel** or **Netlify**.

### 🔐 Environment Variable for Production

Make sure to set the following in your platform’s dashboard:

```
GOOGLE_GEMINI_API_KEY=your_production_key_here
```

Then deploy the repo directly from GitHub.

---

## ✅ .gitignore Best Practices

```gitignore
# dependencies
/node_modules

# next.js
/.next/
/out/

# build output
/build

# debug logs
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# env files
.env*
!.env.example

# vercel
.vercel/

# typescript
*.tsbuildinfo
next-env.d.ts
```

---

## 🔐 Sample `.env.example`

```env
# Rename this file to `.env.local` and add your actual API key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🛠 Future Enhancements

- 🔐 Add authentication (Firebase/Auth0)  
- 📱 PWA Support  
- ☁️ Store tasks in Firestore or Supabase  
- 📊 Analytics dashboard for completed tasks  
- 🧠 Use OpenAI/Gemini function calling for smarter task suggestions  

---

## 🧑‍💻 Contributing

Want to improve QuickTasks?

```bash
git fork https://github.com/tfkanhaiya/QuickTasks.git
git checkout -b feature/your-feature
```

Make your changes, then:

```bash
git commit -m "Added: your feature"
git push origin feature/your-feature
```

Then open a PR 🚀

---

## 📫 Contact

Created by **[Kanhaiya Kumar](https://github.com/tfkanhaiya)**  
Feel free to connect or raise an issue for bugs or suggestions!

---

## 🫶 Acknowledgements

- [@ai-sdk/google](https://www.npmjs.com/package/@ai-sdk/google)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Next.js](https://nextjs.org/)  
- [Google Gemini](https://deepmind.google/technologies/gemini/)

---

<p align="right">Made with 💙 by Kanhaiya</p>
