---
title: 抖音小游戏通过code获取openid
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
// 替换成你的小游戏 App Key 和 App Secret
$app_key = '******';
$app_secret = '******';

// 通过 GET 方法获取用户授权登录后的 code
$code = $_GET['code'];

// 构造 POST 请求的数据
$postData = json_encode(array(
    'appid' => $app_key,
    'secret' => $app_secret,
    'code' => $code
));

// 初始化一个 cURL 句柄
$ch = curl_init();

// 设置 cURL 选项
curl_setopt($ch, CURLOPT_URL, 'https://developer.toutiao.com/api/apps/v2/jscode2session');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($postData)
));

// 执行 POST 请求
$response = curl_exec($ch);

echo $response;

// 关闭 cURL 句柄
curl_close($ch);
?>

```