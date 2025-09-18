
"use client";
import React, { useState } from 'react';
import { Center } from  '@mantine/core';

export default function InscriptionForm() {
  const [form, setForm] = useState({ email: '', name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
  setSuccess(true);
  setForm({ email: '', name: '', phone: '' });
      } else {
        setError(data.error || 'Erreur lors de l’inscription.');
      }
    } catch (err) {
      setError('Erreur réseau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#172042', color: '#fff', borderRadius: 16, padding: 32, maxWidth: 420, margin: '0 auto', boxShadow: '0 4px 24px #0002' }}>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 32, marginBottom: 12 , textAlign :'center'}}>INSCRIPTION</h1>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', gap: 16 }}>
        <button style={{ background: '#fff', color: '#172042', border: 'none', borderRadius: 20, padding: '6px 18px', fontWeight: 600 }}>04.10.2025</button>
        <button style={{ background: '#fff', color: '#172042', border: 'none', borderRadius: 20, padding: '6px 18px', fontWeight: 600 }}>18h</button>
      </div>
      <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 24, marginTop: 32, textTransform: 'uppercase', letterSpacing: 1 }}>Conférence en ligne</h2>
      <p style={{ fontSize: 15, marginBottom: 18, color: '#e0e0e0' }}>
      </p>
      <div style={{ fontWeight: 600, marginBottom: 18 }}>LIVE ZOOM</div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input
          type="text"
          name="name"
          placeholder="Nom et prénom"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: 10, borderRadius: 8, border: 'none', fontSize: 16 }}
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: 10, borderRadius: 8, border: 'none', fontSize: 16 }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Téléphone (optionnel)"
          value={form.phone}
          onChange={handleChange}
          style={{ padding: 10, borderRadius: 8, border: 'none', fontSize: 16 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ background: '#fff', color: '#172042', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 17, marginTop: 8, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Inscription en cours...' : 'Je m’inscris'}
        </button>
        {success && <div style={{ color: '#4caf50', fontWeight: 600, marginTop: 8 }}>Inscription réussie !</div>}
        {error && <div style={{ color: '#ff5252', fontWeight: 600, marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
}
