import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand column */}
        <div className="footer-brand">
          <div className="footer-brand-row">
            <Image src="/image/BrandLogo.png" alt="AMMY LMS" width={40} height={40} className="footer-logo" />
            <span className="footer-title">
              AMMY <span>LMS</span>
            </span>
          </div>
          <p className="footer-description">
            Empowering learners across Africa with modern tools for interactive, AI-assisted education.
          </p>
        </div>

        {/* Product links */}
        <div className="footer-col">
          <p className="footer-col-heading">Product</p>
          <ul className="footer-col-links">
            <li><Link href="#">Study Modules</Link></li>
            <li><Link href="#">AI Assistant</Link></li>
            <li><Link href="#">Quizzes</Link></li>
            <li><Link href="#">Progress Tracking</Link></li>
          </ul>
        </div>

        {/* Company links */}
        <div className="footer-col">
          <p className="footer-col-heading">Company</p>
          <ul className="footer-col-links">
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Use</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">© {year} AMMY LMS. All rights reserved.</p>
        <span className="footer-badge">Built with passion for learning</span>
      </div>
    </footer>
  )
}
