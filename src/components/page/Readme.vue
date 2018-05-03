<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 自述</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>README.md</h3>
            <article>
                <h1>商会管理系统</h1>
                <p>微信小程序展示内容的后台管理系统</p>
                <h2>前言</h2>
                <p>暂无</p>
                <h2>权限说明</h2>
                <p>超级管理员</p>
                <el-checkbox disabled checked>仓库管理->仓库列表，添加，修改，删除仓库</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户管理->用户微信列表，删除用户</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户查询历史->用户历史查询列表，删除用户查询记录</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户申请->申请列表，申请审核通过，审核删除</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户评论->评论列表，评论审核通过，评论删除</el-checkbox>
                <br>
                <el-checkbox disabled checked>账号管理->管理员列表，添加，修改，删除管理员</el-checkbox>
                <br>
                <el-checkbox disabled checked>上传，删除PDF文件与图片</el-checkbox>
                <br>
                <p></p>
                <p>操作员</p>
                <el-checkbox disabled checked>仓库管理->仓库列表，添加，修改，删除仓库</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户管理->用户微信列表，删除用户</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户查询历史->用户历史查询列表，删除用户查询记录</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户申请->申请列表，申请审核通过，审核删除</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户评论->评论列表，评论审核通过，评论删除</el-checkbox>
                <br>
                <el-checkbox disabled checked>上传，删除PDF文件与图片</el-checkbox>
                <br>
                <p></p>
                <p>信息员</p>
                <el-checkbox disabled checked>仓库管理->仓库列表，添加，修改</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户管理->用户微信列表</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户查询历史->用户历史查询列表</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户申请->申请列表，申请审核通过</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户评论->评论列表，评论审核通过</el-checkbox>
                <br>
                <el-checkbox disabled checked>上传PDF文件与图片</el-checkbox>
                <br>
                <p></p>
                <p>查看员</p>
                <el-checkbox disabled checked>仓库管理->仓库列表</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户管理->用户微信列表</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户查询历史->用户历史查询列表</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户申请->申请列表</el-checkbox>
                <br>
                <el-checkbox disabled checked>用户评论->评论列表</el-checkbox>
                <br>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data: function () {
            return {}
        }
    }
</script>

<style scoped>
    .ms-doc {
        width: 100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }

    .ms-doc h3 {
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }

    .ms-doc article {
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    .ms-doc article h1 {
        font-size: 32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }

    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }

    .ms-doc article p {
        margin-bottom: 15px;
        line-height: 1.5;
    }

    .ms-doc article .el-checkbox {
        margin-bottom: 5px;
    }
</style>
