import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
      const res = await fetch(import.meta.env.VITE_API_URL_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'Login failed')

      if (data?.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      navigate('/')
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Server not reachable' : err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="orb orb--pink" />
      <div className="orb orb--gray" />

      <main className="login-card">
        <h1 className="title">Sign In.</h1>

        <button className="social-btn"><span className="icon">G</span><span>Continue with Google</span></button>
        <button className="social-btn"><span className="icon">f</span><span>Continue with Facebook</span></button>

        <div className="divider">or</div>

        <form onSubmit={handleLogin} className="form">
          <label className="field">
            <input type="email" placeholder="E-mail" className="input" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>

          <label className="field">
            <input type="password" placeholder="Password" className="input" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>

          {error && <div className="error">{error}</div>}

          <button className="submit-btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="meta">
          <span>don't have an account?</span>
          <Link to="/signup" className="link">Create an account</Link>
        </div>

        <div className="meta">
          <a href="#" className="link">Forgot password?</a>
        </div>
      </main>
    </div>
  )
}
