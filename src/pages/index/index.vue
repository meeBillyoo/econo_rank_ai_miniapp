<template>
  <view class="dashboard-container">
    <view class="header">
      <text class="title">宏观形势AI专家团</text>
      <text class="subtitle">综合面板</text>
    </view>
    
    <view class="filter-section">
      <view class="filter-item">
        <text>排序方式：</text>
        <picker @change="handleSortChange" :value="sortIndex" :range="sortOptions">
          <view class="picker-text">{{ sortOptions[sortIndex] }}</view>
        </picker>
      </view>
    </view>
    
    <view class="sector-cards">
      <view 
        v-for="(item, index) in sectorList" 
        :key="index" 
        class="sector-card"
        @click="navigateToDetail(item)"
      >
        <view class="sector-header">
          <text class="sector-name">{{ item.name }}</text>
          <text class="sector-code">{{ item.code }}</text>
        </view>
        
        <view class="rating-section">
          <view class="rating-labels">
            <text class="rating-label">中期趋势: {{ item.midTermScore }}</text>
            <text class="rating-label">长期趋势: {{ item.longTermScore }}</text>
          </view>
          
          <view class="combined-progress-container">
            <!-- 长期趋势进度条（边框） -->
            <view class="long-term-progress" :style="{ 
              borderColor: getProgressColor(item.longTermScore),
              borderWidth: getLongTermBorderWidth(item.longTermScore)
            }">
              <!-- 中期趋势进度条（内部填充） -->
              <view class="mid-term-progress" :style="{ 
                width: getProgressWidth(item.midTermScore), 
                backgroundColor: getProgressColor(item.midTermScore),
                opacity: 0.8
              }"></view>
              <!-- 中间标记线 -->
              <view class="progress-marker"></view>
            </view>
          </view>
          
          <view class="rating-comments">
            <text class="rating-comment">{{ item.midTermComment }}</text>
            <text class="rating-comment">{{ item.longTermComment }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="update-info">
      <text>最后更新时间：{{ lastUpdateTime }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 排序选项
const sortOptions = ['按板块名称', '按中期趋势', '按长期趋势'];
const sortIndex = ref(0);

// 最后更新时间
const lastUpdateTime = ref('2023-06-15 15:30');

// 行业板块数据
const sectorList = ref([
  {
    name: '金融板块',
    code: 'A股-金融',
    midTermScore: 45,
    midTermComment: '受益于政策支持和流动性改善，中期看好银行和保险子行业，但需警惕不良资产风险。',
    longTermScore: 60,
    longTermComment: '金融改革持续深化，长期向好，资产质量和盈利能力有望稳步提升。'
  },
  {
    name: '科技板块',
    code: 'A股-科技',
    midTermScore: 75,
    midTermComment: '国产替代和创新驱动下，半导体和软件服务表现强劲，中期增长动能充足。',
    longTermScore: 85,
    longTermComment: '科技自主创新上升为国家战略，长期发展空间广阔，研发投入持续加大。'
  },
  {
    name: '医药健康',
    code: 'A股-医药',
    midTermScore: 30,
    midTermComment: '集采常态化压制利润，中期面临调整，创新药和医疗器械仍有结构性机会。',
    longTermScore: 65,
    longTermComment: '人口老龄化和健康需求提升，长期成长确定性高，创新药企优势明显。'
  },
  {
    name: '消费板块',
    code: 'A股-消费',
    midTermScore: -15,
    midTermComment: '消费复苏不及预期，中期承压，高端消费和必需品相对抗跌。',
    longTermScore: 40,
    longTermComment: '消费升级趋势未变，长期看好品牌力强和渠道优势明显的龙头企业。'
  },
  {
    name: '房地产',
    code: 'A股-地产',
    midTermScore: -60,
    midTermComment: '行业调整仍在进行，中期面临销售下滑和融资困境，风险较大。',
    longTermScore: -20,
    longTermComment: '长期步入存量时代，增速放缓，优质物业管理和城市更新方向机会较多。'
  },
  {
    name: '新能源',
    code: 'A股-新能源',
    midTermScore: 50,
    midTermComment: '光伏、风电装机量持续增长，中期景气度高，但需关注海外竞争机制化。',
    longTermScore: 80,
    longTermComment: '碳中和目标下，新能源替代趋势明确，长期成长空间广阔。'
  },
  {
    name: '石油',
    code: '大宗商品',
    midTermScore: 20,
    midTermComment: '地缘政治影响供应，中期价格有支撑，但需求增长放缓制约上行空间。',
    longTermScore: -30,
    longTermComment: '能源转型大趋势下，长期需求增长受限，传统石油企业面临转型压力。'
  },
  {
    name: '黄金',
    code: '贵金属',
    midTermScore: 65,
    midTermComment: '通胀预期和避险需求支撑，中期表现强势，央行购金增加提供底部支撑。',
    longTermScore: 55,
    longTermComment: '全球货币宽松和地缘不确定性下，长期配置价值凸显，但升值空间有限。'
  },
  {
    name: '数字货币',
    code: '加密资产',
    midTermScore: -40,
    midTermComment: '监管趋严和流动性收紧影响，中期波动加大，投资风险高。',
    longTermScore: 25,
    longTermComment: '区块链技术应用拓展，长期发展前景仍存，但需关注监管政策变化。'
  }
]);

// 处理排序方式变化
const handleSortChange = (e: any) => {
  sortIndex.value = e.detail.value;
  sortSectorList();
};

// 排序行业板块列表
const sortSectorList = () => {
  const index = sortIndex.value;
  if (index === 0) {
    // 按板块名称排序
    sectorList.value.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
  } else if (index === 1) {
    // 按中期趋势排序（从高到低）
    sectorList.value.sort((a, b) => b.midTermScore - a.midTermScore);
  } else if (index === 2) {
    // 按长期趋势排序（从高到低）
    sectorList.value.sort((a, b) => b.longTermScore - a.longTermScore);
  }
};

// 计算进度条宽度
const getProgressWidth = (score: number) => {
  // 将-100到100的分数转换为0到100%的宽度
  // 0分对应50%宽度（中间位置）
  const percentage = 50 + score / 2;
  return `${percentage}%`;
};

// 获取进度条颜色
const getProgressColor = (score: number) => {
  if (score >= 50) return '#4CAF50'; // 强烈看好 - 绿色
  if (score >= 0) return '#8BC34A';  // 看好 - 浅绿色
  if (score >= -50) return '#FFC107'; // 看淡 - 黄色
  return '#F44336'; // 看空 - 红色
};

// 计算长期趋势边框宽度
const getLongTermBorderWidth = (score: number) => {
  // 将-100到100的分数转换为1px到8px的边框宽度
  // 分数绝对值越大，边框越粗
  const absScore = Math.abs(score);
  const minWidth = 1;
  const maxWidth = 8;
  const borderWidth = minWidth + (absScore / 100) * (maxWidth - minWidth);
  return `${borderWidth}px`;
};

// 导航到板块详情页面
const navigateToDetail = (sector: any) => {
  uni.navigateTo({
    url: `/pages/index/sector-detail?name=${encodeURIComponent(sector.name)}&code=${encodeURIComponent(sector.code)}`
  });
};

// 页面加载时的逻辑
onLoad(() => {
  console.log('综合面板页面加载');
  // 默认按中期趋势排序
  sortIndex.value = 1;
  sortSectorList();
});

onMounted(() => {
  // 组件挂载后的逻辑
  console.log('综合面板组件挂载完成');
});
</script>

<style>
.dashboard-container {
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
}

.picker-text {
  color: #007AFF;
}

.sector-cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.sector-card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}

.sector-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sector-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.03);
  opacity: 0;
  transition: opacity 0.2s;
}

.sector-card:active::after {
  opacity: 1;
}

.sector-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.sector-name {
  font-size: 18px;
  font-weight: bold;
}

.sector-code {
  color: #666;
  font-size: 14px;
}

.rating-section {
  margin-bottom: 10px;
}

.rating-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.rating-label {
  font-size: 14px;
  color: #333;
}

.combined-progress-container {
  height: 30px;
  position: relative;
  margin-bottom: 10px;
}

.long-term-progress {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  box-sizing: border-box;
  transition: border-width 0.3s;
}

.mid-term-progress {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: width 0.3s;
  border-radius: 15px;
}

.progress-marker {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background-color: #333;
  z-index: 2;
}

.rating-comments {
  margin-top: 10px;
}

.rating-comment {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  display: block;
  margin-bottom: 8px;
}

.update-info {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 20px;
}
</style>
