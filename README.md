# the weather (app) 🌦️

Welcome to **the weather**, a dynamic and user-friendly weather application that allows users to search for cities, view current and forecasted weather conditions, and manage their favorite cities with personalized nicknames. This application combines backend functionality with a modern React-based frontend to deliver real-time weather updates and a customizable user experience.

---

## Features 🛠️

### User Authentication
- **Login and Signup**: Secure authentication with session-based management.
- **Logout**: Simple and secure user session termination.

### Weather Search and Forecast
- Search for weather data by city name.
- Display current weather conditions and a 7-day forecast.
- Beautiful weather icons powered by the [Weather Icons library](https://github.com/erikflowers/weather-icons).

### Favorites Management
- **Save Favorites**: Users can favorite cities and assign nicknames to them.
- **Edit Favorites**: Update nicknames directly from the favorites page.
- **Dynamic Updates**: Favorites and nicknames update seamlessly in real time.

### Backend API
- Robust Flask RESTful API with the following resources:
  - `/favorites`: Manage favorite cities.
  - `/users/<int:user_id>/favorites`: Retrieve and manage user-specific favorites.
  - `/cities`: Static list of supported cities.
  - Authentication endpoints for user management.

---

## Technologies Used 💻

### Frontend
- **React**: Component-based architecture for a responsive and interactive UI.
- **React Router**: Seamless navigation between pages.
- **Formik & Yup**: Simplified forms and validation.
- **CSS Modules**: Modular and reusable styles.
- **Toast Notifications**: User-friendly feedback for actions.

### Backend
- **Flask**: RESTful API development.
- **SQLAlchemy**: ORM for database management.
- **SQLite**: Lightweight relational database for local development.
- **Flask-RESTful**: Simplified RESTful endpoint creation.
- **bcrypt**: Secure password hashing.

### External APIs
- **Open-Meteo**: Fetch accurate and up-to-date weather data.
- **Geocoding API**: Map city names to coordinates.

---

## Getting Started 🚀

### Prerequisites
- Node.js and npm
- Python 3.8+
- Virtual environment manager (e.g., `venv`)

### Installation

#### Backend Setup
1. Fork & Clone the repository: 
   ```bash
   Project: https://github.com/ldv432/the-weather-phase-4
   git clone https://github.com/your-repo/the-weather-phase-4.git
   cd the-weather-app/server
   ```
2. Create and activate a virtual environment:
   ```bash
   pipenv install && pipenv shell
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Initialize/seed the database:
   ```bash
   flask db init
   flask db migrate -m "Your Message Here"
   flask db upgrade head
   python seed.py #To seed the database
   ```
5. Run the backend server:
   ```bash
   flask run or python app.py
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd the-weather-phase-4/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## Project Structure 📁

```project-root/
├── client/                     # Frontend application
│   ├── node_modules/           # Dependencies for React
│   ├── public/                 # Static files for React
│   ├── src/                    # Source code for React app
│   │   ├── components/         # React components
│   │   ├── styles/             # CSS and styling files
│   │   ├── index.css           # Global styles
│   │   ├── index.js            # React entry point
│   ├── package-lock.json       # Lockfile for dependencies
│   ├── package.json            # Project metadata and dependencies
│   └── README.md               # Documentation for the client
├── server/                     # Backend application
│   ├── instance/               # Flask instance configuration
│   ├── migrations/             # Database migrations (Alembic)
│   ├── models/                 # SQLAlchemy models
│   ├── routes/                 # API routes
│   ├── .env                    # Environment variables
│   ├── app.py                  # Entry point for Flask app
│   ├── config.py               # Configuration settings for Flask
│   ├── seed.py                 # Data seeding script
└── README.md                   # Project-wide documentation
```

---

## Usage 🛠️

### User Actions
1. **Search for Weather**:
   - Navigate to the weather page and search for any city.
   - View the current weather and a detailed 7-day forecast.

2. **Manage Favorites**:
   - Click the heart icon to favorite a city.
   - Navigate to the favorites page to view or edit your favorite cities.

3. **Login and Signup**:
   - Securely log in to manage your personalized data.
   - Sign up for new accounts.

---

## Future Improvements 🌟
- Email subscription updates
- Current weather alerts (for chosen city) on weather page
- A blog section for users across the country to discuss US weather
- Mobile app support?

---

## License 📝
This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

## Acknowledgments 🙌
- **Open-Meteo** for their excellent weather API.
- **Erik Flowers' Weather Icons** for the intuitive weather icons.
- The amazing contributors to open-source libraries that make this app possible.

Feel free to contribute and make this app even better! Happy coding! 😊