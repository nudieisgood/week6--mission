<template>
  <div>{{ product.title }}</div>
  <div>{{ product.price }}</div>
  <div>{{ product.description }}</div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter();
const product = ref({})
const { id } = router.currentRoute.value.params

const getProduct = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/product/${id}`)
  console.log(res.data.product)
  product.value = res.data.product
}
onMounted(() => {
  getProduct()
});


</script>

<style lang="scss" scoped></style>