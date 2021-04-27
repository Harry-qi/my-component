<template>
  <div id="app">
    <ll-table :data="tableData" :columns="columns" @getData="getData">
      <template v-slot:search>
        <el-input v-model="word"></el-input>
        <el-button @click="getData">搜索</el-button>
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
import llTable from './components/ll-table'

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
  name: 'App',
  components: {
    llTable
  },
  data() {
    return {
      columns,
      tableData: [],
      word: '1'
    }
  },
  methods: {
    getData() {
      fetch(`http://jsonplaceholder.typicode.com/posts/${this.word}/comments`)
        .then((response) => response.json())
        .then((data) => {
          this.tableData = data
        })
    },
    del(id) {
      console.log(id)
    }
  }
}
</script>

<style>
#app {
  padding: 20px;
}
</style>
