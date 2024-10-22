# 查看端口开放列表
```shell
sudo ufw status verbose
```
# 开放指定端口
## 单个端口
```shell
sudo ufw allow 端口号[/协议名称]
```
- 协议名称例如：`tcp` 、`udp`及`Icmp`等协议名称
- 缺省协议名称默认开放`tcp`，`udp`两个默认端口
## 开发某个范围的所有端口
```shell
sudo ufw allow [起始端口:终端端口]/[协议名称]
```
- 开放范围为` 起始端口 : 终端端口 `包含起始端口以及终点端口
- 指定端口范围的开放方式不允许省略协议名称，必须指定协议名称
# 删除开放端口
## 删除单个开放端口
```shell
sudo ufw allow delete [端口]
```
## 删除某个范围开放端口
```shell
sudo ufw allow delete  [起始端口:终端端口]
```