<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'villaCenter',
                        title: '别墅中心',
                        subs: [
                            {
                                index: 'board',
                                title: '公告栏'
                            },
                            {
                                index: 'baseInfo',
                                title: '基本信息'
                            },
                            {
                                index: 'baseFacility',
                                title: '基础设施'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'repairManage',
                        title: '物业管理',
                        subs: [
                            {
                                index: 'repairManage',
                                title: '网上报修处理'
                            },
                            {
                                index: 'opinionManage',
                                title: '意见/投诉管理'
                            },
                          
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'CustomerManage',
                        title: '用户管理',
                        subs: [
                            {
                                index: 'CustomerManage',
                                title: '住户管理'
                            },
                            {
                                index: 'adminManage',
                                title: '管理员管理'
                            },
                          
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'buildingManage',
                        title: '楼栋管理',
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 105px;
        bottom:0;
        background: #ffffff;
        /* z-index:99999; */
    }
    .sidebar > ul {
        height:100%;
    }
    .el-menu-vertical-demo {
        background: #ffffff !important;
    }
</style>
