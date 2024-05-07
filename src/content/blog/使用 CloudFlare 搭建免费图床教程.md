---
title: 使用 CloudFlare 搭建免费图床教程
author: imesong
pubDatetime: 2024-05-06
modDatetime: 2024-05-06T07:42:46.373Z
slug: selfhost-image-service
featured: true
draft: true
tags:
  - saas
description: 介绍如何使用CloudFlare搭建自定义的免费图床，配合 PicGo 完成图片的压缩、自动上传。
---

## 主要内容概要

介绍通过 CloudFlare Worker 搭建免费的图床的方法 ，解决 blog 中图片存储、管理的问题。

**涉及第三方平台**

1. CloudFlare：云服务平台，使用平台的worker 能力，实现图床的能力。
2. Github： 源代码托管平台，调用worker 的功能代码托管在这里。有新增的功能，或者 fix bug ，需要更新代码。
3. Telegram： 图片真正存储的平台，只提供上传功能，暂未开发删除API。

## 核心工作流

![](https://img.imesong.com/file/5243668a5cdf36e69a653.png)

**自建的图床主要提供以下功能**

1. 上传图片，支持两种上传方式：web 页面上传 和 PicGo 客户端上传
2. 图片管理，包括删除、屏蔽、图片审核等。
3. 使用picGo 上传时，配合picGo插件，可以对图片进行压缩，降低图片大小。

**图床的限制**

1. 图片大小，最大 5M
2. 免费额度限制
   1. 上传/删除次数< **1000 次/天**。可以理解为每天最多写入1000次。
   2. 图片展示 < **100000 次/天**。可以理解为每天最多请求 10万张图片。如果开启了CloudFlare换成，命中缓存的请求不占用额度。
3. 如果免费额度使用完成，建议开通 CloudFlare Worker 付费计划，每月 5$。

## 自建图床流程

自建图床的流程，有两个版本，基础版和 pro 版。基础版可以保证可用，搭建简单，**10分钟** 可以搞定；pro 版本搭建过程相对复杂，需要 **2小时** 左右，如果中间有卡点，时间会膨胀的很厉害，pro 功能更加丰富，自定义程度高。

| feature           | basic | pro |
| ----------------- | ----- | --- |
| 图片上传          | ✅    | ✅  |
| 图片url 复制      | ✅    | ✅  |
| 图片查看          | ✅    | ✅  |
| 管理后台          | [x]   | ✅  |
| 图片管理          | [x]   | ✅  |
| 图片上传客户端    | [x]   | ✅  |
| 图片压缩          | [x]   | ✅  |
| 批量上传          | [x]   | ✅  |
| 图片重命名        | [x]   | ✅  |
| 图片审核          | [x]   | ✅  |
| Obsidian 自动上传 | [x]   | ✅  |

大家可以按需选择不同的版本。

### Basic 版本搭建流程

![[basic-self-host-image-service-2024-05-07 13.56.16.excalidraw]]

#### Fork 代码

- fork 仓库 [telegraph-image](https://github.com/imesong/Telegraph-Image) 也可以选择原作者维护的版本 [origin telegraph-image](https://github.com/cf-pages/Telegraph-Image)

#### 连接 CloudFlare

登陆到 cloudflare 平台， 选择 **Workers 和 Pages** 功能。在右侧页面点击 **创建应用程序**

- 选中 Pages
- 连接到 Git
- 选择刚才 fork 到仓库
- 开始设置
- 保存并部署

完了之后，等待部署。部署成功之后，会有一个地址，如果部署成功，这个地址就是上传的页面。
![上传图片页面](https://img.imesong.com/file/1f76fcc13bdca3dc76a1a.png)

#### 测试上传

测试上传功能的方法很简单，随便照一张大小不超过 _5M_ 的图片，上传后能够看到可以访问的url地址。
![](https://img.imesong.com/file/fd7f5b7bcf25b75133bff.png)

### Pro 版本搭建流程

#### 配置管理功能

#### PicGo 客户端

#### 安装 picGo 插件

- Telegram-CloudFlare
- tinyPNG

### 测试上传

1. 单个上传
2. 剪切板上传
3. 批量上传/文件夹上传
