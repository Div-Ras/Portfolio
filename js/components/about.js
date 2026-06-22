/* ============================================================
   about.js — About Section Component
   Renders split-layout about section with stats
   ============================================================ */

export function mountAbout() {
  const container = document.querySelector('[data-component="about"]');
  if (!container) return;

  container.innerHTML = `
    <section class="section" id="about" aria-labelledby="about-heading">
      <div class="container">
        <div class="about-split">

          <!-- Image -->
          <div class="about-image-wrap reveal-left">
            <img
              src="assets/portrait.png"
              alt="Portrait of the designer in their studio surrounded by architectural drawings and plants"
              loading="lazy"
            />
          </div>

          <!-- Content -->
          <div class="about-content reveal-right">
            <div class="divider"></div>

            <p>
              I trained as an architect and spent years obsessing over how light moves through
              space, how materials age, and how a well-designed room can change how you feel.
              That eye for three-dimensional thinking now flows into everything I do — from
              brand identity systems to product aesthetics to spatial installations.
            </p>
            <p>
              I believe the best design is rooted in <strong>warmth</strong> — it should feel
              considered, human, and a little bit joyful. My work sits at the intersection of
              formal rigour and intuitive creativity. I love a good moodboard, a strong cup of
              tea, and clients who care deeply about the details.
            </p>

            <div class="about-stats">
              <div>
                <p class="stat__number">8+</p>
                <p class="stat__label">Years of practice</p>
              </div>
              <div>
                <p class="stat__number">40+</p>
                <p class="stat__label">Projects delivered</p>
              </div>
              <div>
                <p class="stat__number">3</p>
                <p class="stat__label">Studio awards</p>
              </div>
            </div>

            <div style="display: flex; gap: var(--space-4); flex-wrap: wrap; margin-top: var(--space-4);">
              <a href="index.html" class="btn btn--primary" id="about-cta-work">See My Work</a>
              <a href="contact.html" class="btn btn--outline" id="about-cta-contact">Get in Touch</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}
