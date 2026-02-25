<template>
  <div class="product-card-wrapper">
    <div class="card h-100">
      
      <!-- IMAGE SKELETON -->
      <div class="card-img">
        <div class="skeleton skeleton-img"></div>
      </div>

      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <!-- TITLE -->
            <div class="skeleton skeleton-title mb-2"></div>

            <!-- DESCRIPTION -->
            <div class="skeleton skeleton-text mb-2"></div>

            <!-- PRICE -->
            <div class="price-box">
              <div class="skeleton skeleton-price"></div>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="footer-card">
          <div class="creator-profile">
            <div class="skeleton skeleton-avatar"></div>
            <div class="creator-info">
              <div class="skeleton skeleton-small mb-1"></div>
              <div class="skeleton skeleton-small"></div>
            </div>
          </div>

          <div class="action-area">
            <div class="skeleton skeleton-btn"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Static skeleton - no props needed
</script>

<style scoped>
/* 🔹 Shimmer animation */
@keyframes shimmer {
  0% { background-position: -400% 0; }
  100% { background-position: 400% 0; }
}

.skeleton {
  background-image: linear-gradient(90deg, #e0e0e0 25%, #f8f8f8 37%, #e0e0e0 63%);
  background-size: 400% 100%;
  animation: shimmer 7.5s linear infinite;
  border-radius: 6px;
}

/* Card matches BaseCard style */
.card {
  border-radius: 28px;
  border: 1px solid #f2f4f7;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  height: 100%;
}

.card-img {
  width: calc(100% - 24px);
  height: 260px;
  margin: 12px auto;
  border-radius: 20px;
  overflow: hidden;
}

/* Skeleton Sizes */
.skeleton-img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.skeleton-title {
  height: 22px;
  width: 60%;
}

.skeleton-text {
  height: 14px;
  width: 100%;
}

.skeleton-price {
  height: 24px;
  width: 40%;
}

.footer-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f2f4f7;
}

.creator-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skeleton-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

.creator-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skeleton-small {
  height: 12px;
  width: 80px;
}

.skeleton-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}
</style>