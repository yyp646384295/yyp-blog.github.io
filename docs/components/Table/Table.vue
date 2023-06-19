<template>
  <el-row style="margin: 10px 0;" :gutter="10" class="mb8">
    <el-col :span="1.5">
      <template v-for="(btn) in btnListConfig">
        <el-button
            :type="btn.type"
            :icon="btn.icon"
            size="small"
            plain
            @click="handleCommand(btn.id,null)"
        >
          {{ btn.name }}
        </el-button>
      </template>
    </el-col>
  </el-row>

  <el-table :data="data" style="width: 100%" v-loading="loading" border empty-text stripe>
    <el-table-column align="left" type="selection" width="55"/>
    <template v-for="(item, index) in tableColumns.list">
      <el-table-column
          :prop="item.prop"
          :label="item.label"
          min-width="25%"
          :key="index"
          v-if="item.type === 'common'"
          align="left"
          :fixed="item.fixed || false"
      >
        <template v-slot="scope">
          {{ scope.row[item.prop] }}
        </template>
      </el-table-column>
    </template>

    <!--<template>-->
    <el-table-column min-width="25%" label="操作">
      <template #default="scope">
        <el-button link type="primary" @click="handleCommand('edit', scope.row)">
          编辑
        </el-button>
        <el-button link type="primary" @click="handleCommand('detail', scope.row)">
          查看
        </el-button>
        <el-button link type="danger" @click="handleCommand('delete', scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>

  </el-table>

  <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getPagination"
  />
</template>


<script lang="ts" setup>
import Pagination from "./Pagination.vue";
import {defineProps} from 'vue'


const emit = defineEmits(['getPagination', 'handleCommand'])

defineProps({
  tableColumns: {
    type: Object,
    default: function () {
      return {
        source: 'user',
        list: [
          {
            type: 'common',
            label: '用户昵称',
            width: 200,
            prop: 'nickName',
          },
          {
            type: 'common',
            label: '联系电话',
            width: 200,
            prop: 'phoneNumber',
          }
        ]
      }
    }
  },
  data: {
    type: Array,
    default: () => [
      {
        id: 1,
        nickName: '张三',
        phoneNumber: '15880822111'
      },
      {
        id: 2,
        nickName: '李四',
        phoneNumber: '15240822111'
      },
      {
        id: 2,
        nickName: '王五',
        phoneNumber: '15880423111'
      },
    ]
  },
  loading: {
    type: Boolean,
    default: false
  },
  queryParams: {
    type: Object,
    default: function () {
      return {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  total: {
    type: Number,
    default: 10
  },
  btnListConfig: {
    type: Array,
    default: function () {
      return [
        {
          id: 'add',
          type: 'primary',
          name: '新增',
          icon: 'Plus',
        },
        {
          id: 'delete',
          type: 'danger',
          name: '删除',
          icon: 'Delete',
        }
      ]
    }
  }
})


const getPagination = () => {
  emit('getPagination')
}

/**
 * 操作按钮
 * @param id 'add':新增 'detail':查看 'edit':编辑 'delete':删除
 * @param row '当前行数据'
 */
const handleCommand = (id, row) => {
  emit("handleCommand", id, row);
}

</script>
<script lang="ts">
export default {
  name: "DynamicTable",
}
</script>

<style scoped>

</style>
