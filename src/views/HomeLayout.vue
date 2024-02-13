<template>
  <div>
    <div class="bar">
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink to="/products"> 產品列表 </RouterLink>
      <RouterLink to="/cart"> 購物車 </RouterLink>
      <RouterLink to="/login"> 登入 </RouterLink>
      <RouterLink to="/admin"> 前往後台 </RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  gap: 20px;
}
</style>
