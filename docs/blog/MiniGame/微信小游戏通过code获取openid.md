---
title: 微信小游戏通过code获取openid
icon: pen-to-square
# 一个页面可以有多个分类
category:
  - minigame
tag:
  - minigame
article: true
timeline: true
dir:
  index: true
  order: 1
---

服务器PHP代码
```php
<?php
// 小程序的 AppID 和 AppSecret
$appId = '******';
$appSecret = '******';
// 通过 GET 方法获取用户授权登录后的 code
$code = $_GET['code'];

// 构建请求的 URL
$url = "https://api.weixin.qq.com/sns/jscode2session?appid={$appId}&secret={$appSecret}&js_code={$code}&grant_type=authorization_code";

// 初始化 cURL
$ch = curl_init($url);

// 设置 cURL 选项
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 如果你没有配置 SSL 证书，可以暂时关闭 SSL 验证

// 执行请求并获取返回数据
$response = curl_exec($ch);

// 关闭 cURL 资源
curl_close($ch);

echo $response;
?>
```