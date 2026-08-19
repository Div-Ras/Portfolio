# Divya Rastogi Portfolio — Redesign

## Project Context

This is the personal portfolio website of Divya Rastogi, an architect, designer, product designer, artist, and recent Master's graduate in Interaction Design from the University of Queensland, Australia.

The website is intended to support her transition into a Product Designer role.

The goal is to make the website feel like **Divya**, rather than like a generic UX/product-design portfolio.

Her background includes architecture, landscape design, interaction design, product design, and art. Her multidisciplinary and artistic perspective should be treated as a strength and should be visible throughout the website.

---

## Redesign Intent

The existing website is functional and hosted in production.

The redesign should:

- feel personal and distinctive
- reflect Divya's artistic nature
- make her multidisciplinary background visible
- avoid looking like a generic or AI-generated UX/product-design portfolio
- use visual storytelling wherever possible
- give the user room to breathe
- balance strong visual composition with usability
- show how Divya thinks, not only what she has worked on
- make the website feel like a representation of Divya herself, rather than simply a collection of professional projects

The website should communicate the connection between her different disciplines rather than treating architecture, art, interaction design and product design as unrelated experiences.

The eventual direction may include stronger use of:

- photography
- artwork
- architecture work
- hand sketches
- visual experiments
- personal observations
- writing/commentary
- spatial and natural elements
- distinctive visual composition
- editorial/art-portfolio-like presentation

These are design directions to explore, not requirements to implement immediately.

---

## Working Principles

### Incremental Redesign

This website will be redesigned incrementally.

There will be many individual fixes, experiments and larger design changes over time.

**Do not proactively implement changes based on the observations in this document.**

Only work on changes explicitly requested in the current task/prompt.

### Preserve Intent

When implementing a requested change:

- preserve the existing implementation patterns where practical
- avoid unrelated refactoring
- do not introduce design changes that were not requested
- do not assume that an observation is automatically an implementation requirement
- do not make broad visual changes when a targeted change has been requested

### Design Guardrail

Use this document as the overall design context for the project.

If a requested implementation appears to:

- significantly conflict with the redesign intent
- move the website toward a generic/AI-generated portfolio aesthetic
- undermine the artistic or multidisciplinary identity
- introduce a major design direction that has not been discussed
- expand significantly beyond the requested scope

flag the concern before making the change.

Do not silently make design decisions on behalf of the designer.

---

# Current Assessment

The following are observations gathered during the initial assessment of the existing website.

**These are NOT tasks to implement.**

They represent things that may be addressed during the redesign. Work on them only when explicitly requested.

## Home Page — Observations

1. Add some animation to card images.
2. The number "2" appears before "Selected Portfolio Work".
3. Hover state and selected state currently have the exact same effect, which creates confusion.
4. Tab buttons could have slightly more rounding on the edges.
5. Home and About both talk about her work. The current arrangement should be reconsidered.
6. Consider whether Divya's photograph belongs on the homepage.
7. The website currently does not show her artistic nature. Art is completely missing.
8. Ask Divya what her thinking was behind using a quill in the Resume button.
9. The browser tab is using the default icon rather than an intentional favicon/logo/icon.
10. "Divya Rastogi" is written in two colours. The reasoning and consistency of this treatment should be reconsidered.
11. There is a large amount of unused space on the right side of the homepage. The reason for this should be evaluated.

## About Page — Observations

1. The initial impression is TMI. There is too much information and the page creates information overload. The user should be eased into it.
2. The page contains too many paragraphs. A more visual approach, with photos followed by concise information, may work better — more like an art portfolio.
3. Divya likes Zaha Hadid. Explore elements of Zaha Hadid Architects' website as inspiration, particularly the soft scrolling experience and the feeling that there is no rush to scroll. Their navigation is also visually interesting.
4. Show elements of Divya's home/environment that speak to her. Artsy photographs of small details could communicate her attention to things that others may miss.
5. Show work from her architecture days, including hand sketches.
6. Optionally talk about inspirations such as people, art, culture and technology.

## Navbar — Observations

1. Resume is presented as a button, so it should not have an underline on hover.
2. Consider adding an open-in-new-tab/external-link icon to Resume to make its behaviour clear.

---

# Possible Content / Commentary Directions

The following are ideas that may be explored for homepage commentary or articles.

These are brainstorming ideas, not content requirements.

- Applying Japanese philosophies to product design.
- How merging different cultures with technology/design can produce innovative ideas.
- How elements of nature can be infused into technology to subconsciously capture users' attention and help users remain calm while exploring a product.
- What architecture can teach us about designing digital products.
- How spatial thinking can influence interaction and product design.

The actual topics and viewpoints should come from Divya.

---

# Current Implementation Scope

At any given point, a prompt will explicitly define the changes to be made.

Cursor should:

1. Read this document for context.
2. Follow the redesign intent and working principles.
3. Work only on the changes explicitly requested in the current prompt.
4. Treat the assessment above as observations rather than a backlog of tasks.
5. Flag potential conflicts with the redesign intent when appropriate.
6. Avoid making unrelated improvements simply because they appear in the assessment.

The redesign will evolve through multiple small implementation steps and larger design decisions.