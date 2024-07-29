---
title: 学习使用-beancount-记账
author: imesong
pubDatetime: 2023-07-04
modDatetime: 2023-12-02
slug: beancount
featured: false
draft: false
tags:
  - tool
  - beancount
description: 学习使用beancount记账
---

<aside>
💡 学习 beancount 的过程
1. 了解基本概念，解决 what 的问题
2. 明确目标，解决 why 的问题
3. 查找资料，开始学习
4. 摸索实践，解决问题
5. 查找最佳实践，解决实践中的问题，优化个人实践方案

</aside>

## Why？

1. 全面的了解家庭财务状况；现在家庭的现金流有一些，储蓄有一些，债权，期权，股票也有一些。收入和支出的种类、来源也愈发丰富，Nora 到来以后，会增加各种开销。通过记账行为，全面、细致的了解家庭的收入、支出情况。知道“钱都去哪了”
2. 提高风险抵抗能力；最近了解到 “高收入陷阱”这个概念，现在的家庭收入构成 100% 依赖工资性收入，虽然当前收入还不错，相对比较稳定，容易产生“感觉还行”的错觉，开销不自觉地增加很多，最近三个月的信用卡账单，每月都在一万元以上。但这样的收入构成，风险抵抗能力很差，一旦失业或者工资发放出了问题，整个现金流就断掉了。
3. 改变消费观念；最近有点儿深陷消费主义深渊中无法自拔，无论时自己还是小朋友的的花销，喜欢就买，想要就买，有点儿愈演愈烈的趋势。通过日常的记账行为，变相的提醒自己，“别再买了，有啥用呢”
4. 增加被动收入，开源节流。

## 现在是怎么记账的

现在是通过notion 自建数据库表，每年末，做当年的财务总结和下年的规划。每个月会更新当月的大致花销，收入及结余情况，使用几年下来，能满足基本的流水账诉求。

## 年末总结

1. 今年攒了多少钱
   1. 预计攒多少
   2. 实际攒多少
2. 今年赚了多少
   1. 工资、奖金
   2. 其他
3. 今年花了多少
   1. 固定支出
      1. 日常开销
      2. 房贷
      3. 生活开销（生活费，固定金额，适当宽裕）
      4. 保险
   2. 大项支出
      1. 医疗、旅游等
      2. 大件支出，Mac，家用电器等
   3. 额外支出
4. 关键交易明细
   1. 借出
   2. 还款
   3. 回款

## 新年财务规划

1. 明年能赚多少
2. 明年要花多少
3. 明年想赞多少

- [ ] notion 记账模版待补充

## Notion记账的问题

1. 抓大放小，不关注细节，只关注整体的结余
2. 数据分析不方便
   1. 消费合理性
   2. 理财的角度，钱生钱的方式不多
3. 数据安全性问题
   1. 云端数据，没有额外的加密和脱敏

## 安装 beancount

```kotlin
pip install beancount fava
```

## 复式记账的概念

### 账户

- Assets
- Income
- Liabilities
- Expenses
- Equity

```kotlin
// data open 类型：类型：类型：类型：货币；open 后面使用的是树形语法
2019-01-01 open Assets:Bank:CN:BoC CNY
- Assets
 - Bank
  - CN
   - CMB
    - CNY
    - USD
```

### 借贷恒等式

```kotlin
Assets+Liabilities + Income+Expenses + Equity = 0
```

## 费用明细归类

- 生活费用（Life（日常开销））

  - 衣
  - Food
  - 住（单独账本）
  - 行（包括养车、通勤）
  - 家用电器
  - Coffee
  - Toy
  - Fruit
  - Others
  - RelationShip
    - 人情往来

- 电子产品

  - 电脑
  - 手机
  - pad
  - 配件
    - 耳机
    - 键盘

- 订阅软件费用

  - 各种会员
    - 山姆
    - 88vip
    - 京东
    - 爱奇艺
    - apple care+
  - 科学上网
  - 订阅制软件
  - 买断制软件

- Fixed overhead

  - 保险
    - 寿险
    - 重疾险
    - 医疗险
    - 意外险
    - 车险
  - 水、电、煤、网、话费
  - 房贷

- 教育
  - Dora
  - Nora
  - 网课、专栏

## 交易

```kotlin
Beancount基本的语法如下所示：

YYYY-mm-dd * ["payee"] "description"
  posting 1
  posting 2
  ...
```

> 每一笔交易，需要在两类账户流转。每一条记录都至少有一条借记（Debit）和一条贷记（Credit）。可以看下面这个例子：

```kotlin
2019-01-01 * "日本航空" "紐約-東京"
  Expenses:Transport:Airline 1000 USD
  Liabilities:CreditCard:US:Discover -1000 USD
```

### 典型场景的交易case

<aside>
💡 账户后的金额是带有符号的，符号含义解释如下：

支出账户：一般为正数。表示花费多少钱。
收入账户：一般为负数。表示收入多少钱。投资收入账户可能出现正数，则表示投资亏损。
资产账户：可正可负。正数表示有钱存入，余额增加；负数表示有钱转出，余额减少。
负债账户：可正可负。正数表示还款，负债减少；负数表示借款，负债增加。

</aside>

- **普通的支出交易**

  ```bash
  // 用信用卡 买一个煎饼果子
  // 正负相加 为 0
  2023-07-29 * "杂粮煎饼" "Food"
    Expenses:Life:Food 6 CNY; 支出账户，为 正数
    Liabilities:CMB:4738 -6 CNY ; 负债账户， 为负数
  ```

- **发工资**

  ```kotlin
  2023-01-10 * "Factory" "💰工资2022-12"
    Income:SomeCompany:Salary           -20,000.00 CNY ;应发工资
    Income:SomeCompany:Benefits            -500.00 CNY ;节日福利
    Income:SomeCompany:HousingFund       -2,000.00 CNY ;住房公积金单位扣除
    Assets:Government:HousingFund         4,000.00 CNY ;住房公积金缴纳
    Expenses:Government:SocialSecurity    1,500.00 CNY ;社保缴纳
    Expenses:Government:IncomeTax         3,000.00 CNY ;个税缴纳
    Assets:Bank:Saving:ICBC              14,000.00 CNY ;实发工资

  ```

- **信用卡还款**

```bash
// 信用卡还款， 钱从 资产账户 减少，流动到 负债账户
// 资产账户 负数表示资产
2023-07-30 * "CMB 信用卡还款" "信用卡"
    Assets:CMB:0022 -18259 CNY
    Liabilities:CMB:4738 18259 CNY
```

- **账户之间的交易**

  > 有时不同账户之间相互转账，如把钱从支付宝转移到储蓄卡，或者不同储蓄卡之间转移

  ```bash
  // 账户A + 账户B 的金额 == 0 ； 负数表示转出，正数表示转入
  2023-07-30 * "CMB:0022" "InnerTrans"
      Assets:WechatPay -5000 CNY
      Assets:CMB:0022 5000 CNY
  ```

- 水电煤 定期循环记录
- 房贷，组合记录
- 固定资产折旧
- 股票、期权

## 编辑工具

- **VSCode + VSCode-Beancount** 插件
- **vscode-beancount-formatter 格式化文本插件**
- 快捷键：通过 vscode 自定义日期、账户信息的 snippets，提高输入效率

  - 示例snippets

  ````bash
        {
          "Coffee": {
            "scope": "beancount",
            "prefix": ["coffee", "manner", "starbar"],
            "body": [
              "$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE * ${1|\"Manner\", \"Starbar\"|}  \"Coffee\" ",
              "\t\tExpenses:Life:Coffee ${2:values} CNY",
              "\t\tLiabilities:CMB:4738 -${2:values} CNY",
              "$0"
            ],
            "description": "coffee expense"
          },
          "Shanmu": {
            "scope": "beancount",
            "prefix": "shanmu",
            "body": [
              "$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE * \"Shanmu\"  \"Shopping\" ",
              "\t\tExpenses:Life:Shopping:Shanmu ${1:values} CNY",
              "\t\tLiabilities:CMB:4738 -${1:values} CNY",
              "$0"
            ],
            "description": "Shanmu expense"
          },
          "Food": {
            "scope": "beancount",
            "prefix": "food",
            "body": [
              "$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE * \"Food\"  \"Shopping\" ",
              "\t\tExpenses:Life:Food ${1:values} CNY",
              "\t\tLiabilities:CMB:4738 -${1:values} CNY",
              "$0"
            ],
            "description": "food expense"
          },
          "FamilyMart": {
            "scope": "beancount",
            "prefix": "FamilyMart",
            "body": [
              "$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE * \"FamilyMart\"  \"Shopping\" ",
              "\t\tExpenses:Life:Food ${1:values} CNY",
              "\t\tLiabilities:CMB:4738 -${1:values} CNY",
              "$0"
            ],
            "description": "FamilyMart expense"
          },
          "Taxi": {
            "scope": "beancount",
            "prefix": "taxi",
            "body": [
              "$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE * \"Taxi\"  \"${1:Taxi}\" ",
              "\t\tExpenses:Commute:Taxi ${2:values} CNY",
              "\t\tLiabilities:CMB:4738 -${2:values} CNY",
              "$0"
            ],
            "description": "FamilyMart expense"
          },
          "today": {
            "scope": "beancount",
            "prefix": ["today", "now", "date"],
            "body": ["$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE * "]
          },
          "yesterday": {
            "scope": "beancount",
            "prefix": ["yestoday", "now-1", "date"],
            "body": ["$CURRENT_YEAR-$CURRENT_MONTH-{$CURRENT_DATE-1} * "]
          }
        }
      ```
  ````

## 账本的组织结构

｜ 采用日期+类型方式划分，结合标签辅助分析

- 时间
  - main.bean
    - submain-2021.bean
    - submain-2022.bean
    - submain-2023.bean
    - xxxx.bean
- 类型

  > refer 费用明细

- 标签
  - Nora
  - Dora
  - Life
  - Feature

### 目录结构

```kotlin
└── beancount
    ├── account
    │   ├── assets.bean
    │   ├── equity.bean
    │   ├── expenses.bean
    │   ├── income.bean
    │   └── liabilities.bean
    ├── archive // 归档目录，历史数据
    │   └── submain-2022.bean
    ├── main.bean // 全局账本入口
    ├── price.bean // 待定，自定义
    ├── submain-2023.bean // 2023 年账本入口
    └── tags.bean // 全局标签，财务分析使用

```

目录结构的可能的演进

- 新增导入账单的元数据，比如招行的信用卡账单
- 新增自动化的导入脚本文件
- 新增一些辅助记账的脚本，纯文本的输入稍显繁琐，有插件或工具辅助，提高输入效率；

## 元数据管理

**元数据管理的三个原则：**

1. 完全的拥有权限
2. 数据安全，加密存储
3. 支持修订纪录，方便追溯

**具体方案是：**

1. 创建 github 私有仓库，通过 git 提交记录，记录账本的变更，同时私有仓库确保一定的数据安全性
2. 通过 encrypt 软件加密文件，保证文件非明文存储，私钥单独存储
3. iCloud Drive 备份加密后文件

![元数据管理](https://img.imesong.com/file/ef918ae01e530fc5d0841.png)

## 完整的一个流程

### 实时记录

1. 发生一笔交易
2. iPhone 发送消息给 “滴答小助手”，标签 #beancount 记录金额、行为
3. 晚上登记当日交易到 beancount

### 月底自动导入

- [x] 暂未使用，待能够熟练使用 beancount 后再考虑自动化；上来就考虑提效，容易盲人摸象
- [x] 开源的自动化导入脚本参考

  [https://github.com/jbms/beancount-import](https://github.com/jbms/beancount-import)

## 进阶用法

- [ ] 多人协同记录，新开子账户
- [ ] 资产折旧
- [ ] 期权、虚拟币
- [ ] 中期对账，尤其是赛赛部分的总账，比如月初的3000，月末是2000，但不知道中间者1000 花费在哪里了

## TODO

- [x] 对已有账户余额的处理，使用checking？
- [x] 如何设置账户更合理一些呢？单人记账 & 多人记账
  - [x] 单人按照时间、类别维度分割账本，多人记账暂不考虑
- [ ] 工资单中的社保、养老、公积金怎么处理？
- [ ] 期权，股票怎么处理？
- [x] 现有的固定资产怎么处理？房子，车子
  - [x] 初始化账户时，设置价值；房子使用 commodity 设置自定义通货
- [x] 是否有必要提供 api/app/sass 在手机中可以记录
  - [x] 至少未来一年，没有必要，通过微信公众号中转
- [x] 导入外部账单，需要自动化到什么程度？成本如何？
  - [x] 暂不考虑，2024年规划
- [ ] 固定周期的交易如何处理，水电煤、保险等
- [x] vscode 增加输入快捷键 snippets
  - 参考官方稳定，完成基本设置

## 📎 参考文章

[Beancount Documentation](https://beancount.github.io/docs/index.html)

[我的财务管理方案](https://www.bmpi.dev/self/my-accounting-tool/)

[使用 Beancount 管理家庭财务](https://www.bmpi.dev/self/beancount-my-accounting-tool-v2/)

[记账神器beancount](https://www.skyue.com/19101819.html)

[学习 Beancount 入门复式记账 | Verne in GitHub](https://einverne.github.io/post/2019/11/double-entry-bookkeeping.html)

[请查收你的「开年变富攻略」：开发者如何借助开源工具，科学记账？ - 掘金](https://juejin.cn/post/7195762258962350141)
