import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { createRoot } from 'react-dom/client'
import './index.css'

import Login from './pages/Login.tsx'

import AdminLayout from './layout/AdminLayout.tsx'
import EmployeeLayout from './layout/EmployeeLayout.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>

        <Route index element={<Login />} />

        <Route path="/admin" element={<AdminLayout />} >
        </Route>

        <Route path="/employee" element={<EmployeeLayout />} >
        </Route>

      </Routes>
    </BrowserRouter>,
)
