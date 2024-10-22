### SQL Sever简介
### 数据库的创建和使用
#### 数据库结构
- 数据文件
	- 数据文件可不断扩充，不受操作系统文件大小的限制
	- 可以将数据文件存储在不同的硬盘中，这样可以同时对多个硬盘进行并行存取，提高数据的处理性能
- 事务日志文件
- 文件组
- <p style="color : red;font-size:18px ">三者之间的联系:</p>
	- 一个数据库在逻辑上对应一个数据库名，在物理上对应若干个存储文件
#### 创建用户数据库
- 用 SQL 创建数据库
```T-SQL
	create database 数据库名字
	on (
		name = "*.mdf"，
		filename= "路径 + *.mdf"，
		size = * MB/G，
		maxsize = * MB/G，
		filegrowth = 百分比
	)
	log on (
		name = "*.ldf"
		filename = "路径 + *.ldf"
		size = * MB/G，
		maxsize = * MB/G，
		filegrowth = 百分比
	)
```
#### 修改用户数据库
- 用 SQL 修改数据库