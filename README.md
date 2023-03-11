## 后端项目
https://github.com/Prepmachine4/form-api
## 页面展示
![image](https://user-images.githubusercontent.com/63285063/224488353-7d9064c8-da1b-43a2-91a5-b0e2bb908ea2.png)
![image](https://user-images.githubusercontent.com/63285063/224488359-c4348021-13d1-49a9-934b-64acff9a0cdd.png)
![image](https://user-images.githubusercontent.com/63285063/224488390-07d88a42-fe8b-41c9-9634-b1fe60a36ac6.png)
![image](https://user-images.githubusercontent.com/63285063/224488401-857eccfd-4882-43cf-8531-f22ea4880287.png)
![image](https://user-images.githubusercontent.com/63285063/224488403-bbd124fc-73d7-4a89-afd8-4dd7ddd566f8.png)
![image](https://user-images.githubusercontent.com/63285063/224488407-98e6e0a2-f65d-4cd7-9eb8-181bad52292e.png)
![image](https://user-images.githubusercontent.com/63285063/224488410-4adc3c14-deb4-4dca-b283-baef464cd76f.png)
![image](https://user-images.githubusercontent.com/63285063/224488426-87b75e01-50f6-4e11-ad7f-d01301771173.png)
![image](https://user-images.githubusercontent.com/63285063/224488435-08748eef-a8a9-43b2-939f-6f71f7cbf2d3.png)


## 前端部署

> 提示：  
> 默认为公有化部署，若想私有化部署，修改main.js中  
>app.config.globalProperties.deplolyMethod的值为private即可

1. 在终端中输入npm run build进行项目打包，打包文件输出到./dist文件夹下
2. 将dist/文件夹下所有文件夹发布到nginx或者静态服务器即可
3. nginx参考配置如下

```
  server
    {
        listen 80;
        ssl_certificate /etc/nginx/ssl/xxx.cn.crt;
        ssl_certificate_key /etc/nginx/ssl/xxx.cn.key;
        include ssl_params;
        server_name xxx.cn;

        root /home/ubuntu/form-api;
        location /
        {
            uwsgi_pass 127.0.0.1:5000;
            include uwsgi_params;
        }
    }
```
