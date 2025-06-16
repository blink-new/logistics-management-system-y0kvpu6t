import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Drivers from './pages/Drivers'
import Pallets from './pages/Pallets'
import Clients from './pages/Clients'
import Invoicing from './pages/Invoicing'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/pallets" element={<Pallets />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/invoicing" element={<Invoicing />} />
          </Routes>
        </Layout>
        <Toaster richColors position="top-right" />
      </div>
    </Router>
  )
}

export default App