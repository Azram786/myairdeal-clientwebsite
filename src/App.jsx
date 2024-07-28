import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Login/Login";
import ViewBooking from "./components/Booking/Pages/ViewBooking";
import ViewDetailedBooking from "./components/Booking/Pages/ViewDetailedBooking";
import FlightList from "./components/Search/FlightList";
import FlightSummaryPage from "./components/BookFlight/FlightSummaryPage";
import Profile from './components/Profile/Profile'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/view-booking" element={<ViewBooking />} />
          <Route
            path="/view-detailed-booking"
            element={<ViewDetailedBooking />}
          />
          <Route path="/search" element={<FlightList />} />
          <Route path="book-flight" element={<FlightSummaryPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
