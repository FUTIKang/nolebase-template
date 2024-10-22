### 基本功能
#### 00 启动

#### 01 停止

#### 02 重启

#### 03 开机自启
- 开启
```cmd
```
- 关闭

#### 04 查看防火墙已开启端口
```
firewall-cmd --zone=public --list-ports
```

一、查看防火墙状态

查看防火墙状态：systemctl status firewalld

开启防火墙：systemctl start firewalld

关闭防火墙：systemctl stop firewalld

若遇到无法开启

先用：systemctl unmask firewalld.service

然后：systemctl start firewalld.service

二、查看对外开放的端口状态

查询已开放的端口列表：firewall-cmd --zone=public --list-ports

查询指定端口是否开放：netstat -apn | grep 端口号

查询指定端口是否已开：firewall-cmd --query-port=666/tcp

提示 yes，表示开启；no表示未开启。

三、对外开发端口

查看想开的端口是否已开：firewall-cmd --query-port=123/tcp

添加指定需要开放的端口：firewall-cmd --add-port=123/tcp --permanent

重载入添加的端口：firewall-cmd --reload

查询指定端口是否开启成功：firewall-cmd --query-port=123/tcp

移除指定端口：firewall-cmd --permanent --remove-port=123/tcp
