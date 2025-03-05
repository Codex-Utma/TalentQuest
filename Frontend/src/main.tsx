import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { createRoot } from 'react-dom/client'
import './index.css'

import Login from './pages/Login.tsx'

import AdminLayout from './layout/AdminLayout.tsx'
import EmployeeLayout from './layout/EmployeeLayout.tsx'
import Adduser from './pages/Adduser.tsx'
import Newmodule from './pages/Newmodule.tsx'
import Curse from './pages/Curse.tsx'
import Class from './pages/class.tsx'
import Resource from './pages/Resource.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>

        <Route index element={<Login />} />

        <Route path="/admin" element={<AdminLayout />} >
          <Route path="Adduser" element={<Adduser />} />
          <Route path="Curse" element={<Curse />} />
          <Route path="Newmodule" element={<Newmodule />} />
          <Route path="Class" element={<Class />} />
          <Route path="Resource" element={<Resource />} />
        </Route>

        <Route path="/employee" element={<EmployeeLayout />} >
          <Route path="Adduser" element={<Adduser />} />
        </Route>

      </Routes>
    </BrowserRouter>,
)
