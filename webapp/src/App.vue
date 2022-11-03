<template>
  <div class="box" :style="{background: `url(${bg})`}">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{store.chinaAdd.localConfirmH5}}</div>
          <div>{{store.chinaTotal.localConfirm}}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.nowConfirm}}</div>
          <div>{{store.chinaTotal.nowConfirm}}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.confirm}}</div>
          <div>{{store.chinaTotal.confirm}}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.noInfect}}</div>
          <div>{{store.chinaTotal.noInfect}}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.importedCase}}</div>
          <div>{{store.chinaTotal.importedCase}}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.dead}}</div>
          <div>{{store.chinaTotal.dead}}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie" id="box-left-pie"></div>
      <div class="box-left-line" id="box-left-line"></div>
    </div>
    <div id="china" class="box-center">
    </div>
    <div class="box-right" style="color: white;">
      <table border="1" cellspacing="0" class="table"> 
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <tbody class="animate__bounceIn">
          <tr v-for="item in store.item" :key="item.name">
            <td align="center">{{item.name}}</td>
            <td align="center">{{item.today.confirm}}</td>
            <td align="center">{{item.total.confirm}}</td>
            <td align="center">{{item.total.heal}}</td>
            <td align="center">{{item.total.dead}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">

  import bg from './assets/1.jpg';
  import { geoCoordMap } from './assets/geoMap';

  import { useStore } from './stores';
  import { onMounted, reactive } from 'vue';
  import * as echarts from 'echarts';
  import './assets/china';
  import 'animate.css';

  const store = useStore();

  onMounted(async () => {
    await store.getList();
    initCharts();
    initPie();
    initLine();
  })

  //地图
  const initCharts = () => {

    // console.log(store.list.diseaseh5Shelf.areaTree[0].children);
    const city = store.list.diseaseh5Shelf.areaTree[0].children;
    store.item = city[21].children;

    const charts = echarts.init(document.querySelector('#china') as HTMLElement);
    const data = city.map( v => {
      return {
        name: v.name,
        value: geoCoordMap[v.name].concat(v.total.nowConfirm),      //现存病例
        children: v.children
      }
    })
    //地图配置项
    charts.setOption({
      geo: {
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"],
        layoutSize: "100%",             //地图大小
        emphasis: {
          areaColor: {
            type: "linear-gradient",
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#152E6E", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0673AD", // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          shadowColor: "#0f5d9d",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
          itemStyle: {
            areaColor: "#0f5d9d",
          },
        },
      },
      series: [
        {
          type: "map",
          // selectedMode: "multiple",    //多选
          map: "china",
          aspectScale: 0.8,
          layoutCenter: ["50%", "50%"], //地图位置
          layoutSize: "100%",            //地图大小
          zoom: 1, //当前视角的缩放比例
          // roam: true, //是否开启平游或缩放
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 1,
            max: 2,
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 16,
          },
          itemStyle: {
            areaColor: "#0c3653",
            borderColor: "#1cccff",
            borderWidth: 1.8,
          },
          emphasis: {
            areaColor: "#56b1da",
            label: {
              show: true,
              color: "#fff",
            },
          },
          data: data,
        },
        {
          name: 'Top 5',
          type: 'scatter',
          coordinateSystem: 'geo',
          //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
          // symbolSize: [30,120],
          // symbolOffset:[0, '-40%'] ,
          symbol: 'pin',
          symbolSize: [35,35],
          label: {
            show: true,
            color: '#fff',
            formatter(value:any){
              // console.log(value);   //新增
              return value.data.value[2] 
            }
          },
          itemStyle: {
            color: 'rgb(13,121,230)', //标志颜色
          },
          data: data,
        },
      ],
    })

    //监听点击事件
    charts.on('click',(e:any)=>{
      // console.log(e);
      store.item = e.data.children;
      // console.log(store.item);
    })
  }

  //饼图
  const initPie = () => {
    const charts = echarts.init(document.querySelector('#box-left-pie') as HTMLElement);

    charts.setOption({
      backgroundColor: '#223651',
      tooltip: {
        trigger: 'item'
      },
      // legend: {
      //   top: '5%',
      //   left: 'center'
      // },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          // avoidLabelOverlap: false,          //overflow: hidden 
          itemStyle: {
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
          },
          emphasis: {                           //支线显示
            label: {
              show: true,
              fontSize: '15',
              // fontWeight: 'bold',             //字体粗细
            }
          },
          // data: [
          //   { value: 1048, name: 'Search Engine' },
          //   { value: 735, name: 'Direct' },
          //   { value: 580, name: 'Email' },
          //   { value: 484, name: 'Union Ads' },
          //   { value: 300, name: 'Video Ads' }
          // ]
          data: store.cityDetail.map( v => {
            return {
              value: v.confirm,
              name: v.city
            }
            // console.log(v);
          })
        }
      ]

    })
    
  }

  //线图
  const initLine = () => {
    const charts = echarts.init(document.querySelector('#box-left-line') as HTMLElement);
    charts.setOption({
      backgroundColor: '#223651',
      tooltip: {                                     //折线图上显示数据
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: store.cityDetail.map(v => v.city)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: store.cityDetail.map(v => v.confirm),
          type: 'line',
          smooth: true
        }
      ]
    })
  }
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  height: 100%;
}

.box {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;

  .box-left {
    width: 424px;
    height: 100vh;

    .box-left-pie {
      height: 300px;
      margin: 5px 5px;
      // margin-top: 70px;
    }

    .box-left-line {
      height: 270px;
      margin: 5px 5px;
    }

    .box-left-card {
      // background: #223651;
      color: white;
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
      margin: 5px 5px;

      section {
        border: 1px solid black;
        background: #223651;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:nth-child(2) {
          color: rgb(85,165,222);
          font-size: 19px;
          padding: 10px 0;
          font-weight: 700;
        }
      }
    }
  }

  .box-center {
    flex: 1;
    width: 100vw;
    height: 100vh;
  }

  .box-right {
    width: 400px;
    height: 100vh;
    margin: 5px 5px;
    .table {
      width: 100%;
      background: #212028;

      tr {
        th {
          padding: 5px;
          white-space: nowrap;
        }
        td {
          padding: 5px 10px;
          width: 100px;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>