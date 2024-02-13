<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <template v-if="errorMsg">
        <h3 class="text-danger">{{ errorMsg }}</h3>
      </template>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username" placeholder="name@example.com" required autofocus
              v-model="user.username" />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="Password" required
              v-model="user.password" />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit"> 登入 </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const user = ref({ username: '', password: '' })
const errorMsg = ref('')

const login = async () => {

  axios
    .post(`${import.meta.env.VITE_API}/admin/signin`, user.value)
    .then((res) => {
      const token = res.data.token
      const exp = res.data.expired
      document.cookie = `token=${token}`
      document.cookie = `expDate=${exp}`
      router.push('/admin/products')
    })
    .catch((error) => {
      errorMsg.value = error.data.message
    })
}

</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.products-link {
  position: fixed;
  top: 10px;
  right: 10px;
}

.products-link a {
  color: black;
  text-decoration: none;
}
</style>
