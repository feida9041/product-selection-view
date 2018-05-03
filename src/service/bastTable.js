import Api from 'src/api/api';

const baseTable = {
    data() {
        return {
            tableRef: 'multipleTable',     //table ref
            listUrl: '',     //list地址 get方式请求
            deleteUrl: '',   //delete和deleteAll地址 delete方式请求
            curPage: 1,      //当前页
            pageSize: 10,    //每页数量
            totalnum: 0,     //总数
            multipleSelection: [],   //列表多选框
            searchData: {},           //搜索用的数组
            tableData: [],
            orderTable: {
                prop: '',
                order: ''
            },
            loading: false
        }
    },
    created() {
        this.getData();
    },

    computed: {
        data() {
            return this.tableData;
        }
    },
    methods: {

        //分页
        handleCurrentChange(val) {
            this.curPage = val;
            this.getData();
        },
        handleSortChange(val) {
            this.orderTable.prop = val.prop;
            this.orderTable.order = val.order;
            this.getData();
        },
        handleSizeChange: function (val) {
            this.pageSize = val;
            if (this.curPage === 1) {
                this.getData();
            } else {
                this.curPage = 1;
            }
        },
        //搜索
        search() {
            this.getData();
        },
        clearSearch() {
            for (let key in this.searchData) {
                this.searchData[key] = '';
            }
        },
        searchObj() {
            let searchObj = {};
            for (let key in this.searchData) {
                searchObj['search[' + key + ']'] = this.searchData[key];
            }
            return searchObj;
        },
        //刷新
        refresh() {
            this.pageSize = 10;
            this.clearSearch();
            this.$refs[this.tableRef].clearSort();
            if (this.curPage === 1) {
                this.getData();
            } else {
                this.curPage = 1;
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        formatter(row, column) {
            return row.address;
        },
        handleEdit(index, row) {
            let self = this;
            this.$router.push(self.editUrl + row.id);
        },
        handleDelete(index, row) {
            this.delete({id: row.id});
        },
        delAll() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    type: 'error',
                    message: '未选择任何数据',
                    duration: 2000,
                });
            } else {
                let deleteStr = '';
                this.multipleSelection.forEach(function (value) {
                    deleteStr += value.id + ',';
                });
                deleteStr = deleteStr.substring(0, deleteStr.length - 1);
                this.delete({
                    id: deleteStr
                });
            }
        },
        async delete(data) {
            let self = this;
            await self.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await Api.deleteData(self.deleteUrl, data);
                if (self.curPage === 1) {
                    self.getData();
                } else {
                    self.curPage = 1;
                }
            }).catch(() => {
            });
        },
        async getData() {
            let self = this;
            self.loading = true;
            let data = (await Api.getList(self.listUrl, {
                page: self.curPage,
                pageSize: self.pageSize,
                order: self.orderTable.prop,
                sort: self.orderTable.order,
                ...self.searchObj()
            })).data;
            self.tableData = data.data;
            self.totalnum = data.total;
            self.curPage = data.current_page;
            self.loading = false;
        },
    }
}
export default baseTable
