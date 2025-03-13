<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import config from '@/utils/config'

import CommonBtn1 from '@/components/CommonBtn1.vue';

const userid = ref('');
const password = ref('');
const showUserIdPlaceholder = ref(true);
const showPasswordPlaceholder = ref(true);
const router = useRouter();
const errorMessage = ref('');

const hidePlaceholder = (input: string) => {
  if (input == 'user') {
    showUserIdPlaceholder.value = false;
  } else {
    showPasswordPlaceholder.value = false;
  }
};

const showPlaceholder = (input: string) => {
  if (input == 'user') {
    if (!userid.value) {
      showUserIdPlaceholder.value = true;
    }
  } else {
    if (!password.value) {
      showPasswordPlaceholder.value = true;
    }
  }
};

const login = async () => {
  try {
    ////////////////////////////////////////////////////
    // バックエンドで記録したデータを取得するように変更
    /////////////////////////////////////////////////
    const response = await axios.post(config.apiUrl + '/api/login', { userid: userid.value, password: password.value });
    // const token = response.data.token;
    // localStorage.setItem('token', token);
    console.log('Login success:', response.data);
    localStorage.setItem('userid', userid.value); 
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
      //登録成功
      console.log('register success:', response.data);
      localStorage.setItem('userid', userid.value); 
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

<template>
  <div class="login">
    <h1>綴り</h1>
    <p class="message">気持ちを記録し<br>
      本当の自分を見つけましょう</p>
    <form @submit.prevent="login" class="loginForm">
      <p class="textLogin">ログイン</p>
      <div class="input" id="inputUser">
        <input type="text" v-model="userid" @focus="hidePlaceholder('user')" @blur="showPlaceholder('user')"
          placeholder=" " />
        <label v-if="showUserIdPlaceholder">ユーザーID</label>
      </div>
      <div class="input">
        <input type="password" v-model="password" @focus="hidePlaceholder('pass')" @blur="showPlaceholder('pass')"
          placeholder=" " />
        <label v-if="showPasswordPlaceholder">パスワード</label>
      </div>

      <CommonBtn1 class='loginBtn' :btnType="'submit'">ログイン</CommonBtn1>
      <CommonBtn1 class='registerBtn' :btnType="'button'" @click="register">登録</CommonBtn1>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.login {
  color: #1C2121;
  font-size: 16px;
}

.message {
  font-family: "ShipporiMincho-Medium";
  font-size: 24px;
  text-shadow: 2px 2px 4px #F4BAAA;
  width: 312px;
  margin: 0 auto;
}

.loginForm {
  width: min(50vw, 360px);
  margin: 32px auto;
  padding: 4px 32px;
  background-color: rgba(255, 242, 242, 0.75);
  border-radius: 16px;
}

.textLogin {
  font-size: 24px;
}

.input {
  position: relative;
  margin-bottom: 20px;
}

#inputUser {
  margin-top: -8px;
}

input {
  width: 100%;
  height: 32px;
}

label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #6D6D6D;
  pointer-events: none;
  transition: all 0.2s;
}

input:focus+label,
input:not(:placeholder-shown)+label {
  top: 0;
  transform: translateY(-100%);
  font-size: 12px;
  color: #1C2121;
}

.registerBtn {
  margin-top:16px;
  margin-bottom:32px;
}
</style>