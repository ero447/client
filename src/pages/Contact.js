import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo-only: don't post to backend here
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="container" style={{ padding: 28 }}>
      <h1>Contact Us</h1>
      <p>If you have questions about products or orders, send us a message.</p>
      <form onSubmit={handleSubmit} style={{ maxWidth: 680 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Name</label>
          <input className="search-input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input className="search-input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Message</label>
          <textarea className="search-input" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="How can we help?" rows={6} />
        </div>
        <button className="cta-button" type="submit">Send Message</button>
        {sent && <div style={{ marginTop: 12, color: 'green' }}>Message queued (demo)</div>}
      </form>
      <hr style={{ margin: '24px 0' }} />
      <div>
        <strong>Support:</strong>
        <div>Email: support@autosound.local</div>
        <div>Phone: +1 (555) 555-5555</div>
      </div>
    </div>
  );
};

export default Contact;
