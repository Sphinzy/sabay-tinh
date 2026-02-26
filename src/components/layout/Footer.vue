<template>
  <footer class="site-footer mt-5">
    <div class="container">
      <div class="row py-5">
        <div class="col-lg-4 mb-4 mb-lg-0">
          <h4 class="fw-bold text-dark mb-3">
            Sabay<span class="text-main">Jay</span>
          </h4>
          <p class="footer-text mb-4" style="width: 300px">
            The most trusted platform to buy and sell pre-loved items in your
            local community.
          </p>
          <div class="social-links d-flex gap-2">
            <a href="#" class="social-btn"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-btn"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-btn"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="social-btn"><i class="bi bi-tiktok"></i></a>
          </div>
        </div>

        <div class="col-6 col-md-3 col-lg-2 mb-4 mb-md-0">
          <h6 class="fw-bold text-main mb-4 fs-4">Start Selling</h6>
          <ul class="list-unstyled footer-links">
            <li><a href="#">Start Selling</a></li>
            <li><a href="#">Seller Handbook</a></li>
            <li><a href="#">Listing Rules</a></li>
            <li><a href="#">Success Stories</a></li>
          </ul>
        </div>

        <div class="col-6 col-md-3 col-lg-2 mb-4 mb-md-0">
          <h6 class="fw-bold text-main fs-4 mb-4">Start Buying</h6>
          <ul class="list-unstyled footer-links">
            <li><a href="#">Browse Categories</a></li>
            <li><a href="#">Safety Center</a></li>
            <li><a href="#">Buyer Protection</a></li>
            <li><a href="#">Mobile App</a></li>
          </ul>
        </div>

        <div class="col-lg-4">
          <h6 class="fw-bold text-main fs-4 mb-4">Stay Updated</h6>
          <p class="footer-text small">
            Get notifications for new items in your area.
          </p>
          <div class="newsletter-box-white mt-3 shadow-sm">
            <input
              type="email"
              class="newsletter-input"
              placeholder="Enter your emial"
            />
            <button class="newsletter-btn btn-main">Join</button>
          </div>
        </div>
      </div>

      <div class="row py-4 border-top border-light-subtle">
        <div class="col-md-6 text-center text-md-start">
          <p class="footer-text small mb-0">
            &copy; 2026 SbyTinh.com. All rights reserved.
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end mt-2 mt-md-0">
          <ul class="list-inline mb-0 small">
            <li class="list-inline-item">
              <a href="#" class="footer-text text-decoration-none">Privacy</a>
            </li>
            <li class="list-inline-item mx-2 text-muted opacity-50">·</li>
            <li class="list-inline-item">
              <a href="#" class="footer-text text-decoration-none">Terms</a>
            </li>
            <li class="list-inline-item mx-2 text-muted opacity-50">·</li>
            <li class="list-inline-item">
              <a href="#" class="footer-text text-decoration-none">Sitemap</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #ffffff;
  padding-top: 60px;
  border-top: 1px solid #f1f5f9;
}

.text-main-gradient {
  background: linear-gradient(45deg, #00d2ff, #92fe9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-text {
  color: #64748b;
}

.footer-links li {
  margin-bottom: 12px;
}
.footer-links a {
  color: #64748b;
  text-decoration: none;
  font-size: 0.95rem;
  transition: 0.3s;
}
.footer-links a:hover {
  color: var(--bs-main);
  padding-left: 5px;
}.newsletter-box-white {
  display: flex;
  background: #f8fafc;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}
.newsletter-input {
  flex-grow: 1;
  background: transparent;
  border: none;
  padding-left: 15px;
  outline: none;
  font-size: 0.9rem;
  color: #334155;
}
.newsletter-btn {
 

  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.3s;
}
.newsletter-btn:hover {
  background: #000000;
  transform: scale(1.02);
}

.social-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #f1f5f9;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: 0.3s;
}
.social-btn:hover {
  background: #0f172a;
  color: #ffffff;
  transform: translateY(-3px);
}
</style>