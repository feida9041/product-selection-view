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
            <el-select v-model="searchData.power" clearable  placeholder="选择权限" class="handle-select mr10">
                <el-option v-for="(item, index) in managerPower" :label="item.label" :value="item.key"></el-option>
            </el-select>
            <el-input v-model="searchData.nick_name" placeholder="输入昵称" class="handle-input mr10"></el-input>
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
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="头像">
                            <img style="width: 40px;height: 40px;border-radius: 50%;"
                                 :src="getUploadUrl(props.row.avatar)">
                        </el-form-item>
                        <el-form-item label="用户名">
                            <span>{{ props.row.username }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="selection" width="70"></el-table-column>
            <el-table-column prop="nick_name" label="昵称" width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.nick_name }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="power_name" label="权限" width="170">
            </el-table-column>
            <el-table-column prop="logins" label="登录次数" width="120">
            </el-table-column>
            <el-table-column prop="create_time" label="创建日期" sortable="custom" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" v-if="showUpdate()" @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="small" type="danger" v-if="showDelete(scope.row.is_system)"
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
    import clientStorage from 'src/service/storage';
    import uiPower from 'src/service/uiPower';
    import common from 'src/service/commonFunction';

    export default {
        mixins: [uiPower, baseTableHelper, common],
        data() {
            return {
                managerPower: clientStorage.getItem('manager_power'),
                listUrl: '/manager',
                deleteUrl: '/manager',
                editUrl: '/manager/edit/',
                searchData: {
                    nick_name: '',
                    power: '',
                }
            }
        },
        methods: {
            showDelete(is_system) {
                if (is_system !== 1 && this.uiPower.delete) {
                    return true;
                }
                return false;
            },
        }
    }
</script>
