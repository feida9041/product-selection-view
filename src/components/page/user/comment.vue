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
            <el-select v-model="searchData.status" clearable placeholder="审核状态" class="handle-select mr10">
                <el-option key="0" label="未审核" value="0"></el-option>
                <el-option key="1" label="已审核" value="1"></el-option>
            </el-select>
            <el-input v-model="searchData.comment" placeholder="输入评论内容" class="handle-input mr5"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="success" icon="el-icon-refresh" @click="refresh">清空刷新</el-button>
            <el-button type="info" icon="el-icon-edit-outline" @click="exportData" :loading="downloadConfig.loading">导出</el-button>
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
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="提交人">
                            <img style="width: 40px;height: 40px;border-radius: 50%;"
                                 :src="props.row.user_info.avatar">
                            <span>{{ props.row.user_info.nick_name }}</span>
                        </el-form-item>
                        <el-form-item label="审核人" v-if="props.row.manager_info">
                            <img style="width: 40px;height: 40px;border-radius: 50%;"
                                 :src="getUploadUrl(props.row.manager_info.avatar)">
                            <span>{{ props.row.manager_info.nick_name }}</span>
                        </el-form-item>
                        <el-form-item label="审核人" v-else>
                            <span>无</span>
                        </el-form-item>
                        <el-form-item label="评论时间">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ props.row.create_time }}</span>
                            </template>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="selection" width="70"></el-table-column>
            <el-table-column prop="depot_name" label="仓库名称" width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.depot_name }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="评论" width="350">
            </el-table-column>
            <el-table-column prop="status_name" label="状态" width="150">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="success" v-if="showStatus(scope.row.status)"
                               @click="handleCheck(scope.$index, scope.row)">审核
                    </el-button>
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
    import common from 'src/service/commonFunction';
    import Api from 'src/api/api';
    import baseDownload from 'src/service/baseDownload';

    export default {
        mixins: [uiPower, baseTableHelper, common, baseDownload],
        data() {
            return {
                listUrl: '/comment',
                deleteUrl: '/comment',
                editUrl: '/comment',
                searchData: {
                    status: '',
                    comment: '',
                }
            }
        },
        methods: {
            showStatus(status) {
                if (status === 0 && this.uiPower.update) {
                    return true;
                }
                return false;
            },
            async handleCheck(index, row) {
                await Api.saveData(this.editUrl, {
                    id: row.id
                });
                this.getData();
            },
            async exportData() {
                this.setFileName('用户评论', 'csv');
                this.baseFiledownload('exportcomment');
            }
        }
    }
</script>
