import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

const Footer = ({ onNavigate }) => {
    const { t } = useLanguage();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulating API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            // Form resets after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <footer id="iletisim" className="footer">
            <div className="container">

                {/* Booking & Contact Form Section */}
                <div className="booking-section">
                    <div className="booking-content">
                        <h2 className="booking-title">{t('footer_title_1')}<span className="text-gradient">{t('footer_title_2')}</span></h2>
                        <p className="booking-desc">{t('footer_desc')}</p>

                        <div className="contact-info-blocks">
                            <a href="tel:+491637097175" className="info-block info-block-link">
                                <Phone size={20} className="info-icon" />
                                <span>+49 163 7097175</span>
                            </a>
                            <a href="mailto:catering@donerbros.berlin" className="info-block info-block-link">
                                <Mail size={20} className="info-icon" />
                                <span>catering@donerbros.berlin</span>
                            </a>
                            <a href="https://www.google.com/maps/place/D%C3%B6nerBros./@52.5065405,13.3005392,17z/" target="_blank" rel="noopener noreferrer" className="info-block info-block-link">
                                <MapPin size={20} className="info-icon" />
                                <span>Kaiser-Friedrich-Straße 48, 10627 Berlin</span>
                            </a>

                            {/* Embedded Google Map */}
                            <div className="google-map-container mt-4">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.1724041040854!2d13.300539177114851!3d52.50654053676878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8511d731f8253%3A0xcfab0ccab1e0186!2sD%C3%B6nerBros.!5e0!3m2!1sen!2sde!4v1714150532134!5m2!1sen!2sde"
                                    width="100%"
                                    height="200"
                                    style={{ border: 0, borderRadius: '12px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Dönerbros Location Kaiser-Friedrich-Straße"
                                    className="google-map-iframe"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    <div className="booking-form-wrapper">
                        {isSubmitted ? (
                            <div className="form-success-wrapper">
                                <CheckCircle size={64} className="success-icon" />
                                <h3>{t('form_success')}</h3>
                            </div>
                        ) : (
                            <form className="booking-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">{t('form_name')}</label>
                                        <input id="name" type="text" placeholder={t('form_name_placeholder')} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">{t('form_email')}</label>
                                        <input id="email" type="email" placeholder={t('form_email_placeholder')} required />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="date">{t('form_date')}</label>
                                        <input id="date" type="date" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="guests">{t('form_guests')}</label>
                                        <select id="guests" required>
                                            <option value="">{t('form_guests_placeholder')}</option>
                                            <option value="50-100">{t('form_guests_50')}</option>
                                            <option value="100-200">{t('form_guests_100')}</option>
                                            <option value="200-300">{t('form_guests_300')}</option>
                                            <option value="300+">{t('form_guests_500')}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="notes">{t('form_notes')}</label>
                                    <textarea id="notes" rows="4" placeholder={t('form_notes_placeholder')}></textarea>
                                </div>

                                <button type="submit" className={`btn btn-primary w-full submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                                    {isLoading ? '...' : t('form_submit')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-logo">
                        <span className="logo-accent">Döner</span>Bros
                        <p className="footer-tagline">{t('footer_tagline')}</p>
                    </div>

                    <div className="footer-links">
                        <button className="footer-link-btn" onClick={() => onNavigate('datenschutz')}>{t('footer_privacy')}</button>
                        <button className="footer-link-btn" onClick={() => onNavigate('impressum')}>{t('footer_imprint')}</button>
                        <button className="footer-link-btn" onClick={() => onNavigate('agb')}>{t('footer_terms')}</button>
                    </div>

                    <div className="social-links">
                        <a href="https://www.instagram.com/donerbros.berlin/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
