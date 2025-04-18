import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import {Login} from './components/pages/login/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-in" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

