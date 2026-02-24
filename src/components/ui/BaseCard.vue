<template>
  <div class="product-card-wrapper">
    <div class="card h-100 ">
      <div class="card-img">
        <img :src="item.image" class="main-product-img" />

        <div
          class="cati left-tag text-light bg-opacity-100   bg-danger"  
          v-if="item.categories && item.categories.length > 0"
        >
          <i class="bi bi-tag-fill me-1"></i>
          {{ item.categories[0].name }}
        </div>
      </div>

      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div class="">
            <h5 class="product-title">{{ item.title }}</h5>

            <div class="product-meta d-flex gap-2">
              <span>{{ item.description }}</span>
            </div>
            <div class="price-box text-success">
              <span class="">$</span>
              <span class="amount ">{{ item.price }}</span>
            </div>
          </div>
        </div>

        <div class="footer-card">
          <div class="creator-profile" v-if="item.creator">
            <img
              :src="item.creator.avatar"
              class="creator-avatar"
              alt="creator"
            />
            <div class="creator-info">
              <span class="creator-name">{{ item.creator.name }}</span>
              <span class="date">{{
                new Date(item.created_at).toLocaleDateString()
              }}</span>
            </div>
          </div>

          <div class="action-area">
            <slot name="action" :product="item"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// get Object 'item' from API (must have  Title, Price, Image, and  Creator)
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.card {
  border-radius: 28px;
  border: 1px solid #f2f4f7;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(9, 60, 135, 0.1);
}

.card-img {
  position: relative;
  width: calc(100% - 24px);
  height: 260px;
  margin: 12px auto;
  overflow: hidden;
  border-radius: 20px;
}
.price-box {
  color: var(--bs-main);
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin-top: 5px;
}

.price-box span:first-child {
  font-size: 1rem;
  font-weight: 600;
}

.amount {
  font-size: 1.7rem;
  font-weight: 800;
  line-height: 1;
}

.main-product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cati {
  position: absolute;
  top: 15px;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
}

.left-tag {
  left: 15px;
}

.right-tag {
  right: 15px;
  background: #bfc2f2;
  color: #093c87;
}

.card-body {
  padding: 0 20px 20px 20px;
}

.product-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 10px;
}

.product-meta {
  font-size: 0.85rem;
  color: #718096;
  margin-bottom: 15px;
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

.creator-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.creator-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.creator-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a202c;
}

.date {
  font-size: 0.75rem;
  color: #a0aec0;
  margin-top: 2px;
}

.action-area {
  display: flex;
  align-items: center;
}
</style>
