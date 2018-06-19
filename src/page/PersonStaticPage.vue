<template>
    <div>
        <div>
         <Row style="margin-bottom: 10px">
        <Col span="5">
          <DatePicker v-model="filter.startTime" type="date" placeholder="开始时间" style="width: 200px"></DatePicker></Col>
        <Col span="5">
        <DatePicker v-model="filter.endTime" type="date" placeholder="截止时间" style="width: 200px"></DatePicker></Col>
        <Col span="5">
        <Input v-model="filter.url" placeholder="sid" style="width: 260px"></Input></Col>
        <Col span="2">
        <Button type="ghost" shape="circle" icon="ios-search" @click="getEntList">搜索</Button>
        <Button type="ghost" shape="circle" @click="getReportList">重置</Button>
        </Col>
        <Col span="1" style="margin-left: 20px">
        <Button type="ghost" shape="circle" icon="android-add" @click="showDailog">导出</Button>
        </Col>
        </Row>
        </div>
        <div>
            <Table :columns="columns1" :data="data1"></Table>
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
          <DatePicker v-model="filter.startTime" type="date" placeholder="开始时间" style="width: 150px"></DatePicker></Col>
        <Col span="4">
        <DatePicker v-model="filter.endTime" type="date" placeholder="截止时间" style="width: 150px"></DatePicker></Col>
        <Col span="5">
        <Button type="ghost" shape="circle" icon="ios-search" @click="getEntList">搜索</Button>
        <Button type="ghost" shape="circle" @click="getReportList">重置</Button>
        </Col>
        <Col span="1" style="margin-left: 20px">
        <Button type="ghost" shape="circle" icon="android-add" @click="showDailog">导出</Button>
        </Col>
        </Row>
        </div>
        <div>
            <Table :columns="columns2" :data="data1"></Table>
        </div>
        <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
        <Page :total="total" :current="page" :page-size="pageDataNum" @on-change="changePage" show-total></Page>
      </div>
    </div>
    </Modal>
    </div>
       
</template>
<script>
    export default {
        data () {
            return {
                modal1:false,
                total:"4",
                pageDataNum:"3",
                page:"1",
                filter:{
                    startTime:"",
                    endTime:"",
                    url:""
                },
                 columns1: [
                    {
                    type: 'index',
                    width: 100,
                    align: 'left'
                    },
                    {
                        title: 'sid',
                        key: 'age'
                    },
                    {
                        title: '更新条数',
                        key: 'address'
                    },
                    {
                        title: '新增条数',
                        key: 'address'
                    },
                    {
                        title: '更新金额',
                        key: 'address'
                    },
                    {
                        title: '新增金额',
                        key: 'address'
                    },
                    {
                        title: '总金额',
                        key: 'address'
                    },
                    {
                        title: '日期',
                        key: 'address'
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
                                this.modal1=true
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
                        key: 'age'
                    },
                    {
                        title: 'pid',
                        key: 'address'
                    }
                    ,
                    {
                        title: '响应时间',
                        key: 'address'
                    }
                    
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        methods:{
      changePage(row) {
        // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
        this.page = row;
        this.reportsPage = this.reports.slice((row - 1) * this.pageDataNum, row * this.pageDataNum);
        // this.mockTableData();
      }
        }
    }
</script>
