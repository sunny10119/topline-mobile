<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        clearable
        label="手机号"
        placeholder="请输入手机号"
        left-icon="contact"
        name='mobile'
        :error-message="errors.first('mobile')"
        v-validate="'required|digits:11'"
      />
      <van-field
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"
        left-icon="warn-o"
        name="code"
        :error-message="errors.first('code')"
        v-validate="'required|digits:6'"
      >
      <van-button slot="button" size="small" type="default">发送验证码</van-button>
      </van-field>
      <div class="loginBtn">
          <van-button @click="handleLogin()" type="info" class="btn">登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () {
    const dict = {
      custom: {
        mobile: {
          required: '请输入手机号码',
          digits: '手机号码必须是11位数字'
        },
        code: {
          required: '请输入验证码',
          digits: '验证码必须是6位数字'
        }
      }
    }
    this.$validator.localize('zh_CN', dict)
  },
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async handleLogin () {
      try {
        const data = await login(this.user)
        // console.log(data)
        this.$store.commit('setUser', data)
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log('登录失败' + err)
        this.$notify({ message: '手机号或验证码错误' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.loginBtn {
    padding: 30px 50px;
    .btn {
        width: 100%;
    }
}
</style>
