<template>
    <div class="header">
        <div class="logo">商会管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" :src="avatar">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>

    import Api from 'src/api/api';
    import common from 'src/service/commonFunction';

    export default {
        mixins: [common],
        data() {
            return {
                name: ''
            }
        },
        computed: {
            username() {
                let power_name = localStorage.getItem('power_name');
                let nick_name = localStorage.getItem('nick_name');
                let username = nick_name + '[' + power_name + ']';
                return username ? username : this.name;
            },
            avatar() {
                let avatar_url = localStorage.getItem('avatar');
                return this.getUploadUrl(avatar_url);
            }
        },
        methods: {
            handleCommand(command) {
                if (command == 'logout') {
                    Api.logout().then(() => {
                        localStorage.clear();
                        this.$router.push('/login');
                    }).catch(e => {
                        localStorage.clear();
                        this.$router.push('/login');
                    });
                }
            }
        }
    }
</script>

