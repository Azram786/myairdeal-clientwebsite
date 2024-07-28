import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Login/Login";
import ViewBooking from "./components/Booking/Pages/ViewBooking";
import ViewDetailedBooking from "./components/Booking/Pages/ViewDetailedBooking";
import FlightList from "./components/Search/FlightList";
import FlightSummaryPage from "./components/BookFlight/FlightSummaryPage";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={!token ? <Login /> : <HomePage />} />
          <Route
            path="/view-booking"
            element={token ? <ViewBooking /> : <Login />}
          />
          <Route
            path="/view-detailed-booking"
            element={token ? <ViewDetailedBooking /> : <Login />}
          />
          <Route path="/search" element={<FlightList />} />
          <Route path="book-flight" element={<FlightSummaryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
