<template>
    <div class="login-wrap">
        <div class="ms-title">商会管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" name="username" placeholder="请输入登录用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" name="password"
                              v-model="ruleForm.password"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;"
                   v-if="error_message == null || error_message === ''">{{error_message}}</p>
            </el-form>
        </div>
    </div>
</template>

<script>

    import md5 from 'md5';
    import Api from 'src/api/api';
    import clientStorage from 'src/service/storage';
    import createRouter from 'src/service/createRouter';

    export default {
        data: function () {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                error_message: null,
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 4, max: 20, message: '用户名长度在 4 到 20个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            let self = this;
            document.onkeydown = function (event) {
                let e = event || window.event;
                if (e && e.keyCode == 13) { //回车键的键值为13
                    self.submitForm('ruleForm');
                }
            };
        },
        methods: {
            setInfo(data) {
                const manager = data.manager;
                localStorage.clear();
                localStorage.setItem('token', manager.token);
                localStorage.setItem('nick_name', manager.nick_name);
                localStorage.setItem('avatar', manager.avatar);
                localStorage.setItem('power_name', manager.power_name);
                localStorage.setItem('user_id', manager.id);
                localStorage.setItem('power', manager.power);
                this.setPower(manager.power);
                clientStorage.setItem('manager_power', data.manager_power);
                clientStorage.setItem('continent', data.continent);
                clientStorage.setItem('business_type', data.business_type);
                clientStorage.setItem('router_config', data.router);
                clientStorage.setItem('sidebar_config', data.sidebar);
            },
            setPower(power) {
                let uiPower = {
                    create: true,
                    update: true,
                    delete: true
                };
                switch (power) {
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        uiPower.delete = false;
                        break;
                    default:
                        uiPower.create = false;
                        uiPower.update = false;
                        uiPower.delete = false;
                }
                clientStorage.setItem('ui_power', uiPower);
            },
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let postBody = {
                            'username': this.ruleForm.username.replace(/(^\s*)|(\s*$)/g, ""),
                            'password': md5(md5(this.ruleForm.password)),
                            'platform': 'web',
                        };
                        let data = await Api.login(postBody);
                        this.setInfo(data);
                        let rougerConfig = createRouter.getRouter();
                        this.$router.addRoutes(rougerConfig);
                        this.$router.push({name: 'index'});
                    }
                });

            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
