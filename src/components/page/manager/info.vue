<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> {{this.$route.meta.breadcrumb.parent}}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{this.$route.meta.breadcrumb.child}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="ruleForm"
                     :model="ruleForm"
                     label-width="100px"
                     :rules="rules"
                     class="demo-ruleForm"
                     label-position="left"
                     element-loading-text="拼命加载中"
                     v-loading="loading">
                <el-form-item label="头像" prop="avatar">
                    <el-upload
                        action=""
                        class="avatar-upload"
                        :show-file-list="false"
                        :on-success="handleUploadSuccess"
                        :on-error="handleUploadError"
                        :on-remove="handleUploadRemove"
                        :on-change="handleUploadChange"
                        :on-progress="handelUploadProgress"
                        :http-request="baseUpload"
                        :before-upload="beforeUploadCheckIMG"
                    >
                        <img v-if="ruleForm.avatar" :src="getUploadUrl(ruleForm.avatar)" class="form-avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 43%;"></i>
                    </el-upload>
                    <el-col :span="3">
                        <el-progress v-show="upload.showProgress" :color="upload.progressStatus"
                                     :percentage="upload.uploadProgress"></el-progress>
                    </el-col>
                </el-form-item>
                <el-form-item label="用户名" prop="username" class="base-form-group">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nick_name" class="base-form-group">
                    <el-input v-model="ruleForm.nick_name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" class="base-form-group">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" class="base-form-group">
                    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="power">
                    <el-select v-model="ruleForm.power" placeholder="请选择" :disabled="isSystem()">
                        <el-option v-for="(item, index) in managerPower" :label="item.label"
                                   :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if="showUpdate()" @click="submitForm()">保存</el-button>
                    <el-button v-if="this.$route.meta.action=='add'" @click="clearForm()">清空</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import md5 from 'md5';
    import baseUploadHelper from 'src/service/baseUpload';
    import clientStorage from 'src/service/storage';
    import uiPower from 'src/service/uiPower';
    import baseForm from 'src/service/baseForm';

    export default {
        mixins: [uiPower, baseUploadHelper, baseForm],
        data() {
            let validatePass = (rule, value, callback) => {
                if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                managerPower: clientStorage.getItem('manager_power'),
                saveUrl: 'manager',
                getUrl: 'manager/',
                jumpName: 'managerlist',
                ruleForm: {
                    id: '',
                    avatar: '',
                    username: '',
                    nick_name: '',
                    password: '',
                    checkPass: '',
                    power: '',
                    is_system: 0
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
                    ],
                    nick_name: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    power: [
                        {required: true, message: '请选择权限', trigger: 'change'}
                    ],
                    password: [
                        {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'},
                    ],
                    checkPass: [
                        {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleUploadSuccess(res, file) {
                setTimeout(() => {
                    this.upload.showProgress = false;
                }, 500);
                this.ruleForm.avatar = file.response.data.path;
            },
            async addAction() {
                this.rules.password.push({required: true, message: '请输入密码', trigger: 'change'});
                this.rules.checkPass.push({required: true, message: '请输入密码', trigger: 'change'});
                this.clearForm();
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            },
            saveData() {
                if(this.ruleForm.password){
                    this.ruleForm.password = md5(md5(this.ruleForm.password));
                }
                return this.ruleForm;
            },
            isSystem() {
                if (this.ruleForm.is_system == '1') {
                    return true;
                }
                return false;
            }
        }
    }
</script>
