import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Login/Login";
import ViewBooking from "./components/Booking/Pages/ViewBooking";
import ViewDetailedBooking from "./components/Booking/Pages/ViewDetailedBooking";
import FlightList from "./components/Search/FlightList";
import FlightSummaryPage from "./components/BookFlight/FlightSummaryPage";
import { useSelector } from "react-redux";
import Profile from "./components/Profile/Profile";

import Review from "./components/BookFlight/Review";
import Signup from "./components/Login/Signup";
import Header from "./components/Home/Header";
import Footer from "./components/Home/Footer";
import EnquiryForm from "./components/Home/EnquiryForm";
import NoFlights from "./components/Search/NoFlights";
import TermsAndConditions from "./components/Home/TermsAndConditions";
import PrivacyPolicy from "./components/Home/PrivacyPolicy";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="pt-14">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/sign-in"
              element={!token ? <Login /> : <HomePage />}
            />
            <Route
              path="/view-booking"
              element={token ? <ViewBooking /> : <Login />}
            />
            <Route
              path="/view-detailed-booking"
              element={token ? <ViewDetailedBooking /> : <Login />}
            />
            <Route path="/search" element={<FlightList />} />

            <Route
              path="/book-flight"
              element={token ? <FlightSummaryPage /> : <Login />}
            />
            <Route path="/profile" element={token ? <Profile /> : <Login />} />
            <Route path="/enquiry" element={<EnquiryForm />} />

            <Route path="/enter-detail" element={<Signup />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
