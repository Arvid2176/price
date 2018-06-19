<template>
  <div>
    <div>

      <Row style="margin-bottom: 10px">
        <Col span="5">
          <DatePicker v-model="filter.startTime" type="date" placeholder="开始时间" style="width: 200px"></DatePicker>
        </Col>
        <Col span="5">
          <DatePicker v-model="filter.endTime" type="date" placeholder="截止时间" style="width: 200px"></DatePicker>
        </Col>
        <Col span="5">
          <Input v-model="filter.url" placeholder="url" style="width: 260px"></Input></Col>
        <Col span="5">
          <Input v-model="filter.comments" placeholder="接口描述" style="width: 260px"></Input></Col>
        <Col span="2">
          <Button type="ghost" shape="circle" icon="ios-search" @click="getEntList(1)">搜索</Button>
          <Button type="ghost" shape="circle" @click="reset">重置</Button>
        </Col>
        <Col span="1" style="margin-left: 20px">
          <Button type="ghost" shape="circle" icon="android-add" @click="getListExcel">导出</Button>
        </Col>
      </Row>
      <Row>
        <Alert style="text-align: center">更新数量：{{staticInfo.updateAmountStatistics}} 新增数量:{{staticInfo.addAmountStatistics}} 总数：{{staticInfo.totalAmountStatistics}} 更新总价:{{staticInfo.updateTotalPriceStatistics}} 新增总价：{{staticInfo.addTotalPriceStatistics}} 总价：{{staticInfo.totalPriceStatistics}} </Alert>
      </Row>
    </div>
    <div>
      <Table  :columns="columns1" :data="data1"></Table>
    </div>

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="page" :page-size="pageDataNum" @on-change="changePage" show-total></Page>
      </div>
    </div>
    <Modal
      v-model="modal1"
      title="详情"
      width="1200">
      <div>
        <Row style="margin-bottom: 10px">
          <Col span="4">
            <TimePicker v-model="filter2.startTime" type="time" placeholder="开始时间" style="width: 150px"></TimePicker>
          </Col>
          <Col span="4">
            <TimePicker v-model="filter2.endTime" type="time" placeholder="截止时间" style="width: 150px"></TimePicker>
          </Col>
          <Col span="4">
            <Input v-model="filter2.companyName" placeholder="公司名称" style="width: 150px"></Input></Col>
          <Col span="5">
            <Button type="ghost" shape="circle" icon="ios-search" @click="getDetailList">搜索</Button>
            <Button type="ghost" shape="circle" @click="getReportList">重置</Button>
          </Col>
          <Col span="1" style="margin-left: 20px">
            <Button type="ghost" shape="circle" icon="android-add" @click="getEntDetailExcel">导出</Button>
          </Col>
        </Row>
      </div>
      <div>
        <Table
          :columns="columns2" :data="data2"></Table>
      </div>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total2" :current="page2" :page-size="pageDataNum2" @on-change="changePage2" show-total></Page>
        </div>
      </div>
    </Modal>
  </div>

</template>
<script>
  import {queryEntList, getEntListExcel, queryEntDetailList} from '../api/api';

  Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1,                 //月份
      "d+": this.getDate(),                    //日
      "h+": this.getHours(),                   //小时
      "m+": this.getMinutes(),                 //分
      "s+": this.getSeconds(),                 //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
  export default {
    data() {
      return {
        modal1: false,
        staticInfo:{
          addAmountStatistics:0,
          updateAmountStatistics:0,
          updateTotalPriceStatistics:0,
          totalAmountStatistics:0,
          addTotalPriceStatistics:0,
          totalPriceStatistics:0
        },
        total: 0,
        selectRow: {},
        pageDataNum: 0,
        page: 1,
        total2: 0,
        pageDataNum2: 0,
        page2: 1,
        filter: {
          startTime: "",
          endTime: "",
          url: "",
          comments:""
        },
        filter2: {
          startTime: "",
          endTime: "",
          companyName: ""
        },
        columns1: [
          {
            type: 'index',
            width: 80,
            align: 'left'
          },
          {
            title: 'url',
            key: 'uri'
          },
          {
            title: '接口描述',
            key: 'comments'
          },
          {
            title: '更新数量',
            key: 'updateAmount'
          },
          {
            title: '更新单价',
            key: 'updatePrice'
          },
          {
            title: '更新总价',
            key: 'updateTotalPrice'
          },

          {
            title: '新增数量',
            key: 'addAmount'
          },
          {
            title: '新增单价',
            key: 'addPrice'
          }

          ,
          {
            title: '新增总价',
            key: 'addTotalPrice'
          },
          {
            title: '总量',
            key: 'amount'
          }
          ,
          {
            title: '总价',
            key: 'totalPrice'
          }
          ,
          {
            title: '日期',
            render: (h, params) => {
              params.row.dateStr = new Date(params.row.date.time).format("yyyy-MM-dd")
              return h('div', [
                h('p', params.row.dateStr)
              ]);
            }
          },
          {
            title: '操作',
            key: 'address',
            render: (h, params) => {
              // disable = params.status == 1 ? true : false;
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#ed3f13'
                  },
                  on: {
                    click: () => {
                      this.modal1 = true
                      this.selectRow = params.row
                      this.getDetailList()
                    }
                  }
                }, '详情')
              ]);
            }
          }
        ],
        columns2: [
          {
            type: 'index',
            width: 100,
            align: 'left'
          },
          {
            title: 'uuid',
            key: 'uuid'
          },
          {
            title: '公司名称',
            key: 'companyName'
          },
          {
            title: '接口描述',
            key: 'comments'
          },
          {
            title: 'pid',
            key: 'pid'
          }
          ,
          {
            title: '响应时间',
            key: 'responseTime'
          }
          ,
          {
            title: '请求时间',
            render: (h, params) => {
              params.row.dateStr = new Date(params.row.updateTime.time).format("yyyy-MM-dd hh:mm:ss")
              return h('div', [
                h('p', params.row.dateStr)
              ]);
            }
          }
        ],
        data1: [],
        data2:[]
      }
    },
    methods: {
      changePage(row) {
        // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
        this.page = row
        this.getEntList(this.page)
        // this.mockTableData();
      },
      changePage2(row) {
        // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
        this.page2 = row
        this.getDetailList(this.page2)
        // this.mockTableData();
      },
      getEntList(page) {
        let para = {}
        if (this.filter.startTime != null && this.filter.startTime != '') {
          para['fromDate'] = new Date(this.filter.startTime).format("yyyy-MM-dd")
        } else {
          para['fromDate'] = ''
        }
        if (this.filter.endTime != null && this.filter.endTime != '') {
          para['toDate'] = new Date(this.filter.endTime).format("yyyy-MM-dd")
        } else {
          para['toDate'] = ''
        }
        if (this.filter.url != null && this.filter.url != '') {
          para['uri'] = this.filter.url
        } else {
          para['uri'] = 'get'
        }

        para['page'] = page
        para['comments'] = this.filter.comments
        para['pageSize'] = 15
        queryEntList(para).then((res) => {
          if (res.response_code == '00') {
            this.data1 = res.content.list
            this.pageDataNum = res.content.pageSize
            this.page = res.content.prePage + 1;
            this.total = res.content.total;
            this.staticInfo=res.content.other.statistics;
          } else {
            alert(res.response_msg);
          }
        })
      },
      getListExcel() {
        let para = {}
        if (this.filter.startTime != null && this.filter.startTime != '') {
          para['fromDate'] = new Date(this.filter.startTime).format("yyyy-MM-dd")
        } else {
          para['fromDate'] = ''
        }
        if (this.filter.endTime != null && this.filter.endTime != '') {
          para['toDate'] = new Date(this.filter.endTime).format("yyyy-MM-dd")
        } else {
          para['toDate'] = ''
        }
        if (this.filter.url != null && this.filter.url != '') {
          para['uri'] = this.filter.url
        } else {
          para['uri'] = 'get'
        }
        para['comments'] = this.filter.comments
        para['page'] = this.page
        para['pageSize'] = 15

        window.open(`/interface/usagePageListExcel` + this.objToString(para));
      },
      getDetailList() {
        let para = {}
        para['requestUri'] = this.selectRow.uri
        para['date'] = this.selectRow.dateStr
        para['fromTime'] = this.filter2.startTime
        para['toTime'] = this.filter2.endTime
        para['companyName'] = this.filter2.companyName
        para['page'] = this.page2
        queryEntDetailList(para).then((res) => {
          if (res.response_code == '00') {
            this.data2 = res.content.list
            this.total2=res.content.total
            this.page2=res.content.prePage+1
            this.pageDataNum2=10

          } else {
            alert(res.response_msg);
          }
        })
      },
      getEntDetailExcel() {
        let para = {}
        para['requestUri'] = this.selectRow.uri
        para['date'] = this.selectRow.dateStr
        para['fromTime'] = this.filter2.startTime
        para['toTime'] = this.filter2.endTime
        para['companyName'] = this.filter2.companyName
        para['page'] = this.page2
        window.open(`/interface/usageDetailListExcel` + this.objToString(para));
      },
      objToString(obj) {
        var str = '?'
        for (var i in obj) {
          str = str + i + '=' + obj[i] + '&'
        }
        return str;
      },
      reset() {
        this.filter = {
          startTime: "",
          endTime: "",
          url: "",
          comments:""
        }
      }
    }, mounted() {
      this.getEntList(1);
      // this.getServices();
    }
  }
</script>
