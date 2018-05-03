import axios from 'axios';

const baseDownload = {
    data() {
        return {
            downloadConfig: {
                loading: false,
                fileName: '',
                ext: 'txt'
            }
        }
    },
    methods: {
        async baseFiledownload(url, param = {}) {
            this.downloadConfig.loading = true;
            await new axios({
                method: 'get',
                url: url,
                data: param,
                responseType: 'blob'
            }).then(response => {
                this.baseDownload(response)
            }).catch((error) => {
            })
            this.downloadConfig.loading = false;
        },
        setFileName(name, ext) {
            this.downloadConfig.fileName = name;
            this.downloadConfig.ext = ext;
        },
        getFileName() {
            return this.downloadConfig.fileName + '.' + this.downloadConfig.ext;
        },
        baseDownload(data) {
            if (!data) {
                return
            }
            let url = window.URL.createObjectURL(new Blob([data.data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', this.getFileName())
            document.body.appendChild(link)
            link.click();
        }
    }
}
export default baseDownload
