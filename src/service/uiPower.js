import clientStorage from 'src/service/storage';

const uiPower = {
    data() {
        return {
            uiPower: {
                delete: '',
                update: '',
                create: ''
            }
        }
    },
    created() {
        this.setPower();
    },
    methods: {
        setPower() {
            let power = clientStorage.getItem('ui_power');
            this.uiPower.create = power.create;
            this.uiPower.update = power.update;
            this.uiPower.delete = power.delete;
        },
        showUpdate(data = undefined) {
            return this.uiPower.update;
        },
        showDelete(data = undefined) {
            return this.uiPower.delete;
        },
        showCreate(data = undefined) {
            return this.uiPower.create;
        }
    }
}
export default uiPower
