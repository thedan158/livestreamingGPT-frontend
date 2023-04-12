import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from './components/organisms/header';
import Footer from './components/organisms/footer';
import RegisterLayout from "./layout/register";
import RegisterPage from './pages/register';
import Login from "./pages/login";
import { useSelector } from "react-redux";
import Dashboard from "./pages/dashboard";
import ServicePage from "./pages/service";
import IdCardRepublish from "./pages/service/idCard";
import PageLoader from "./components/common/pageLoader";
import RequestStatus from "./pages/service/requestStatus";
import ChangePassword from "./pages/change-password";
import { useEffect } from "react";


function App() {
  const state = useSelector((state) => state)
  console.log('current state', state)
  // useEffect(() => {
  //   if (!state.user.username && window.location.pathname !== '/livestream' && window.location.pathname !== '/') {
  //     window.location.href = window.location.protocol + '//' + window.location.host;
  //     alert('You must be logged in to use our product')
  //   }
  // }, [window.location, window.location.href])
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterLayout><RegisterPage /></RegisterLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/addIDCard" element={<IdCardRepublish />} />
          <Route path="/livestream" element={<RequestStatus />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
      <PageLoader />
      <Footer />
    </>
  );
}

export default App;
