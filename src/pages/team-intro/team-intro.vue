<template>
  <view class="team-intro-container">
    <view class="header">
      <text class="title">团队介绍</text>
      <text class="subtitle">AI驱动的宏观政策与专家观点分析团队</text>
    </view>
    
    <view class="team-mission">
      <text class="section-title">我们的使命</text>
      <text class="mission-text">
        我们是一家致力于运用人工智能技术进行宏观政策和专家观点分析的专业团队。
        通过先进的自然语言处理和机器学习算法，我们客观评估经济学家的观点准确性和影响力，
        为金融机构、政策制定者和投资者提供高质量的决策参考。
      </text>
    </view>
    
    <view class="team-advantage">
      <text class="section-title">我们的优势</text>
      <view class="advantage-item">
        <view class="advantage-icon">🔍</view>
        <view class="advantage-content">
          <text class="advantage-title">专业的金融视角</text>
          <text class="advantage-desc">团队核心成员均来自国内知名金融机构，拥有丰富的实战经验和深厚的行业洞察力</text>
        </view>
      </view>
      
      <view class="advantage-item">
        <view class="advantage-icon">🛡️</view>
        <view class="advantage-content">
          <text class="advantage-title">金融安全技术保障</text>
          <text class="advantage-desc">技术团队具备金融安全背景，确保数据分析过程中的安全性和合规性</text>
        </view>
      </view>
      
      <view class="advantage-item">
        <view class="advantage-icon">🤖</view>
        <view class="advantage-content">
          <text class="advantage-title">AI技术驱动</text>
          <text class="advantage-desc">自主研发的AI模型能够精准捕捉宏观政策变化和专家观点中的关键信息</text>
        </view>
      </view>
    </view>
    
    <view class="team-members">
      <text class="section-title">核心团队</text>
      
      <view v-for="(member, index) in teamMembers" :key="index" class="member-card">
        <view class="member-avatar"></view>
        <view class="member-info">
          <text class="member-name">{{ member.name }}</text>
          <text class="member-title">{{ member.title }}</text>
          <text class="member-bio">{{ member.bio }}</text>
        </view>
      </view>
    </view>
    
    <view class="methodology-section">
      <text class="section-title">研究方法</text>
      <view class="methodology-item">
        <text class="methodology-title">多源数据采集</text>
        <text class="methodology-desc">
          从央行政策文件、金融监管报告、专家公开发言和媒体报道中收集全面的宏观经济数据。
        </text>
      </view>
      
      <view class="methodology-item">
        <text class="methodology-title">AI语义分析</text>
        <text class="methodology-desc">
          运用自然语言处理技术，对专家观点进行语义理解和情感分析，提取关键预测和判断。
        </text>
      </view>
      
      <view class="methodology-item">
        <text class="methodology-title">准确性追踪</text>
        <text class="methodology-desc">
          建立专家观点数据库，追踪其预测的实现情况，通过机器学习算法不断优化评分模型。
        </text>
      </view>
      
      <view class="methodology-item">
        <text class="methodology-title">金融专业审核</text>
        <text class="methodology-desc">
          由资深金融从业者组成的专业团队对AI分析结果进行审核，确保分析结论的专业性和可靠性。
        </text>
      </view>
    </view>
    
    <view class="contact-section">
      <text class="section-title">联系我们</text>
      <text class="contact-item">邮箱: contact@econorank.com</text>
      <text class="contact-item">微信公众号: EconoRank</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 团队成员数据
const teamMembers = ref([
  { 
    name: '张总监', 
    title: '首席研究员 | 前国有大型银行风险管理部总监',
    bio: '拥有15年金融行业经验，曾负责银行宏观经济分析和风险预警体系建设，对货币政策和金融监管有深入研究。'
  },
  { 
    name: '李博士', 
    title: 'AI技术负责人 | 金融科技专家',
    bio: '计算机科学博士，曾在国际知名金融科技公司担任技术主管，专注于金融领域的自然语言处理和机器学习算法研发。'
  },
  { 
    name: '王分析师', 
    title: '高级分析师 | 前证券研究所首席经济学家助理',
    bio: '金融学硕士，具有丰富的宏观经济分析经验，曾参与多项重要经济政策解读和行业研究报告撰写工作。'
  },
  { 
    name: '赵工程师', 
    title: '安全技术专家 | 金融安全系统架构师',
    bio: '网络安全专家，曾在金融监管科技部门工作，负责金融数据安全和风险监测系统建设，确保平台数据分析的安全合规。'
  },
]);

// 页面加载时的逻辑
onLoad(() => {
  console.log('团队介绍页面加载');
});

onMounted(() => {
  // 组件挂载后的逻辑
  console.log('团队介绍组件挂载完成');
});
</script>

<style>
.team-intro-container {
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

.team-mission {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.mission-text {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.team-advantage {
  margin-bottom: 20px;
}

.advantage-item {
  display: flex;
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
}

.advantage-icon {
  font-size: 24px;
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.advantage-content {
  flex: 1;
}

.advantage-title {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.advantage-desc {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.team-members {
  margin-bottom: 20px;
}

.member-card {
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.member-avatar {
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 15px;
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 16px;
  font-weight: bold;
  display: block;
}

.member-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  display: block;
}

.member-bio {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.methodology-section {
  margin-bottom: 20px;
}

.methodology-item {
  margin-bottom: 15px;
}

.methodology-title {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.methodology-desc {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.contact-section {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
}

.contact-item {
  font-size: 14px;
  line-height: 1.5;
  display: block;
  margin-bottom: 5px;
}
</style>