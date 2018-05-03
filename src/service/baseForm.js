import Api from 'src/api/api';

const baseForm = {
    created() {
        this.actionChange();
    },
    watch: {
        '$route'(to, from) {
            this.actionChange();
        }
    },
    data() {
        return {
            loading: false,
            saveUrl: '',
            getUrl: '',
            jumpName: '',
            formRef: 'ruleForm',
            ruleForm: {},
            rules: {}
        }
    },
    mounted() {
        let self = this;
        document.onkeydown = function (event) {
            let e = event || window.event;
            if (e && e.keyCode == 13) { //回车键的键值为13
                
            }
        };
    },
    methods: {
        actionChange() {
            if (this.$route.meta.action == 'add') {
                this.loading = true;
                this.addAction();

            } else if (this.$route.meta.action == 'edit') {
                this.loading = true;
                this.editAction();
            }
        },
        submitForm() {
            this.$refs[this.formRef].validate(async (valid) => {
                if (valid) {
                    await Api.saveData(this.saveUrl, this.saveData());
                    this.$message.success('提交成功！');
                    this.$router.push({name: this.jumpName});
                }
            });
        },
        saveData() {
            return this.ruleForm;
        },
        async addAction() {
            this.clearForm();
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        async editAction() {
            let data = (await Api.get(this.getUrl + this.$route.params.id)).data;
            for (let k in data) {
                this.ruleForm[k] = data[k];
            }
            this.loading = false;
        },
        resetForm() {
            this.$refs[this.formRef].resetFields();
        },
        clearForm() {
            for (let k in this.ruleForm) {
                switch (typeof this.ruleForm[k]) {
                    case 'object':
                        this.ruleForm[k] = [];
                        break;
                    default:
                        this.ruleForm[k] = '';
                }
            }
            if (this.$refs.hasOwnProperty(this.formRef)) {
                this.$refs[this.formRef].clearValidate();
            }
        }
    }
}
export default baseForm
