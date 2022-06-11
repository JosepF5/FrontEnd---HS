import React from 'react'
import Provider from './components/Provider/Provider'
import Product from './components/Product/Product'
import Bill from './components/Bill/Bill'
import Receipt from './components/Receipt/Receipt'
import Opening from './components/Opening/Opening'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Entry</Link>
        <Link to="/bill">Bill</Link>
        <Link to="/receipt">Receipt</Link>
        <Link to="/product">Product</Link>
        <Link to="/provider">Provider</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Opening/>} />
        <Route path="/bill" element={<Bill/>} />
        <Route path="/receipt" element={<Receipt/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/provider" element={<Provider/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
