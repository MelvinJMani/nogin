# 🧠 nogin
> Calm, offline-first brain games with an e-paper display vibe.

nogin is a Progressive Web App for **daily brain training** — think Sudoku, 2048, Crosswords, Tetris — without points, streaks, or leaderboards.  
You play for a **fixed daily time cap**, then it locks until the next day.  
Built with **React + TypeScript + Vite**, fully installable, works offline.

## ✨ Features
- 🧩 **Classic games** – Sudoku, 2048, Crosswords, Tetris (more coming)
- 📴 **Offline-first** – Powered by `vite-plugin-pwa`
- ⏳ **Daily time limit** – Customizable per user, enforces “come back tomorrow”
- 🖤 **E-paper style** – Minimalist grayscale UI for low visual noise
- 📱 **Installable** – Works like a native app on desktop & mobile
- 🛡 **Strict code quality** – ESLint, Prettier, type checks, commit linting
- ✅ **Tested** – Vitest + Testing Library
- 🔄 **CI parity** – Local hooks (Lefthook) match GitHub Actions pipeline

---

## 📦 Tech Stack
| Layer | Tools |
|-------|-------|
| **UI** | React 18, TypeScript, Vite |
| **Styling** | CSS (custom e-paper theme) |
| **PWA** | `vite-plugin-pwa` + Workbox |
| **State** | Zustand |
| **Offline DB** | `idb-keyval` |
| **Testing** | Vitest, @testing-library/react, jsdom |
| **Linting/Formatting** | ESLint (flat config), Prettier |
| **Git Hooks** | Lefthook, lint-staged |
| **Commit Convention** | Conventional Commits (`commitlint`) |
| **Branch Guard** | Custom script in local + CI |

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/nogin.git
cd nogin
pnpm install
```

### 2. Run in Dev Mode

```bash
pnpm dev
```

Visit `http://localhost:5173`.

### 3. Build for Production

```bash
pnpm build
pnpm preview
```

### 4. Run Tests

```bash
pnpm test        # run all tests
pnpm test:watch  # watch mode
pnpm test:ui     # interactive UI
```

## 🛠 Developer Workflow

### Commit Rules

* Follow **Conventional Commits**:

  ```
  feat/daily-cap-lock: add daily usage cap enforcement
  fix/pwa-typo: correct manifest description
  ```
* Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

### Branch Naming

* Allowed:

  ```
  feat/<slug>
  fix/<slug>
  hotfix/<slug>
  release/<slug>
  test/<slug>
  experimental/<slug>
  ```
* Examples:
  ```
  feat/2048-implementation
  fix/offline-cache-bug
  ```

### Git Hooks

* **pre-commit** – Lints staged files (ESLint + Prettier)
* **pre-push** – Branch name guard, type check, tests
* **commit-msg** – Commitlint

Run once to set up hooks:

```bash
pnpm prepare
```

## 📜 License

MIT © 2025 MelvinJMani(https://github.com/MelvinJMani/nogin)