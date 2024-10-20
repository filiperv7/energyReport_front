import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import { HomePage } from '../pages/HomePage'
import { ListInvoicePage } from '../pages/ListInvoicesPage'

const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/client/:client_number/invoices"
        element={<ListInvoicePage />}
      />
      <Route
        path="/dashboard/invoice/:id_invoice"
        element={<DashboardPage />}
      />
    </Routes>
  )
}

export default RoutesConfig
