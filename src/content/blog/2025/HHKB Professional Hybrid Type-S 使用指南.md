---
title: HHKB Professional Hybrid Type-S 使用指南
author: imesong
pubDatetime: 2025-02-01
editDatetime: 2025-02-01
slug: HHKB Professional Hybrid Type-S 使用指南
featured: false
draft: false
tags:
  - tool
description: HHKB Professional Hybrid Type-S 简要使用说明
---

## 背景介绍

老早就买了这个的键盘，之前一直在公司使用，通过有线方式连接办公电脑，配置一次后，就无需更改。最近在家办公时，需要连接多台办公设备，由于家里的空间很小，使用蓝牙无线连接。虽然有保留过电子版的说明书，但在设置的时候，还是不知道怎么配置，快捷键总是忘记，到网上一通乱找，费了不少时间。这里简单记录一下，算是给自己做个备忘。如果你碰巧使用的也是 HHKB 系列的键盘，希望对你有些许帮助。

![流程说明](https://i.imesong.com/2025/02/hhkb-hybrid-type-s.png)

## 产品概述

- 型号：HHKB Professional Hybrid Type-S
- 连接方式：USB Type-C & 蓝牙 5.0
- 电池：内置可充电锂电池
- 兼容系统：Windows/macOS/iOS/Android

## 基础设置

### DIP 开关设置

macOS 模式推荐设置：

```
SW1: OFF  - 启用 Fn 键
SW2: ON   - Delete 键作为 ⌫ (Backspace)
SW3: ON   - ⌘ 键位于 [Alt] 位置
SW4: OFF  - 启用 Windows/macOS 键
SW5: OFF  - 保持默认键位
SW6: OFF  - 保持默认键位
```

![](https://i.imesong.com/2025/02/HHKB-DIP-CONFIG.png)

## 连接方式

### 1. USB 有线连接

- 使用随附的 USB Type-C 连接线连接电脑
- 切换至有线模式：`Fn + Control + 0`

### 2. 蓝牙无线连接

- 支持同时配对最多4台设备
- 设备切换：`Fn + Control + [1-4]`
- 电池电量查看：`Fn + Control + B`
  - 绿灯：电量充足
  - 橙灯：电量中等
  - 红灯：电量不足

### 键盘快捷键

![](https://i.imesong.com/2025/02/HHKB-SHORTCUT-KEY.png)

## 常见使用场景

### 场景1：首次蓝牙配对

1. 按下 `Fn + Q` 进入配对模式（蓝色 LED 指示灯闪烁）
2. 按下 `Fn + Control + [1-4]` 选择配对槽位
3. 在设备蓝牙设置中选择"HHKB-Hybrid"
4. 根据提示输入配对码并按回车确认

### 场景2：切换至USB模式

当电池电量耗尽或需要使用有线模式时：

- 按下 `Fn + Control + 0` 切换至USB模式

### 场景3：蓝牙连接故障排除

如遇到蓝牙搜索不到设备的情况：

1. 清空配对信息：`Fn + Z + ~`（键盘将自动关闭）
2. 长按电源键重启键盘
3. 按 `Fn + Q` 进入配对模式
4. 按 `Fn + Control + [1-4]` 选择配对槽位
5. 重启设备蓝牙后重新搜索配对

## 维护保养

- 建议定期使用键盘清洁工具清洁键帽
- 避免阳光直射和高温环境
- 建议每3个月进行一次充电，保持电池活性

## 技术规格

- 键轴类型：Topre 静电容键轴
- 键程：3.8mm
- 触发点：1.8mm
- 寿命：5000万次按键
- 充电接口：USB Type-C
- 电池续航：约3个月（因使用情况而异）

## 参考资料

- [HHKB Professional HYBRID Type-S 用户手册](https://origin.pfultd.com/downloads/hhkb/manual/P3PC-6641-03ZH.pdf)
- [HHKB 官方网站](https://happyhackingkb.com/)

---

关注公众号 **技术后花园** 获取更多信息

![image.png](https://img.imesong.com/file/9e0dc4dc2d2acd363d535.png)
