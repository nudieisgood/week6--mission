<template>
  <div class="container">
    <div class="mt-4">
      <!-- 產品Modal -->
      <UserProductModal ref="userProductModalRef" :product="product" @add-to-cart="addToCart" />
      <!-- 產品Modal -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id" @click="goToProduct(item.id)" class="item">
            <td style="width: 200px">
              <div style="
                      height: 100px;
                      background-size: cover;
                      background-position: center;
                    " :style="{ backgroundImage: `url(${item.imgUrl})` }"></div>
            </td>
            <td>
              <div class="h5" v-if="!item.price"> {{ item.origin_price }} 元 </div>
              <del class="h6">原價 {{ item.origin_price }} 元</del>
              <div class="h5">現在只要 {{ item.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button @click="getProductById(item.id)" type="button" class="btn btn-outline-secondary">
                  <i v-if="isLoading.loadingItem === item.id" class="fas fa-spinner fa-pulse"></i> 查看更多 </button>
                <button @click="addToCart(item.id)" type="button" class="btn btn-outline-danger">
                  <i v-if="isLoading.loadingItem === item.id" class="fas fa-spinner fa-pulse"></i> 加到購物車 </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import UserProductModal from '@/components/UserProductModal.vue'
import { useRouter } from "vue-router";

const router = useRouter();
const userProductModalRef = ref(null)


const isLoading = ref({ loadingItem: '' })
const products = ref([])
const product = ref({})


const getProducts = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/products/all`)
    products.value = res.data.products
  } catch (error) {
    alert(error.response.data.message)
  }
}
const getProductById = async (id) => {
  try {
    isLoading.value.loadingItem = id
    const res = await axios.get(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/product/${id}`)
    isLoading.value.loadingItem = ''
    product.value = res.data.product
    userProductModalRef.value.openModal()
  } catch (error) {
    console.log(error)
    alert(error.response.data.message)
  }
}
const addToCart = async (id, qty = 1) => {
  isLoading.value.loadingItem = id
  const data = {
    product_id: id,
    qty
  }
  try {
    const res = await axios.post(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/cart`, { data })
    alert(res.data.message)
    isLoading.value.loadingItem = ''
    userProductModalRef.value.hideModal()
  } catch (error) {
    alert(error.response.data.message)
  }
}

const goToProduct = (id) => {
  router.push(`/product/${id}`);
}

onMounted(() => {
  getProducts()
})
</script>

<style lang="scss" scoped>
.item {
  cursor: pointer;
}
</style>
