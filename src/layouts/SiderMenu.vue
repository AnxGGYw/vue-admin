<template>
  <div class="sub-menu-wrapper">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      mode="inline"
      theme="dark"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from './SubMenu'

export default {
  components: {
    SubMenu
  },
  created() {
    this.menuData = this.$_getMenuData(this.$router.options.routes)
  },
  data() {
    return {
      collapsed: false,
      menuData: [],
      selectedKeys: [],
      openKeys: []
    }
  },
  methods: {
    $_getMenuData(routes) {
      const menuData = []
      for (let route of routes) {
        if (route.name && !route.hideInMenu) {
          const newMenu = { ...route }
          delete newMenu.children
          if (route.children && !route.hideChildrenInMenu) {
            newMenu.children = this.$_getMenuData(route.children)
          }
          menuData.push(newMenu)
        } else if (
          !route.hideInMenu &&
          !route.hideChildrenInMenu &&
          route.children
        ) {
          menuData.push(...this.$_getMenuData(route.children))
        }
      }
      return menuData
    }
  }
}
</script>
<style lang="less" scoped></style>
