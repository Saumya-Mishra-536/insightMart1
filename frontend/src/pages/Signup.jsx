import React, { useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill all required fields')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(import.meta.env.VITE_API_URL_SIGNUP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'Signup failed')

      navigate('/login')
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'Server not reachable' : err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-page">
      <div className="orb orb--pink" />
      <div className="orb orb--gray" />

      <main className="signup-card">
        <h1 className="title">Create Account.</h1>

        <form onSubmit={handleSubmit} className="form">
          <label className="field">
            <input type="text" placeholder="Full name" className="input" value={form.name} onChange={update('name')} />
          </label>

          <label className="field">
            <input type="email" placeholder="E-mail" className="input" value={form.email} onChange={update('email')} />
          </label>

          <div className="row two-cols">
            <label className="field">
              <input type="password" placeholder="Password" className="input" value={form.password} onChange={update('password')} />
            </label>
            <label className="field">
              <input type="password" placeholder="Confirm password" className="input" value={form.confirm} onChange={update('confirm')} />
            </label>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="policy">
            <input id="agree" type="checkbox" className="checkbox" required />
            <label htmlFor="agree">I agree to the Terms and Privacy Policy</label>
          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <div className="meta">
          <span>already have an account?</span>
          <Link to="/login" className="link">Sign in</Link>
        </div>
      </main>
    </div>
  )
}
