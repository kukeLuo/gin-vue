import { getDict } from "@/utils/dictionary";
export default {
    data() {
        return {
            page: 1,
            total: 10,
            limit: 10,
            tableData: [],
            searchInfo: {},
            status:""
        }
    },
    methods: {
        filterDict(value,type){
          const rowLabel = this[type+"Options"]&&this[type+"Options"].filter(item=>item.value == value)
          return rowLabel&&rowLabel[0]&&rowLabel[0].label
        },
        async getDict(type){
            const dicts = await getDict(type)
            this[type+"Options"] = dicts
        },
        handleSizeChange(val) {
            this.limit = val
            this.getTableData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getTableData()
        },
        async getTableData(page = this.page, limit = this.limit) {
            
             const table = await this.listApi({ page, limit, ...this.searchInfo })
             console.log("获取表单数据----",JSON.stringify(table));
   
            if(table.code == 200){
                if(table.data.total_count!=undefined){
                    this.tableData = table.data.data
                    this.total = table.data.total_count
                    this.page = table.data.page
                    this.limit = table.data.limit
                }else{
                    this.tableData = table.data

                }
            }
        }
    }
}