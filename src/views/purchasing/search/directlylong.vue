<template>
  <div id='search'>
    <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab" >
    <el-tab-pane
      v-for="item in editableTabs2"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      <component v-if="item.name === '1'" :is="item.component" @my-event='addTab'></component>
      <component v-else :is="item.component" :card="card_code"></component>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import DirectlyLong from '@/components/Purchasing/directlylong'
import DirectlylongDetail from '@/components/Detail/directlylongdetail'
export default {
  components: {
    DirectlyLong,
    DirectlylongDetail
  },
  data() {
    return {
      editableTabsValue2: '1',
      editableTabs2: [{
        title: '长充查询',
        name: '1',
        component: DirectlyLong
      }],
      tabIndex: 1,
      card_code: ''
    }
  },
  methods: {
    addTab(card) {
      let newTabName = ++this.tabIndex + ''
      this.card_code = card
      this.editableTabs2.push({
        title: '订单详情',
        name: newTabName,
        component: DirectlylongDetail
      })
      this.editableTabsValue2 = newTabName
    },
    removeTab(targetName) {
      let tabs = this.editableTabs2
      let activeName = this.editableTabsValue2
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue2 = activeName
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>
