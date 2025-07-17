# 🧠 QuickTasks – AI-Powered Todo App

**QuickTasks** is an intelligent todo list web app that generates personalized daily tasks using **Google Gemini AI** and manages them with **Firebase (Firestore)**.  
Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Radix UI**, and **Firebase CRUD**.

---

## ✨ Features

- 🧠 AI-generated task suggestions via Google Gemini API (`@google/generative-ai`)
- 🔥 Realtime Firebase Firestore CRUD (Add, Edit, Delete)
- ✍️ Inline task editing with instant visual feedback
- 💡 Clean, accessible UI using Radix UI components
- 🌙 Dark/Light mode with a custom theme toggler
- ✅ Toast notifications for all actions
- 📱 Fully mobile responsive using custom hooks
- ❌ Removed localStorage — tasks are fully cloud-synced

---

## 🔄 How It Works

### ✅ Task Generation (AI)
- Click the “Generate Tasks with Gemini” button.
- A `POST` request is sent to `/api/generate-tasks`.
- Google Gemini API returns a list of suggested daily tasks.
- Tasks are shown in a modal, ready to be added.

### ✅ Saving Tasks (Firebase Firestore)
- Add tasks manually or accept Gemini suggestions.
- All tasks are saved in Firestore in real-time.

### ✅ Editing Tasks
- Each task has an ✏️ edit icon.
- Click to enable inline editing — changes are saved instantly to Firestore.

### ✅ Deleting Tasks
- Click the 🗑️ delete icon to remove a task.
- Deletion is instant in Firestore and UI.

### ✅ UI/UX
- UI powered by Radix UI and styled with Tailwind CSS.
- Fully responsive layout (mobile-first).
- Custom toast notifications for feedback.
- Accessible, theme-aware components.

---

## 📁 Folder Structure

```
ai-todo-list/
├── app/
│   ├── api/generate-tasks/route.ts      # Gemini AI POST endpoint
│   ├── layout.tsx                       # Root layout with theme setup
│   ├── page.tsx                         # Homepage (task dashboard)
│   └── globals.css                      # Global styles
│
├── components/
│   ├── ai-assistant.tsx                 # Gemini task generator UI
│   ├── task-input.tsx                   # Add/edit task form
│   ├── task-list-firebase.tsx           # Firebase CRUD task list
│   ├── theme-provider.tsx               # Theme context/provider
│   └── theme-toggle.tsx                 # Dark/light mode toggle
│
├── hooks/
│   ├── use-mobile.tsx                   # Detect mobile screen size
│   └── use-toast.ts                     # Toast utility
│
├── lib/
│   ├── firebase.ts                      # Firebase configuration
│   ├── todos.ts                         # Firebase CRUD logic
│   └── utils.ts                         # Misc utility functions
│
├── public/                              # Static assets (optional)
├── .env.local                           # API credentials
├── next.config.mjs                      # Next.js config
├── .gitignore
```

---

## ⚙️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Radix UI
- **AI**: Google Gemini API (`@google/generative-ai`)
- **Database**: Firebase Firestore (Realtime CRUD)

---

## 🧪 Run Locally

```bash
git clone https://github.com/your-username/ai-todo-list
cd ai-todo-list
npm install
```

### 🔐 Create `.env.local`

```env
GOOGLE_GEMINI_API_KEY=your_gemini_key

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### ▶️ Start the App

```bash
npm run dev
```

---

## 👤 Author

**Kanhaiya Kumar Majhi**  
🔗 [GitHub Profile](https://github.com/tfkanhaiya)