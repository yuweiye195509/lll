/* eslint-disable vue/no-parsing-error */
<template>
  <div class="login">
    <el-form :model="form" label-width="80px" :rules="rules" status-icon ref="form">
      <img src="../assets/avatar.jpg" alt="">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // 用户名必填 长度：3-9
          { required: true, message: '用户名不能为空', trigger: ['blur', 'change'] },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '用密码不能为空', trigger: ['blur', 'change'] },
          { min: 6, max: 12, message: '长度在 6  到 12 个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.form.resetFields()
    },
    login () {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then(res => {
          const { meta, data } = res.data
          if (meta.status === 200) {
            localStorage.setItem('token', data.token)
            this.$router.push({ name: 'home' })
            // this.$message({
            //   message: '登陆成功',
            //   type: 'success'
            // })
            this.$message.success('登陆成功')
          } else {
            // this.$message({
            //   message: meta.msg,
            //   type: 'error'
            // })
            this.$message.error(meta.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
@color: #2d434c;
.login{
  background-color: @color;
  height: 100%;
  overflow: hidden;
  .el-form {
    background-color: #fff;
    width: 400px;
    margin: 200px auto;
    padding: 75px 40px 15px;
    border-radius: 20px;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -70px;
      border-radius: 50%;
      border: 10px solid #fff;
    }
    .el-button:last-child {
      margin-left: 80px;
    }
  }
}
</style>
