---
tags:
  - SpringBoot
  - 后端
authors:
  - GU_Nanfa
comment: true
sidebar: true
---
# Springboot 接收参数
>以下运行示例的本地端口为 `http://localhost:8080/`
>``` java
>public class Book {
>	private int id;
>	private String name;
>	public void setName(String name) {
>		this.name = nema;
>	}
>	public String getName(){
>		return name;
>	}
>	public void setId(int id) {
>		this.id = id;
>	}
>	public int getId(){
>		return id;
>	}
>}
>```
```
```
## 01 直接将请求参数卸载方法的形参处
```Java
@GetMapping("/test01")
public void SendText(String content){
	System.out.print(content);
}
```
> 适用场景：
> 请求参数较少

接口请求方式:
``` http
http://localhost:8080/test?content=测试
```

## 02 封装一个实体类进行接收
```Java
@GetMapping("/test02")
public void SendText(Book book){
	System.out.print(book.getId());
	System.out.print(book.getName());
}
```
> 适用场景：
> 请求参数较少

接口请求方式:
``` http
http://localhost:8080/test?content=测试
```