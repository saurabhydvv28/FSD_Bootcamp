import { useState } from 'react'

function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <div className="page">
      <div className="page-content">
        <h1>Contact Us 📬</h1>
        <p>Got questions? Fill out the form below and we'll get back to you.</p>

        {sent ? (
          <div className="success-box">
            <span>✅</span>
            <div>
              <strong>Message sent!</strong>
              <p>Thanks for reaching out. We'll be in touch soon.</p>
            </div>
          </div>
        ) : (
          <div className="form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="4" placeholder="What's on your mind?" />
            </div>
            <button className="btn" onClick={() => setSent(true)}>Send Message</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Contact
