# 整理归纳
对于vue项目中遇到的问题、插件的使用、业务功能进行归纳

## 添加动态路由白屏
> 动态路由在添加过程中就对路由进行访问，同异步问题，加载还未完成就访问，导致白屏

```js
// 确保动态添加的路由已经完全加载，并且不能通过浏览器后退按钮返回前一个路由
next({...to,replace:true})
```

原理：
如果参数to不能找到对应的路由的话，会在执行一次`beforeEach()`，知道找到对应的路由。如果守卫中没有正确的出口，则会一直进入死循环寻找路由中。

## 前端性能优化
>当用户打开首页时，会一次性加载所有资源，造成首页加载慢，降低用户体验

1. 路由懒加载
```js
component: import("@/views/home.vue")
```
2. 组件懒加载：对话框组件不是一进页面就需要加载，而是用户点击后才加载。
```js
<script>
const dialogInfo = import('@/components/dialogInfo')

export default {
	component:{dialogInfo}
}
</script>
```
3. tree shaking：打包时消除无用代码
4. 引入骨架屏组件优化加载体验
5. gzip进行打包压缩
6. 长列表场景使用虚拟列表：只渲染可视区域的列表项。
7. 长任务使用web worker多线程
8. 优化JS加载
```js
// 1. 正常模式
<script src="index.js"></script>

// 2. 异步模式：无顺序，不阻塞dom渲染。使用场景：不会产生dom资源所需数据时
<script async src="index.js"></script>

// 3. defer模式：异步，有顺序。在DOMContentLoaded执行之前。
<script defer src="index.js"></script>
```
9. link预先加载
```js
<link as='style' href="xxx" rel="preload"></link>
```
10. 图片压缩与动态裁剪来压缩体积
11. 图片的懒加载
12. 使用svg
13. 防抖节流

## 组件ui库发布npm官网

1. 先写组件，需要写name
2. 在src下面创建目录yyp-ui/index.js
3. 编写index.js

```jsx
import a from '../components/a.vue';
import b from '../components/b.vue';

const coms = [a,b]

// 插件模式，需要暴露一个install方法，Vue.use就是使用下面的方法
const install = Vue => {
  /**
   * 注册全局组件
   * Vue.component(名字，组件实例)
   */
	coms.forEach(com =>{
		Vue.component(com.name, com );
	})
  
};
export default install;
```

4. 在package.json配置打包路径
    1. target lib 关键字 指定打包的目录
    2. name 打包后的文件名字
    3. dest 打包后的文件夹的名称

```jsx
"scripts": {
    "serve": "vue-cli-service serve --mode dev",
    "build": "vue-cli-service build --mode prod",
    "yyp-ui": "vue-cli-service build --target lib ./src/yyp-ui/index.js --dest yppUi --name ui"
  },
```

5. 执行终端打包命令在yyp-ui目录里

```jsx
npm run yyp-ui
```

6. 打包完成后出现yypUi目录
    1. ui.css是我们组件的样式表
    2. ui.umd.min.js是我们所需要的js文件

7. 在根目录创建目录packages
    1. 创建styles目录，把ui.css放入
    2. 放入ui.umd.min.js
8. 在packages目录中执行终端初始化一个npm

```jsx
npm init -y
```

9. package.json

```jsx
{
  "name": "yyp-ui",
  "version": "1.0.0",
  "description": "",
  "main": "ui.umd.min.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "vue",
    "js",
    "html"
  ],
  "author": "yyp",
  "license": "ISC"
}
```

10. 登录npm官网注册用户
11. 发布npm
    1. 使用nrm切换 npm install -g nrm
    2. nrm ls 查看所有源
    3. nrm use npm 切换
    4. 登录 npm login，填写用户名，密码，邮箱，邮箱验证码
    5. 发布到npm远程 npm publish
12. 使用自己的npm组件库
    1. 安装自己的npm , npm i yyp-ui
    2. 在main.js中注册
    ```jsx
    import yypUi from 'yyp-ui';
    import 'yyp-ui/styles/ui.css';
    Vue.use(yypUi);
    ```
   3. 就可以直接使用组件了

## WebSocket用法

1、创建websocket实例

2、创建websocket连接

3、监听websocket消息

4、关闭websocket连接

5、打印websocket错误

### websocket状态

```css
readyState:
	0:表示正在连接
	1:表示连接成功，可以通信
	2:表示连接正在关闭
	3:表示连接已经关闭
```

### 代码

### 初始化

```jsx
		async init() {
      let that = this;
      this.isloading = true;
      if (this.$route.params.item) {
        this.item = this.$route.params.item;
        this.uid = Number(this.$route.params.uid);
        this.sid = this.$route.params.sid;
        this.groupId = this.$route.params.groupId;
        this.checkInStatus = this.item.checkInStatus;
				 // 获取历史消息
        await this.getAllList();
				 // 获取成员
        await this.getMeetingMember();
				 // 设置在线状态
        this.setOnline(this.userId, 1);
				 // 创建websocket实例
        this.ws = new WebSocket(process.env.wsUrl);
        console.log(this.ws);
        // 监听socket连接
        this.ws.onopen = this.open;
        // 监听socket错误信息
        this.ws.onerror = this.error;
        // 监听socket消息
        this.ws.onmessage = this.getMessage;
				 // 关闭socket连接
        this.ws.onclose = this.close;
      }
    },
		// 设置参会人员在线状态
    setOnline(userId, status) {
      if (userId && status) {
        if (this.talk == 0) {
          // 类型为会议活动
          if (this.inCharge[0].userId === userId) {
            this.inCharge[0].isOnline = status;
          } else if (this.noteKeeper[0].userId === userId) {
            this.noteKeeper[0].isOnline = status;
          }
        } else {
          // 类型为谈心谈话
          if (this.talker[0].userId === userId) {
            this.talker[0].isOnline = status;
          } else if (this.noteKeeper[0].userId === userId) {
            this.noteKeeper[0].isOnline = status;
          }
        }
        for (var i = 0; i < this.meetingMembers.length; i++) {
          if (this.meetingMembers[i].userId == userId) {
            this.meetingMembers[i].isOnline = status;
          }
        }
      }
    },
```

### 设置方法

```css
		open() {
      console.log("open");
			 // 进行登录、心跳
      this.setConnect();
    },
    error() {
      console.log("error");
    },
		send(params) {
      this.ws.send(params);
    },
    close() {
      console.log("socket已经关闭");
    },
		getMessage(data) {
			// 接收服务器发送的消息
      let that = this;
      console.log("getMessage");
      let res = JSON.parse(data.data);
      console.log(res, "websocket");
      if (res.type == "-1") {
        Toast(
          "当前用户在别的设备登陆,请确认是否是本人操作,如不是请尽快处理账户安全!"
        );
        setTimeout(() => {
          that.$router.push("/");
        }, 3000);
      } else {
        if (res.type == "2") {
          res.message.user = res.user;
          var d = new Date(res.createTime); //根据时间戳生成的时间对象
          var date = formatDate(d, "yyyy-MM-dd hh:mm:ss");
          res.message.createTime = date;
          that.chatList.push(res.message);
          that.$nextTick(function() {
            that.$refs.chatMain.scrollTop = 9999;
            // -
            // this.$refs.chatMain.clientHeight;
            //网页正文全文宽 - 网页可见区域宽
          });
        } else if (res.type == "1") {
          this.setOnline(res.uuid, 1);
        } else if (res.type == "4") {
          this.setOnline(res.uuid, "0");
        }
      }
    },
```

### 登录、设置心跳

```jsx
setConnect() {
      // 初始化连接
      let that = this;
      this.send(
        JSON.stringify({
          type: "1",
          uid: this.uid,
          sid: this.sid,
          groupId: this.groupId
        })
      );
      // 每隔一分钟发一次心跳
      this.inter = setInterval(() => {
        that.sendHear();
      }, 60000);
    },
    sendHear() {
      this.send(
        JSON.stringify({
          type: "0",
          uid: this.uid,
          sid: this.sid,
          groupId: this.groupId
        })
      );
    },
```

### 离开页面关闭监听与断开连接

```jsx
destroyed() {
		// 清除定时器
    clearInterval(this.inter);
    this.inter = null;
		// 关闭连接
    this.ws.close();
  },
```

## Web Worker使用
