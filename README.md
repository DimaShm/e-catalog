# E-Catalog

Product catalog application with React frontend and Laravel backend. Features bilingual support (English/Ukrainian), custom UI components, and comprehensive filtering system.

## Tech Stack

**Backend:**
- Laravel 12
- PHP 8.3
- MySQL 8.0
- Docker + Nginx
- Form Request validation
- Business logic in models with DI

**Frontend:**
- React 18 with TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- React Hook Form + Zod (validation)
- React Router
- i18next (internationalization)

## Features

### Internationalization
- **English/Ukrainian** language support
- Dynamic language switching
- Laravel localization for validation messages
- Accept-Language header support

### Page 1: Add Product
- Product creation form with validation
- Custom dropdown components (replace native selects)
- Fields: name, description, category, price, rating
- Real-time validation with Zod
- Toast notifications with translations
- Input restrictions (no negative values)
- Standardized button placement (Cancel left, Save right)

### Page 2: Product Catalog
- Responsive grid layout with product cards
- Advanced filters panel:
  - **Search** (debounced 500ms)
  - **Category filter** (with "All" option)
  - **Price range** (min/max)
  - **Rating filter** (0-5 scale)
  - **Show only favorites** toggle
- Pagination with page numbers
- Session-based favorites system
- Mobile-friendly design with hamburger menu

## Setup

### Quick Start with Make

```bash
  # Initialize project
make init
```

### Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api

Database is seeded with:
- 6 categories (Electronics, Clothing, Books, Home & Garden, Sports, Toys)
- 18 sample products

### Docker Services

- `ecatalog_frontend` - React dev server (Node 20, Vite)
- `ecatalog_nginx` - Web server (Nginx)
- `ecatalog_app` - PHP-FPM (PHP 8.3)
- `ecatalog_db` - MySQL 8.0

## API Endpoints

### Categories
- `GET /api/categories` - List all categories

### Products
- `GET /api/products` - List products with filters
  - Query params: `category_id`, `min_price`, `max_price`, `rating`, `search`, `favorites_only`, `per_page`, `page`
  - Response includes `is_favorite` flag based on session
- `POST /api/products` - Create product (Request: StoreProductRequest)

### Favorites
- `POST /api/favorites/toggle` - Toggle favorite status (Request: ToggleFavoriteRequest)
  - Returns: `{ "is_favorite": boolean }`

## Project Structure

```
e-catalog/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/    # API controllers with DI
│   │   │   ├── Requests/          # Form Request validation classes
│   │   │   └── Middleware/        # SetLocale middleware
│   │   └── Models/                # Eloquent models with business logic
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── lang/                      # Backend translations (en, uk)
│   │   ├── en/validation.php
│   │   └── uk/validation.php
│   └── routes/api.php
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── products/         # Product feature module
│   │   │   │   ├── api/          # API client
│   │   │   │   ├── components/   # ProductCard, ProductList, etc.
│   │   │   │   ├── hooks/        # Custom hooks
│   │   │   │   ├── schemas/      # Zod validation schemas
│   │   │   │   └── store/        # Zustand slices
│   │   │   ├── categories/       # Category feature module
│   │   │   └── favorites/        # Favorites feature module
│   │   ├── shared/
│   │   │   └── components/ui/    # Reusable UI (Button, Dropdown, etc.)
│   │   ├── i18n/                 # Frontend translations
│   │   │   └── locales/
│   │   │       ├── en/translation.json
│   │   │       └── uk/translation.json
│   │   ├── pages/                # Page components
│   │   ├── store/                # Global store setup
│   │   └── types/                # TypeScript types
│   └── vite.config.ts
├── docker/                       # Docker configuration files
├── Makefile                      # Project automation commands
└── docker-compose.yml
```