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
            <el-select v-model="searchData.continent" clearable  placeholder="大洲" class="handle-select mr10">
                <el-option v-for="(item, index) in continentType" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="searchData.business" clearable  placeholder="业务类型" class="handle-select mr10">
                <el-option v-for="(item, index) in businessType" :label="item.label" :value="item.key"></el-option>
            </el-select>
            <el-input v-model="searchData.name" placeholder="输入仓库名" class="handle-input mr10"></el-input>
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
                        <el-form-item label="ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="selection" width="70"></el-table-column>
            <el-table-column prop="name" label="仓库名称" width="220">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="continent_name" label="大洲" width="100">
            </el-table-column>
            <el-table-column prop="business" label="业务类型" width="270">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag v-for="item in scope.row.business" size="medium" style="margin-left: 5px;">{{getBusinessName(item)}}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="square_meter" label="面积(㎡)" width="120">
            </el-table-column>
            <el-table-column label="操作" width="350">
                <template slot-scope="scope">
                    <el-button size="small" v-if="showUpdate()" @click="handleEdit(scope.$index, scope.row)">编辑
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
    import clientStorage from 'src/service/storage';

    export default {
        mixins: [uiPower, baseTableHelper],
        data() {
            return {
                businessType: clientStorage.getItem('business_type'),
                continentType: clientStorage.getItem('continent'),
                listUrl: '/depot',
                editUrl: '/depot/edit/',
                deleteUrl: '/depot',
                searchData: {
                    continent: '',
                    business: '',
                    name: '',
                }
            }
        },
        methods: {
            getBusinessName(key) {
                return this.businessType[key]['label'];
            }
        }
    }
</script>
