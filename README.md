# Harbor Lines ERP Frontend

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-v19.2.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-v7.2.4-purple.svg)

A modern, high-performance frontend application for the **Harbor Lines ERP** system. Built with React and Vite, this application provides a seamless user experience for managing logistics operations, master data, and freight workflows.

## 🚀 Technologies

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [React Router DOM](https://reactrouter.com/) (v6)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **UI Feedback**: [React Hot Toast](https://react-hot-toast.com/)
- **Theme Support**: Custom CSS Variables & Dark Mode Toggle
- **Loader**: Custom CSS-based animated loading system

## ✨ Key Features

### 🌓 Theme Personalization
- **Dark Mode Support**: System-wide dark mode with a premium, animated toggle switch.
- **Theme Persistence**: Automatic theme saving and loading via `localStorage`.
- **Dynamic CSS Variables**: Centralized styling using CSS variables for high consistency.

### 🔐 Authentication & Security
- **Secure Login**: Robust authentication flow with protected routes.
- **Session Management**: Seamless handling of user sessions.

### 📊 Dashboard
- **Centralized Hub**: Quick access to all system modules and key metrics.

### 🗂️ Master Data Management
Intuitive interfaces for managing core system data:
- **Partners**: Customer and Supplier maintenance.
- **Finance**: Currency configuration, Bank details, and Tax rules.
- **Standards**: Unit of Measurement (UOM) management.

### 🚢 Freight Management
Tools for managing logistics assets:
- **Vessel Maintenance**: Database of sea vessels.
- **Flight Maintenance**: Database of air carriers.
- **Destinations**: Configuration for Sea Ports and Airports.

### 🌊 Operational Workflows
- **Sea Import Jobs**: Comprehensive management of import job lifecycles.
- **Delivery Orders**: Generation and processing of delivery documentation.
- **E-Manifest Generation**: Automated **XML generation** and export for customs compliance (SLPA standards).

### 📊 Reporting & Documentation
High-fidelity, print-ready document generation:
- **Sales Invoices**: Detailed financial documentation with automatic total calculations.
- **Manifest Reports**: Professional, page-based table layouts for house bills and job summaries.
- **Dynamic Formatting**: Automatic font optimization (9px/11px) and column resizing for high-density data.
- **One-Click Export**: Integrated **PDF Export**, **Print**, and **XML Download** functionality.
- **Multi-Page Support**: Intelligent page numbering and grouping for large job datasets.

### 👤 User Administration
- **User Maintenance**: Admin panel for managing system access and user roles with secure password handling.

## 🛠️ Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/VimukthiPramudantha/Harbor_lines_frontend.git
    cd Harbor_lines_frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

4.  **Build for Production**:
    ```bash
    npm run build
    ```

5.  **Preview Build**:
    ```bash
    npm run preview
    ```

## 📁 Project Structure

```text
src/
├── assets/         # Static assets (images, icons)
├── components/     # Reusable UI components (layout, common)
├── context/        # Global state context (Auth, Theme)
├── helpers/        # Utility functions (XML generation, formatting)
├── pages/          # Application pages (Views)
│   ├── auth/       # Login & Auth pages
│   ├── masters/    # Master data pages
│   ├── freight/    # Freight management pages
│   └── reports/    # Operational reports & E-Manifest
├── services/       # API service integration
├── styles/         # Global styles and themes
├── App.jsx         # Main application component
└── main.jsx        # Entry point
```
