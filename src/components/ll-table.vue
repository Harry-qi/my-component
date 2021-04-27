<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    </el-table>
    <el-pagination
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
        page: 1,
        pageSize: this.pageSizes[0]
      }
    }
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.query.pageSize = val
      this.$emit('getData', this.query)
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.$emit('getData', this.query)
    }
  }
}
</script>

<style scoped></style>
