import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Login/Login";
import ViewBooking from "./components/Booking/Pages/ViewBooking";
import ViewDetailedBooking from "./components/Booking/Pages/ViewDetailedBooking";
import FlightList from "./components/Search/FlightList";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
