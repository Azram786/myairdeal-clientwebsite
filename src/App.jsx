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
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const isHomeScreen = location.pathname === "/";

  return <div className={`${isHomeScreen ? "pt-0" : "pt-14"}`}>{children}</div>;
}

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Layout>
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

            <Route path="/book-flight" element={<FlightSummaryPage />} />
            <Route path="/profile" element={token ? <Profile /> : <Login />} />
            <Route path="/enquiry" element={<EnquiryForm />} />

            <Route path="/enter-detail" element={<Signup />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Layout>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
