#Linux #CentOS8 #Mysql
#### 笔记选自 阿里云[Linux （centos8）安装 MySQL 8 数据库（图文详细教程）-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/863603)
安装操作环境：
>Linux : CentOS 8![[查看系统信息.png]]
>MySQL : 8.0.26![[查看mysql 版本信息.png]]


### 01 下载并安装 MySQL 官方的 Yum Repository
``` bash
wget https://repo.mysql.com//mysql80-community-release-el7-1.noarch.rpm
```

### 02 进行repo的安装：
``` bash
rpm -ivh mysql80-community-release-el7-1.noarch.rpm
```

执行以上命令后，会在 `/etc/yum.repos.d/` 目录下生成 `mysql-community.repo` ，`mysql-community-source.repo` 两个文件![[00 安装rpm.png]]
使用 `yum` 安装 `mysql` 操作
``` bash
yum install mysql-server
```

### 03 mysql-server 配置
`mysql` 配置路径  `/etc`
![[01 mysql 配置文件路径.png]]
##### 大小写敏感
使用vim方式打开my.cnf配置文件
``` bash
vim /etc/my.cnf
``` 
在打开的文本编辑框内输入以下内容
```  bash
# (1-不敏感，0-敏感)
lower_case_table_names=1
```

#### 04 mysql 服务
启动mysql服务
``` bash
systemctl start mysqld.service
```
关闭mysql服务
``` bash
systemctl stop mysqld.service
```
重启mysql服务
``` bash
systemctl restart mysqld.service
```
设置开机自启
``` bash
systemctl enable mysqld.service
```
关闭开启自启
``` bash
systemctl disable mysqld.service
```

### 05 登录 mysql 
##### CentOS 8 使用 `rpm` 安装 `mysql` 后默认创建的密码为空，可以直接通过 `mysql -u root ` 登录系统
`mysql` 日志![[02 mysql日志路径.png]]`mysql` 登录![[03 mysql 登录界面.png]]