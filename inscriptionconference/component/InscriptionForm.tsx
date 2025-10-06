"use client";
import React, { useState } from 'react';

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
    <div
      style={{
        background: 'linear-gradient(180deg, #b3e5fc 0%, #e1f5fe 100%)',
        color: '#17375E',
        borderRadius: 20,
        padding: 36,
        maxWidth: 440,
        margin: '40px auto',
        boxShadow: '0 8px 28px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Poppins, sans-serif',
        textAlign: 'center',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <h1
        style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 700,
          fontSize: 34,
          marginBottom: 8,
          color: '#1A237E',
        }}
      >
        L’amour et le pardon de Dieu
      </h1>
      <h2
        style={{
          fontWeight: 600,
          fontSize: 20,
          marginBottom: 24,
          color: '#4A6FA5',
        }}
      >
        Conférence en ligne – 25 octobre 2025 à 18h
      </h2>

      <p
        style={{
          fontSize: 15,
          marginBottom: 24,
          color: '#2E3C58',
          fontStyle: 'italic',
          lineHeight: 1.6,
        }}
      >
        “Venez découvrir un message d’amour, de réconciliation et d’espérance.”
        <br />
        (Entrez votre e-mail ou téléphone)
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Nom et prénom"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            padding: 12,
            borderRadius: 10,
            border: '1px solid #BBDEFB',
            fontSize: 16,
            outline: 'none',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            padding: 12,
            borderRadius: 10,
            border: '1px solid #BBDEFB',
            fontSize: 16,
            outline: 'none',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Téléphone"
          value={form.phone}
          onChange={handleChange}
          style={{
            padding: 12,
            borderRadius: 10,
            border: '1px solid #BBDEFB',
            fontSize: 16,
            outline: 'none',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading
              ? '#A7C7E7'
              : 'linear-gradient(90deg, #4FC3F7 0%, #81D4FA 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '14px 0',
            fontWeight: 700,
            fontSize: 18,
            marginTop: 8,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 10px rgba(79,195,247,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              (e.target as HTMLButtonElement).style.transform = 'scale(1.03)';
              (e.target as HTMLButtonElement).style.boxShadow =
                '0 6px 16px rgba(79,195,247,0.5)';
            }
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'scale(1)';
            (e.target as HTMLButtonElement).style.boxShadow =
              '0 4px 10px rgba(79,195,247,0.4)';
          }}
        >
          {loading ? 'Inscription en cours...' : 'Je m’inscris'}
        </button>

        {success && (
          <div
            style={{
              color: '#2E7D32',
              fontWeight: 600,
              marginTop: 10,
              background: '#E8F5E9',
              borderRadius: 8,
              padding: 10,
            }}
          >
            🌟 Inscription réussie ! Que Dieu vous bénisse.
          </div>
        )}
        {error && (
          <div
            style={{
              color: '#C62828',
              fontWeight: 600,
              marginTop: 10,
              background: '#FFEBEE',
              borderRadius: 8,
              padding: 10,
            }}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
