# MMR Railway - Online Ticket Booking

A responsive Myanmar Railways ticket booking experience built with React, TypeScript, Tailwind CSS, and Lucide React.

## Features

- Search routes by departure station, arrival station, date, and passenger count
- Browse train schedules with Upper Class and Ordinary Class fares
- Choose seats from an interactive coach layout
- Register a user profile with name, phone number, and NRC details
- Reuse signed-in profile details for the primary passenger during booking
- Verify and save NRC details to the user profile
- Add passenger details for additional travelers
- Select KBZPay, CB Pay, or MMQR at checkout
- Receive an e-ticket with a booking reference and QR code
- Find saved tickets from the home page using the booking reference
- View profile details and ticket history from the account page
- Print confirmed e-tickets

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React
- React Context

## Getting Started

```bash
git clone <your-repository-url>
cd mmr-railway-booking
npm install
npm run dev
```

Open the local URL shown in the terminal, typically `http://localhost:5173`.

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Project Structure

```text
src/
  components/
    account/          # Registration and profile pages
    confirmation/     # E-ticket confirmation and QR code
    layout/           # Header, footer, and booking progress
    passenger/        # Passenger details
    payment/          # Payment selection and countdown
    results/          # Train search results
    search/           # Route search form
    seats/            # Coach seat selection
    verification/     # NRC verification
  context/            # Booking and user profile state
  data/               # Stations, schedules, fares, and seat layout
  types/              # Shared TypeScript types
  utils/              # Date, NRC, ticket, and user storage helpers
```

## Build

```bash
npm run build
npm run preview
```
