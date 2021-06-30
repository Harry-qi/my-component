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
      <el-table-column v-if="selection.show" type="selection" :width="selection.width">
      </el-table-column>
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
      v-if="showPage"
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="pagination.pageSizes"
      :page-size="query.pageSize"
      :layout="pagination.layout"
      :total="pagination.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'll-table',
  props: {
    // 表格数据
    data: {
      type: Array,
      default() {
        return []
      }
    },
    // 表格表头
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否展示分页
    showPage: {
      type: Boolean,
      default: true
    },
    // 多选框设置
    selection: {
      type: Object,
      default() {
        return {
          show: false, // 默认不展示
          width: 55 // 默认宽度为55px
        }
      }
    },
    // 分页配置
    pagination: {
      type: Object,
      default() {
        return {
          layout: {
            type: String,
            default: 'total, sizes, prev, pager, next'
          },
          page: 1,
          pageSizes: [10, 20, 30],
          total: 0
        }
      }
    }
  },
  data() {
    return {
      total: 0,
      query: {
        page: this.pagination.page,
        pageSize: this.pagination.pageSizes
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
    // 改变当前页码
    handleSizeChange(val) {
      this.query.pageSize = val
      this.$emit('change', this.query)
    },
    // 改变当前pageSize
    handleCurrentChange(val) {
      this.query.page = val
      this.$emit('change', this.query)
    },
    // 多选框
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    }
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
