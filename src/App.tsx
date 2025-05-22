import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import {Login} from './components/pages/login/Login';
import {Register} from './components/pages/Register/Register';
import { LandingPage } from './components/pages/landingPage/LandingPage';
import Calendar from './components/pages/calendar/Calendar';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/calendar" element={<Calendar/>} />

      </Routes>
    </BrowserRouter>
  );
}

