<template>
  <div>
    <a-layout class="components-layout-trigger">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <div class="logo" />
        <SiderMenu></SiderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="layout-header">
          <a-icon
            class="trigger"
            :type="collapsedIconClass"
            @click="() => (collapsed = !collapsed)"
          />
          <Header></Header>
        </a-layout-header>
        <a-layout-content class="layout-content">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer class="layout-footer">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import SiderMenu from './SiderMenu'

export default {
  components: {
    Header,
    Footer,
    SiderMenu
  },
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    collapsedIconClass() {
      return this.collapsed ? 'menu-unfold' : 'menu-fold'
    }
  }
}
</script>

<style lang="less" scoped>
.components-layout-trigger {
  min-height: 100vh;
}

.components-layout-trigger .trigger {
  font-size: 20px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.components-layout-trigger .trigger:hover {
  color: #1890ff;
}

.components-layout-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.components-layout-trigger .layout-header {
  display: flex;
  background: #fff;
  padding: 0;
}

.components-layout-trigger .layout-content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 80vh;
}

.components-layout-trigger .layout-footer {
  text-align: center;
}
</style>
