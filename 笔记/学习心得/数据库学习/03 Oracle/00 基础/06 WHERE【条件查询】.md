### 1. 基本语法结构
```SQL
SELECT
	column_1,
	column_2,
	...
FROM 
	table_name
WHERE
	search_condition;
```

### 2. 模糊条件查询
`注` : 以下条件查询基于表结构 `product` 产品表做模糊查询

| 字段名       | 字段类型    | 注释   |
| ------------ | ----------- | ------ |
| product_id   | bigint      | 产品ID |
| product_name | varchar(50) | 产品名 |
```SQL
SELECT
	column_1,
	column_2,
	...
FROM 
	table_name
WHERE
	column_1 LIKE '%ceshi%';
```