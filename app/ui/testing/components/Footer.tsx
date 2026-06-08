/**
 * Testing Footer — clean 3-column footer layout.
 * Zero imports from existing components.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="t-footer">
      <div className="t-container">

        <div className="t-footer__grid">

          {/* Brand column */}
          <div className="t-footer__brand">
            <div className="t-footer__brand-row">
              <div className="t-footer__brand-mark">AM</div>
              <span className="t-text-heading">AMMY Archives</span>
            </div>
            <p className="t-text-body t-color-muted">
              Your complete learning archive for Computer Engineering.
              Study notes, AI tutoring, quizzes, and materials — all in one place.
            </p>
          </div>

          {/* Platform links */}
          <div>
            <p className="t-footer__column-title">Platform</p>
            <div className="t-footer__links">
              <span className="t-footer__link">Study Modules</span>
              <span className="t-footer__link">AI Assistant</span>
              <span className="t-footer__link">Assessments</span>
              <span className="t-footer__link">Design System</span>
            </div>
          </div>

          {/* Resources links */}
          <div>
            <p className="t-footer__column-title">Resources</p>
            <div className="t-footer__links">
              <span className="t-footer__link">Study Materials</span>
              <span className="t-footer__link">Flashcards</span>
              <span className="t-footer__link">Progress Reports</span>
              <span className="t-footer__link">Help & FAQ</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="t-footer__bottom">
          <p>© {year} AMMY Archives. Built for learning.</p>
          <span className="t-footer__bottom-badge">
            Made with ✨ for Computer Engineering
          </span>
        </div>

      </div>
    </footer>
  )
}
