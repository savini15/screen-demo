data(){
    return{
        mapChart:null,
        option:null
    }
},
created(){
    this.$nextTick(()=>{{
        this.initMap();
    })
},
methods:{
    initMap(){
        this.mapChart = echarts.init(document.getElementById('mapEchart'));
        echarts.registerMap('weifang', geoJson);
        this.option = {
          //触发事件 不取消全局地图事件
          silent: false,
          //要显示纹理要关闭这个属性--图例
          visualMap: {
            show: false,
          },
          // 进行相关配置
          tooltip: {
            // 鼠标移到图里面不弹出浮动提示框
            show: false,
            position: 'top',
            backgroundColor: 'rgba(0, 119, 239, 0.8)', //提示框背景色
            borderColor: '#057DD9', //边框颜色
            borderWidth: 2,
            textStyle: {
              color: '#ffffff', //文字颜色
            },
            // //自定义提示框自动调用函数
            // formatter: function (params) {
            //   return `哈哈哈`;
            // },
          },
          // 一些地图设置
          geo: {
            map: 'weifang',
            left:'160',
            aspectScale: 1,
            roam: false,
            zoom: 1,
            label: {
              normal: {
                show: true, //省份名展示
                fontSize: '10',
                color: '#fff',
              },
              emphasis: {
                show: true, //省份名展示
                fontSize: '10',
                color: '#fff',
              },
            },
 
            itemStyle: {
              //容器外边框设置
              normal: {
                borderColor: '#33ddff',
                areaColor:'#064e8c',//地图背景色
                borderWidth: 1, //设置外层边框
                shadowColor: '#0953c2',
                borderType:'dashed'
              },
              // 鼠标滑过高亮状态
              emphasis: {
                borderColor: '#29bbd8',
                areaColor: '#3bb8f7' ,//'rgba(59, 184, 247, 1)',
                shadowBlur: 3,
                borderWidth: 1,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: '#3bb8f7',
                opacity: 0.8,
              },
            },
            selectedMode:'single', //选择模式，单选，只能选中一个地市
            //这个就是鼠标点击后高亮状态，地图想要展示的配置
            select:{
              disabled:false,//可以被选中
              label:{
                show:true,
                color:'#fff'
              },
              //相关配置项很多，可以参考echarts官网
              itemStyle:{
                borderColor: '#29bbd8',
                areaColor: '#3bb8f7' ,//'rgba(59, 184, 247, 1)',
                shadowBlur: 3,
                borderWidth: 1,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: '#3bb8f7',
                opacity: 0.8,
              }
            },
          },
          series: [
            {
              name: '潍坊市',
              type: 'map',
              mapType: 'weifang',
              coordinateSystem: 'geo',
              geoIndex: 0,
              animationDuration: 1200,
              rippleEffect: {
                brushType: 'stroke',
              },
              label: {
                // 显示地图省名称
                normal: {
                  color: '#389dff',
                  formatter: '{b}',
                  position: [-12, -1],
                  show: true,
                },
                emphasis: {
                  show: true,
                  color: '#fff',
                },
              },
 
              itemStyle: {
                normal: {
                  areaColor: '#0d0059',
                  borderColor: '#389dff',
                  borderWidth: 0.5,
                },
                emphasis: {
                  areaColor: '#59D5F5',
                  shadowOffsetX: 8,
                  shadowOffsetY: 8,
                  shadowBlur: 5,
                  borderWidth: 0,
                  shadowColor: '#0074BC',
                },
              },
              data: this.mapDataList,
            },
          ],
        };
        this.mapChart.setOption(this.option);
        this.mapChart.on('click',(e)=>{
          this.$emit('selectdistrict',e.name)
        })
 
      },
      // 指定高亮区域
      cancelActive(name){
        this.mapChart && this.mapChart.dispatchAction({
          type: 'select',
          // geo 中名称。
          name
        })
      },
 
}