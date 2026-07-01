# VeloNexus — Smart Vehicle Tracking, Fuel, Garage & Insurance Management Platform

![React](https://img.shields.io/badge/React-Frontend-blue)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-purple)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)
![Status](https://img.shields.io/badge/Status-Live-success)

## Live Project

**Live Website:**  
https://velonexus-smart-vehicle-management.vercel.app/

## Repository Description

VeloNexus is a smart all-in-one vehicle management web application for vehicle owners, drivers, petrol pump owners, garage owners, and administrators. It includes vehicle records, fuel tracking, mileage calculation, service history, insurance monitoring, location tracking, and dashboard analytics.


## Project Overview

**VeloNexus** is a modern vehicle tracking and management platform built as a portfolio-ready web application using **React** and **Vite**.

The goal of this project is to provide a single platform where users can manage vehicles, track fuel fill-ups, calculate mileage, save service records, monitor insurance expiry, register petrol pumps and garages, and store vehicle location history using Google Maps links.

This project is designed for:

- Vehicle owners
- Bike owners
- Drivers
- Petrol pump owners
- Garage and service-center owners
- Platform administrators
- Fleet and vehicle management use cases

The current version is an MVP using browser local storage for fast testing and public demonstration. The architecture can be upgraded later with Firebase Authentication, Firestore database, Firebase Storage, real-time tracking, and mobile app support.

## Key Features

| No. | Feature | Description | Included Details |
|---|---|---|---|
| **1** | **User Authentication** | Provides account access for different types of users. | Login system, registration system, role selection during registration, persistent login session using local storage, demo admin account |
| **2** | **Role-Based Dashboard** | Displays a customized platform overview after login. | Total vehicles, total fuel cost, average mileage, insurance expiry alerts, recent fuel logs, upcoming service records, vehicle summary |
| **3** | **Vehicle Management** | Allows users to add and manage different vehicle types. | Car, bike, truck, bus, vehicle name, vehicle type, plate number, brand, model, year, fuel type, current odometer reading |
| **4** | **Fuel Log Management** | Stores fuel fill-up records for each vehicle. | Vehicle selection, fuel filled in liters, price per liter, total fuel cost, current odometer reading, petrol pump name, fuel entry date |
| **5** | **Mileage Finder** | Automatically calculates mileage after at least two fuel logs are added for a vehicle. | Mileage formula: `Mileage = Distance Travelled / Fuel Filled`. Example: `270 km / 18 liters = 15 km/L`. Useful for car mileage tracking, bike mileage tracking, fuel cost analysis, and vehicle performance monitoring |
| **6** | **Vehicle Location Tracking** | Uses the browser Geolocation API to save and track vehicle location. | Select vehicle, save current location, store latitude and longitude, view location history, open saved location directly in Google Maps |
| **7** | **Garage and Service Management** | Helps users save and manage garage and service records. | Vehicle, garage name, service type, service cost, next service date, service notes, repair history, maintenance cost |
| **8** | **Insurance Management** | Stores and monitors vehicle insurance details. | Vehicle, insurance provider, policy number, expiry date, premium amount, expiry alerts |
| **9** | **Petrol Pump Directory** | Allows petrol pump owners or users to add petrol pump profiles. | Pump name, area, fuel price per liter, phone number, latitude, longitude, Google Maps location link |
| **10** | **Garage and Service Center Directory** | Allows garage owners or users to add garage/service-center profiles. | Garage name, area, service type, phone number, latitude, longitude, Google Maps location link |
| **11** | **Admin Panel** | Provides a platform-level overview for administrators. | Total users, total vehicles, total fuel logs, total petrol pumps, registered users, user roles, demo admin account |

## Supported User Roles

| Role | Purpose |
|---|---|
| **Vehicle Owner** | Can manage personal vehicles, fuel logs, mileage, service records, insurance, and tracking. |
| **Driver** | Can use the platform for vehicle usage, location tracking, and related records. |
| **Petrol Pump Owner** | Can register petrol pump information and appear in the pump directory. |
| **Garage Owner** | Can register garage/service-center information and appear in the garage directory. |
| **Admin** | Can view platform overview, users, roles, vehicles, fuel logs, and system statistics. |

## Demo Admin Account

| Field | Value |
|---|---|
| **Email** | `admin@velonexus.app` |
| **Password** | `admin123` |

## Mileage Calculation Example

| Item | Value |
|---|---|
| **Previous Odometer** | `10000 km` |
| **Current Odometer** | `10270 km` |
| **Fuel Filled** | `18 liters` |
| **Distance Travelled** | `10270 - 10000 = 270 km` |
| **Mileage Formula** | `Mileage = Distance Travelled / Fuel Filled` |
| **Final Mileage** | `270 / 18 = 15 km/L` |

## Tech Stack

| Category | Technologies / Tools | Purpose |
|---|---|---|
| **Frontend** | React, Vite, JavaScript, CSS3 | Used to build the user interface, app structure, pages, dashboard, and styling |
| **UI and Icons** | Lucide React Icons, responsive dashboard layout, modern card-based interface, mobile-friendly design | Used to create a professional and responsive visual experience |
| **Browser APIs** | Local Storage API, Browser Geolocation API | Used for MVP data persistence and browser-based location tracking |
| **Map Support** | Google Maps location links | Used to open saved vehicle, petrol pump, and garage locations in Google Maps |
| **Deployment** | GitHub, Vercel | GitHub stores the project code, and Vercel hosts the live public website |


## Live Demo

Open the live website:

```text
https://velonexus-smart-vehicle-management.vercel.app/
```

Use demo admin login:

```text
Email: admin@velonexus.app
Password: admin123
```

Or create a new account from the registration page.


## Screenshots

### Login Page

<img width="2932" height="1684" alt="image" src="https://github.com/user-attachments/assets/1de4e8ec-df60-4618-a9d2-c4c4444d7a08" />


### Dashboard

<img width="2934" height="1680" alt="image" src="https://github.com/user-attachments/assets/701f8844-cac3-4fa4-a446-d23d664762df" />


### Vehicle Management

<img width="2932" height="1682" alt="image" src="https://github.com/user-attachments/assets/32b7c757-b9de-435c-84e2-3429ceae3a93" />


### Fuel and Mileage Finder

<img width="2932" height="1680" alt="image" src="https://github.com/user-attachments/assets/ddc7c790-f3e2-44f4-a10c-4ab720e24370" />

### Garage and Insurance Modules

<img width="2936" height="1684" alt="image" src="https://github.com/user-attachments/assets/437aaa7b-6f3d-453d-b937-edf5557f62fb" />
<img width="2936" height="1676" alt="image" src="https://github.com/user-attachments/assets/4cc52a51-9eb3-4053-9c0d-13dd638cd174" />


### Vehicle Tracking

<img width="2934" height="1684" alt="image" src="https://github.com/user-attachments/assets/1cba20f4-4f52-4ec0-b4d6-f839fe660bef" />



## Installation and Local Setup

Clone the repository:

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/velonexus-smart-vehicle-management.git
```

Go to the project folder:

```bash
cd velonexus-smart-vehicle-management
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open in browser:

```text
http://localhost:5173/
```

---

## Production Build

To create a production build:

```bash
npm run build
```

The production-ready files will be generated inside the `dist` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## Deployment

This project is deployed using **Vercel**.

Deployment settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Live deployment link:

```text
https://velonexus-smart-vehicle-management.vercel.app/
```

## Project Structure

```text
velonexus-smart-vehicle-management/
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Main Modules

| Module | Purpose | Features |
|---|---|---|
| **Authentication Module** | Handles user access and account entry. | Login, registration, role selection, session persistence |
| **Dashboard Module** | Shows the main overview of the platform. | Vehicle count, fuel cost, average mileage, insurance alerts, recent records |
| **Vehicle Module** | Manages user vehicles. | Add vehicle, view vehicle details, vehicle summary, mileage overview |
| **Fuel Module** | Manages fuel records and mileage calculation. | Fuel fill-up entry, fuel cost calculation, mileage calculation, fuel history |
| **Tracking Module** | Handles vehicle location tracking. | Browser GPS location saving, location history, Google Maps redirection |
| **Garage Module** | Manages service and garage records. | Service records, garage information, maintenance history, next service date |
| **Insurance Module** | Tracks insurance information and expiry status. | Insurance provider records, policy number, premium, expiry alerts |
| **Directory Module** | Lists petrol pumps and garage/service centers. | Petrol pump listing, garage listing, map links, contact information |
| **Admin Module** | Provides platform-level management overview. | Platform overview, user list, role overview, system statistics |

## Future Improvements

Planned future upgrades:

- Firebase Authentication
- Firebase Firestore database
- Firebase Storage for documents and images
- Cloud-based user data
- Real-time vehicle location tracking
- Embedded Google Maps
- Nearby garage and petrol pump search
- Fuel price comparison system
- Insurance renewal notification
- Service booking system
- Admin approval system
- Mobile app using React Native
- GPS hardware and IoT integration
- Fleet management dashboard
- PDF report generation
- Email notification system
- Payment gateway for services


## Why This Project Is Useful

VeloNexus solves a real-world problem by combining multiple vehicle-related services into one platform.

Instead of using separate apps or manual notes for fuel, mileage, garage servicing, insurance, and tracking, users can manage everything from one dashboard.

This makes the project useful for:

- Personal vehicle owners
- Bike riders
- Car owners
- Drivers
- Small fleet owners
- Petrol pump owners
- Garage owners
- Vehicle service businesses


## License

This project is open-source and available for educational and demonstration purposes.

---

<div align="center">

## 👨‍💻 Author

<p>
  Developer of <strong>VeloNexus — Smart Vehicle Tracking, Fuel, Garage & Insurance Management Platform</strong>
</p>

<p>
  A professional project built to demonstrate modern web application development, vehicle management workflow design, mileage calculation, dashboard UI implementation, browser-based location tracking and public deployment using GitHub and Vercel.
</p>

<br />

### 🌐 Connect With Me

<p>
  <a href="https://linkedin.com/in/addin-alt-" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/LinkedIn-Addin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>

  <a href="https://github.com/addin-alt" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/GitHub-addin--alt-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>

  <a href="https://facebook.com/addin.alt" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Facebook-addin.alt-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook" />
  </a>

  <a href="https://www.instagram.com/addin_alt/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Instagram-addin__alt-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" />
  </a>

  <a href="mailto:info.addincse@gmail.com" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Email-Contact%20Me-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

<br />

<p>
  ⭐ If you like this project, consider giving it a star on GitHub.
</p>

</div>
