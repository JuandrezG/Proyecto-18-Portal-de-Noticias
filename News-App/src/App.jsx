import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from 'react'
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

const HomePage = lazy( () => import("./components/HomePage"))
const ArticleDetails = lazy( () => import("./components/ArticleDetails"))
const SearchPage = lazy( () => import("./components/SearchPage"))

function App() {
  return (
    <>
    
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Suspense  fallback={<div className="text-5xl animate-bounce text-center">...</div>} >
          <HomePage/>
          </Suspense> } />
        <Route path="/search" element={
          <Suspense  fallback={<div className="text-5xl animate-bounce text-center">...</div>} >
          <SearchPage />
          </Suspense> } />
        <Route path="/about/:articleUri" element={
          <Suspense  fallback={<div className="text-5xl animate-bounce text-center">...</div>} >
          <ArticleDetails />
          </Suspense> } />
      </Routes>
      <Footer />
    </>
  );
}

export default App
