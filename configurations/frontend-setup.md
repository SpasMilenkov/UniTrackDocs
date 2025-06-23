# 🎨 Frontend Configuration

> **Configure the Nuxt.js Progressive Web Application with modern features and integrations**

## 🏗️ Frontend Architecture Overview

The UniTrack frontend is a modern Nuxt.js application featuring:

- **⚡ Nuxt 3** with Vue.js 3 Composition API and TypeScript
- **📱 Progressive Web App (PWA)** with offline capabilities
- **🎨 Modern UI** with Naive UI components and Tailwind CSS
- **🌍 Internationalization** supporting multiple languages
- **📊 Data Visualization** with Chart.js and OpenLayers mapping
- **🔄 Real-time Updates** via WebSocket connections
- **📈 Performance Optimized** with SSR, caching, and code splitting

---

## 📋 Configuration Files Structure

```
UniTrackRemasterFrontend/
├── nuxt.config.ts                    # 🔧 Main Nuxt configuration
├── .env                             # 🔐 Environment variables
├── .env.example                     # 📝 Environment template
├── i18n.config.ts                   # 🌍 Internationalization
├── tailwind.config.js               # 🎨 Tailwind CSS config
├── app.vue                          # 📱 Root application component
├── assets/
│   ├── css/main.css                 # 🎨 Global styles
│   └── icons/                       # 🎯 PWA icons
├── components/                      # 🧩 Vue components
├── pages/                          # 📄 File-based routing
├── stores/                         # 🗄️ Pinia state management
├── composables/                    # 🔄 Reusable composition functions
├── plugins/                        # 🔌 Nuxt plugins
└── public/                         # 📁 Static assets
    ├── pwa-icon-192x192.png
    ├── pwa-icon-512x512.png
    └── favicon.ico
```

---

## 🔧 Main Nuxt Configuration

### `nuxt.config.ts`

```typescript
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  // 🎨 Global CSS imports
  css: ["~/assets/css/main.css"],

  // 📦 Nuxt modules and integrations
  modules: [
    "@nuxtjs/tailwindcss", // 🎨 Utility-first CSS framework
    "@vee-validate/nuxt", // 📝 Form validation
    "@nuxt/icon", // 🎯 Icon management
    "@pinia/nuxt", // 🗄️ State management
    "@nuxt/eslint", // 📏 Code linting
    "nuxtjs-naive-ui", // 🧩 UI component library
    "@nuxtjs/i18n", // 🌍 Internationalization
    "@nuxt/image", // 🖼️ Image optimization
    "@vueuse/motion/nuxt", // ✨ Animation utilities
    "@pinia/colada-nuxt", // 🔄 Data fetching & caching
    "@vite-pwa/nuxt", // 📱 Progressive Web App
  ],

  // 🖥️ Server-Side Rendering configuration
  ssr: true,

  // 🗄️ Pinia state management setup
  pinia: {
    storesDirs: ["./stores/**"],
  },

  // 🖼️ Image optimization settings
  image: {
    format: ["webp", "avif", "jpeg", "png"],
    quality: 90,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // 📱 Progressive Web App configuration
  pwa: {
    registerType: "autoUpdate",
    devOptions: {
      enabled: false,
      type: "module",
    },
    manifest: {
      name: "UniTrack: Education Unified",
      short_name: "UniTrack",
      description:
        "UniTrack streamlines student management, grading, analytics, and academic planning for schools and universities. A modern platform simplifying education end-to-end.",
      theme_color: "#4ade80",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      icons: [
        {
          src: "/pwa-icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      // 🔄 Runtime caching strategies
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
          },
        },
        {
          urlPattern: /^https:\/\/api\.unitrack\..*\/api\/.*/i,
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 5, // 5 minutes
            },
          },
        },
      ],
    },
  },

  // ⚙️ Vite build configuration
  vite: {
    plugins: [
      // 🔄 Auto-import for commonly used functions
      AutoImport({
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
              "NCard",
            ],
          },
        ],
        dts: true,
      }),
      // 🧩 Auto-import components
      Components({
        resolvers: [NaiveUiResolver()],
        dts: true,
      }),
    ],
    define: {
      // 🔧 Enable hydration mismatch details for debugging
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__:
        process.env.NODE_ENV === "development",
    },
  },

  // 🚀 Nitro server configuration
  nitro: {
    compressPublicAssets: true,
    minify: true,
    experimental: {
      wasm: true,
    },
    storage: {
      redis: {
        driver: "memory",
      },
    },
  },

  // 🧭 Router configuration
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  // 📦 Build transpilation
  build: {
    transpile: ["vueuc", "ol"],
  },

  // 📱 App configuration for better hydration
  app: {
    head: {
      viewport: "width=device-width,initial-scale=1",
      charset: "utf-8",
      meta: [
        {
          name: "description",
          content: "UniTrack - Modern Educational Management Platform",
        },
        {
          name: "keywords",
          content:
            "education, school, university, management, student, teacher, grades, analytics",
        },
        { name: "author", content: "UniTrack Team" },
        { property: "og:title", content: "UniTrack - Education Unified" },
        {
          property: "og:description",
          content:
            "Streamline educational processes with our comprehensive management platform",
        },
        { property: "og:type", content: "website" },
      ],
    },
    // ✨ Page transition to prevent flash during hydration
    pageTransition: { name: "page", mode: "out-in" },
  },

  // 🎨 Tailwind CSS configuration
  tailwindcss: {
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },

  // 🎯 Icon configuration
  icon: {
    clientBundle: {
      scan: {
        globInclude: ["components/**/*.vue"],
        globExclude: ["node_modules", "dist"],
      },
    },
  },

  // 🌍 Internationalization configuration
  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: [
      {
        code: "en",
        language: "en-US",
        name: "English",
        file: "en.json",
      },
      {
        code: "bg",
        language: "bg-BG",
        name: "Български",
        file: "bg.json",
      },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales",
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  // 🔧 Runtime configuration
  runtimeConfig: {
    public: {
      // 🌐 API configuration
      apiBaseURL:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:5086/api",
      socketURL: process.env.NUXT_PUBLIC_SOCKET_URL || "http://localhost:5086",

      // 🛠️ Development settings
      debug: process.env.NODE_ENV === "development",

      // 🎨 Theme configuration
      defaultTheme: process.env.NUXT_PUBLIC_DEFAULT_THEME || "light",
      primaryColor: process.env.NUXT_PUBLIC_PRIMARY_COLOR || "#4ade80",

      // 📊 Analytics (optional)
      googleAnalyticsId: process.env.NUXT_PUBLIC_GA_ID || "",

      // 🔐 Public keys (if any)
      publicVapidKey: process.env.NUXT_PUBLIC_VAPID_KEY || "",
    },
  },

  // ⚡ Experimental features
  experimental: {
    payloadExtraction: false,
    viewTransition: true,
  },

  // 🔧 Compatibility
  compatibilityDate: "2024-04-03",

  // 🛠️ Development tools
  devtools: { enabled: true },
});
```

---

## 🔐 Environment Variables Configuration

### `.env` (Development)

```bash
# 🌐 API Configuration
NUXT_PUBLIC_API_BASE_URL=http://localhost:5086/api
NUXT_PUBLIC_SOCKET_URL=http://localhost:5086


# 🛠️ Development Settings
NODE_ENV=development
NUXT_PUBLIC_DEBUG=true

```

### `.env.production` (Production)

```bash
# 🌐 Production API Configuration
NUXT_PUBLIC_API_BASE_URL=https://api.unitrack.yourdomain.com/api
NUXT_PUBLIC_SOCKET_URL=wss://api.unitrack.yourdomain.com

# 🛠️ Production Settings
NODE_ENV=production
NUXT_PUBLIC_DEBUG=false

```

---

## 🌍 Internationalization Setup

### `i18n.config.ts`

```typescript
export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: {
      welcome: "Welcome to UniTrack",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      students: "Students",
      teachers: "Teachers",
      courses: "Courses",
      grades: "Grades",
      attendance: "Attendance",
      reports: "Reports",
      settings: "Settings",
      logout: "Logout",
    },
    bg: {
      welcome: "Добре дошли в UniTrack",
      login: "Вход",
      register: "Регистрация",
      dashboard: "Табло",
      students: "Ученици",
      teachers: "Учители",
      courses: "Курсове",
      grades: "Оценки",
      attendance: "Посещаемост",
      reports: "Отчети",
      settings: "Настройки",
      logout: "Изход",
    },
  },
}));
```

### Language Files Structure

Create `locales/` directory with:

```
locales/
├── en.json     # English translations
└── bg.json     # Bulgarian translations
```

**`locales/en.json`:**

```json
{
  "nav": {
    "dashboard": "Dashboard",
    "students": "Students",
    "teachers": "Teachers",
    "courses": "Courses",
    "grades": "Grades",
    "attendance": "Attendance",
    "reports": "Reports",
    "settings": "Settings"
  },
  "auth": {
    "login": "Login",
    "register": "Register",
    "email": "Email",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "forgotPassword": "Forgot Password?",
    "loginButton": "Sign In",
    "registerButton": "Create Account"
  },
  "dashboard": {
    "title": "Dashboard",
    "welcomeMessage": "Welcome back, {name}!",
    "quickStats": "Quick Statistics",
    "recentActivity": "Recent Activity"
  }
}
```

---

## 🎨 Tailwind CSS Configuration

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],

  theme: {
    extend: {
      // 🎨 Custom color palette
      colors: {
        primary: {
          50: "#f0f9f0",
          100: "#dcf4dc",
          200: "#bce8bc",
          300: "#89d489",
          400: "#4ade80", // Main primary color
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      colors: {
        primary: {
          50: "#f0f9f0",
          100: "#dcf4dc",
          200: "#bce8bc",
          300: "#89d489",
          400: "#4ade80", // Main primary color
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        secondary: {
          50: "#faf5ff",
          100: "#f3e8ff",
        secondary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
        },
        accent: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },

      // 📏 Custom spacing
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },

      // 🔤 Custom fonts
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },

      // ✨ Custom animations
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },

      // 🖼️ Custom aspect ratios
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },
    },
  },

  // 🌙 Dark mode configuration
  darkMode: "class",

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
```

---

## 📁 Required Assets & Icons

### PWA Icons (Required)

Create the following files in `public/`:

```
public/
├── favicon.ico                    # Browser favicon
├── pwa-icon-192x192.png          # PWA icon (192x192)
├── pwa-icon-512x512.png          # PWA icon (512x512)
├── apple-touch-icon.png          # iOS home screen icon
└── manifest-icon-192.maskable.png # Maskable icon for PWA
```

**Icon Requirements:**

- **192x192**: Standard PWA icon
- **512x512**: High-res PWA icon (required)
- **Apple Touch Icon**: 180x180 for iOS
- **Maskable Icons**: For better PWA integration

### Generate Icons Script

```bash
# Use a tool like PWA Asset Generator
npx pwa-asset-generator public/logo.svg public --manifest public/manifest.json
```

---

## 🔄 Data Management Setup


## 🚀 Build & Deployment

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Lint code
npm run lint

```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site (if you decide to not use SSR)
npm run generate
```

---

```bash
NUXT_PUBLIC_VAPID_KEY=your_vapid_public_key
```

**Setup:**

1. Generate VAPID keys for push notifications
2. Configure service worker for notifications

---

## 🐛 Common Issues & Troubleshooting

### Hydration Mismatch Issues

```typescript
// In nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  experimental: {
    payloadExtraction: false,
  },
});
```

### API Connection Issues

```bash
# Check API base URL
echo $NUXT_PUBLIC_API_BASE_URL
```

### PWA Installation Issues

```bash
# Verify manifest.json
curl https://your-domain.com/manifest.json

# Check service worker
curl https://your-domain.com/sw.js
```

### Build Issues

```bash
# Clear Nuxt cache
rm -rf .nuxt .output node_modules/.cache

# Reinstall dependencies
npm ci

# Check for TypeScript errors
npm run typecheck
```

---

## ✅ Frontend Configuration Checklist

- [ ] `nuxt.config.ts` configured with all modules
- [ ] Environment variables set for all environments
- [ ] PWA icons generated and placed in public/
- [ ] Internationalization files created
- [ ] Tailwind CSS configured with custom theme
- [ ] API integration composables created
- [ ] Authentication store implemented
- [ ] Build process verified
- [ ] PWA functionality tested
- [ ] Performance optimizations applied
- [ ] Error handling implemented
- [ ] Accessibility features enabled

---

## 🎉 Deployment Verification

### Development Checklist

```bash
# ✅ Development server starts without errors
npm run dev

# ✅ All pages load correctly
curl http://localhost:3000

# ✅ API integration working
# Check browser network tab for API calls

# ✅ PWA features functional
# Test offline functionality
```

### Production Checklist

```bash
# ✅ Production build successful
npm run build

# ✅ PWA installable
# Check browser install prompt

# ✅ Performance scores good
# Run Lighthouse audit

# ✅ All environments configured
# Verify .env.production settings
```

**🎊 Congratulations!** Your UniTrack frontend is now fully configured and ready for deployment!
