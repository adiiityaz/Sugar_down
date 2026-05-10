import {Link} from 'react-router';
import {
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL_HREF,
  SUPPORT_WHATSAPP_URL,
} from '~/lib/contact';

/**
 * Sugar Down premium footer (legacy parity). Policy links use Shopify storefront routes.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer premium-footer">
      <div className="footer-top">
        <div className="footer-col about">
          <div className="footer-logo">
            <span className="logo-main">SUGAR DOWN</span>
            <span className="logo-sub">BY LUCKY HEART</span>
          </div>
          <p className="footer-tagline">
            India&apos;s most focused Ayurvedic diabetes care system. Built for
            results, backed by support, and trusted by thousands.
          </p>
          <p className="footer-mission">
            Clear guidance, responsible care, and dependable follow-ups for your
            long-term health journey.
          </p>
        </div>

        <div className="footer-col links">
          <h4 className="col-title">LEGAL</h4>
          <ul className="footer-link-list">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/policies/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/refund">Refund &amp; Cancellation</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col support">
          <h4 className="col-title">SUPPORT</h4>
          <p className="support-text">Need help? We&apos;re online 24/7</p>
          <a href="mailto:luckyheartayurveda@gmail.com" className="support-link">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            luckyheartayurveda@gmail.com
          </a>
          <a href={SUPPORT_PHONE_TEL_HREF} className="support-link">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .62 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.62A2 2 0 0 1 22 16.92z" />
            </svg>
            {SUPPORT_PHONE_DISPLAY}
          </a>
          <Link to="/track" className="support-link">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            Track Order
          </Link>
          <div className="footer-quick-actions">
            <span className="action-label">QUICK ACTIONS</span>
            <div className="action-btns">
              <a href={SUPPORT_PHONE_TEL_HREF} className="action-btn">
                Call
              </a>
              <a
                href={SUPPORT_WHATSAPP_URL}
                className="action-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/_sugardown?igsh=MWN3cXIvNDI6anl6dg=="
              className="social-icon"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1D5GjEUUbF/"
              className="social-icon"
              title="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
          <div className="footer-copyright">
            © {year} LUCKY HEART. ALL RIGHTS RESERVED.
          </div>
        </div>
        <div className="footer-bottom-links">
          <Link to="/products">PRODUCTS</Link>
          <Link to="/track">TRACK ORDER</Link>
          <Link to="/contact">SUPPORT</Link>
          <Link to="/#faq">FAQ</Link>
          <a href="/sitemap.xml">SITEMAP</a>
        </div>
      </div>
    </footer>
  );
}
