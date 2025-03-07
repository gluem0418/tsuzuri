<template>
  <div class="login">
    <h1>綴り</h1>
    <p>気持ちを記録し<br>
      本当の自分を見つけましょう</p>
    <form @submit.prevent="login">
      <div class="input">
        <input type="text" v-model="username" @focus="hidePlaceholder" @blur="showPlaceholder" placeholder=" " />
        <label v-if="showUserIdPlaceholder">ユーザーID</label>
      </div>
      <div class="input">
        <input type="password" v-model="password" placeholder="パスワード" />
      </div>
      <button type="submit">ログイン</button>
      <button type="button" @click="register">登録</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const showUserIdPlaceholder = ref(true);
const router = useRouter();

const hidePlaceholder = () => {
  showUserIdPlaceholder.value = false;
};

const showPlaceholder = () => {
  if (!username.value) {
    showUserIdPlaceholder.value = true;
  }
};

const login = async () => {
  try {
    // const response = await axios.post('/api/login', { username: username.value, password: password.value });
    // const token = response.data.token;
    // localStorage.setItem('token', token);
    router.push('/list');
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const register = () => {
  router.push('/register');
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.input {
  position: relative;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #aaa;
  pointer-events: none;
  transition: all 0.2s;
}

input:focus+label,
input:not(:placeholder-shown)+label {
  top: 0;
  transform: translateY(-100%);
  font-size: 12px;
  color: #000;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>