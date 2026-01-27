// src/components/windows/ContactWindow.jsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactWindow = () => {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(() => {
        setIsSubmitted(true);
        form.current.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setError('Failed to send message. Please try again.');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  if (isSubmitted) {
    return (
      <div className="content-section thank-you-screen">
        <div className="thank-you-content">
          <h2>Thank You!</h2>
          <p className="thank-you-message">
            Your message has been sent successfully.<br />
            I'll get back to you as soon as possible.
          </p>
          <p className="thank-you-subtext">
            You can close this window or send another message by refreshing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-section contact-window-content">
      <h2>Contact Me</h2>
      <p className="contact-intro">
        Interested in collaboration, freelance, or just want to connect?
      </p>

      {error && (
        <div className="status-message error">
          {error}
        </div>
      )}

      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="from_name"
            id="name"
            placeholder="John"
            required
            disabled={isSending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="from_email"
            id="email"
            placeholder="your.email@example.com"
            required
            disabled={isSending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Hi, I'd like to discuss..."
            required
            disabled={isSending}
          />
        </div>

        <button
          type="submit"
          className="send-button"
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactWindow;