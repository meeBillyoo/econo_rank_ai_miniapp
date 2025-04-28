<template>
  <view class="sector-detail-container">
    <view class="header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
        <text class="back-text">返回</text>
      </view>
    </view>
    
    <view class="sector-detail" v-if="sector">
      <view class="detail-header">
        <text class="detail-name">{{ sector.name }}</text>
        <text class="detail-code">{{ sector.code }}</text>
      </view>
      
      <view class="summary-scores">
        <view class="summary-score-item">
          <text class="summary-score-value" :style="{ color: getScoreColor(sector.midTermScore) }">{{ sector.midTermScore }}</text>
          <text class="summary-score-label">中期趋势</text>
        </view>
        <view class="summary-score-item">
          <text class="summary-score-value" :style="{ color: getScoreColor(sector.longTermScore) }">{{ sector.longTermScore }}</text>
          <text class="summary-score-label">长期趋势</text>
        </view>
      </view>
      
      <view class="trend-analysis">
        <text class="section-title">趋势分析</text>
        <view class="analysis-item">
          <text class="analysis-title">中期趋势分析</text>
          <text class="analysis-content">{{ sector.midTermComment }}</text>
        </view>
        <view class="analysis-item">
          <text class="analysis-title">长期趋势分析</text>
          <text class="analysis-content">{{ sector.longTermComment }}</text>
        </view>
      </view>
      
      <view class="expert-opinions">
        <text class="section-title">专家观点</text>
        <view v-for="(expert, index) in sectorExperts" :key="index" class="expert-item">
          <view class="expert-header">
            <text class="expert-name">{{ expert.name }}</text>
            <text class="expert-title">{{ expert.title }}</text>
          </view>
          <view class="expert-score">
            <text class="score-label">评分</text>
            <text class="score-value" :style="{ color: getScoreColor(expert.score) }">{{ expert.score }}</text>
          </view>
          <text class="expert-comment">{{ expert.comment }}</text>
          <text class="comment-date">{{ expert.date }}</text>
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

// 板块数据
const sector = ref({
  name: '科技板块',
  code: 'A股-科技',
  midTermScore: 75,
  midTermComment: '国产替代和创新驱动下，半导体和软件服务表现强劲，中期增长动能充足。',
  longTermScore: 85,
  longTermComment: '科技自主创新上升为国家战略，长期发展空间广阔，研发投入持续加大。'
});

// 专家观点数据
const sectorExperts = ref([
  {
    name: '赵六',
    title: '复旦大学经济学院教授',
    score: 80,
    comment: '科技自主创新上升为国家战略，半导体、人工智能和云计算领域将持续获得政策支持和资金投入。',
    date: '2023-06-12'
  },
  {
    name: '钱七',
    title: '中国人民银行研究局经济学家',
    score: 75,
    comment: '国产替代进程加速，软件国产化、高端芯片和新一代信息技术领域机会显著。',
    date: '2023-06-09'
  },
  {
    name: '张三',
    title: '北京大学经济学院教授',
    score: 70,
    comment: '科技板块估值已有所修复，建议精选具备核心技术和盈利能力的龙头企业。',
    date: '2023-06-07'
  },
  {
    name: '李四',
    title: '清华大学金融学院副教授',
    score: 78,
    comment: '数字经济新基建加速推进，云计算、大数据、人工智能等领域景气度高。',
    date: '2023-06-05'
  },
  {
    name: '王五',
    title: '中国社会科学院研究员',
    score: 72,
    comment: '科技创新是经济高质量发展的核心驱动力，科创板和北交所为科技企业提供了良好的融资环境。',
    date: '2023-06-03'
  }
]);

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 获取评分颜色
const getScoreColor = (score: number) => {
  if (score >= 50) return '#4CAF50'; // 强烈看好 - 绿色
  if (score >= 0) return '#8BC34A';  // 看好 - 浅绿色
  if (score >= -50) return '#FFC107'; // 看淡 - 黄色
  return '#F44336'; // 看空 - 红色
};

// 模拟板块数据库
const sectorsDatabase = [
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
    midTermComment: '光伏、风电装机量持续增长，中期景气度高，但需关注海外市场竞争加剧。',
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
];

// 模拟专家数据库
const expertsOpinionsDatabase = {
  '金融板块': [
    {
      name: '张三',
      title: '北京大学经济学院教授',
      score: 60,
      comment: '金融板块在政策支持下有望迎来估值修复，银行板块不良资产压力缓解，保险公司受益于资产端改善。',
      date: '2023-06-10'
    },
    {
      name: '李四',
      title: '清华大学金融学院副教授',
      score: 45,
      comment: '银行业绩确定性强，但增长空间有限，建议关注零售转型较好的银行和受益于资本市场回暖的券商。',
      date: '2023-06-08'
    },
    {
      name: '王五',
      title: '中国社会科学院研究员',
      score: 50,
      comment: '金融监管趋严，但行业基本面稳健，大型银行安全边际较高，保险公司价值低估。',
      date: '2023-06-05'
    }
  ],
  '科技板块': [
    {
      name: '赵六',
      title: '复旦大学经济学院教授',
      score: 80,
      comment: '科技自主创新上升为国家战略，半导体、人工智能和云计算领域将持续获得政策支持和资金投入。',
      date: '2023-06-12'
    },
    {
      name: '钱七',
      title: '中国人民银行研究局经济学家',
      score: 75,
      comment: '国产替代进程加速，软件国产化、高端芯片和新一代信息技术领域机会显著。',
      date: '2023-06-09'
    },
    {
      name: '张三',
      title: '北京大学经济学院教授',
      score: 70,
      comment: '科技板块估值已有所修复，建议精选具备核心技术和盈利能力的龙头企业。',
      date: '2023-06-07'
    }
  ],
  '医药健康': [
    {
      name: '李四',
      title: '清华大学金融学院副教授',
      score: 40,
      comment: '医药板块分化明显，创新药和高端医疗器械企业有望突破，传统仿制药企业承压。',
      date: '2023-06-11'
    },
    {
      name: '王五',
      title: '中国社会科学院研究员',
      score: 35,
      comment: '集采常态化背景下，具备研发实力和全球化布局的企业更有竞争力。',
      date: '2023-06-06'
    },
    {
      name: '钱七',
      title: '中国人民银行研究局经济学家',
      score: 25,
      comment: '短期政策压力仍存，但长期人口老龄化和健康需求提升趋势明确，建议逢低配置。',
      date: '2023-06-03'
    }
  ],
  '消费板块': [
    {
      name: '赵六',
      title: '复旦大学经济学院教授',
      score: -10,
      comment: '消费复苏不及预期，居民收入增长放缓制约消费能力，建议关注必需消费品和低估值板块。',
      date: '2023-06-10'
    },
    {
      name: '张三',
      title: '北京大学经济学院教授',
      score: -15,
      comment: '消费分层趋势明显，高端消费和品牌消费相对抗跌，大众消费品价格竞争激烈。',
      date: '2023-06-08'
    },
    {
      name: '李四',
      title: '清华大学金融学院副教授',
      score: -20,
      comment: '短期消费数据波动较大，建议关注具备品牌力和渠道优势的龙头企业，等待拐点确认。',
      date: '2023-06-05'
    }
  ],
  '房地产': [
    {
      name: '王五',
      title: '中国社会科学院研究员',
      score: -55,
      comment: '房地产调整仍在进行中，销售下滑和融资困境并存，行业风险较大。',
      date: '2023-06-12'
    },
    {
      name: '钱七',
      title: '中国人民银行研究局经济学家',
      score: -60,
      comment: '房地产长期步入存量时代，增速放缓是大趋势，建议关注优质物业管理和城市更新方向。',
      date: '2023-06-09'
    },
    {
      name: '赵六',
      title: '复旦大学经济学院教授',
      score: -65,
      comment: '行业集中度将进一步提升，资产负债表健康的龙头企业有望在调整中胜出。',
      date: '2023-06-07'
    }
  ],
  '新能源': [
    {
      name: '张三',
      title: '北京大学经济学院教授',
      score: 55,
      comment: '碳中和目标下，新能源替代趋势明确，光伏、风电装机量持续增长，产业链景气度高。',
      date: '2023-06-11'
    },
    {
      name: '李四',
      title: '清华大学金融学院副教授',
      score: 50,
      comment: '技术进步推动成本下降，平价上网加速推进，但需关注海外市场竞争加剧和贸易摩擦风险。',
      date: '2023-06-08'
    },
    {
      name: '王五',
      title: '中国社会科学院研究员',
      score: 45,
      comment: '新能源汽车渗透率持续提升，上游材料供需格局改善，中游电池技术迭代加速。',
      date: '2023-06-05'
    }
  ],
  '石油': [
    {
      name: '钱七',
      title: '中国人民银行研究局经济学家',
      score: 25,
      comment: '地缘政治因素影响供应，油价短期有支撑，但需求增长放缓制约上行空间。',
      date: '2023-06-10'
    },
    {
      name: '赵六',
      title: '复旦大学经济学院教授',
      score: 20,
      comment: '能源转型大趋势下，传统石油企业面临转型压力，建议关注具备清洁能源布局的综合性能源企业。',
      date: '2023-06-07'
    },
    {
      name: '张三',
      title: '北京大学经济学院教授',
      score: 15,
      comment: '油价波动加大，石油企业盈利弹性显著，但长期需求增长受限，估值难以提升。',
      date: '2023-06-04'
    }
  ],
  '黄金': [
    {
      name: '李四',
      title: '清华大学金融学院副教授',
      score: 70,
      comment: '通胀预期和避险需求支撑金价，全球央行购金增加提供底部支撑。',
      date: '2023-06-12'
    },
    {
      name: '王五',
      title: '中国社会科学院研究员',
      score: 65,
      comment: '全球货币宽松和地缘不确定性下，黄金配置价值凸显，但升值空间有限。',
      date: '2023-06-09'
    },
    {
      name: '钱七',
      title: '中国人民银行研究局经济学家',
      score: 60,
      comment: '实际利率走势是影响金价的关键因素，美联储政策转向将支撑金价走强。',
      date: '2023-06-06'
    }
  ],
  '数字货币': [
    {
      name: '赵六',
      title: '复旦大学经济学院教授',
      score: -35,
      comment: '监管趋严和流动性收紧影响，数字货币市场波动加大，投资风险高。',
      date: '2023-06-11'
    },
    {
      name: '张三',
      title: '北京大学经济学院教授',
      score: -40,
      comment: '区块链技术应用拓展，长期发展前景仍存，但需关注监管政策变化。',
      date: '2023-06-08'
    },
    {
      name: '李四',
      title: '清华大学金融学院副教授',
      score: -45,
      comment: '数字货币市场投机性强，机构参与度不足，建议谨慎参与，关注底层技术发展。',
      date: '2023-06-05'
    }
  ]
};

// 根据名称获取板块信息
const getSectorByName = (name: string) => {
  return sectorsDatabase.find(item => item.name === name) || null;
};

// 根据板块名称获取专家观点
const getExpertOpinionsBySector = (sectorName: string) => {
  return expertsOpinionsDatabase[sectorName as keyof typeof expertsOpinionsDatabase] || [];
};

// 页面加载时的逻辑
onLoad((options) => {
  console.log('板块详情页面加载');
  if (options && options.name) {
    const sectorName = decodeURIComponent(options.name);
    const sectorData = getSectorByName(sectorName);
    if (sectorData) {
      sector.value = sectorData;
      sectorExperts.value = getExpertOpinionsBySector(sectorName);
    }
    // 如果没有找到对应板块数据，使用默认数据（已在ref中初始化）
  }
});

onMounted(() => {
  console.log('板块详情组件挂载完成');
});
</script>

<style>
.sector-detail-container {
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

.detail-code {
  font-size: 16px;
  color: #666;
  display: block;
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
  display: block;
}

.summary-score-label {
  font-size: 14px;
  color: #666;
  display: block;
  margin-top: 5px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  display: block;
}

.trend-analysis {
  margin-bottom: 20px;
}

.analysis-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #eee;
}

.analysis-title {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.analysis-content {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.expert-opinions {
  margin-bottom: 20px;
}

.expert-item {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.expert-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.expert-name {
  font-size: 16px;
  font-weight: bold;
}

.expert-title {
  font-size: 14px;
  color: #666;
}

.expert-score {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.score-label {
  font-size: 14px;
  margin-right: 10px;
}

.score-value {
  font-size: 18px;
  font-weight: bold;
}

.expert-comment {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 10px;
}

.comment-date {
  font-size: 12px;
  color: #999;
  text-align: right;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>