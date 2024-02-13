<template>
  <div class="container">
    <div class="mt-4">
      <!-- 購物車列表 -->
      <div class="text-end">
        <button class="btn btn-outline-danger" type="button" @click="removeItemsFromCart">
          <i v-if="isDeleteCartsLoading" class="fas fa-spinner fa-pulse"></i>
          <span v-else>清空購物車</span>
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="(item, index) in cart.carts" :key="index">
              <td>
                <button @click="removeItemFromCartById(item.id)" type="button" class="btn btn-outline-danger btn-sm">
                  <i v-if="isLoading.loadingItem === item.id" class="fas fa-spinner fa-pulse"></i>
                  <span v-else>x</span>
                </button>
              </td>
              <td> {{ item.product.title }} <div class="text-success">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <input v-model.number="item.qty" @blur="updateCart(item)"
                      :disabled="isLoading.loadingItem === item.id" min="1" type="number" class="form-control" />
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <small class="text-success">折扣價：</small> {{ item.final_total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cart.total }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="my-5 row justify-content-center">
      <VeeForm ref="formRef" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <VeeField id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required" v-model="form.user.email" />
          <ErrorMessage name="email" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <VeeField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" v-model="form.user.name" />
          <ErrorMessage name="姓名" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <VeeField id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話" rules="required" v-model="form.user.tel" />
          <ErrorMessage name="電話" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <VeeField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="form.user.address" />
          <ErrorMessage name="地址" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="" id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const isLoading = ref({ loadingItem: '' })
const isDeleteCartsLoading = ref(false)

const cart = ref({})
const formRef = ref(null)
const form = ref({
  user: {
    name: '',
    email: '',
    tel: '',
    address: ''
  },
  message: ''
})

const removeItemsFromCart = async () => {
  isDeleteCartsLoading.value = true
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/carts`)
    alert(res.data.message)
    getCart()
  } catch (error) {
    alert(error.response.data.message)
  }
  isDeleteCartsLoading.value = false
}
const removeItemFromCartById = async (id) => {
  isLoading.value.loadingItem = id
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/cart/${id}`)
    alert(res.data.message)
    getCart()
  } catch (error) {
    alert(error.response.data.message)
  }
  isLoading.value.loadingItem = ''
}
const updateCart = async (item) => {
  isLoading.value.loadingItem = item.id
  const data = {
    product_id: item.product_id,
    qty: item.qty
  }
  try {
    await axios.put(
      `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/cart/${item.id}`,
      { data }
    )
    isLoading.value.loadingItem = ''
    getCart()
  } catch (error) {
    alert(error.response.data.message)
  }
}
const getCart = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/cart`)

    cart.value = res.data.data
  } catch (error) {
    alert(error.response.data.message)
  }
}

const createOrder = async () => {
  const data = form.value
  try {
    const res = await axios.post(`${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/order`, {
      data
    })
    alert(res.data.message)
    formRef.value.resetForm()
    getCart()
  } catch (error) {
    alert(error.response.data.message)
  }
}

onMounted(() => {
  getCart()
})
</script>

<style lang="scss" scoped></style>
