# Fastor Mobile Food Ordering PWA

A mobile-first food ordering web application built to pixel-perfection based on Figma designs, integrating seamlessly with Fastor's staging APIs (`https://staging.fastor.ai`).

---

## 📱 Features & Implemented Screens

1. **Screen 1: Mobile Number Registration (`/signup`)**
   - Styled mobile UI with iOS/Android Status Bar.
   - Interactive country code selector defaulting to India (`+91`) with options for US, UK, Canada, Australia, Germany, UAE, and Singapore.
   - Phone number input with 10-digit validation.
   - Custom on-screen numerical keypad and terms & conditions acceptance.
   - Triggers `POST /v1/pwa/user/register` via URL-encoded payload.

2. **Screen 2: OTP Verification (`/otp`)**
   - 6-digit OTP individual input boxes with auto-focus and state tracking.
   - Displays the phone number and dial code from the signup step.
   - 30-second countdown timer with resend OTP option.
   - Custom on-screen keypad and keyboard integration.
   - Triggers `POST /v1/pwa/user/login` (default test OTP: `123456`) and securely persists the Bearer authentication token and user profile in `localStorage`.

3. **Screen 3: Home & Restaurant Catalog (`/home`)**
   - Protected route with `AuthGuard` ensuring authentication before access.
   - User location header with customizable delivery address and live cart counter badge.
   - Offer banner carousel with discounts (e.g., "Special Offer 25% Off").
   - **Best Sellers** horizontal food scroll list with distinct curated food photography, ratings, pricing, and category tags.
   - **Popular Items** vertical list populated dynamically from `GET /v1/m/restaurant` with automatic fallbacks to distinct imagery and metadata.
   - Defensive rendering guards (`safeString`, `formatErrorMessage`) preventing React child crashes from nested API object responses.

4. **Screen 4: Item Detail & Cart Management (`/item/[id]`)**
   - High-resolution hero image with back navigation.
   - Item title, description, and base pricing.
   - Quantity increment/decrement selector with reactive price calculations.
   - Personal portion size selection (e.g., Small, Medium, Large, Jumbo) with real-time add-on price calculations.
   - Global reactive Cart Provider (`useCart`) allowing users to add items, display toast confirmations, and manage cart item quantities.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: TypeScript with strict typing
- **Styling**: Tailwind CSS & Tailwind Merge
- **UI Components**: Radix UI primitives & shadcn/ui design patterns (`Button`, `Card`, `Badge`, `Input`, `RadioGroup`)
- **Icons**: Lucide React
- **API Client**: Axios with automatic Bearer Token interceptor and URL-encoded serialization
- **State Management**: React Context API (`CartContext`) + `localStorage` for session persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd d:\Home
   ```

2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser (preferably with mobile device view enabled in developer tools).

4. Build for production:
   ```bash
   npm run build
   ```

5. Start the production server:
   ```bash
   npm run start
   ```

---

## ⚙️ Environment Variables

The project includes pre-configured environment settings in `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://staging.fastor.ai
```

---

## 🔒 Staging API Endpoints

- **Register**: `POST https://staging.fastor.ai/v1/pwa/user/register` (`phone`, `dial_code`)
- **Login / Verify OTP**: `POST https://staging.fastor.ai/v1/pwa/user/login` (`phone`, `otp=123456`, `dial_code`)
- **Restaurants List**: `GET https://staging.fastor.ai/v1/m/restaurant?m_id=1196` (Requires `Authorization: Bearer <token>`)
