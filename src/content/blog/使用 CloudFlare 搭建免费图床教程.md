---
title: 使用-CloudFlare-搭建免费图床教程
author: imesong
pubDatetime: 2024-05-06
modDatetime: 2024-05-12T07:42:46.373Z
slug: 使用-cloudflare-搭建免费图床教程
featured: false
draft: false
tags:
  - saas
description: 介绍了如何使用 CloudFlare Worker 搭建一个免费的图床，并通过与 PicGo 和 Obsidian 插件的配合，实现图片的简化管理和自动化上传，解决了博客图片存储和管理的问题。
---

## 主要内容概要

介绍通过 CloudFlare Worker 搭建免费的图床的方法 ，解决 blog 中图片存储、管理的问题。配合 PicGo 和 Obsidian 图片上传插件，简化图片处理流程。
**涉及第三方平台**

1. CloudFlare：云服务平台，使用平台的 worker 能力，实现图床的能力。
2. Github： 源代码托管平台，调用 worker 的功能代码托管在这里。有新增的功能，或者 fix bug ，需要更新代码。
3. Telegraph： 图片真正存储的平台，只提供上传功能，暂未开发删除API。

## 核心工作流

![](https://img.imesong.com/file/5243668a5cdf36e69a653.png)
**自建图床的基本功能**

1. 上传图片，支持两种上传方式：web 页面上传 和 PicGo 客户端上传
2. 图片管理，包括删除、屏蔽、图片审核等。
3. 支持 picGo 客户端，配合 picGo 插件，可以对图片进行压缩，降低图片大小。

**图床的限制**

1. 图片大小，最大 5M
2. 免费额度限制
   1. 上传/删除次数 < **1000 次/天**。可以理解为每天最多写入 1000次。
   2. 图片展示 < **100000 次/天**。可以理解为每天最多请求 10万张图片。如果开启了 CloudFlare 换成，命中缓存的请求不占用额度。
3. 如果免费额度使用完成，建议开通 CloudFlare Worker 付费计划，每月 5$。

## 自建图床流程

自建图床的流程，有两个版本，基础版和 pro 版。基础版可以保证可用，搭建简单，**10分钟**可以搞定；pro 版本搭建过程相对复杂，需要 **2小时** 左右，如果中间有卡点，时间会膨胀的很厉害，pro 功能更加丰富，可自定义程度高。

| feature           | basic | pro |
| ----------------- | ----- | --- |
| 图片上传          | ✅    | ✅  |
| 图片url 复制      | ✅    | ✅  |
| 图片查看          | ✅    | ✅  |
| 管理后台          | [x]   | ✅  |
| 自定义域名        | [x]   | ✅  |
| 图片管理          | [x]   | ✅  |
| 图片上传客户端    | [x]   | ✅  |
| 图片压缩          | [x]   | ✅  |
| 批量上传          | [x]   | ✅  |
| 图片重命名        | [x]   | ✅  |
| 图片审核          | [x]   | ✅  |
| Obsidian 自动上传 | [x]   | ✅  |

大家可以按需选择不同的版本。

### Basic 版本搭建流程

[[basic-self-host-image-service-2024-05-07 13.56.16.excalidraw]]
![basic 版本搭建流程](https://img.imesong.com/file/968513dbe4375423a0b22.png)

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

pro 版本流程相对于 basic 版本，主要增加了配置项以及和 PicGo 客户端的联动。流程图中主要体现新增的的功能，基础功能可以参考 basic 版本流程图。

#### 配置管理功能

支持的管理功能主要包括三项

- 开启管理后台
- 支持图片管理功能

**开启管理后台**
在 CloudFlare 部署后台，进入 Settings -> Functions -> KV 。我们需要在这里配置一对KV
![image.png](https://img.imesong.com/file/009dc21955f7c096ecfec.png)

- img_url：变量名。
- image : 在 KV 目录下的命名空间，没有可用的，可以新建一个。

完成后，在部署的URL 后面 添加 **/admin**，就可以进入管理后台了。如 <https://img.imesong.com/admin>

**管理后台增加登陆验证**

如果管理后台没有权限管控，基本的登陆验证都没有，好比家里后堂敞开大门，心里还有有点不放行。开启登陆验证的功能很简单，新增两个配置即可。
在 CloudFlare 部署后台，进入 Settings -> Environment variables

![image.png](https://img.imesong.com/file/26e10cd3809c140b8e5ba.png)

新增的两个变量名

- BASIC_PASS: 密码
- BASIC_USER：用户名
  后面的 value 就是登陆时需要输入的内容。管理后台设置完成后，内容大致如此

![image.png](https://img.imesong.com/file/33170760d4f3bf676b57b.png)

#### 自定义域名

CloudFlare 部署完成后，会自动分配一个可用的域名。如果有需要使用自己定义的域名，可以配置 DNS到自己的域名上。自定义域名的配置和普通网站解析相同，不再赘述具体的规则。

- CNAME： 新增一个二级域名，指向 CloudFlare 部署后生成的地址。大约 5分钟生效。

#### PicGo 客户端

[PicGo](<https://github.com/Molunerfinn/PicGo> 是一款图片上传客户端，有丰富的第三方插件。 这里介绍如何在PicGo 中配置自定义图床，将图片上传到我们刚配置完成的平台上。

**安装 PicGo 客户端**

PicGo 客户端可以在 github 上 [下载最新的版本](https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.1)，直接双击安装包，完成安装流程。

\*\*安装 [telegraph-image](https://github.com/secflag/picgo-plugin-telegraph-image)插件

picGo 默认支持很多图床，比如 阿里云、腾讯云、七牛云等，但我们搭建的图床需要不同于这些已有的，需要安装第三方插件，配置自定义图床。
插件安装后，配置很简单，只需要把上传图片的URL 填进去就可以。

![image 图床配置](https://img.imesong.com/file/be376e2283b072561e8ba.png)

picGo 还有很多实用的插件，可以参考这里[更多 picGo 插件推荐](https://github.com/PicGo/Awesome-PicGo)

- [tinyPNG](https://github.com/liujinpen/picgo-plugin-compress-tinypng)

#### Obsidian 中自动上传图片到图床

如果日常习惯使用 Obsidian 编辑文本，记笔记，可以使用 **Image auto upload plugin** 插件，配合 PicGo，将文档中的图片自动上传到图床上，让我们的写作流程更加流畅。

- 安装 Obsidian 插件市场，搜索关键字 _Image auto upload_
- 安装插件并打开插件
- 配置插件: 使用默认配置即可，picGo server端口号 36677

![ Image auto upload plugin](https://img.imesong.com/file/b50e0049680982fa01a94.png)

### 测试上传

1. 单个上传
2. 剪切板上传
3. 批量上传/文件夹上传
4. Obsidian 插件自动化上传

验证上述三种上传方式后，关于图床的搭建、配置及使用工作流基本完成。

## AI Summary

> 以下内容是 AI 对本文的总结，供大家参考

本文介绍了如何使用 CloudFlare Worker 搭建一个免费的图床，并通过与 PicGo 和 Obsidian 插件的配合，实现图片的简化管理和自动化上传，解决了博客图片存储和管理的问题。

关注公众号 **技术后花园** 获取更多信息

![image.png](https://img.imesong.com/file/9e0dc4dc2d2acd363d535.png)
