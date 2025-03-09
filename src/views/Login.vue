<template>
  <div class="login">
    <h1>綴り</h1>
    <p>気持ちを記録し<br>
      本当の自分を見つけましょう</p>
    <form @submit.prevent="login">
      <div class="input">
        <input type="text" v-model="userid" @focus="hidePlaceholder" @blur="showPlaceholder" placeholder=" " />
        <label v-if="showUserIdPlaceholder">ユーザーID</label>
      </div>
      <div class="input">
        <input type="password" v-model="password" placeholder="パスワード" />
      </div>
      <button type="submit">ログイン</button>
      <button type="button" @click="register">登録</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import config from '@/config.ts'


const userid = ref('');
const password = ref('');
const showUserIdPlaceholder = ref(true);
const router = useRouter();
const errorMessage = ref('');

const hidePlaceholder = () => {
  showUserIdPlaceholder.value = false;
};

const showPlaceholder = () => {
  if (!userid.value) {
    showUserIdPlaceholder.value = true;
  }
};

const login = async () => {
  try {
    const response = await axios.post(config.apiUrl + '/api/login', { userid: userid.value, password: password.value });
    // const token = response.data.token;
    // localStorage.setItem('token', token);
    console.log('Login success:', response.data);
    // 一覧画面へ
    router.push('/list');
  } catch (error) {
    console.error('Login failed:', error);
    if (axios.isAxiosError(error) && error.response) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'ログインに失敗しました';
    }
  }
};

const register = async () => {

	if (userid.value.length < 8 || userid.value.length > 16 ||
		password.value.length < 8 || password.value.length > 16 ||
		!/^[a-zA-Z0-9!@#$%^&*()]+$/.test(userid.value) ||
		!/^[a-zA-Z0-9!@#$%^&*()]+$/.test(password.value) ||
		!/[a-zA-Z]/.test(userid.value) || !/[0-9]/.test(userid.value) ||
		!/[a-zA-Z]/.test(password.value) || !/[0-9]/.test(password.value)) {
      errorMessage.value = 'ユーザー名またはパスワードの形式が正しくありません。';
      return;
	}

  const confirmPassword = prompt('パスワードを再入力してください');
  if (confirmPassword === password.value) {
    try {
      const response = await axios.post(config.apiUrl + '/api/register', { userid: userid.value, password: password.value });
      console.log('register success:', response.data);
      router.push('/list');
    } catch (error) {
      console.error('Login failed:', error);
      if (axios.isAxiosError(error) && error.response) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = '登録が失敗しました';
    }
    }
  } else {
    alert('パスワードが一致しません');
  }
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