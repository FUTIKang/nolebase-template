### Metasploit框架介绍
[[渗透]]
框架示意图
![[metasploitble框架示意图.png]]
1. 基础库：metasploit 基础库文件位于源码根目录路径下的 libraries 目录中，包括Rex，framework-core和framework-base 三部分。
		- Rex 是整个框架所依赖的最基础的一些组件，如包装的网络套接字、网络应用协议客户端与服务端实 现、日志子系统、渗透攻击支持例程、PostgreSQL 以及 MySQL 数据库支持等； 
		- framework-core 库负责实现所有与各种类型的上层模块及插件的交互接口； 
		- framework-base 库扩展了 framework-core，提供更加简单的包装例程，并为处理框架各个方面 的功能提供了一些功能类，用于支持用户接口与功能程序调用框架本身功能及框架集成模块；
2. 模块：模块组织按照不同的用途分为 6 种类型的模块（Modules）： 
		- 辅助模块（Aux)
		- 渗透攻击模块（Exploits)
		- 后渗透攻击模块（Post)
		- 攻击载荷模块 （payloads)
		- 编码器模块（Encoders)
		- 空指令模块（Nops)。 
		注：payload 又称为攻击载荷，主要是用来建立目标机与攻击机稳定连接的，可返回 shell，也可以 进行程序注入等。
3. 插件：插件能够扩充框架的功能，或者组装已有功能构成高级特性的组件。插件可以集成现有的一些外部安全工具，如 Nessus、OpenVAS 漏洞扫描器等，为用户接口提供一些新的功能。
4. 接口：包括 msfconsole 控制终端、msfcli 命令行、msfgui 图形化界面、armitage 图形化界 面以及 msfapi 远程调用接口。
5. 功能程序： metasploit 还提供了一系列可直接运行的功能程序，支持渗透测试者与安全人员快 速地利用 metasploit 框架内部能力完成一些特定任务。
	1. 比如 msfpayload、msfencode 和 msfvenom 可以将攻击载荷封装为可执行文件、C 语言、JavaScript 语言等多种形式，并可以进行各种 类型的编码。