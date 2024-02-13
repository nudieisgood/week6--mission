<template>
  <div> 後臺管理</div>
  <div class="bar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/admin/products">後臺產品管理</RouterLink>
    <RouterLink to="/admin/orders"> 後台訂單管理 </RouterLink>
  </div>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from "vue-router";

const router = useRouter();

const checkAuth = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  if (token) {
    axios.defaults.headers.common.Authorization = token;
    axios.post(`${import.meta.env.VITE_API}/api/user/check`)
  } else {
    alert("請登入admin帳號。");
    router.push("/login");
  }

};

onMounted(() => {
  checkAuth();
});
</script>

<style lang="scss" scoped>
.bar {
  display: flex;
  gap: 20px;
}
</style>
