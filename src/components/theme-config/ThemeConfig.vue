<template>
  <div class="ant-dropdown-wrapper">
    <a-Dropdown :trigger="['click']">
      <a class="ant-dropdown-link" href="#">
        <a-icon type="skin" class="header-icon-skin" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item key="0">
          <div class="setting-theme-color-wrapper">
            <a-tooltip
              class="setting-theme-color-colorBlock"
              v-for="item in colorList"
              :key="item.color"
            >
              <template slot="title">
                {{ item.key }}
              </template>
              <a-tag :color="item.color" @click="headleChangeColor(item.color)">
                <a-icon
                  type="check"
                  v-if="item.color === primaryColor"
                ></a-icon>
              </a-tag>
            </a-tooltip>
            <span>自定义主题：</span>
            <colorPicker v-model="primaryColor" @change="headleChangeColor" />
          </div>
        </a-menu-item>
      </a-menu>
    </a-Dropdown>
  </div>
</template>

<script>
import { colorList } from 'config/settingConfig'
import { updateTheme } from 'utils/themeColorUtil'

export default {
  data() {
    return {
      colorList,
      primaryColor: '#1890FF'
    }
  },
  methods: {
    headleChangeColor(color) {
      this.primaryColor = color
      updateTheme(color)
    }
  }
}
</script>

<style lang="less">
.ant-dropdown-wrapper {
  margin-left: 20px;
}
.setting-theme-color-wrapper {
  display: flex;
  align-items: center;
}

.setting-theme-color-colorBlock {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  float: left;
  cursor: pointer;
  margin-right: 8px;
  padding-left: 0px;
  padding-right: 0px;
  text-align: center;
  color: #fff;
  font-weight: 700;

  i {
    font-size: 14px;
  }
}
.m-colorPicker .colorBtn {
  width: 20px !important;
  height: 20px !important;
  cursor: pointer;
}

.m-colorPicker .box {
  width: 210px !important;
}

.header-icon-skin {
  font-size: 20px;
}
</style>
