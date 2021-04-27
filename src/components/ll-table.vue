<template>
  <div>
    <!-- 搜索栏 -->
    <div class="search">
      <slot name="search"></slot>
    </div>
    <!-- 表格-->
    <el-table
      :data="data"
      style="width: 100%"
      v-bind="$attrs"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-for="(cItem, cIndex) in columns"
        :key="cIndex"
        :prop="cItem.prop"
        :label="cItem.label"
        :width="cItem.width || 200"
      >
        <template slot-scope="scope">
          <slot :name="cItem.scopedSlots" v-if="cItem.scopedSlots" :row="scope.row"></slot>
          <span v-else>{{ scope.row[cItem.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="pageSizes"
      :page-size="query.pageSize"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'll-table',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    // 分页相关
    showPage: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next'
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30]
      }
    }
  },
  data() {
    return {
      total: 0,
      query: {
        word: '',
        page: 1,
        pageSize: this.pageSizes[0]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$emit('getData', this.query)
    },
    // 分页
    handleSizeChange(val) {
      this.query.pageSize = val
      this.$emit('getData', this.query)
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.$emit('getData', this.query)
    },
    handleSelectionChange() {}
  }
}
</script>

<style scoped lang="less">
.search {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 14px;
  span {
    margin-right: 10px;
  }
  margin-bottom: 15px;
  .el-input {
    width: 200px;
    margin-right: 20px;
  }
}
.pagination {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
