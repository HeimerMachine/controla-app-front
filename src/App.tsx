import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import {Login} from './components/pages/login/Login';
import {Register} from './components/pages/Register/Register';
import { LandingPage } from './components/pages/landingPage/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<LandingPage/>} />

      </Routes>
    </BrowserRouter>
  );
}

