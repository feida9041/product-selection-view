<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> {{this.$route.meta.breadcrumb.parent}}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{this.$route.meta.breadcrumb.child}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="danger" v-if="showDelete()" icon="el-icon-delete" class="handle-del mr10"
                       @click="delAll">批量删除
            </el-button>
            <!--<el-input v-model="searchData.nick_name" placeholder="输入微信昵称" class="handle-input mr10"></el-input>-->
            <template>
                <el-select
                    v-model="searchData.openid"
                    filterable
                    remote
                    reserve-keyword
                    clearable
                    placeholder="输入微信昵称"
                    :remote-method="remoteMethod"
                    :loading="searchLoading">
                    <el-option
                        v-for="item in drownDownSearch"
                        :key="item.id"
                        :label="item.nick_name"
                        :value="item.openid">
                    </el-option>
                </el-select>
            </template>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="success" icon="el-icon-refresh" @click="refresh">清空刷新</el-button>
        </div>
        <el-table
            :data="data"
            border
            stripe
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            @sort-change="handleSortChange"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
        >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="ID" width="120"></el-table-column>
            <el-table-column prop="user_info" label="查询用户" width="270">
                <template slot-scope="scope">
                    <img style="width: 40px;height: 40px;border-radius: 50%;"
                         :src="scope.row.user_info.avatar">
                    <span>{{ scope.row.user_info.nick_name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="condition" label="条件" width="330">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag v-for="item in scope.row.condition" size="medium" style="margin-left: 5px;">{{item}}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="查询时间" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" v-if="showDelete()"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="curPage"
                :page-sizes="[10, 25, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalnum"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>

    import 'src/css/style.css';
    import baseTableHelper from 'src/service/bastTable';
    import uiPower from 'src/service/uiPower';
    import Api from 'src/api/api';

    export default {
        mixins: [uiPower, baseTableHelper],
        data() {
            return {
                searchLoading: false,
                listUrl: '/query',
                deleteUrl: '/query',
                searchData: {
                    openid: '',
                    nick_name: ''
                },
                drownDownSearch: [],
                searchTimeOut: null
            }
        },
        methods: {
            remoteMethod(query) {
                let self = this;
                if (query !== '') {
                    self.searchLoading = true;
                    clearTimeout(this.searchTimeOut);
                    this.searchTimeOut = setTimeout(async () => {
                        self.searchLoading = false;
                        self.searchData.nick_name = query;
                        self.drownDownSearch = (await Api.getList('user', self.searchObj())).data.data;
                    }, 400);
                } else {
                    self.searchData.nick_name = '';
                    self.searchData.openid = '';
                }
            }
        }
    }
</script>
