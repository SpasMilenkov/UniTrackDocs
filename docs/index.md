---
layout: home
title: UniTrack Docs
hero:
  name: "UniTrack"
  text: "Modern University Management System"
  tagline: Streamline your educational institution with our comprehensive management solution
  image:
    src: /logo.png
    alt: UniTrack Logo
  actions:
    - theme: brand
      text: Get Started
      link: /en/intro
    - theme: alt
      text: View on GitHub
      link: https://github.com/SpasMilenkov/UniTrackRemaster
---

<div class="landing-container">
  <div class="project-info">
    <h2>🎯 About This Project</h2>
    <p>UniTrack was created as a Diploma Project by <strong>Spas Milenkov</strong>, a student of Software Science at Technical University Sofia.</p>
    <p>This project demonstrates the application of modern software development principles and technologies to solve real-world educational management challenges.</p>
    <div class="author-card">
      <div class="author-info">
        <h3>Spas Milenkov</h3>
        <p>Software Science Student</p>
        <p>Technical University Sofia</p>
        <div class="social-links">
          <a href="https://github.com/SpasMilenkov" target="_blank" class="social-link">GitHub</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.landing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.animated-card {
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(59, 130, 246, 0.1));
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.animated-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.project-info {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  margin: 4rem 0;
  border-left: 4px solid var(--vp-c-brand);
}

.author-card {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
}

.author-info {
  flex: 1;
}

.author-info h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.author-info p {
  margin: 0.2rem 0;
  opacity: 0.8;
}

.social-links {
  margin-top: 0.75rem;
}

.social-link {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.2s ease;
}

.social-link:hover {
  background: var(--vp-c-brand-dark);
}

.cta-section {
  text-align: center;
  margin: 4rem 0 2rem;
}

.cta-button {
  display: inline-block;
  background: var(--vp-c-brand);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-weight: bold;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-button:hover {
  background: var(--vp-c-brand-dark);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .author-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
