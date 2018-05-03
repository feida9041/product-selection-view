import Api from 'src/api/api';
import common from 'src/service/commonFunction';

const baseUpload = {
    mixins: [common],
    data() {
        return {
            upload: {
                showProgress: false,
                uploadProgress: 0,
                uploadProgressType: '',
                progressStatus: ''
            }
        }
    },
    methods: {
        handleUploadError(err, file, fileList) {
            this.upload.showProgress = false;
            self.upload.progressStatus = 'red';
        },
        handleRemove(file, fileList) {
        },
        handleUploadRemove(file, fileList) {
        },
        handleUploadChange(file, fileList) {
        },
        handleUploadSuccess(response, file, fileList) {

        },
        handelUploadProgress(event, file, fileList) {

        },
        handleBeforeRemove(file, fileList) {
        },
        beforeUploadCheckIMG(file) {
            let isIMG = true;
            switch (file.type) {
                case 'image/jpeg':
                case 'image/png':
                case 'image/gif':
                    break;
                default:
                    isIMG = false;
            }
            const fileSize = file.size < 614400;
            if (!isIMG) {
                this.$message.error('上传图片只能是 JPG,PNG,GIF 格式!');
            }
            if (!fileSize) {
                this.$message.error('上传图片大小不能超过 600KB!');
            }
            return isIMG && fileSize;
        },
        beforeUploadCheckPDF(file) {
            let isPDF = file.type === 'application/pdf' ? true : false;
            const fileSize = file.size < 52428800;
            if (!isPDF) {
                this.$message.error('只能是 PDF 格式!');
            }
            if (!fileSize) {
                this.$message.error('上传PDF大小不能超过 50MB!');
            }
            return isPDF && fileSize;
        },
        async baseUpload(param, pdf = false) {
            let self = this;
            let fileObj = param.file;
            let formdata = new FormData();
            if (pdf === true) {
                formdata.append('type', 'pdf');
            }
            formdata.append('file', fileObj);
            return await Api.upload(formdata, function (event) {
                self.upload.showProgress = true;
                if (event.loaded !== event.total) {
                    self.upload.uploadProgress = Math.round((event.loaded / event.total) * 100);
                } else {
                    self.upload.uploadProgress = 100;
                    self.upload.progressStatus = 'rgba(103, 194, 58)';
                }
            });
        },
        async baseUploadWithoutProgress(param, pdf = false) {
            let self = this;
            let fileObj = param.file;
            let formdata = new FormData();
            if (pdf === true) {
                formdata.append('type', 'pdf');
            }
            formdata.append('file', fileObj);
            return await Api.upload(formdata, function (event) {
            });
        },
        async uploadPDF(param) {
            return await this.baseUpload(param, true);
        },

    }
}
export default baseUpload
