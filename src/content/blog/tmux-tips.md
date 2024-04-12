---
author: imesong
pubDatetime: 2020-03-30 22:50:00
modDatetime: 2023-04-05
title: Tmux 使用小结
slug: tmux-tips
featured: false
draft: false
tags:
  - tool
description: 介绍 Tmux 使用技巧和配置方法
---

## Install

在 mac 系统上，通过brew 安装 tmux

1. brew search tmux
2. brew info tmux
3. brew install tmux

## Config

使用github上寻找到的通用的配置,[按照教程安装完成](https://github.com/gpakosz/.tmux/)。

## 基本概念理解

1. Session
2. window
3. pane

[基本概念介绍](http://cenalulu.github.io/linux/tmux/)

<!-- more -->

## oh-my-tmux 配置理解

全局属性设置，**prefix** 绑定键，默认是Ctrl+b ，使用不方便，oh-my-tmux 中补充 Ctrl+a 为**prefix**键。

## Session 操作

| 操作                | 命令                               | 释义                                      |
| ------------------- | ---------------------------------- | ----------------------------------------- |
| 新建session         | tmux new -s demo                   | 创建名字为 demo 的session                 |
| 查看当前session状态 | tmux list-session /tmux ls         | 列出当前所有的session，只能查看，不能切换 |
| 切换session         | **prefix** s                       | 列出所有session，可以使用 j/k 键切换      |
| rename session      | **prefix** $                       |                                           |
| kill-session        | tmux kill-session -t demo          | close demo session                        |
| kill-server         | tmux kill-server                   | close server ,everything gone             |
| attach-session      | tmux attach-session -t sessionName |                                           |

### Window 操作

一个window，一般会分割为多个pane，当然，默认是1个pane。类似iTerm的Tab

| 操作         | 命令              | 释义                               |
| ------------ | ----------------- | ---------------------------------- |
| 新建window   | **prefix** c      | 新建一个窗口                       |
| 切换窗口     | **prefix** 窗口号 | 如切换到第2个窗口：prefix 2        |
| 关闭当前窗口 | **prefix** &      |                                    |
| 查看所有窗口 | tmux list-window  | 显示所有窗口，并标注active的window |

## Pane 操作

|操作|命令|释义|

---|---|---
| 水平分割window或pane | **prefix** -| 将一个window或者pane 水平分割为2等份，类似 sp|
| 垂直分割window或pane | **prefix** \_| 类似 vs|
| 暂时把pane放到最大 | **prefix** z | pane填充满整个window,再次执行该操作，状态恢复|
| 查看所有pane 的编号 | **prefix** q | |
