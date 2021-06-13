# vue-music

## 项目运行

1.下载全部依赖

```
npm install
```

### 开发模式运行预览
```
npm run serve
```

2.项目部署

**nginx 配置文件**

```nginx
location /music/ {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_pass http://127.0.0.1:9002/;
        }
```

这里将所有请求都代理到我的node服务器上，注意端口问题

**项目线上路径**

去vue.config.json修改下列代码

```json
publicPath: process.env.NODE_ENV === 'production' ? '/music' : '/'
```

**更改线上域名地址**

去service目录下的base.js下修改下列代码

```javascript
const baseURL = process.env.NODE_ENV === 'production' ? 'http://daune.club' : '/'
```

替换为你自己线上的域名地址

**运行** 

```javascript
npm run deploy
```

