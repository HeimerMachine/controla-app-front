import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import {Login} from './components/pages/login/Login';
import {Register} from './components/pages/Register/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

