import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { createRoot } from 'react-dom/client'
import './index.css'


import AdminLayout from './layout/AdminLayout.tsx'
import EmployeeLayout from './layout/EmployeeLayout.tsx'
import Adduser from './pages/Adduser.tsx'
import Panel from './pages/Panel.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>


        <Route path="/admin" element={<AdminLayout />} >
          <Route path="Adduser" element={<Adduser />} />
          <Route path="Panel" element={<Panel />} />
        </Route>

        <Route path="/employee" element={<EmployeeLayout />} >
          <Route path="Adduser" element={<Adduser />} />
        </Route>

      </Routes>
    </BrowserRouter>,
)
