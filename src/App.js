import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/HomePage/home';
import Login from './Authentication/Login';
import SignUp from './Authentication/Signup';
import ResetPassword from './Authentication/Resetpassword';
import Verified from "./Authentication/Verified"
import VerifiedMail from './Authentication/VerifyMail';
import Buyer from './pages/Buyer/buyer';
import Sender from './pages/Sender/sender';
import Catalog from './pages/Catalogs/catalog';
import AddItem from './pages/AddItem/additem';
import AddToCart from './pages/AddtoCart/addtocart';
import Payment from './pages/Payment/payment';
import HotelItems from './pages/HotelItems/hotelitems';
import NewOrders from './pages/HotelsOrders/neworders';
import AcceptedOrders from './pages/HotelsOrders/acceptedorder';
import RejectedOrders from './pages/HotelsOrders/rejectedorders';
import UserOrders from './pages/UserOrders/userorders';
import Congrats from './pages/Congrats/congrats';
import HotelProfile from './pages/HotelProfile/hotelProfile';
import UserProfile from './pages/UserProfile/userProfile';
import DeliveryLocationMap from './pages/DeliveryMap/deliveryMap';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/verify/:id" element={<Verified />} />
        <Route path="/verifymail" element={<VerifiedMail />} />
        <Route path="/sender" element={<Sender />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/catalog/:id" element={<Catalog />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/items" element={<HotelItems />} />
        <Route path="/neworders" element={<NewOrders />} />
        <Route path="/acceptedorders" element={<AcceptedOrders />} />
        <Route path="/rejectedorders" element={<RejectedOrders />} />
        <Route path="/userorders" element={<UserOrders />} />
        <Route path="/congrats/:id" element={<Congrats />} />
        <Route path="/hotelprofile/:id" element={<HotelProfile />} />
        <Route path="/userprofile/:id" element={<UserProfile />} />
        {/* <Route path="/deliverymap" element={<DeliveryLocationMap />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
