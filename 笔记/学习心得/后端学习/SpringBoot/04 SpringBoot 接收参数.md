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
>示例所使用的Book类
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

## 01 直接将请求参数卸载方法的形参处
> 代码示例
```Java
@GetMapping("/test01")
public void test01(String content){
	System.out.print(content);
}
```
> 适用场景：请求参数较少

> 接口请求方式:
``` http
http://localhost:8080/test?content=测试
```

## 02 封装一个实体类进行接收
> 代码示例
```Java
@GetMapping("/test02")
public void test02(Book book){
	System.out.print(book.getId());
	System.out.print(book.getName());
}
```
> 适用场景：请求参数较少

>接口请求方式:
``` http
http://localhost:8080/test?name=ceshi&id=12
```
## 03 使用原生HttpServletRequest接收

## 04 使用@PathVariable注解获取rest风格路径参数
> 代码示例
```java
@GetMapping("/test/{id}/{name}")
public void test04(@PathVariable int id, @PathVariable String name) {
	System.out.print(id);
	System.out.print(name);
}
```
>适用场景：

 >接口请求方式
```java
http://localhost:8080/test04/12/34
```
## 05 使用`@RequestParam`注解绑定请求参数到方法
>代码示例
```java
public void 
```

## 06 使用`@Request Body` 注解绑定请求参数到方法形参

## 07 使用`@RequestHeader`注解获取请求当中的请求头

# 08 使用`@CookieValue`获取指定值的cookie值