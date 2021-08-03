<template>
  <div>
    <ll-table :data="tableData" :columns="columns" @getData="getData" @change="changeTablePage">
      <template v-slot:search>
        <el-input v-model="query.word"></el-input>
        <el-button @click="getData(query)">搜索</el-button>
      </template>
      <template v-slot:name="{ row }"> {{ row.id }}--{{ row.postId }} </template>
      <template v-slot:action="{ row }">
        <el-popconfirm :title="`这是一段内容确定删除id为 ${row.id} 吗？`" @confirm="del(row.id)">
          <el-link type="danger" :underline="false" slot="reference"> 删除</el-link>
        </el-popconfirm>
      </template>
    </ll-table>
  </div>
</template>

<script>
import llTable from '../components/ll-table'

const columns = [
  {
    prop: 'id',
    label: 'id',
    width: 40
  },
  {
    prop: 'email',
    label: 'email'
  },
  {
    label: 'id-postId',
    width: 100,
    scopedSlots: 'name'
  },
  {
    label: '操作',
    width: 220,
    scopedSlots: 'action'
  }
]
export default {
  components: {
    llTable
  },
  data() {
    return {
      columns,
      tableData: [],
      query: {
        word: '1',
        page: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    changeTablePage({ page, pageSize }) {
      this.query.page = page
      this.query.pageSize = pageSize
      this.getData(this.query)
    },
    getData(parmas) {
      const query = {
        ...this.query,
        ...parmas
      }
      fetch(`http://jsonplaceholder.typicode.com/posts/${this.query.word}/comments`, {
        // 传参
        // method: 'POST',
        // body: JSON.stringify(query)
      })
        .then((response) => response.json())
        .then((data) => {
          this.tableData = data
        })
    },
    del(id) {
      console.log(id)
      this.getData(this.query)
    }
  }
}
</script>

<style scoped></style>
