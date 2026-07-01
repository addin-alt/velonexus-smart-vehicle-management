# VeloNexus — Smart Vehicle Tracking, Fuel, Garage & Insurance Management Platform

VeloNexus is an all-in-one vehicle management web application for vehicle owners, drivers, petrol pump owners, garage owners, and administrators.

It helps users manage vehicles, track fuel fill-ups, calculate mileage, record garage services, monitor insurance expiry, and save vehicle location history using Google Maps links.

## Features

### User System
- Login and registration
- Role-based access
- Vehicle Owner, Driver, Petrol Pump Owner, Garage Owner, and Admin roles
- Demo admin account

### Vehicle Management
- Add car, bike, truck, or bus
- Store plate number, brand, model, year, fuel type, and odometer
- View vehicle summary from dashboard

### Fuel and Mileage Finder
- Add fuel fill-up records
- Store fuel amount, fuel price, total cost, odometer reading, pump name, and date
- Automatically calculate mileage

Formula:

```text
Mileage = Distance Travelled / Fuel Filled
Example:

270 km / 18 liters = 15 km/L

**Vehicle Tracking**
Save current browser location
Store tracking history
Open saved location in Google Maps
Garage and Service Management
Add garage service records
Store service type, garage name, cost, next service date, and notes

**Insurance Management**
Store insurance provider, policy number, premium, and expiry date
Highlight insurance records close to expiry
Petrol Pump and Garage Directory
Add petrol pump profiles
Add garage/service-center profiles
Store area, contact number, f# VeloNexus — Smart Vehicle Tracking, Fuel, Garage & Insurance Management Platform

![VeloNexus Banner](./screenshots/banner.png)

**VeloNexus** is an all-in-one vehicle management web application designed for **vehicle owners, drivers, petrol pump owners, garage owners, and administrators**.

It helps users manage vehicles, track fuel fill-ups, calculate mileage, record garage services, monitor insurance expiry, and save vehicle location history using Google Maps links.

---

## Screenshot Preview

> Add your project screenshots inside a folder named `screenshots` and replace the placeholder images below.

### Home / Landing Page

![Home Page Screenshot](./screenshots/home-page.png)

### Dashboard

![Dashboard Screenshot](./screenshots/dashboard.png)

### Vehicle Management

![Vehicle Management Screenshot](./screenshots/vehicle-management.png)

### Fuel & Mileage Finder

![Fuel Mileage Screenshot](./screenshots/fuel-mileage.png)

### Vehicle Tracking

![Vehicle Tracking Screenshot](./screenshots/vehicle-tracking.png)

### Garage & Service Management

![Garage Service Screenshot](./screenshots/garage-service.png)

### Insurance Management

![Insurance Management Screenshot](./screenshots/insurance-management.png)

### Admin Dashboard

![Admin Dashboard Screenshot](./screenshots/admin-dashboard.png)

---

## Features

### User System

- User login and registration
- Role-based access control
- Supported roles:
  - Vehicle Owner
  - Driver
  - Petrol Pump Owner
  - Garage Owner
  - Admin
- Demo admin account included

---

### Vehicle Management

Users can add and manage different types of vehicles.

Supported vehicle types:

- Car
- Bike
- Truck
- Bus

Vehicle details include:

- Plate number
- Brand
- Model
- Year
- Fuel type
- Odometer reading

Users can also view vehicle summaries directly from the dashboard.

---

### Fuel and Mileage Finder

Users can add fuel fill-up records and calculate mileage automatically.

Fuel record details include:

- Fuel amount
- Fuel price
- Total cost
- Odometer reading
- Petrol pump name
- Date

#### Mileage Formula

```text
Mileage = Distance Travelled / Fuel Filleduel price, service type, latitude, and longitude
Open locations in Google Maps

**Admin Dashboard**
View total users
View total vehicles
View total fuel logs
View registered petrol pumps
View registered user roles

Tech Stack
React
Vite
JavaScript
CSS3
Lucide React Icons
Browser Geolocation API
Google Maps location links
Local Storage for MVP data persistence
Demo Admin Login
Email: admin@velonexus.app
Password: admin123
How to Run Locally
npm install
npm run dev

Open:

http://localhost:5173/
Build for Production
npm run build
**Future Improvements**
Firebase Authentication
Firebase Firestore database
Real-time vehicle tracking
Google Maps embedded map view
Service-center booking
Insurance renewal reminders
Fuel price comparison
Mobile app version
GPS hardware integration

**How to Run Locally**

Follow these steps to run the project on your local machine.

1. Clone the Repository
git clone https://github.com/your-username/velonexus-smart-vehicle-management.git
2. Go to the Project Folder
cd velonexus-smart-vehicle-management
3. Install Dependencies
npm install
4. Start Development Server
npm run dev
5. Open in Browser

Open the local development URL:

http://localhost:5173/
Build for Production

To create a production-ready build, run:

npm run build

The build files will be generated inside the dist folder.

Project Structure
velonexus-smart-vehicle-management/
│
├── public/
│
├── screenshots/
│   ├── banner.png
│   ├── home-page.png
│   ├── dashboard.png
│   ├── vehicle-management.png
│   ├── fuel-mileage.png
│   ├── vehicle-tracking.png
│   ├── garage-service.png
│   ├── insurance-management.png
│   └── admin-dashboard.png
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md