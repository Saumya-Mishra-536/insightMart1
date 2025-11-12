import React from 'react'
import './landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="landing">
      <header className="nav">
        <div className="nav__brand">
          <div className="nav__logo" aria-hidden="true">⋔</div>
          <span className="nav__title">InsightMart</span>
        </div>
        <nav className="nav__links">
          <a href="#" className="nav__link">Home</a>
          <a href="#" className="nav__link">Docs</a>
        </nav>
      </header>

      <main className="hero">
        <h1 className="hero__title">
          Your e-commerce dashboard for smarter, data-driven selling.
        </h1>
        <div className="hero__actions">
          <Link to="/login" className="btn btn--primary">Get Started</Link>
        </div>
      </main>

      <div className="bg bg--glow-1" />
      <div className="bg bg--glow-2" />
      <div className="bg bg--sheen" />
    </div>
  )
}


