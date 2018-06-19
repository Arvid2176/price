<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 100%;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
<template>
  <div class="layout">
    <Layout style="height:100%">
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu  theme="dark" width="auto" :active-name="this.$route.path" :open-names="openNames" @on-select="menuSelect" accordion>
          <div class="layout-logo-left">
            <!--<Icon type="paper-airplane" :size="logoSize"></Icon>-->
            <!--<span class="layout-text" style="font-size:25px"></span>-->
          </div>
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <Submenu :name="item.name" v-if="!item.leaf">
              <template slot="title">
                <Icon :type="item.iconCls" :size="iconSize"></Icon>
                <span class="layout-text" >{{item.name}}</span>
              </template>
              <template v-for="(child,childIndex) in item.children" v-if="!child.hidden">
                <Menu-item :name="child.path">{{child.name}}</Menu-item>
              </template>
            </Submenu>
            <template  v-if="item.leaf&&item.children.length>0">
              <Menu-item :name="item.children[0].path">
                <Icon :type="item.iconCls" :size="iconSize"></Icon>
                <span class="layout-text" >{{item.children[0].name}}</span>
              </Menu-item>
            </template>
          </template>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0,textAlign:'right'}" class="layout-header-bar">
          <span>企业信用监测系统</span>
          <!--<Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>-->
        </Header>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
          <router-view/>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>

  export default {

    data () {
      return {
        isCollapsed: false
      }
    },
    computed: {
      rotateIcon () {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {
      menuSelect(name) {
        console.log(name);
        this.$router.push({ path: name });
      },
      collapsedSider () {
        this.$refs.side1.toggleCollapse();
      }
    }
  }
</script>
