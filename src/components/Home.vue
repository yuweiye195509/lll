<template>
  <div class="home">
    <el-container class="home">
      <el-header>
        <div class="logo"></div>
        <div class="title"><h1>电商后台管理系统</h1></div>
        <div class="logout">欢迎你，xxx <a href="javascrip:;" @click="logout">退出</a></div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            unique-opened
            :default-active="active"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router>
            <el-submenu :index="menu.path" v-for="menu in menuList" :key="menu.id">
              <template v-slot:title>
                <i class="el-icon-location"></i>
                <span>{{menu.authName}}</span>
              </template>
                <el-menu-item :index="submenu.path" v-for="submenu in menu.children" :key="submenu.id">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{submenu.authName}}</span>
                  <!-- <template v-slot:title><span>用户列表</span></template> -->
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      menuList: []
    }
  },
  created () {
    // 发送ajax请求
    axios({
      method: 'get',
      url: 'http://localhost:8888/api/private/v1/menus',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res => {
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.menuList = data
        console.log(this.menuList)
      }
    })
  },
  methods: {
    logout () {
      this.$confirm('你确定要退出系统吗？', '温馨提示', { type: 'warning' }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success7('退出成功')
      }).catch(() => {
        this.$message.info('取消退出')
      })
    }
  },
  computed: {
    active () {
      return this.$route.path.slice(1)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
html,body {
  height: 100%;
}
.home {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    display:flex;
    line-height: 60px;
    .logo,
    .logoout {
      width:180px;
    }
    .title {
      flex: 1;
      text-align: center;
      color: #ffffff;
    }
    .logo {
      background: url("../assets/logo.png") no-repeat center center;
      background-size: contain;
    }
    .logout {
      font-weight:700;
      a {
        color: orange;
      }
    }
  }
  .el-aside {
    background-color: #545c64;
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #eaeef1
  }
}

</style>
