/* ============================================================
   contact.js — Contact Form Component
   Renders contact info + form with live validation
   ============================================================ */

export function mountContact() {
  const container = document.querySelector('[data-component="contact"]');
  if (!container) return;

  container.innerHTML = `
    <section class="section" id="contact" aria-labelledby="contact-heading">
      <div class="container">
        <div class="contact-grid">

          <!-- Info column -->
          <div class="contact-info reveal-left">
            <div class="divider"></div>
            <p>
              Whether you have a project in mind, want to collaborate, or simply want to
              say hello — I'd love to hear from you. I'm currently available for select
              freelance and studio partnerships.
            </p>

            <div class="contact-detail">
              <span class="contact-detail__label">Email</span>
              <a href="mailto:ardivyarastogi@gmail.com" class="contact-detail__value">
                ardivyarastogi@gmail.com
              </a>
            </div>
            <div class="contact-detail">
              <span class="contact-detail__label">Location</span>
              <p class="contact-detail__value">Brisbane, Queensland, Australia</p>
            </div>
            <div class="contact-detail">
              <span class="contact-detail__label">Availability</span>
              <p class="contact-detail__value">
                Open to projects — <span style="color: var(--color-sage);">●</span> Available
              </p>
            </div>
          </div>

          <!-- Form column -->
          <div class="reveal-right">
            <form class="contact-form" id="contact-form" novalidate aria-label="Contact form">

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);">
                <div class="form-group">
                  <label class="form-label" for="contact-name">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    class="form-input"
                    placeholder="Your name"
                    autocomplete="name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    class="form-input"
                    placeholder="you@example.com"
                    autocomplete="email"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-subject">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  class="form-input"
                  placeholder="What's this about?"
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  class="form-textarea"
                  placeholder="Tell me about your project, timeline, and anything else you'd like me to know..."
                  required
                ></textarea>
              </div>

              <button type="submit" class="btn btn--primary" id="contact-submit" style="align-self: flex-start;">
                Send Message
              </button>

              <div class="form-success" id="form-success" role="status" aria-live="polite">
                ✦ Thank you! Your message has been received. I'll be in touch soon.
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  `;

  _initFormValidation();
}

/* ── Private: Form Validation ───────────────────────────── */
function _initFormValidation() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  // Live validation on blur
  const requiredInputs = form.querySelectorAll('[required]');
  requiredInputs.forEach(input => {
    input.addEventListener('blur', () => _validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) _validateField(input);
    });
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    requiredInputs.forEach(input => {
      if (!_validateField(input)) valid = false;
    });

    if (valid) {
      // Simulate submission
      const btn = form.querySelector('#contact-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        success.classList.add('visible');
        btn.textContent = 'Send Message';
        btn.disabled = false;
        setTimeout(() => success.classList.remove('visible'), 6000);
      }, 1200);
    }
  });
}

function _validateField(input) {
  const isEmail = input.type === 'email';
  const isEmpty = input.value.trim() === '';
  const isInvalidEmail = isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

  if (isEmpty || isInvalidEmail) {
    input.style.borderColor = 'var(--color-blush)';
    input.style.boxShadow   = '0 0 0 3px var(--color-blush-light)';
    return false;
  } else {
    input.style.borderColor = 'var(--color-sage-light)';
    input.style.boxShadow   = '0 0 0 3px rgba(122, 158, 126, 0.15)';
    return true;
  }
}
