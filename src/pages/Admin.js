import React, { useState } from 'react';

const Admin = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runSeed = async () => {
    if (!window.confirm('Run DB seed? This will wipe and re-insert products.')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const text = await res.text();
      setResult({ ok: res.ok, text });
    } catch (err) {
      setResult({ ok: false, text: String(err) });
    } finally {
      setLoading(false);
    }
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="container" style={{ padding: 28 }}>
        <h1>Admin</h1>
        <p>Access denied. You must be an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 28 }}>
      <h1>Admin Panel</h1>
      <p>Welcome, {user.name}. Use the controls below for development tasks.</p>
      <div style={{ marginTop: 12 }}>
        <button className="add-button" onClick={runSeed} disabled={loading}>{loading ? 'Running...' : 'Run DB Seed'}</button>
      </div>
      {result && (
        <pre style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{result.ok ? 'Success:\n' : 'Error:\n'}{result.text}</pre>
      )}
    </div>
  );
};

export default Admin;
