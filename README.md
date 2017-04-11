# analytics
#### By NIKstone
#### 数据采集，采集页面上用户的操作，参考Google analytics以及百度统计的方式，页面自定义参数及事件。使用的是带锚点的方式采集。
统计代码部署；
##1.在页面上引入JS文件
###(function(i,s,o,g,r,a,m){i['analyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)};i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window, document, 'script', 'lib/ma.js', '_ma');
##2.添加自定义参数字段。（海报id、广告id、海报名称、描述字段等）
### _ma('create', key, value, description);
### "create" - 关键字，表示创建参数字段 
### key - 字段名
### value - 参数值
### description - 描述字段，（暂不采集）
### e.g _ma('create', 'aid', '1584236', '广告id');
##3.添加统计事件（发送）
### _ma('send', type, data);
### "send" - 关键字，发送请求
### type - 类型。参数类型："PosterVisit","MaterialVisit","pageClick"
### data - 额外参数{array} ([[key, value], [key, value],....]) ,仅当次事件有效
### e.g
### _ma("send", "PosterVisit", [["open_time", (new Date()).getTime()], ["location", "beijing"]]);
### ***特殊的是：
### 页面开始统计点击事件。并在点击之后发送点击坐标到后台
### _ma('send', 'pageclick', send_key);
### send_key - 页面点击事件，事件名
### 点击坐标参数固定为: “cc”。
### e.g: 
###      海报点击事件 _ma('send', 'pageclick', 'PosterClick');
##4.特殊事件统计（按钮点击、视频播放、用户注册（登录）、文件下载等）
### _ma('trackEvent', category, action, description, extraArr);
### 'trackEvent' - 关键字，标识特殊事件 
### category {String} - 要监控的目标的类型名称，通常是同一组目标的名字，比如”视频”、”音乐”、”软件”、”游戏”等等。该项必选。
### action - 用户跟目标交互的行为，如”播放”、”暂停”、”下载”等等。该项必选。
### description {String} - 事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项可选。
### extraArr {Array} -为当前发送统计的请求添加自定义字段，比如描述，时间，备注等。数组格式为二维数组，如： [[key1,value1],[key2,value2],.....]。该项可选。
### 事件触发后会向后台发送数据，发送字段参数：
  cat: category, 
  act: action, 
  des: description,
##5.其他
### 删除字段，删除后不再向后台发送该字段（仅能用于删除自定义参数）
### 例如： 
### _ma('create', 'aid', '123456');
### _ma('create', 'pid', '456789');
### ....
### ....
### _ma('clear', ['aid', 'pid']); 
注：页面事件类型（ea）: PosterVisit（海报展示）, MaterialVisit（素材展示）, PosterClick（海报点击）, MaterialClick（素材点击）, Track（特殊事件统计）, UserRegister（注册事件）, UserLogin（登陆事件）
