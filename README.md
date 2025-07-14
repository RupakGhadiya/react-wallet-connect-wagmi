# 🔌 React Wallet Connect (Wagmi + Zustand + TailwindCSS)

A **modular**, **framework-agnostic**, and fully **customizable wallet connection system** built with **React 19**, **Wagmi**, **Zustand**, and **TailwindCSS**, supporting Ethereum and EVM-compatible chains. Plug it into any React app to onboard users with MetaMask, WalletConnect, and more.

---

## ✨ Features

- ✅ **Wallet Connect Integration** using `wagmi`
- 🔄 **Chain switching** (Ethereum Mainnet, etc.)
- 🧠 **State management** using [Zustand](https://github.com/pmndrs/zustand)
- 🌐 **Global caching** via [TanStack Query](https://tanstack.com/query/latest)
- 🔥 **Toasts & notifications** via `react-hot-toast`
- 🎨 Built-in **TailwindCSS** & `antd` support for rapid UI building
- 📦 Lightweight and modular hook-based design
- 📲 **React Icons** for UI components
- 🧭 Ready for `react-router` integration

---

## 📦 Packages Used

| Package                 | Purpose                            |
|-------------------------|------------------------------------|
| `wagmi`                 | Wallet connection, chain handling |
| `zustand`               | Global store for wallet/user state |
| `@tanstack/react-query`| Data fetching and caching |
| `tailwindcss`           | Utility-first CSS |
| `antd`                  | Ready-to-use UI components |
| `react-hot-toast`       | Feedback and notifications |
| `react-icons`           | Icon support |
| `uuid`                  | Generate unique identifiers |
| `react-router`          | SPA routing |
| `vite`                  | Build tool (fast HMR) |

---

## 🛠️ Setup & Installation

```bash
npm install
npm run dev
