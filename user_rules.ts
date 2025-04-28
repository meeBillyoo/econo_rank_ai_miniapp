/**
 * IDE TypeScript 用户规则
 * 适用于 NestJS 或 Hardhat+Solidity 框架
 */

// TypeScript 编译选项
const tsCompilerOptions = {
  // NestJS 推荐配置
  target: 'es2017',
  module: 'commonjs',
  declaration: true,
  removeComments: true,
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  allowSyntheticDefaultImports: true,
  sourceMap: true,
  outDir: './dist',
  baseUrl: './',
  incremental: true,
  skipLibCheck: true,
  strictNullChecks: true,
  noImplicitAny: true,
  strictBindCallApply: true,
  forceConsistentCasingInFileNames: true,
  noFallthroughCasesInSwitch: true,
  
  // Hardhat 相关配置（如果使用）
  resolveJsonModule: true,
  esModuleInterop: true,
  
  // 路径别名
  paths: {
    "@/*": ["./src/*"],
    "@test/*": ["./test/*"],
    "@contracts/*": ["./contracts/*"] // 用于 Hardhat 项目
  }
};

// 代码风格规则
const codeStyleRules = {
  // 缩进使用2个空格
  indentation: 2,
  // 使用单引号
  quotes: 'single',
  // 语句末尾使用分号
  semicolons: true,
  // 使用驼峰命名法
  camelCase: true,
  // 类名使用大驼峰命名法
  pascalCase: true,
  // 接口名称前缀使用I
  interfacePrefix: 'I',
  // 类型名称前缀使用T
  typePrefix: 'T',
  // 枚举名称前缀使用E
  enumPrefix: 'E',
  // 常量使用全大写下划线分隔
  constantNaming: 'UPPER_SNAKE_CASE',
  // 最大行长度
  maxLineLength: 100,
  // 文件末尾空行
  endOfLine: 'lf',
  // 文件末尾新行
  insertFinalNewline: true,
  // 去除行尾空格
  trimTrailingWhitespace: true
};

// NestJS 特定规则
const nestjsRules = {
  // 控制器命名规则
  controllerNaming: '{name}.controller.ts',
  // 服务命名规则
  serviceNaming: '{name}.service.ts',
  // 模块命名规则
  moduleNaming: '{name}.module.ts',
  // DTO命名规则
  dtoNaming: '{name}.dto.ts',
  // 实体命名规则
  entityNaming: '{name}.entity.ts',
  // 装饰器使用规则
  decoratorSpacing: true,
  // 依赖注入方式
  dependencyInjection: 'constructor',
  // 异常处理方式
  exceptionHandling: 'filters',
  // 验证使用class-validator
  validation: 'class-validator',
  // 使用拦截器进行响应转换
  responseTransformation: 'interceptors'
};

// Hardhat+Solidity 特定规则
const hardhatRules = {
  // Solidity版本
  solidityVersion: '^0.8.0',
  // 合约命名规则
  contractNaming: '{Name}.sol',
  // 测试命名规则
  testNaming: '{name}.test.ts',
  // 脚本命名规则
  scriptNaming: '{name}.script.ts',
  // 部署脚本命名规则
  deploymentNaming: '{nn}_{name}.ts',
  // 使用 hardhat-waffle 进行测试
  testingFramework: 'hardhat-waffle',
  // 使用 ethers.js
  ethersLibrary: true,
  // 使用 OpenZeppelin 合约
  useOpenZeppelin: true,
  // Gas优化
  gasOptimization: true,
  // 安全检查
  securityChecks: ['slither', 'mythril'],
  // 文档生成
  documentation: 'natspec'
};

// 导入排序规则
const importOrderRules = {
  // 导入排序分组
  groups: [
    // 内置模块
    ['node:*'],
    // NestJS相关
    ['@nestjs/*'],
    // Hardhat相关
    ['hardhat', 'hardhat/*', '@nomiclabs/hardhat-*', '@openzeppelin/*'],
    // 第三方库
    ['^[a-z]'],
    // 相对路径导入
    ['^@/'],
    ['^\\./'],
    ['^\\.\\.']
  ],
  // 分组之间添加空行
  newlinesBetweenGroups: true
};

// 文件组织规则
const fileOrganizationRules = {
  // NestJS项目结构
  nestjsStructure: {
    src: {
      modules: '按功能模块组织',
      common: '公共代码',
      config: '配置文件',
      main: '入口文件'
    },
    test: {
      e2e: '端到端测试',
      unit: '单元测试'
    }
  },
  // Hardhat项目结构
  hardhatStructure: {
    contracts: '智能合约',
    scripts: '部署和其他脚本',
    test: '测试文件',
    artifacts: '编译输出',
    cache: '缓存文件'
  }
};

// 导出用户规则
export const userRules = {
  tsCompilerOptions,
  codeStyleRules,
  importOrderRules,
  fileOrganizationRules,
  nestjsRules,
  hardhatRules,
  // 禁止使用any类型
  noExplicitAny: true,
  // 强制使用类型声明
  requireExplicitTypes: true,
  // 使用ES模块语法
  useEsModuleSyntax: true,
  // 使用异步/等待而不是Promise链
  preferAsyncAwait: true,
  // 使用可选链和空值合并
  useModernJsFeatures: true,
  // 使用函数式编程方法
  preferFunctionalProgramming: true,
  // 代码注释要求
  commentRequirements: {
    // 公共API必须有JSDoc注释
    publicApi: true,
    // 复杂函数必须有注释
    complexFunctions: true,
    // 使用中文注释
    language: 'zh-CN'
  }
};