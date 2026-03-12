import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ArabianHorseHome from "./components/ArabianHorseHome";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

import ForgotPassword from "./components/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/ResetPassword";

import HorseList from "./components/HorseList";
import HorseProfile from "./components/HorseProfile";
import AddHorse from "./components/AddHorse";
import ListHorseForSale from "./components/ListHorseForSale";

import Studs from "./components/Studs";
import StudDetails from "./components/StudDetails";

import News from "./components/News";
import NewsDetails from "./components/NewsDetails";
import CreateNews from "./components/CreateNews";

import Auctions from "./components/Auctions";
import AuctionDetails from "./components/AuctionDetails";
import CreateAuction from "./components/CreateAuction";

import ClassifyHorse from "./components/ClassifyHorse";

import ContactSeller from "./components/ContactSeller";
import UserMessages from "./components/UserMessages";
import Notifications from "./components/Notifications";
import AdminDashboard from "./Admin/AdminDashboard";

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<ArabianHorseHome />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/horses" element={<HorseList />} />
        <Route path="/horse/:id" element={<HorseProfile />} />
        <Route path="/add-horse" element={<AddHorse />} />
        <Route path="/list-for-sale" element={<ListHorseForSale />} />

        <Route path="/studs" element={<Studs />} />
        <Route path="/stud/:id" element={<StudDetails />} />

        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/news/create" element={<CreateNews />} />

        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auction/:id" element={<AuctionDetails />} />
        <Route path="/auction/create" element={<CreateAuction />} />

        <Route path="/classify" element={<ClassifyHorse />} />

        <Route path="/messages" element={<UserMessages />} />
        <Route path="/contact-seller/:horseId" element={<ContactSeller />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>

    </Router>
  );
}

export default App;