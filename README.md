# MMR Railway — Online Ticket Booking (Frontend)

A modern, responsive **Myanmar Railways** ticket booking demo built with **React**, **TypeScript**, **Tailwind CSS**, and **Lucide React**. The full multi-step flow runs on **mock data** and **React Context** so you can swap in real API endpoints later.

## Features

- **Home / Search** — From/To stations, departure date, passenger count
- **Train results** — Filtered schedules with Upper Class & Ordinary Class pricing
- **Seat selection** — Interactive coach grid (available / selected / booked)
- **Passenger details** — Name & NRC validation
- **Mock checkout** — KBZPay or MMQR with simulated payment
- **E-ticket confirmation** — Booking reference + generated QR code

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Lucide React icons
- React Context for booking state (no backend required)

## Getting started

```bash
cd ~/Projects/mmr-railway-booking
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Project structure

```
src/
  context/BookingContext.tsx   # Global booking state & step navigation
  data/mockData.ts             # Stations, trains, seat generation
  components/                  # UI by flow step
  types/                       # Shared TypeScript types
```

## Plugging in a real API

Replace `searchTrains()` and `generateCoachSeats()` in `src/data/mockData.ts` with fetch calls, and persist bookings via your backend. The context actions (`setSearchQuery`, `selectTrain`, `toggleSeat`, `processPayment`) are the natural integration points.

## Build

```bash
npm run build
npm run preview
```
