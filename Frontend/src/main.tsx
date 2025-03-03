import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Prueba from './pages/prueba.tsx'

import AdminLayout from './layout/AdminLayout.tsx'
import EmployeeLayout from './layout/EmployeeLayout.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>

        <Route index element={<App />} />

        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<App />} />
          <Route path="prueba" element={<Prueba />} />
        </Route>

        <Route path="/employee" element={<EmployeeLayout />} >
          <Route index element={<App />} />
          <Route path="prueba" element={<Prueba />} />
        </Route>

      </Routes>
    </BrowserRouter>,
)
