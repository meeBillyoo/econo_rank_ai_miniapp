<template>
  <view class="expert-rating-container">
    <view class="header">
      <text class="title">专家评分</text>
      <text class="subtitle">基于专业评审团的评分结果</text>
    </view>
    
    <view class="filter-section">
      <view class="filter-item">
        <text>排序方式：</text>
        <picker @change="handleSortChange" :value="sortIndex" :range="sortOptions">
          <view class="picker-text">{{ sortOptions[sortIndex] }}</view>
        </picker>
      </view>
      
      <view class="filter-item">
        <text>筛选领域：</text>
        <picker @change="handleFieldChange" :value="fieldIndex" :range="fieldOptions">
          <view class="picker-text">{{ fieldOptions[fieldIndex] }}</view>
        </picker>
      </view>
    </view>
    
    <view class="rating-list">
      <view v-for="(item, index) in ratingList" :key="index" class="rating-item" @click="navigateToDetail(item)">
        <view class="rank-number">{{ index + 1 }}</view>
        <view class="expert-info">
          <text class="expert-name">{{ item.name }}</text>
          <text class="expert-title">{{ item.title }}</text>
          <view class="expert-fields">
            <text v-for="(field, fieldIndex) in item.fields" :key="fieldIndex" class="field-tag">{{ field }}</text>
          </view>
        </view>
        <view class="rating-details">
          <view class="accuracy-score">
            <text class="score-label">准确度</text>
            <text class="score-value">{{ item.accuracy }}</text>
          </view>
          <view class="weight-score">
            <text class="score-label">权重</text>
            <text class="score-value">{{ item.weight }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="methodology-section">
      <text class="section-title">评分方法说明</text>
      <text class="methodology-text">
        专家评分基于学术影响力、研究创新性、政策贡献度和预测准确性等多维度指标，由经济学领域资深专家组成的评审团进行评定。
        权重分值表示该专家在整体评分中的影响力比重，准确度分值反映其历史预测的准确程度。
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 排序选项
const sortOptions = ['评分从高到低', '评分从低到高', '按权重排序', '按准确度排序', '按姓名排序'];
const sortIndex = ref(0);

// 领域筛选选项
const fieldOptions = ['全部领域', '宏观经济学', '微观经济学', '计量经济学', '发展经济学', '金融经济学', '行为经济学'];
const fieldIndex = ref(0);

// 模拟数据
const ratingList = ref([
  { 
    id: 1,
    name: '张三', 
    title: '北京大学经济学院教授，博士生导师',
    fields: ['宏观经济学', '货币政策'],
    accuracy: 9.8, 
    weight: 0.85,
    academicScore: 9.7,
    accuracyScore: 9.8,
    policyScore: 9.5,
    mediaScore: 8.9,
    bio: '张三教授是国内知名宏观经济学家，曾任国家经济智囊团成员，对中国宏观经济政策有深入研究。在国内外重要经济学期刊发表论文百余篇，多次准确预测经济周期转折点。',
    publications: [
      { title: '中国经济增长新动能分析', date: '2023-03-15' },
      { title: '后疫情时代的货币政策走向', date: '2022-11-20' },
      { title: '数字经济对传统产业的影响研究', date: '2022-06-08' }
    ]
  },
  { 
    name: '李四', 
    title: '清华大学金融学院副教授，经济学博士',
    fields: ['微观经济学', '行为金融'],
    accuracy: 9.5, 
    weight: 0.78,
    academicScore: 9.3,
    accuracyScore: 9.5,
    policyScore: 8.7,
    mediaScore: 9.2,
    bio: '李四博士专注于行为金融学研究，曾在哈佛大学做访问学者。其研究成果在投资者行为分析和市场异象解释方面有重要贡献，开发的投资者情绪指数被多家金融机构采用。',
    publications: [
      { title: '投资者情绪与股市波动关系研究', date: '2023-02-10' },
      { title: '行为偏差对资产定价的影响', date: '2022-09-15' },
      { title: 'A股市场异象实证分析', date: '2022-04-22' }
    ]
  },
  { 
    name: '王五', 
    title: '中国社会科学院经济研究所研究员',
    fields: ['计量经济学', '宏观预测'],
    accuracy: 9.3, 
    weight: 0.82,
    academicScore: 9.4,
    accuracyScore: 9.3,
    policyScore: 9.6,
    mediaScore: 8.5,
    bio: '王五研究员长期从事宏观经济预测和政策评估工作，开发了多个经济预测模型，预测准确率在业内处于领先水平。曾参与多项国家重大经济政策的制定咨询工作。',
    publications: [
      { title: '中国经济周期波动特征研究', date: '2023-04-18' },
      { title: '宏观经济预测模型的改进与应用', date: '2022-10-30' },
      { title: '供给侧结构性改革效果评估', date: '2022-05-12' }
    ]
  },
  { 
    name: '赵六', 
    title: '复旦大学经济学院教授，国际经济学博士',
    fields: ['发展经济学', '国际贸易'],
    accuracy: 9.0, 
    weight: 0.75,
    academicScore: 9.1,
    accuracyScore: 9.0,
    policyScore: 8.8,
    mediaScore: 8.7,
    bio: '赵六教授是国际贸易和发展经济学领域的专家，研究方向包括全球价值链、贸易政策与经济发展等。曾担任多个国际组织的顾问，对全球贸易格局变化有深入研究。',
    publications: [
      { title: '全球价值链重构与中国产业升级', date: '2023-01-25' },
      { title: '贸易摩擦对中国经济的影响分析', date: '2022-08-17' },
      { title: '新兴经济体在全球经济治理中的角色', date: '2022-03-09' }
    ]
  },
  { 
    name: '钱七', 
    title: '中国人民银行研究局高级经济学家',
    fields: ['宏观经济学', '货币政策'],
    accuracy: 8.8, 
    weight: 0.88,
    academicScore: 8.9,
    accuracyScore: 8.8,
    policyScore: 9.7,
    mediaScore: 8.2,
    bio: '钱七博士长期从事货币政策研究和金融市场分析，对中央银行政策工具和传导机制有深入研究。其政策建议多次被决策层采纳，在业内具有较高影响力。',
    publications: [
      { title: '利率市场化改革的效果评估', date: '2023-05-20' },
      { title: '数字人民币的经济影响分析', date: '2022-12-05' },
      { title: '货币政策与宏观审慎政策协调研究', date: '2022-07-11' }
    ]
  },
]);

// 处理排序方式变化
const handleSortChange = (e: any) => {
  sortIndex.value = e.detail.value;
  sortRatingList();
  console.log('排序方式变更为:', sortOptions[sortIndex.value]);
};

// 排序评分列表
const sortRatingList = () => {
  const index = sortIndex.value;
  if (index === 0) {
    // 评分从高到低
    ratingList.value.sort((a, b) => b.accuracy - a.accuracy);
  } else if (index === 1) {
    // 评分从低到高
    ratingList.value.sort((a, b) => a.accuracy - b.accuracy);
  } else if (index === 2) {
    // 按权重排序
    ratingList.value.sort((a, b) => b.weight - a.weight);
  } else if (index === 3) {
    // 按准确度排序
    ratingList.value.sort((a, b) => b.accuracy - a.accuracy);
  } else if (index === 4) {
    // 按姓名排序
    ratingList.value.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
  }
};

// 处理领域筛选变化
const handleFieldChange = (e: any) => {
  fieldIndex.value = e.detail.value;
  // 这里可以添加筛选逻辑
  console.log('筛选领域变更为:', fieldOptions[fieldIndex.value]);
};

// 导航到专家详情页面
const navigateToDetail = (expert: any) => {
  uni.navigateTo({
    url: `/pages/expert-rating/expert-detail?id=${expert.id}`
  });
};

// 页面加载时的逻辑
onLoad(() => {
  console.log('专家评分页面加载');
});

onMounted(() => {
  // 组件挂载后的逻辑
  console.log('专家评分组件挂载完成');
  // 默认按准确度从高到低排序
  sortRatingList();
});
</script>

<style>
.expert-rating-container {
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

.picker-text {
  color: #007AFF;
}

.rating-list {
  margin-bottom: 20px;
}

.rating-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.rating-item:active {
  background-color: #f5f5f5;
}

.rank-number {
  width: 30px;
  height: 30px;
  background-color: #007AFF;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-right: 15px;
}

.expert-info {
  flex: 1;
}

.expert-name {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
}

.expert-title {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 6px;
}

.expert-fields {
  display: flex;
  flex-wrap: wrap;
}

.field-tag {
  font-size: 12px;
  background-color: #f0f0f0;
  color: #666;
  padding: 2px 8px;
  border-radius: 10px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.rating-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 80px;
}

.accuracy-score, .weight-score {
  text-align: center;
  margin-bottom: 5px;
}

.score-label {
  font-size: 12px;
  color: #666;
  display: block;
}

.score-value {
  font-size: 18px;
  font-weight: bold;
  color: #007AFF;
  display: block;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.methodology-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>