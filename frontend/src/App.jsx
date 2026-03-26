import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Career from './pages/Career'
import Products from './pages/Products'

import Login from "./admin/Login"
import Dashboard from './admin/Dashboard'
import AdminLayout from "./admin/AdminLayout";
import ProductList from "./admin/ProductList";
import ProductForm from "./admin/ProductForm";

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function LayoutWrapper({ children }) {
  const location = useLocation()

  // 👉 Check if admin route
  const isAdmin = location.pathname.startsWith("/admin")

  return (
    <>
      {!isAdmin && <Header />}

      <main>{children}</main>

      {!isAdmin && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />

      <LayoutWrapper>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin */}
          <Route path="/admin" element={<Login />} />
         <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="products" element={<ProductList />} />
    <Route path="products/add" element={<ProductForm />} />
    <Route path="products/edit/:id" element={<ProductForm />} />
  </Route>
        </Routes>
      </LayoutWrapper>

    </BrowserRouter>
  )
}