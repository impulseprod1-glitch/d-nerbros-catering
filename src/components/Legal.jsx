import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Legal.css';

const Legal = ({ page, onBack }) => {
    const { t } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    let titleKey = '';
    let textKey = '';

    switch (page) {
        case 'impressum':
            titleKey = 'legal_impressum_title';
            textKey = 'legal_impressum_text';
            break;
        case 'datenschutz':
            titleKey = 'legal_datenschutz_title';
            textKey = 'legal_datenschutz_text';
            break;
        case 'agb':
            titleKey = 'legal_agb_title';
            textKey = 'legal_agb_text';
            break;
        default:
            titleKey = 'legal_impressum_title';
            textKey = 'legal_impressum_text';
    }

    return (
        <section className="legal-section section pt-32 pb-20">
            <div className="container">
                <button className="btn-back" onClick={onBack}>
                    <ArrowLeft size={20} />
                    {t('legal_back')}
                </button>

                <div className="legal-content">
                    <h1 className="legal-title text-gradient">{t(titleKey)}</h1>

                    <div className="legal-text-body">
                        {t(textKey).split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph || <br />}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Legal;
