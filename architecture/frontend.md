# UniTrackRemaster - Nuxt Frontend Architecture

## **🎯 Frontend Architecture Overview**

```mermaid
graph TB
    subgraph "User Interface Layer"
        BROWSER[Web Browser]
        MOBILE_WEB[Mobile Browser]
    end

    subgraph "Nuxt 3 Application"
        subgraph "Presentation Layer"
            PAGES[Pages - File-based Routing]
            LAYOUTS[Layouts - Page Templates]
            COMPONENTS[Components - Reusable UI]
        end

        subgraph "Logic Layer"
            COMPOSABLES[Composables - Business Logic]
            STORES[Stores - State Management]
            MIDDLEWARE[Middleware - Route Guards]
        end

        subgraph "Data Layer"
            SERVER[Server API Routes]
            PLUGINS[Plugins - App Extensions]
            UTILS[Utils - Helper Functions]
        end

        subgraph "Configuration"
            INTERFACES[TypeScript Interfaces]
            ENUMS[Enums - Constants]
            SCHEMAS[Schemas - Validation]
        end
    end

    subgraph "Build System"
        VITE[Vite - Build Tool]
        NITRO[Nitro - Server Engine]
        TAILWIND[Tailwind CSS]
    end

    subgraph "External Services"
        API_BACKEND[Backend API]
        CDN[CDN/Assets]
        AUTH_SERVICE[Authentication]
    end

    BROWSER --> PAGES
    MOBILE_WEB --> PAGES

    PAGES --> LAYOUTS
    LAYOUTS --> COMPONENTS
    PAGES --> COMPOSABLES
    COMPOSABLES --> STORES
    PAGES --> MIDDLEWARE

    COMPOSABLES --> SERVER
    COMPOSABLES --> UTILS
    SERVER --> PLUGINS

    COMPONENTS --> INTERFACES
    COMPOSABLES --> ENUMS
    SERVER --> SCHEMAS

    VITE --> PAGES
    NITRO --> SERVER
    TAILWIND --> COMPONENTS

    SERVER --> API_BACKEND
    COMPONENTS --> CDN
    MIDDLEWARE --> AUTH_SERVICE
```

---

## **📁 Folder Structure & Responsibilities**

```mermaid
mindmap
  root((Nuxt Frontend))
    (Presentation)
      pages
        File-based routing
        Vue SFC pages
        Route parameters
      layouts
        Default layout
        Custom layouts
        Nested layouts
      components
        Reusable UI components
        Auto-imported
        Atomic design
    (Business Logic)
      composables
        Shared reactive logic
        API calls
        Custom hooks
      stores
        Pinia state management
        Global state
        Persistent data
      middleware
        Route guards
        Authentication checks
        Role-based access
    (Data & Config)
      server
        API routes
        Server-side logic
        Middleware
      interfaces
        TypeScript types
        API contracts
        Component props
      enums
        Constants
        Status codes
        User roles
      schemas
        Validation rules
        Form schemas
        API validation
    (Assets & Utils)
      assets
        SCSS/CSS files
        Images
        Fonts
      public
        Static files
        Favicons
        Robots.txt
      utils
        Helper functions
        Formatters
        Validators
    (Configuration)
      plugins
        Vue plugins
        Third-party integrations
        Global components
      node_modules
        Dependencies
        Nuxt modules
        Vue ecosystem
```

---

## **🔄 Nuxt 3 Architecture Patterns**

```mermaid
graph LR
    subgraph "Auto-Import System"
        AUTO_COMP[Auto Components]
        AUTO_COMP_SRC[Auto Composables]
        AUTO_UTILS[Auto Utils]
    end

    subgraph "File-Based Routing"
        PAGES_DIR[pages/]
        DYNAMIC[Dynamic Routes]
        NESTED[Nested Routes]
        CATCH_ALL[Catch-all Routes]
    end

    subgraph "Server-Side Rendering"
        SSR[Universal Rendering]
        SPA[SPA Mode]
        STATIC[Static Generation]
        HYBRID[Hybrid Rendering]
    end

    subgraph "Development Experience"
        HMR[Hot Module Reload]
        DEVTOOLS[Vue DevTools]
        TYPE_SAFE[TypeScript]
        AUTO_IMPORT[Auto Imports]
    end

    AUTO_COMP --> PAGES_DIR
    AUTO_COMP_SRC --> SSR
    AUTO_UTILS --> HYBRID

    PAGES_DIR --> SSR
    DYNAMIC --> SPA
    NESTED --> STATIC

    HMR --> AUTO_IMPORT
    DEVTOOLS --> TYPE_SAFE
```

**Key Nuxt 3 Features Utilized:**

- 🚀 **Auto-imports** - Components, composables, and utils
- 📁 **File-based routing** - Automatic route generation
- 🔄 **Universal rendering** - SSR/SPA/Static hybrid
- 🎯 **Server API routes** - Full-stack in one project
- 📦 **Module ecosystem** - Tailwind, Pinia, etc.

---

## **🏗️ Component Architecture**

```mermaid
classDiagram
    class BaseLayout {
        +Header
        +Navigation
        +Main Content
        +Footer
        +Auth Status
    }

    class PageComponents {
        +Dashboard
        +StudentList
        +TeacherProfile
        +Analytics
        +Settings
    }

    class UIComponents {
        +Button
        +Modal
        +DataTable
        +Forms
        +Charts
    }

    class Composables {
        +useAuth()
        +useApi()
        +useNotifications()
        +useValidation()
        +usePermissions()
    }

    class Stores {
        +authStore
        +userStore
        +settingsStore
        +notificationStore
    }

    BaseLayout --> PageComponents
    PageComponents --> UIComponents
    PageComponents --> Composables
    Composables --> Stores

    class TypeScript {
        +interfaces/
        +enums/
        +schemas/
    }

    UIComponents --> TypeScript
    Composables --> TypeScript
    Stores --> TypeScript
```

---

## **📊 Data Flow Architecture**

```mermaid
sequenceDiagram
    participant U as User
    participant P as Page
    participant C as Composable
    participant S as Store
    participant API as Server Route
    participant BE as Backend API

    U->>P: User Interaction
    P->>C: Call Composable
    C->>S: Check Store State

    alt Data exists in store
        S-->>C: Return cached data
        C-->>P: Reactive data
        P-->>U: Update UI
    else Need fresh data
        C->>API: Server route call
        API->>BE: HTTP request
        BE-->>API: JSON response
        API-->>C: Processed data
        C->>S: Update store
        S-->>P: Reactive update
        P-->>U: Updated UI
    end
```

---

## **🛠️ Development Stack**

```mermaid
graph TD
    subgraph "Core Framework"
        NUXT[Nuxt 3]
        VUE[Vue 3]
        TYPESCRIPT[TypeScript]
    end

    subgraph "Styling"
        TAILWIND_CSS[Tailwind CSS]
        SCSS[SCSS/Sass]
        CSS_VARS[CSS Variables]
    end

    subgraph "State & Logic"
        PINIA[Pinia Store]
        COMPOSABLES_VUE[Vue Composables]
        VUE_ROUTER[Vue Router]
    end

    subgraph "Build & Tools"
        VITE_BUILD[Vite]
        NITRO_SERVER[Nitro]
        ESM[ES Modules]
    end

    subgraph "Development"
        HMR_DEV[Hot Reload]
        DEVTOOLS_VUE[Vue DevTools]
        TYPESCRIPT_CHECK[Type Checking]
    end

    NUXT --> VUE
    NUXT --> TYPESCRIPT
    VUE --> PINIA
    VUE --> COMPOSABLES_VUE
    NUXT --> TAILWIND_CSS
    NUXT --> VITE_BUILD
    VITE_BUILD --> NITRO_SERVER
```

---

## **🔧 Configuration & Setup**

| File                 | Purpose      | Key Features                          |
| -------------------- | ------------ | ------------------------------------- |
| `nuxt.config.ts`     | Main config  | Modules, build settings, auto-imports |
| `tailwind.config.js` | Styling      | Custom theme, responsive design       |
| `tsconfig.json`      | TypeScript   | Strict typing, path mapping           |
| `package.json`       | Dependencies | Scripts, dev dependencies             |
| `.env`               | Environment  | API URLs, secrets                     |

---

## **📱 Responsive Design Strategy**

```mermaid
graph LR
    subgraph "Breakpoints"
        MOBILE[Mobile: <768px]
        TABLET[Tablet: 768px-1024px]
        DESKTOP[Desktop: >1024px]
    end

    subgraph "Components"
        RESPONSIVE[Responsive Components]
        MOBILE_FIRST[Mobile-First Design]
        ADAPTIVE[Adaptive Layouts]
    end

    subgraph "Tailwind Classes"
        SM[sm: prefix]
        MD[md: prefix]
        LG[lg: prefix]
        XL[xl: prefix]
    end

    MOBILE --> RESPONSIVE
    TABLET --> MOBILE_FIRST
    DESKTOP --> ADAPTIVE

    RESPONSIVE --> SM
    MOBILE_FIRST --> MD
    ADAPTIVE --> LG
    ADAPTIVE --> XL
```