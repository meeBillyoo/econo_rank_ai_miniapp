<template>
  <view class="expert-detail-container">
    <view class="header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
        <text class="back-text">返回</text>
      </view>
    </view>
    
    <view class="expert-detail" v-if="expert">
      <view class="detail-header">
        <text class="detail-name">{{ expert.name }}</text>
        <text class="detail-title">{{ expert.title }}</text>
        <view class="expert-fields">
          <text v-for="(field, fieldIndex) in expert.fields" :key="fieldIndex" class="field-tag">{{ field }}</text>
        </view>
      </view>
      
      <view class="summary-scores">
        <view class="summary-score-item">
          <text class="summary-score-value">{{ expert.accuracy }}</text>
          <text class="summary-score-label">准确度</text>
        </view>
        <view class="summary-score-item">
          <text class="summary-score-value">{{ expert.weight }}</text>
          <text class="summary-score-label">权重</text>
        </view>
      </view>
      
      <view class="detail-scores">
        <view class="score-item">
          <text class="score-name">学术影响力</text>
          <view class="score-bar">
            <view class="score-fill" :style="{ width: (expert.academicScore * 10) + '%' }"></view>
          </view>
          <text class="score-value">{{ expert.academicScore }}</text>
        </view>
        
        <view class="score-item">
          <text class="score-name">预测准确性</text>
          <view class="score-bar">
            <view class="score-fill" :style="{ width: (expert.accuracyScore * 10) + '%' }"></view>
          </view>
          <text class="score-value">{{ expert.accuracyScore }}</text>
        </view>
        
        <view class="score-item">
          <text class="score-name">政策影响力</text>
          <view class="score-bar">
            <view class="score-fill" :style="{ width: (expert.policyScore * 10) + '%' }"></view>
          </view>
          <text class="score-value">{{ expert.policyScore }}</text>
        </view>
        
        <view class="score-item">
          <text class="score-name">媒体曝光度</text>
          <view class="score-bar">
            <view class="score-fill" :style="{ width: (expert.mediaScore * 10) + '%' }"></view>
          </view>
          <text class="score-value">{{ expert.mediaScore }}</text>
        </view>
      </view>
      
      <view class="expert-bio">
        <text class="bio-title">专家简介</text>
        <text class="bio-content">{{ expert.bio }}</text>
      </view>
      
      <view class="expert-publications">
        <text class="publications-title">代表性观点</text>
        <view v-for="(pub, pubIndex) in expert.publications" :key="pubIndex" class="publication-item">
          <text class="publication-title">{{ pub.title }}</text>
          <text class="publication-date">{{ pub.date }}</text>
        </view>
      </view>
    </view>
    
    <view class="loading" v-else>
      <text>加载中...</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 专家数据 - 修改为默认显示第一位专家，而不是null
const expert = ref(
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
  }
);

// 模拟数据库
const expertsDatabase = [
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
  }
];

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 根据ID获取专家信息
const getExpertById = (id: number) => {
  return expertsDatabase.find(item => item.id === id) || expertsDatabase[0]; // 如果找不到，返回第一位专家
};

// 页面加载时的逻辑
onLoad((options) => {
  console.log('专家详情页面加载');
  if (options && options.id) {
    const expertId = parseInt(options.id);
    const expertData = getExpertById(expertId);
    if (expertData) {
      expert.value = expertData;
    }
  }
  // 如果没有传入ID或找不到对应专家，将使用默认初始化的专家数据
});

onMounted(() => {
  console.log('专家详情组件挂载完成');
});
</script>

<style>
.expert-detail-container {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.back-button {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.back-icon {
  font-size: 20px;
  margin-right: 5px;
}

.back-text {
  font-size: 16px;
  color: #007AFF;
}

.detail-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.detail-name {
  font-size: 24px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.detail-title {
  font-size: 16px;
  color: #666;
  display: block;
  margin-bottom: 10px;
}

.expert-fields {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
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

.summary-scores {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 15px;
}

.summary-score-item {
  text-align: center;
}

.summary-score-value {
  font-size: 24px;
  font-weight: bold;
  color: #007AFF;
  display: block;
}

.summary-score-label {
  font-size: 14px;
  color: #666;
  display: block;
  margin-top: 5px;
}

.detail-scores {
  margin-bottom: 20px;
}

.score-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.score-name {
  width: 100px;
  font-size: 14px;
}

.score-bar {
  flex: 1;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 10px;
}

.score-fill {
  height: 100%;
  background-color: #007AFF;
}

.score-value {
  width: 30px;
  text-align: right;
  font-size: 14px;
  font-weight: bold;
}

.expert-bio {
  margin-bottom: 20px;
}

.bio-title, .publications-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.bio-content {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.expert-publications {
  margin-bottom: 20px;
}

.publication-item {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #eee;
}

.publication-title {
  font-size: 14px;
  font-weight: bold;
  display: block;
}

.publication-date {
  font-size: 12px;
  color: #999;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>