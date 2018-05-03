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
                <el-form-item label="仓库名称" prop="name" class="base-form-group">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="大洲" prop="continent">
                    <el-select v-model="ruleForm.continent" placeholder="请选择">
                        <el-option v-for="(item, index) in continentType" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" prop="address" class="base-form-group">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="面积(㎡)" prop="square_meter" class="base-form-group">
                    <el-input v-model.number="ruleForm.square_meter"></el-input>
                </el-form-item>
                <el-form-item label="业务类型" prop="business">
                    <el-checkbox-group v-model="ruleForm.business" size="small">
                        <el-checkbox-button
                            v-for="items in businessType"
                            :label="items.key"
                            name="business"
                            :key="items.key">{{items.label}}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-button @click="addContact">添加联系人</el-button>
                    <el-form-item
                        v-for="(contact, index) in ruleForm.contacts"
                        :label="'联系人' + (index+1)"
                        :key="contact.uid"
                        style="margin: 15px;"
                    >
                        <el-form-item label="头像">
                            <el-col :span="7">
                                <el-upload
                                    action=""
                                    class="avatar-upload"
                                    :show-file-list="false"
                                    :on-success="function(res,file,filelist){
                                    handleContactUploadSuccess(res,file,filelist,index);
                                    }"
                                    :http-request="baseUploadWithoutProgress"
                                    :before-upload="beforeUploadCheckIMG"
                                >
                                    <img v-if="ruleForm.contacts[index].avatar"
                                         :src="getUploadUrl(ruleForm.contacts[index].avatar)"
                                         class="form-avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon" style="position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 43%;"></i>
                                </el-upload>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="姓名" class="contacts-info">
                            <el-col :span="7">
                                <el-input v-model="contact.name"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="邮箱" class="contacts-info">
                            <el-col :span="7">
                                <el-input v-model="contact.email"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="电话" class="contacts-info">
                            <el-col :span="7">
                                <el-input v-model="contact.tel"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item class="contacts-info">
                            <el-button v-if="showDelete()" @click.prevent="removeContact(contact)">删除</el-button>
                        </el-form-item>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="PDF" prop="pdf">
                    <el-col :span="3" class="pdf-button">
                        <el-upload
                            action=""
                            :on-error="handleUploadError"
                            :on-remove="handlePDFRemove"
                            :on-success="handlePDFUploadSuccess"
                            :http-request="uploadPDF"
                            :before-upload="beforeUploadCheckPDF"
                            :on-exceed="handlePDFExceed"
                            multiple
                            :file-list="ruleForm.pdf"
                            :limit="1">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <el-progress v-show="upload.showProgress" :color="upload.progressStatus"
                                     :percentage="upload.uploadProgress"></el-progress>
                    </el-col>
                </el-form-item>
                <el-form-item label="轮播图片" prop="photos">
                    <el-upload
                        action=""
                        list-type="picture-card"
                        :limit="3"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handlePHOTOSRemove"
                        :on-success="handlePHOTOSUploadSuccess"
                        :http-request="baseUploadWithoutProgress"
                        :before-upload="beforeUploadCheckIMG"
                        :file-list="ruleForm.photos"
                        :on-exceed="handlePhotosExceed">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="简介" prop="introduce">
                    <el-input type="textarea"
                              :autosize="{ minRows: 4}"
                              v-model="ruleForm.introduce"></el-input>
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
    import baseUploadHelper from 'src/service/baseUpload';
    import clientStorage from 'src/service/storage';
    import uiPower from 'src/service/uiPower';
    import baseForm from 'src/service/baseForm';
    import {quillEditor} from 'vue-quill-editor';
    import Api from 'src/api/api';

    export default {
        components: {
            quillEditor
        },
        mixins: [uiPower, baseUploadHelper, baseForm],
        watch: {
            'ruleForm.pdf'(to, from) {
                let selt = this;
                if (this.ruleForm.pdf) {
                    for (let n in this.ruleForm.pdf) {
                        if (!this.ruleForm.pdf[n].hasOwnProperty('url')) {
                            this.ruleForm.pdf[n]['url'] = selt.getUploadUrl(this.ruleForm.pdf[n]['path']);
                        }
                    }
                }
            },
            'ruleForm.photos'(to, from) {
                let selt = this;
                if (this.ruleForm.photos) {
                    for (let n in this.ruleForm.photos) {
                        if (!this.ruleForm.photos[n].hasOwnProperty('url')) {
                            this.ruleForm.photos[n]['url'] = selt.getUploadUrl(this.ruleForm.photos[n]['original_path']);
                        }
                    }
                }
            }
        },
        data() {
            return {
                businessType: clientStorage.getItem('business_type'),
                continentType: clientStorage.getItem('continent'),
                dialogImageUrl: '',
                dialogVisible: false,
                saveUrl: '/depot',
                getUrl: '/depot/',
                jumpName: 'depotlist',
                deleteSourceUrl: '/source',
                deleteContactUrl: '/contact',
                ruleForm: {
                    id: '',
                    name: '',
                    continent: '',
                    address: '',
                    business: [],
                    introduce: '',
                    pdf: [],
                    photos: [],
                    contacts: [],
                },
                rules: {
                    name: [
                        {required: true, message: '请输入仓库名', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                    ],
                    continent: [
                        {required: true, message: '请选择大洲', trigger: 'change'}
                    ],
                    address: [
                        {required: true, message: '请输入仓库地址', trigger: 'blur'},
                        {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur'}
                    ],
                    square_meter: [
                        {required: true, message: '请输入面积', trigger: 'blur'},
                        {type: 'number', message: '面积必须为数字', trigger: 'blur'}
                    ],

                }
            };
        },
        methods: {
            handlePreview(file) {
                console.log(file);
            },
            handlePDFUploadSuccess(res, file) {
                let self = this;
                setTimeout(() => {
                    this.upload.showProgress = false;
                }, 500);
                self.ruleForm.pdf.push({
                    name: res.data.name,
                    path: res.data.path,
                    original_path: res.data.original_path,
                    size: res.data.size,
                    url: self.getUploadUrl(res.data.path)
                });
            },
            handlePDFExceed(files, fileList) {
                this.$message.warning(`最多上传 1 个PDF文件`);
            },
            async handlePDFRemove(file, fileList) {
                if (file.status == 'success') {
                    await Api.deleteData(this.deleteSourceUrl, file);
                }
                this.ruleForm.pdf = fileList;
            },
            handlePhotosExceed(files, fileList) {
                this.$message.warning(`最多上传 3 张轮播图片`);
                event.preventDefault();
            },
            async handlePHOTOSRemove(file, fileList) {
                if (file.status == 'success') {
                    await Api.deleteData(this.deleteSourceUrl, file);
                }
                this.ruleForm.photos = fileList;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handlePHOTOSUploadSuccess(res, file) {
                let self = this;
                setTimeout(() => {
                    this.upload.showProgress = false;
                }, 500);
                self.ruleForm.photos.push({
                    name: res.data.name,
                    path: res.data.path,
                    original_path: res.data.original_path,
                    size: res.data.size,
                    url: self.getUploadUrl(res.data.original_path)
                });
            },
            async removeContact(item) {
                await Api.deleteData(this.deleteContactUrl, item);
                var index = this.ruleForm.contacts.indexOf(item)
                if (index !== -1) {
                    this.ruleForm.contacts.splice(index, 1)
                }

            },
            addContact() {
                this.ruleForm.contacts.push({
                    uid: Date.now(),
                    email: '',
                    name: '',
                    avatar: '',
                    tel: ''
                });
            },
            handleContactUploadSuccess(res, file, filelist, index) {
                this.ruleForm.contacts[index].avatar = res.data.path;
            }

        }
    }
</script>
<style>
    .pdf-button .el-upload {
        width: 84px;
        height: 36px;
        padding: 0;
        margin: 0;
        border: 0;
    }

    .pdf-button .el-upload--text {
        padding: 0;
        margin: 0;
        border: 0;
    }

    .contacts-info {
        margin-top: 10px;
    }
</style>
