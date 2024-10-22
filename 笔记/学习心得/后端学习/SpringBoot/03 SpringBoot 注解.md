### SpringBoot注解
- 元数据形式，可提供有关程序的数据
- 用于提供有关程序的补充信息
- 对其注解的代码的操作没有直接影响，不会更改已编译程序的操作

### Core Spring 框架注解
- ==@Required==
	 - 适用于bean设置方法 
	 - 它指示必须在配置时使用必需的属性填充带注解的bean，否则将引起异常 BeanInitilization

<span style="background:rgba(240, 107, 5, 0.2)">@RequestBody</span>
- 将前端传入的json数据转换为后端JavaBean中的相对应数据
- 前端传输数据需与后端JaveBean变量名相同
- 该注解写在变量命名前
- 变量名命名规则 [`小驼峰`](常见命名规则.md) 

<span style="background:rgba(240, 107, 5, 0.2)">@ResponseBody</span>
- 将后端返回的数据将JavaBean数据转换为json数据
- 该注解写在方法名前

```JavaScript
@ResponseBody
public People setPeople(@RequestBody People peopleOne){
//……
}
```