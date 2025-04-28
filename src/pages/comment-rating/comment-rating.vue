<template>
  <view class="expert-opinions-container">
    <view class="header">
      <text class="title">专家观点</text>
      <text class="subtitle">最新经济学家言论与分析</text>
    </view>
    
    <view class="filter-section">
      <view class="filter-item">
        <text>筛选领域：</text>
        <picker @change="handleFieldChange" :value="fieldIndex" :range="fieldOptions">
          <view class="picker-text">{{ fieldOptions[fieldIndex] }}</view>
        </picker>
      </view>
      
      <view class="filter-item">
        <text>排序方式：</text>
        <picker @change="handleSortChange" :value="sortIndex" :range="sortOptions">
          <view class="picker-text">{{ sortOptions[sortIndex] }}</view>
        </picker>
      </view>
    </view>
    
    <view class="opinion-list">
      <view v-for="(item, index) in currentOpinions" :key="index" class="opinion-item">
        <view class="opinion-header">
          <view class="expert-avatar">
            <image :src="item.avatar" mode="aspectFill" class="avatar-image"></image>
          </view>
          <view class="expert-info">
            <text class="expert-name">{{ item.name }}</text>
            <text class="expert-title">{{ item.title }}</text>
          </view>
          <view class="opinion-time">{{ item.time }}</view>
        </view>
        
        <view class="opinion-content">
          <text class="content-text">{{ item.content }}</text>
        </view>
        
        <view class="opinion-footer">
          <view class="tag-container">
            <text v-for="(tag, tagIndex) in item.tags" :key="tagIndex" class="tag">{{ tag }}</text>
          </view>
          <view class="opinion-stats">
            <view class="stat-item">
              <text class="stat-icon">👍</text>
              <text class="stat-count">{{ item.likes }}</text>
            </view>
            <view class="stat-item">
              <text class="stat-icon">💬</text>
              <text class="stat-count">{{ item.comments }}</text>
            </view>
            <view class="stat-item">
              <text class="stat-icon">🔄</text>
              <text class="stat-count">{{ item.shares }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="pagination">
      <view class="page-button" :class="{ disabled: currentPage === 1 }" @click="prevPage">上一页</view>
      <text class="page-info">{{ currentPage }}/{{ totalPages }}</text>
      <view class="page-button" :class="{ disabled: currentPage === totalPages }" @click="nextPage">下一页</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 筛选领域选项
const fieldOptions = ['全部领域', '宏观经济', '金融市场', '产业经济', '国际贸易', '货币政策'];
const fieldIndex = ref(0);

// 排序选项
const sortOptions = ['最新发布', '热度排序', '评论最多'];
const sortIndex = ref(0);

// 分页相关
const pageSize = 5; // 每页显示5条
const currentPage = ref(1);
const totalOpinions = ref(20); // 总共20条数据

// 计算总页数
const totalPages = computed(() => Math.ceil(filteredOpinions.value.length / pageSize));

// 专家观点数据
const expertOpinions = ref([
  {
    id: 1,
    name: '张三',
    title: '北京大学经济学院教授',
    avatar: '/static/avatars/expert1.png',
    time: '2023-06-15 10:30',
    content: '近期CPI数据显示通胀压力有所缓解，但PPI同比降幅收窄，表明工业品价格触底回升。这一组合意味着经济复苏正在稳步推进，但仍需警惕成本推动型通胀风险。预计下半年货币政策将保持稳健中性，不会出现大幅收紧或宽松。',
    tags: ['宏观经济', '通胀', '货币政策'],
    likes: 256,
    comments: 48,
    shares: 86
  },
  {
    id: 2,
    name: '李四',
    title: '清华大学金融学院副教授',
    avatar: '/static/avatars/expert2.png',
    time: '2023-06-14 16:45',
    content: '美联储暂停加息但点阵图显示年内仍有两次加息可能，这对全球金融市场形成压力。中国央行有望维持独立的货币政策，人民币汇率将在合理区间内波动。建议投资者关注中美利差变化带来的跨境资本流动影响，以及对A股市场的潜在冲击。',
    tags: ['金融市场', '美联储', '人民币汇率'],
    likes: 198,
    comments: 37,
    shares: 65
  },
  {
    id: 3,
    name: '王五',
    title: '中国社会科学院研究员',
    avatar: '/static/avatars/expert3.png',
    time: '2023-06-13 09:15',
    content: '房地产市场调整仍在继续，但一线城市已现企稳迹象。"保交楼"政策效果显现，行业信用风险有所缓解。长期来看，房地产将回归居住属性，投资属性弱化是大势所趋。未来房地产政策将更加注重保障性住房建设和存量房市场改革。',
    tags: ['房地产', '宏观经济'],
    likes: 175,
    comments: 56,
    shares: 42
  },
  {
    id: 4,
    name: '赵六',
    title: '复旦大学经济学院教授',
    avatar: '/static/avatars/expert4.png',
    time: '2023-06-12 14:20',
    content: '数字经济已成为中国经济增长的新引擎，2022年数字经济规模达到45.5万亿元，占GDP比重超过40%。人工智能、大数据、云计算等新技术与实体经济深度融合，将为传统产业带来新一轮转型。建议加大数字基础设施投入，完善数字经济治理体系。',
    tags: ['数字经济', '产业经济', '人工智能'],
    likes: 231,
    comments: 42,
    shares: 78
  },
  {
    id: 5,
    name: '钱七',
    title: '中国人民银行研究局高级经济学家',
    avatar: '/static/avatars/expert5.png',
    time: '2023-06-11 11:30',
    content: '近期MLF操作利率维持不变，表明央行对当前流动性环境较为满意。随着经济复苏进程推进，货币政策将更加注重精准滴灌和结构性调整，而非全面宽松。预计下半年LPR可能小幅下调，以降低实体经济融资成本，支持小微企业和制造业高质量发展。',
    tags: ['货币政策', '央行', '利率'],
    likes: 187,
    comments: 39,
    shares: 54
  },
  {
    id: 6,
    name: '孙八',
    title: '国务院发展研究中心研究员',
    avatar: '/static/avatars/expert6.png',
    time: '2023-06-10 15:40',
    content: '中国制造业PMI连续三个月位于扩张区间，但扩张力度有所减弱，表明经济复苏动能仍需巩固。消费作为经济增长主引擎的作用正在增强，但投资增速放缓值得关注。建议加大财政政策支持力度，适度扩大地方政府专项债规模，加快重大项目建设进度。',
    tags: ['宏观经济', 'PMI', '财政政策'],
    likes: 165,
    comments: 31,
    shares: 47
  },
  {
    id: 7,
    name: '周九',
    title: '中国银行首席经济学家',
    avatar: '/static/avatars/expert7.png',
    time: '2023-06-09 10:25',
    content: '全球经济增长放缓，IMF下调今年全球经济增长预期至3.0%。发达经济体通胀压力仍大，紧缩政策效果显现但衰退风险上升。中国经济有望保持4.5%以上增速，成为全球经济稳定器。建议企业关注全球供应链重构趋势，提前布局应对贸易格局变化。',
    tags: ['国际贸易', '全球经济', '供应链'],
    likes: 203,
    comments: 45,
    shares: 69
  },
  {
    id: 8,
    name: '吴十',
    title: '上海交通大学安泰经济与管理学院教授',
    avatar: '/static/avatars/expert8.png',
    time: '2023-06-08 16:15',
    content: '新能源汽车产业链景气度持续提升，今年销量有望突破900万辆。动力电池技术迭代加速，钠离子电池产业化进程提速。随着海外市场拓展，中国新能源汽车企业将面临更多贸易壁垒和技术标准挑战，建议加强核心技术研发和国际标准参与度。',
    tags: ['产业经济', '新能源汽车', '技术创新'],
    likes: 219,
    comments: 51,
    shares: 73
  },
  {
    id: 9,
    name: '郑十一',
    title: '中国证券监督管理委员会研究中心主任',
    avatar: '/static/avatars/expert9.png',
    time: '2023-06-07 09:45',
    content: '注册制改革全面推行后，资本市场优胜劣汰机制更加完善。科创板、创业板和北交所差异化定位逐步清晰，多层次资本市场体系建设成效显著。下一步改革重点将是提升上市公司质量、强化中介机构责任、完善投资者保护机制，推动资本市场QUALITY提升。',
    tags: ['金融市场', '资本市场', '注册制'],
    likes: 176,
    comments: 38,
    shares: 52
  },
  {
    id: 10,
    name: '陈十二',
    title: '国家外汇管理局研究所所长',
    avatar: '/static/avatars/expert10.png',
    time: '2023-06-06 14:30',
    content: '今年以来人民币汇率双向波动特征明显，总体保持在合理均衡水平。美元指数走势和中美经济基本面差异是影响汇率的主要因素。预计下半年人民币汇率将保持基本稳定，但波动性可能加大。建议企业合理运用汇率避险工具，防范汇率风险。',
    tags: ['人民币汇率', '外汇市场', '风险管理'],
    likes: 158,
    comments: 33,
    shares: 46
  },
  {
    id: 11,
    name: '林十三',
    title: '中国国际经济交流中心首席研究员',
    avatar: '/static/avatars/expert11.png',
    time: '2023-06-05 11:20',
    content: 'RCEP实施一年多来，区域内贸易投资便利化水平显著提升，中国与东盟贸易额同比增长15%以上。但全球贸易保护主义抬头，地缘政治因素干扰区域经济合作。建议企业充分利用RCEP优惠政策，优化区域内产业链布局，同时关注美欧"友岸外包"战略带来的挑战。',
    tags: ['国际贸易', 'RCEP', '区域合作'],
    likes: 187,
    comments: 41,
    shares: 59
  },
  {
    id: 12,
    name: '黄十四',
    title: '中国农业大学经济管理学院教授',
    avatar: '/static/avatars/expert12.png',
    time: '2023-06-04 15:35',
    content: '今年粮食生产形势总体向好，夏粮丰收已成定局，预计全年粮食产量有望再创新高。但农产品价格波动加剧，农民收入增长面临挑战。建议加大农业科技投入，推进农业现代化，同时完善农产品价格形成机制和收储制度，保障粮食安全和农民利益。',
    tags: ['农业经济', '粮食安全', '农民收入'],
    likes: 145,
    comments: 36,
    shares: 43
  },
  {
    id: 13,
    name: '刘十五',
    title: '中国工商银行研究院院长',
    avatar: '/static/avatars/expert13.png',
    time: '2023-06-03 10:10',
    content: '银行业不良贷款率小幅上升但整体风险可控，房地产贷款风险需重点关注。银行业正加速数字化转型，金融科技应用场景不断拓展。预计今年银行业净利润增速将保持在5%左右，资产质量压力犹存。建议银行加强风险管理，优化信贷结构，加大对实体经济支持力度。',
    tags: ['金融市场', '银行业', '风险管理'],
    likes: 168,
    comments: 39,
    shares: 51
  },
  {
    id: 14,
    name: '张十六',
    title: '国家发改委宏观经济研究院研究员',
    avatar: '/static/avatars/expert14.png',
    time: '2023-06-02 14:50',
    content: '上半年固定资产投资增速放缓，制造业投资韧性较强，基础设施投资平稳，房地产开发投资仍为负增长。下半年稳投资政策将加力，专项债发行使用提速，重大项目开工建设加快。预计全年投资增速将保持在5%左右，对经济增长的支撑作用仍然重要。',
    tags: ['宏观经济', '固定资产投资', '经济增长'],
    likes: 192,
    comments: 43,
    shares: 62
  },
  {
    id: 15,
    name: '李十七',
    title: '中国人民大学财政金融学院教授',
    avatar: '/static/avatars/expert15.png',
    time: '2023-06-01 09:30',
    content: '财政收入增速回升但压力仍存，减税降费政策效果显著。地方政府隐性债务风险得到有效控制，债务置换工作稳步推进。建议优化财政支出结构，加大民生领域投入，同时深化财税体制改革，健全地方税体系，增强地方财政可持续性。',
    tags: ['财政政策', '税收', '地方债务'],
    likes: 175,
    comments: 38,
    shares: 54
  },
  {
    id: 16,
    name: '王十八',
    title: '中国科学院预测科学研究中心主任',
    avatar: '/static/avatars/expert16.png',
    time: '2023-05-31 16:25',
    content: '基于多模型综合分析，预计今年中国GDP增长将达到5.2%左右，好于年初预期。消费对经济增长的贡献率将超过60%，成为拉动经济增长的主引擎。通胀压力总体可控，CPI全年涨幅预计在2.5%以内。外部环境不确定性是最大风险因素，需密切关注。',
    tags: ['宏观经济', 'GDP预测', '经济增长'],
    likes: 226,
    comments: 52,
    shares: 78
  },
  {
    id: 17,
    name: '赵十九',
    title: '商务部国际贸易经济合作研究院研究员',
    avatar: '/static/avatars/expert17.png',
    time: '2023-05-30 11:15',
    content: '今年前5个月我国外贸进出口增长平稳，贸易结构持续优化，高技术、高附加值产品出口占比提升。跨境电商、市场采购贸易等新业态快速发展，为外贸增长注入新动能。下半年外贸面临的不确定性因素增多，建议企业加快转型升级，拓展多元化市场。',
    tags: ['国际贸易', '外贸', '跨境电商'],
    likes: 183,
    comments: 40,
    shares: 57
  },
  {
    id: 18,
    name: '钱二十',
    title: '国家统计局经济景气监测中心主任',
    avatar: '/static/avatars/expert18.png',
    time: '2023-05-29 14:40',
    content: '5月份PMI、消费、投资等主要经济指标增速有所放缓，经济恢复面临一定压力。服务业恢复态势良好，新动能行业增长较快。建议加大宏观政策实施力度，着力扩大内需，促进消费潜力释放，保持经济运行在合理区间。',
    tags: ['宏观经济', '经济指标', '内需'],
    likes: 197,
    comments: 45,
    shares: 63
  },
  {
    id: 19,
    name: '孙二十一',
    title: '中国社科院世界经济与政治研究所研究员',
    avatar: '/static/avatars/expert19.png',
    time: '2023-05-28 10:05',
    content: '全球经济格局正在发生深刻变化，新兴经济体在全球经济中的份额持续提升。中国推动构建新发展格局，将为全球经济复苏提供重要动力。但地缘政治风险上升，全球产业链供应链重构加速，中国企业需提前布局应对，增强风险防范能力。',
    tags: ['全球经济', '地缘政治', '产业链'],
    likes: 212,
    comments: 49,
    shares: 71
  },
  {
    id: 20,
    name: '周二十二',
    title: '中国银保监会政策研究局局长',
    avatar: '/static/avatars/expert20.png',
    time: '2023-05-27 15:20',
    content: '金融风险防控取得积极成效，影子银行、互联网金融风险得到有效处置。银行业保险业运行稳健，服务实体经济质效不断提升。下一步将深化金融供给侧结构性改革，完善金融监管体系，防范化解重点领域风险，守住不发生系统性金融风险的底线。',
    tags: ['金融市场', '风险防控', '金融监管'],
    likes: 178,
    comments: 42,
    shares: 56
  }
]);

// 处理领域筛选变化
const handleFieldChange = (e: any) => {
  fieldIndex.value = e.detail.value;
  currentPage.value = 1; // 重置到第一页
};

// 处理排序方式变化
const handleSortChange = (e: any) => {
  sortIndex.value = e.detail.value;
  currentPage.value = 1; // 重置到第一页
};

// 筛选后的观点列表
const filteredOpinions = computed(() => {
  let result = expertOpinions.value;
  
  // 按领域筛选
  if (fieldIndex.value !== 0) { // 不是"全部领域"
    const selectedField = fieldOptions[fieldIndex.value];
    result = result.filter(item => item.tags.includes(selectedField));
  }
  
  // 按选择的方式排序
  if (sortIndex.value === 0) { // 最新发布
    result = [...result].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  } else if (sortIndex.value === 1) { // 热度排序
    result = [...result].sort((a, b) => b.likes - a.likes);
  } else if (sortIndex.value === 2) { // 评论最多
    result = [...result].sort((a, b) => b.comments - a.comments);
  }
  
  return result;
});

// 当前页显示的观点
const currentOpinions = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredOpinions.value.slice(start, end);
});

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// 页面加载时的逻辑
onLoad(() => {
  console.log('专家观点页面加载');
});

onMounted(() => {
  console.log('专家观点组件挂载完成');
});
</script>

<style>
.expert-opinions-container {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  display: block;
}

.subtitle {
  font-size: 16px;
  color: #666;
  display: block;
  margin-top: 5px;
}

.filter-section {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.filter-item:last-child {
  margin-bottom: 0;
}

.picker-text {
  color: #007AFF;
}

.opinion-list {
  margin-bottom: 20px;
}

.opinion-item {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.opinion-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.expert-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}

.avatar-image {
  width: 100%;
  height: 100%;
}

.expert-info {
  flex: 1;
}

.expert-name {
  font-size: 16px;
  font-weight: bold;
  display: block;
}

.expert-title {
  font-size: 12px;
  color: #666;
  display: block;
  margin-top: 2px;
}

.opinion-time {
  font-size: 12px;
  color: #999;
}

.opinion-content {
  margin-bottom: 15px;
}

.content-text {
  font-size: 15px;
  line-height: 1.5;
  color: #333;
}

.opinion-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  background-color: #f0f8ff;
  color: #007AFF;
  padding: 2px 8px;
  border-radius: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.opinion-stats {
  display: flex;
}

.stat-item {
  display: flex;
  align-items: center;
  margin-left: 15px;
}

.stat-icon {
  font-size: 16px;
  margin-right: 4px;
}

.stat-count {
  font-size: 12px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.page-button {
  padding: 8px 15px;
  background-color: #007AFF;
  color: white;
  border-radius: 5px;
  font-size: 14px;
}

.page-button.disabled {
  background-color: #cccccc;
  color: #666;
}

.page-info {
  margin: 0 15px;
  font-size: 14px;
  color: #666;
}
</style>