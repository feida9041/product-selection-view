<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" :rules="rules" class="demo-ruleForm">
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
                    <el-progress v-show="upload.showProgress" :color="upload.progressStatus"
                                 :percentage="upload.uploadProgress"></el-progress>
                </el-form-item>
                <el-form-item label="带剪裁头像" prop="avatar_cop">
                    <vue-core-image-upload
                        :crop="true"
                        @:imageuploaded="imageuploaded"
                        @:errorhandle="handleError"
                        :max-file-size="5242880"
                        extensions="png,gif,jpeg,jpg"
                        url="http://192.168.18.180:8000/api/v1/admin/upload/">
                        <img width="150" src="http://img1.vued.vanthink.cn/vuededa653aa59d1a1287d9a6e18890a7e51.png"/>
                        <!--<img v-if="ruleForm.avatar_cop" :src="ruleForm.avatar_cop" class="avatar">-->
                    </vue-core-image-upload>

                </el-form-item>

                <el-form-item label="活动名称" prop="name" class="base-form-group">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass" class="base-form-group">
                    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" class="base-form-group">
                    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop="age" class="base-form-group">
                    <el-input type="age" v-model.number="ruleForm.age" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="即时配送" prop="delivery">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质" prop="type" >
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="编辑器">
                    <quill-editor ref="myTextEditor" v-model="ruleForm.content"></quill-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import VueCoreImageUpload from 'vue-core-image-upload';
    import baseUploadHelper from 'src/service/baseUpload';
    import { quillEditor } from 'vue-quill-editor';


    export default {
        mixins: [baseUploadHelper],
        components: {
            VueCoreImageUpload,quillEditor
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    avatar: '',
                    avatar_cop: '',
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    pass: '',
                    checkPass: '',
                    age: '',
                    content: 'ttt',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    age: [
                        {required: true, message: '年龄不能为空'},
                        {type: 'number', message: '年龄必须为数字值'}
                    ]
                }
            };
        },
        methods: {
            imageuploaded(res) {
                console.log(res)
            },
            handleError() {
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            },

            handleUploadSuccess(res, file) {
                this.upload.showProgress = false;
                this.ruleForm.avatar = file.response.data;
            },
            submitForm(formName) {
                console.log(this.ruleForm);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message.success('提交成功！');
                    } else {
                        return false;
                    }
                });

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
