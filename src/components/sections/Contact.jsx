import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedText, setCopiedText] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const emailAddress = 'lucasspessoadev@outlook.com';
  const phoneNumber = '(11) 94579-6098';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copiado para a área de transferência! 📋', 'success');
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setFeedbackMessage('✨ Sua mensagem foi enviada com sucesso! Responderei em breve.');
      showToast('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setFeedbackMessage(null);
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-subtitle"><i className="fa-solid fa-paper-plane"></i> Contato Direct</span>
          <h2 className="section-title">Entre em <span className="gradient-text">Contato Comigo</span></h2>
          <p className="section-desc">Estou disponível para novas oportunidades profissionais, projetos Full Stack e automações. Vamos conversar!</p>
          <div className="section-line"></div>
        </div>

        <div className="contact-grid">
          {/* Contact Info Cards */}
          <div className="contact-cards-column">
            {/* Email Card */}
            <div className="contact-info-card glass-panel">
              <div className="c-icon"><i className="fa-solid fa-envelope"></i></div>
              <div className="c-details">
                <span className="c-label">E-mail Profissional</span>
                <a href={`mailto:${emailAddress}`} className="c-val">{emailAddress}</a>
              </div>
              <button 
                className="copy-btn" 
                onClick={() => handleCopy(emailAddress)} 
                title="Copiar e-mail"
              >
                <i className={`fa-regular ${copiedText === emailAddress ? 'fa-check' : 'fa-copy'}`} style={{ color: copiedText === emailAddress ? '#10b981' : 'inherit' }}></i>
              </button>
            </div>

            {/* WhatsApp Card */}
            <div className="contact-info-card glass-panel">
              <div className="c-icon"><i className="fa-brands fa-whatsapp"></i></div>
              <div className="c-details">
                <span className="c-label">Telefone / WhatsApp</span>
                <a href="https://wa.me/5511945796098" target="_blank" rel="noopener noreferrer" className="c-val">{phoneNumber}</a>
              </div>
              <a href="https://wa.me/5511945796098" target="_blank" rel="noopener noreferrer" className="link-btn" title="Conversar no WhatsApp">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="contact-info-card glass-panel">
              <div className="c-icon"><i className="fa-brands fa-linkedin-in"></i></div>
              <div className="c-details">
                <span className="c-label">LinkedIn</span>
                <a href="https://linkedin.com/in/lucas-pessoa-dev/" target="_blank" rel="noopener noreferrer" className="c-val">linkedin.com/in/lucas-pessoa-dev/</a>
              </div>
              <a href="https://linkedin.com/in/lucas-pessoa-dev/" target="_blank" rel="noopener noreferrer" className="link-btn" title="Acessar LinkedIn">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>

            {/* GitHub Card */}
            <div className="contact-info-card glass-panel">
              <div className="c-icon"><i className="fa-brands fa-github"></i></div>
              <div className="c-details">
                <span className="c-label">GitHub</span>
                <a href="https://github.com/lucasspessoadev" target="_blank" rel="noopener noreferrer" className="c-val">github.com/lucasspessoadev</a>
              </div>
              <a href="https://github.com/lucasspessoadev" target="_blank" rel="noopener noreferrer" className="link-btn" title="Ver Repositórios">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>

          {/* Contact Interactive Form */}
          <div className="contact-form-column">
            <form className="contact-form glass-panel" id="contact-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Envie uma Mensagem</h3>
              
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Seu Nome *</label>
                  <div className="input-wrap">
                    <i className="fa-solid fa-user"></i>
                    <input 
                      type="text" 
                      id="contact-name" 
                      name="name" 
                      required 
                      placeholder="Como posso te chamar?"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Seu E-mail *</label>
                  <div className="input-wrap">
                    <i className="fa-solid fa-at"></i>
                    <input 
                      type="email" 
                      id="contact-email" 
                      name="email" 
                      required 
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Assunto</label>
                <div className="input-wrap">
                  <i className="fa-solid fa-tag"></i>
                  <input 
                    type="text" 
                    id="contact-subject" 
                    name="subject" 
                    placeholder="Ex: Oportunidade de Trabalho, Projeto Full Stack..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Mensagem *</label>
                <div className="input-wrap textarea-wrap">
                  <i className="fa-solid fa-comment-dots"></i>
                  <textarea 
                    id="contact-message" 
                    name="message" 
                    rows="5" 
                    required 
                    placeholder="Escreva sua mensagem ou detalhes sobre a oportunidade..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-submit" 
                id="btn-submit-form"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensagem</span>
                    <i className="fa-solid fa-paper-plane"></i>
                  </>
                )}
              </button>

              {feedbackMessage && (
                <div className="form-feedback-message success" style={{ display: 'block' }}>
                  {feedbackMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
