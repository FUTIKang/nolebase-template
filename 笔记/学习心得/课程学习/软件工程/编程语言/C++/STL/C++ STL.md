# C++ STL

## 一、前言

### 模板

在学习C++的STL库之前，请务必了解C++的模板（template）。

模板是c++的一种特性，允许函数或者类（对象）通过泛型（generic types）的形式表现或者运行

模板可以使得函数或类在对应不同的类型（types）的时候正常工作，而无需为每一种类型分别写一份代码。

#### c++ 有两种类型的模板

1：函数模板（function tempalte）：使用泛型参数的函数（function with generic parameters）

2：类模板（class template）：使用泛型参数的类（class with generic parameters）

Ex：加入要定义一个两数相加的函数，我们第一反应可能如此操作

```c++
#include <iostream>
using  namespace std
int sum(int a, int b){
	return a+b;
}
int main(){
	int a = 1, b = 2;
	int res = sum(a, b);
	cout << res << endl;
	return 0;
}
```

但是以上代码可以看出很大的弊端，即其只能计算int型的参数，如果一个double或者一个string的参数需要计算，那么明显不行，所以此时我们需要用的模板：

```c++
#include <iostream>
using namespace std
template <class T>T sum(T x, T y) {
	return x+y;
}
int main(){
	int a=10, b =20;
	cout << sum<int>(a, b) << endl;
	double da = 10.0, db = 20.0;
	cout << sum<double>(da, db) << endl;
	return 0;
}
```

### STL六大组件及其关系

**容器（Containers）**：各种数据结构，如 vector、list、deque、set、map 等。从实现的角度来看，容器是一种 class template。
**算法（Algorithms）**：各种常用算法，提供了执行各种操作的方式，包括对容器内容执行初始化、排序、搜索和转换等操作，比如 sort、search、copy、erase。从实现的角度来看，STL 算法是一种 function template。
**迭代器（Iterators）**：迭代器用于遍历对象集合的元素，扮演容器与算法之间的胶合剂，是所谓的“泛型指针”，共有 5 种类型，以及其他衍生变化。从实现角度来看，迭代器是一种将 operator*、operator->、operator++、operator-- 等指针操作予以重载的 class template。所有的 STL 容器附带有自己专属的迭代器，因为只有容器设计者才知道如何遍历自己的元素。
**仿函数（Functors）**：也称为函数对象（Function object），行为类似函数，可作为算法的某种策略。从实现角度来看，仿函数是一种重载了 operator() 的 class 或者 class template。
**适配器（Adaptors）**：一种用来修饰容器或者仿函数或迭代器接口的东西。例如 STL 提供的 queue 和 stack，就是一种空间配接器，因为它们的底部完全借助于 deque。
**分配器（Allocators）**：也称为空间配置器，负责空间的配置与管理。从实现的角度来看，配置器是一个实现了动态配置空间、空间管理、空间释放的 class template。

#### STL 六大组件的交互关系

![f515e3ab95c9f5c4f039da3b726de9ea](C:\Users\Administrator\Desktop\f515e3ab95c9f5c4f039da3b726de9ea.png)

## 二、容器

##### 序列式容器：

所谓序列容器，即以线性排列（类似普通数组的存储方式）来存储某一指定类型（例如 int、double 等）的数据，需要特殊说明的是，该类容器并不会自动对存储的元素按照值的大小进行排序。

需要注意的是，序列容器只是一类容器的统称，并不指具体的某个容器，序列容器大致包含以下几类容器：

- array<T,N>（数组容器）：表示可以存储 N 个 T 类型的元素，是 [C++](http://c.biancheng.net/cplus/) 本身提供的一种容器。此类容器一旦建立，其长度就是固定不变的，这意味着不能增加或删除元素，只能改变某个元素的值；
- vector<T>（向量容器）：用来存放 T 类型的元素，是一个长度可变的序列容器，即在存储空间不足时，会自动申请更多的内存。使用此容器，在尾部增加或删除元素的效率最高（时间复杂度为 O(1) 常数阶），在其它位置插入或删除元素效率较差（时间复杂度为 O(n) 线性阶，其中 n 为容器中元素的个数）；
- deque<T>（双端队列容器）：和 vector 非常相似，区别在于使用该容器不仅尾部插入和删除元素高效，在头部插入或删除元素也同样高效，时间复杂度都是 O(1) 常数阶，但是在容器中某一位置处插入或删除元素，时间复杂度为 O(n) 线性阶；
- list<T>（链表容器）：是一个长度可变的、由 T 类型元素组成的序列，它以双向链表的形式组织元素，在这个序列的任何地方都可以高效地增加或删除元素（时间复杂度都为常数阶 O(1)），但访问容器中任意元素的速度要比前三种容器慢，这是因为 list<T> 必须从第一个元素或最后一个元素开始访问，需要沿着链表移动，直到到达想要的元素。
- forward_list<T>（正向链表容器）：和 list 容器非常类似，只不过它以单链表的形式组织元素，它内部的元素只能从第一个元素开始访问，是一类比链表容器快、更节省内存的容器。

##### 关联容器：

和序列式容器不同的是，关联式容器在存储元素时还会为每个元素在配备一个键，整体以键值对的方式存储到容器中。相比前者，关联式容器可以通过键值直接找到对应的元素，而无需遍历整个容器。另外，关联式容器在存储元素，默认会根据各元素键值的大小做升序排序。

| 关联式容器名称 | 特点                                                         |
| -------------- | ------------------------------------------------------------ |
| map            | 定义在 <map> 头文件中，使用该容器存储的数据，其各个元素的键必须是唯一的（即不能重复），该容器会根据各元素键的大小，默认进行升序排序（调用 std::less<T>）。 |
| set            | 定义在 <set> 头文件中，使用该容器存储的数据，各个元素键和值完全相同，且各个元素的值不能重复（保证了各元素键的唯一性）。该容器会自动根据各个元素的键（其实也就是元素值）的大小进行升序排序（调用 std::less<T>）。 |
| multimap       | 定义在 <map> 头文件中，和 map 容器唯一的不同在于，multimap 容器中存储元素的键可以重复。 |
| multiset       | 定义在 <set> 头文件中，和 set 容器唯一的不同在于，multiset 容器中存储元素的值可以重复（一旦值重复，则意味着键也是重复的）。 |

##### 无序关联容器：

无序关联式容器，又称哈希容器。和关联式容器一样，此类容器存储的也是键值对元素；不同之处在于，关联式容器默认情况下会对存储的元素做升序排序，而无序关联式容器不会。

| 无序容器           | 功能                                                         |
| ------------------ | ------------------------------------------------------------ |
| unordered_map      | 存储键值对 <key, value> 类型的元素，其中各个键值对键的值不允许重复，且该容器中存储的键值对是无序的。 |
| unordered_multimap | 和 unordered_map 唯一的区别在于，该容器允许存储多个键相同的键值对。 |
| unordered_set      | 不再以键值对的形式存储数据，而是直接存储数据元素本身（当然也可以理解为，该容器存储的全部都是键 key 和值 value 相等的键值对，正因为它们相等，因此只存储 value 即可）。另外，该容器存储的元素不能重复，且容器内部存储的元素也是无序的。 |
| unordered_multiset | 和 unordered_set 唯一的区别在于，该容器允许存储值相同的元素。 |

### 1、array

##### 头文件：

```
#include <array>
```

##### 说明： 

C++ 11 标准中新增的序列容器，简单地理解，它就是在 C++ 普通数组的基础上，添加了一些成员函数和全局函数。在使用上，它比普通数组更安全（原因后续会讲），且效率并没有因此变差。

和其它容器不同，array 容器的**大小是固定的**，无法动态的扩展或收缩，这也就意味着，在使用该容器的过程无法借由增加或移除元素而改变其大小，它只允许访问或者替换存储的元素。

```c++
//初始化
array<double, 10> values; // 值不确定，array不会默认初始化操作
array<double, 10> values {}; // 10个值为0.0的array
array<double, 10> values {0.5,1.0,1.5,2.0}; // 常规化初始值，不足的补0.0
```

| 成员函数            | 功能                                                         |
| ------------------- | ------------------------------------------------------------ |
| begin()             | 返回指向容器中第一个元素的随机访问迭代器。                   |
| end()               | 返回指向容器最后一个元素之后一个位置的随机访问迭代器，通常和 begin() 结合使用。 |
| rbegin()            | 返回指向最后一个元素的随机访问迭代器。                       |
| rend()              | 返回指向第一个元素之前一个位置的随机访问迭代器。             |
| cbegin()            | 和 begin() 功能相同，只不过在其基础上增加了 const 属性，不能用于修改元素。 |
| cend()              | 和 end() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| crbegin()           | 和 rbegin() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| crend()             | 和 rend() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| size()              | 返回容器中当前元素的数量，其值始终等于初始化 array 类的第二个模板参数 N。 |
| max_size()          | 返回容器可容纳元素的最大数量，其值始终等于初始化 array 类的第二个模板参数 N。 |
| empty()             | 判断容器是否为空，和通过 size()==0 的判断条件功能相同，但其效率可能更快。 |
| at(n)               | 返回容器中 n 位置处元素的引用，该函数自动检查 n 是否在有效的范围内，如果不是则抛出 out_of_range 异常。 |
| front()             | 返回容器中第一个元素的直接引用，该函数不适用于空的 array 容器。 |
| back()              | 返回容器中最后一个元素的直接应用，该函数同样不适用于空的 array 容器。 |
| data()              | 返回一个指向容器首个元素的指针。利用该指针，可实现复制容器中所有元素等类似功能。 |
| fill(val)           | 将 val 这个值赋值给容器中的每个元素。                        |
| array1.swap(array2) | 交换 array1 和 array2 容器中的所有元素，但前提是它们具有相同的长度和类型。 |

```c++
#include <iostream>
//需要引入 array 头文件
#include <array>
using namespace std;
int main()
{
    std::array<int, 4> values{};
    //初始化 values 容器为 {0,1,2,3}
    for (int i = 0; i < values.size(); i++) {
        values.at(i) = i;
    }
    //使用 get() 重载函数输出指定位置元素
    cout << get<3>(values) << endl;
    //如果容器不为空，则输出容器中所有的元素
    if (!values.empty()) {
        for (auto val = values.begin(); val < values.end(); val++) {
            cout << *val << " ";
        }
    }
}
```

输出结果：

```
3
0 1 2 3
```

### 2、vector（动态数组）

##### 头文件：

```
#include <vector>
```

##### 说明： 

vector 容器是 STL 中最常用的容器之一，它和 array 容器非常类似，都可以看做是对 C++ 普通数组的“升级版”。不同之处在于，array 实现的是静态数组（容量固定的数组），而 vector 实现的是一个**动态数组**，即可以进行元素的插入和删除，在此过程中，vector 会动态调整所占用的内存空间，整个过程无需人工干预。

vector 常被称为**向量容器**，因为该容器擅长在尾部插入或删除元素，在常量时间内就可以完成，时间复杂度为O(1)；而对于在容器头部或者中部插入或删除元素，则花费时间要长一些（移动元素需要耗费时间），时间复杂度为线性阶O(n)。

```c++
//初始化
vector<double> values;
vector<int> values {2, 3, 5, 7, 11, 13, 17, 19};
vector<double> values(20);
vector<double> values(20, 1.0);默认值为1
//可以采用参数的方式初始化
int num=20;
double value =1.0;
vector<double> values(num, value);
//通过向量创建
vector<char>value1(5, 'c');
vector<char>value2(value1);

values.reserve(20);//指定容器大小，还需注意的是，如果调用 reserve() 来增加容器容量，之前创建好的任何迭代器（例如开始迭代器和结束迭代器）都可能会失效，这是因为，为了增加容器的容量，vector<T> 容器的元素可能已经被复制或移到了新的内存地址。所以后续再使用这些迭代器时，最好重新生成一下。
```

| 函数成员         | 函数功能                                                     |
| ---------------- | ------------------------------------------------------------ |
| begin()          | 返回指向容器中第一个元素的迭代器。                           |
| end()            | 返回指向容器最后一个元素所在位置后一个位置的迭代器，通常和 begin() 结合使用。 |
| rbegin()         | 返回指向最后一个元素的迭代器。                               |
| rend()           | 返回指向第一个元素所在位置前一个位置的迭代器。               |
| cbegin()         | 和 begin() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| cend()           | 和 end() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| crbegin()        | 和 rbegin() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| crend()          | 和 rend() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| size()           | 返回实际元素个数。                                           |
| max_size()       | 返回元素个数的最大值。这通常是一个很大的值，一般是 232-1，所以我们很少会用到这个函数。 |
| resize()         | 改变实际元素的个数。                                         |
| capacity()       | 返回当前容量。                                               |
| empty()          | 判断容器中是否有元素，若无元素，则返回 true；反之，返回 false。 |
| reserve()        | 增加容器的容量。                                             |
| shrink _to_fit() | 将内存减少到等于当前元素实际所使用的大小。                   |
| operator[ ]      | 重载了 [ ] 运算符，可以向访问数组中元素那样，通过下标即可访问甚至修改 vector 容器中的元素。 |
| at()             | 使用经过边界检查的索引访问元素。                             |
| front()          | 返回第一个元素的引用。                                       |
| back()           | 返回最后一个元素的引用。                                     |
| data()           | 返回指向容器中第一个元素的指针。                             |
| assign()         | 用新元素替换原有内容。                                       |
| push_back()      | 在序列的尾部添加一个元素。                                   |
| pop_back()       | 移出序列尾部的元素。                                         |
| insert()         | 在指定的位置插入一个或多个元素。                             |
| erase()          | 移出一个元素或一段元素。                                     |
| clear()          | 移出所有的元素，容器大小变为 0。                             |
| swap()           | 交换两个容器的所有元素。                                     |
| emplace()        | 在指定的位置直接生成一个元素。                               |
| emplace_back()   | 在序列尾部生成一个元素。                                     |

##### ex：

```c++
#include <iostream>
#include <vector>
using namespace std;
int main()
{
    //初始化一个空vector容量
    vector<char>value;
    //向value容器中的尾部依次添加 S、T、L 字符
    value.push_back('S');
    value.push_back('T');
    value.push_back('L');
    //调用 size() 成员函数容器中的元素个数
    printf("元素个数为：%d\n", value.size());
    //使用迭代器遍历容器
    for (auto i = value.begin(); i < value.end(); i++) {
        cout << *i << " ";
    }
    cout << endl;
    //向容器开头插入字符
    value.insert(value.begin(), 'C');
    cout << "首个元素为：" << value.at(0) << endl;
    return 0;
}
```

结果为：

```
元素个数为：3
S T L
首个元素为：C
```

```c++
#include <vector>
#include <iostream>
using namespace std;
class testDemo
{
public:
    testDemo(int num) :num(num) {
        std::cout << "调用构造函数" << endl;
    }
    testDemo(const testDemo& other) :num(other.num) {
        std::cout << "调用拷贝构造函数" << endl;
    }
    testDemo(testDemo&& other) :num(other.num) {
        std::cout << "调用移动构造函数" << endl;
    }

    testDemo& operator=(const testDemo& other);
private:
    int num;
};
testDemo& testDemo::operator=(const testDemo& other) {
    this->num = other.num;
    return *this;
}
int main()
{
    cout << "insert:" << endl;
    std::vector<testDemo> demo2{};
    demo2.insert(demo2.begin(), testDemo(1));

    cout << "emplace:" << endl;
    std::vector<testDemo> demo1{};
    demo1.emplace(demo1.begin(), 1);
    return 0;
}
```

运行结果为：

```
insert:
调用构造函数
调用移动构造函数
emplace:
调用构造函数
```

简单的理解，就是 emplace() 在插入元素时，是在容器的指定位置直接构造元素，而不是先单独生成，再将其复制（或移动）到容器中。因此，在实际使用中，推荐大家优先使用 emplace()。

##### emplace_back()和push_back()的区别

emplace_back() 和 push_back() 的区别，就在于底层实现的机制不同。push_back() 向容器尾部添加元素时，首先会创建这个元素，然后再将这个元素拷贝或者移动到容器中（如果是拷贝的话，事后会自行销毁先前创建的这个元素）；而 emplace_back() 在实现时，则是直接在容器尾部创建这个元素，省去了拷贝或移动元素的过程。

### 3、map(映射)

#### 头文件

```
#include <map>
```

#### 说明：

map 是具有唯一键值对的容器，通常使用**红黑树**实现。

map 中的键值对是 key value 的形式，比如：每个身份证号对应一个人名（反过来不成立哦！），其中，身份证号就是 key，人名便是 value，是单项的关系，可以与 hash 作类比。

```c++
#include <iostream>
#include <map>  // 头文件
#include <string>
using namespace std;
 
int main() {
    map<int, string>node;   // 定义变量
    node[123456] = "张三";
    cout<<"身份证号123456的人叫"<<node[123456]<<endl;
}
```

| 成员方法         | 功能                                                         |
| ---------------- | ------------------------------------------------------------ |
| find(key)        | 在map容器中找键值为key的键值对是否存在，如果存在，返回指向该键值对的迭代器，如果不存在，则返回map最后一个元素所在位置的后一个位置的迭代器，如果map被const修饰，则迭代器也为const。 |
| lower_bound(key) | 返回一个指向当前 map 容器中第一个大于或等于 key 的键值对的双向迭代器。如果 map 容器用 const 限定，则该方法返回的是 const 类型的双向迭代器。 |
| upper_bound(key) | 返回一个指向当前 map 容器中第一个大于 key 的键值对的迭代器。如果 map 容器用 const 限定，则该方法返回的是 const 类型的双向迭代器。 |
| equal_range(key) | 返回一个范围 pair<iterator,iterator>，包含两个迭代器，这个范围也就是lower_bound和upper_bound共同作用的区间。迭代器的区间是含有键值为key的键值对。map中key唯一，因此最多只有一个键值对。 |
| empty()          | 空 ？true ：false                                            |
| size()           | 实际存有的键值对个数                                         |
| max_size()       | 返回 map 容器所能容纳键值对的最大个数，不同的操作系统，其返回值亦不相同。 |
| operator[]       | 重载[]运算符，下标为key。                                    |
| at(key)          | 找到 map 容器中 key 键对应的值，该函数会引起out_of_rang的异常（找不到的情况下）。 |
| insert()         | 向 map 容器中插入键值对。                                    |
| erase()          | 删除 map 容器指定位置、指定键（key）值或者指定区域内的键值对。后续章节还会对该方法做重点讲解。 |
| swap()           | 交换 2 个 map 容器中存储的键值对，这意味着，操作的 2 个键值对的类型必须相同。 |
| clear()          | 清空 map 容器中所有的键值对，即使 map 容器的 size() 为 0。   |
| emplace()        | 在当前 map 容器中的指定位置处构造新键值对。其效果和插入键值对一样，但效率更高。 返回值是一个pair<iterator,bool>对象，第一个值表示插入的位置，第二个表示是否成功 |
| emplace_hint()   | 在本质上和 emplace() 在 map 容器中构造新键值对的方式是一样的，不同之处，第一个参数必须时迭代器，指定在什么位置添加键值对，但好像没什么用，因为map的中排序函数会进行自动排序。 |
| count(key)       | 在当前 map 容器中，查找键为 key 的键值对的个数并返回。map中只返回0或1（键值对唯一） |

#### ex：

```c++
#include <iostream>
#include <map>  // 头文件
#include <string>
using namespace std;
 
int main() {
    map<int, string>node;   // 定义变量
 		// 增加
    node[123456] = "张三";
    node[123457] = "李四";
    node[123458] = "王五";
 		
    cout<<"身份证号123456的人叫"<<node[123456]<<endl;
    cout<<"身份证号123457的人叫"<<node[123457]<<endl;
    cout<<"身份证号123458的人叫"<<node[123458]<<endl;
    
    node.clear();
    // 插入
    node.insert(pair<int, string>(123456, "张三"));
    node.insert(pair<int, string>(123457, "张三"));
    node.insert(pair<int, string>(123458, "李四"));
 
 
    cout<<"身份证号123456的人叫"<<node[123456]<<endl;
    cout<<"身份证号123457的人叫"<<node[123457]<<endl;
    cout<<"身份证号123458的人叫"<<node[123458]<<endl;
    //删除
    cout<<"size = "<<node.size()<<endl;
    //1. 使用 key 删除
    node.erase(123456);  // 删除 key = 123456 的节点
    cout<<"size = "<<node.size()<<endl;
    //2. 使用迭代器删除
    map<int,string>::iterator iter = node.find(123457);
    node.erase(iter);
    cout<<"size = "<<node.size()<<endl;
    //3. 清空整个容器
    node.clear();
    cout<<"size = "<<node.size()<<endl;
    //修改
    node[123456] = "张三";
    cout<<"身份证号123456的人叫"<<node[123456]<<endl;
    node[123456] = "李四";
    cout<<"身份证号123456的人叫"<<node[123456]<<endl;
		//查找
		map<int, string>::iterator iter = node.find(123456);
    if(iter != node.end()) {
        cout<<"身份证号123456的人叫"<<iter->second<<endl;
    }
    for(iter = node.begin(); iter != node.end(); ++iter) {
        cout<<"身份证号"<<iter->first<<"的人叫"<<iter->second<<endl;
    }
}
```



### 4、set（集合）

#### 头文件：

```
#include <set>
```

#### 说明：

set 是一个集合类型的容器，里面的元素具有唯一性，并且所有元素都会根据元素的键值自动被排序，以**红黑树**为底层数据结构。

```c++
template < class T,                        // 键 key 和值 value 的类型
           class Compare = less<T>,        // 指定 set 容器内部的排序规则
           class Alloc = allocator<T>      // 指定分配器对象的类型
           > class set;
```

| 成员方法         | 功能                                                         |
| ---------------- | ------------------------------------------------------------ |
| begin()          | 返回指向容器中第一个（注意，是已排好序的第一个）元素的双向迭代器。如果 set 容器用 const 限定，则该方法返回的是 const 类型的双向迭代器。 |
| end()            | 返回指向容器最后一个元素（注意，是已排好序的最后一个）所在位置后一个位置的双向迭代器，通常和 begin() 结合使用。如果 set 容器用 const 限定，则该方法返回的是 const 类型的双向迭代器。 |
| rbegin()         | 返回指向最后一个（注意，是已排好序的最后一个）元素的反向双向迭代器。如果 set 容器用 const 限定，则该方法返回的是 const 类型的反向双向迭代器。 |
| rend()           | 返回指向第一个（注意，是已排好序的第一个）元素所在位置前一个位置的反向双向迭代器。如果 set 容器用 const 限定，则该方法返回的是 const 类型的反向双向迭代器。 |
| cbegin()         | 和 begin() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改容器内存储的元素值。 |
| cend()           | 和 end() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改容器内存储的元素值。 |
| crbegin()        | 和 rbegin() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改容器内存储的元素值。 |
| crend()          | 和 rend() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改容器内存储的元素值。 |
| find(val)        | 在 set 容器中查找值为 val 的元素，如果成功找到，则返回指向该元素的双向迭代器；反之，则返回和 end() 方法一样的迭代器。另外，如果 set 容器用 const 限定，则该方法返回的是 const 类型的双向迭代器。 |
| lower_bound(val) | 返回一个指向当前 set 容器中第一个大于或等于 val 的元素的双向迭代器。如果 set 容器用 const 限定，则该方法返回的是 const 类型的双向迭代器。 |
| upper_bound(val) | 返回一个指向当前 set 容器中第一个大于 val 的元素的迭代器。如果 set 容器用 const 限定，则该方法返回的是 const 类型的双向迭代器。 |
| equal_range(val) | 该方法返回一个 pair 对象（包含 2 个双向迭代器），其中 pair.first 和 lower_bound() 方法的返回值等价，pair.second 和 upper_bound() 方法的返回值等价。也就是说，该方法将返回一个范围，该范围中包含的值为 val 的元素（set 容器中各个元素是唯一的，因此该范围最多包含一个元素）。 |
| empty()          | 若容器为空，则返回 true；否则 false。                        |
| size()           | 返回当前 set 容器中存有元素的个数。                          |
| max_size()       | 返回 set 容器所能容纳元素的最大个数，不同的操作系统，其返回值亦不相同。 |
| insert()         | 向 set 容器中插入元素。                                      |
| erase()          | 删除 set 容器中存储的元素。                                  |
| swap()           | 交换 2 个 set 容器中存储的所有元素。这意味着，操作的 2 个 set 容器的类型必须相同。 |
| clear()          | 清空 set 容器中所有的元素，即令 set 容器的 size() 为 0。     |
| emplace()        | 在当前 set 容器中的指定位置直接构造新元素。其效果和 insert() 一样，但效率更高。 |
| emplace_hint()   | 在本质上和 emplace() 在 set 容器中构造新元素的方式是一样的，不同之处在于，使用者必须为该方法提供一个指示新元素生成位置的迭代器，并作为该方法的第一个参数。 |
| count(val)       | 在当前 set 容器中，查找值为 val 的元素的个数，并返回。注意，由于 set 容器中各元素的值是唯一的，因此该函数的返回值最大为 1。 |

#### ex：

```c++
#include <iostream>
#include <set>
#include <string>
using namespace std;

int main()
{
    //创建空set容器
    std::set<std::string> myset;
    //空set容器不存储任何元素
    cout << "1、myset size = " << myset.size() << endl;
    //向myset容器中插入新元素
    myset.insert("a");
    myset.insert("b");
    myset.insert("c");
    cout << "2、myset size = " << myset.size() << endl;
    //利用双向迭代器，遍历myset
    for (auto iter = myset.begin(); iter != myset.end(); ++iter) {
        cout << *iter << endl;
    }
    return 0;
}
```

emplace() 和 emplace_hint() 是 C++ 11 标准加入到 set 类模板中的，相比具有同样功能的 insert() 方法，完成同样的任务，emplace() 和 emplace_hint() 的效率会更高。

```c++
#include <iostream>
#include <set>
#include <string>
using namespace std;
int main()
{
    //创建并初始化 set 容器
    std::set<string>myset;
    //向 myset 容器中添加元素
    pair<set<string, string>::iterator, bool> ret = myset.emplace("a");
    cout << "myset size = " << myset.size() << endl;
    cout << "ret.iter = <" << *(ret.first) << ", " << ret.second << ">" << endl;
    
    set<string>::iterator iter = myset.emplace_hint(myset.begin(), "b");
    cout << "myset size = " << myset.size() << endl;
    cout << *iter << endl;
    
    //删除
     //1) 调用第一种格式的 erase() 方法
    int num = myset.erase(2); //删除元素 2，myset={1,3,4,5}
    cout << "1、myset size = " << myset.size() << endl;
    cout << "num = " << num << endl;
    //2) 调用第二种格式的 erase() 方法
    set<int>::iterator iter = myset.erase(myset.begin()); //删除元素 1，myset={3,4,5}
    cout << "2、myset size = " << myset.size() << endl;
    cout << "iter->" << *iter << endl;
    //3) 调用第三种格式的 erase() 方法
    set<int>::iterator iter2 = myset.erase(myset.begin(), --myset.end());//删除元素 3,4，myset={5}
    cout << "3、myset size = " << myset.size() << endl;
    cout << "iter2->" << *iter2 << endl;
    return 0;
}
```

### 5、string字符串

### 6、list（链表）

#### 头文件

```c++
#include <list>
```

#### 说明：

又称双向链表容器，即该容器的底层是以双向链表的形式实现的。这意味着，list 容器中的元素可以分散存储在内存空间里，而不是必须存储在一整块连续的内存空间中。

![2-1P912134314345](/Volumes/刘飞DW2/湖南信息学院课程资料/算法与求解/md/2-1P912134314345.jpeg)

可以看到，list 容器中各个元素的前后顺序是靠指针来维系的，每个元素都配备了 2 个指针，分别指向它的前一个元素和后一个元素。其中第一个元素的前向指针总为 null，因为它前面没有元素；同样，尾部元素的后向指针也总为 null。

基于这样的存储结构，list 容器具有一些其它容器（array、vector 和 deque）所不具备的优势，即它可以在序列已知的任何位置快速插入或删除元素（时间复杂度为**O(1)**）。并且在 list 容器中移动元素，也比其它容器的效率高。

#### ex：

```C++
//创建一个没有任何元素的空 list 容器：
std::list<int> values;
和空 array 容器不同，空的 list 容器在创建之后仍可以添加元素，因此创建 list 容器的方式很常用。

//创建一个包含 n 个元素的 list 容器：
std::list<int> values(10);
通过此方式创建 values 容器，其中包含 10 个元素，每个元素的值都为相应类型的默认值（int类型的默认值为 0）。

// 创建一个包含 n 个元素的 list 容器，并为每个元素指定初始值。例如：
std::list<int> values(10, 5);

//拷贝普通数组，创建list容器
int a[] = { 1,2,3,4,5 };
std::list<int> values(a, a+5);

//拷贝其它类型的容器，创建 list 容器
std::array<int, 5>arr{ 11,12,13,14,15 };
std::list<int>values(arr.begin()+2, arr.end());//拷贝arr容器中的{13,14,15}
```

| 成员函数        | 功能                                                         |
| --------------- | ------------------------------------------------------------ |
| begin()         | 返回指向容器中第一个元素的双向迭代器。                       |
| end()           | 返回指向容器中最后一个元素所在位置的下一个位置的双向迭代器。 |
| rbegin()        | 返回指向最后一个元素的反向双向迭代器。                       |
| rend()          | 返回指向第一个元素所在位置前一个位置的反向双向迭代器。       |
| cbegin()        | 和 begin() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| cend()          | 和 end() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| crbegin()       | 和 rbegin() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| crend()         | 和 rend() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| empty()         | 判断容器中是否有元素，若无元素，则返回 true；反之，返回 false。 |
| size()          | 返回当前容器实际包含的元素个数。                             |
| max_size()      | 返回容器所能包含元素个数的最大值。这通常是一个很大的值，一般是 232-1，所以我们很少会用到这个函数。 |
| front()         | 返回第一个元素的引用。                                       |
| back()          | 返回最后一个元素的引用。                                     |
| assign()        | 用新元素替换容器中原有内容。                                 |
| emplace_front() | 在容器头部生成一个元素。该函数和 push_front() 的功能相同，但效率更高。 |
| push_front()    | 在容器头部插入一个元素。                                     |
| pop_front()     | 删除容器头部的一个元素。                                     |
| emplace_back()  | 在容器尾部直接生成一个元素。该函数和 push_back() 的功能相同，但效率更高。 |
| push_back()     | 在容器尾部插入一个元素。                                     |
| pop_back()      | 删除容器尾部的一个元素。                                     |
| emplace()       | 在容器中的指定位置插入元素。该函数和 insert() 功能相同，但效率更高。 |
| insert()        | 在容器中的指定位置插入元素。                                 |
| erase()         | 删除容器中一个或某区域内的元素。                             |
| swap()          | 交换两个容器中的元素，必须保证这两个容器中存储的元素类型是相同的。 |
| resize()        | 调整容器的大小。                                             |
| clear()         | 删除容器存储的所有元素。                                     |
| splice()        | 将一个 list 容器中的元素插入到另一个容器的指定位置。         |
| remove(val)     | 删除容器中所有等于 val 的元素。                              |
| remove_if()     | 删除容器中满足条件的元素。                                   |
| unique()        | 删除容器中相邻的重复元素，只保留一个。                       |
| merge()         | 合并两个事先已排好序的 list 容器，并且合并之后的 list 容器依然是有序的。 |
| sort()          | 通过更改容器中元素的位置，将它们进行排序。                   |
| reverse()       | 反转容器中元素的顺序。                                       |

```c++
#include <iostream>
#include <list>
using namespace std;

int main()
{
    //创建空的 list 容器
    std::list<double> values;
    //向容器中添加元素
    values.push_back(3.1);
    values.push_back(2.2);
    values.push_back(2.9);
    cout << "values size：" << values.size() << endl;
    //对容器中的元素进行排序
    values.sort();
    //使用迭代器输出list容器中的元素
    for (std::list<double>::iterator it = values.begin(); it != values.end(); ++it) {
        std::cout << *it << " ";
    }
    return 0;
}
```

##### splice() 成员方法的用法：

```C++
#include <iostream>
#include <list>
using namespace std;
int main()
{
    //创建并初始化 2 个 list 容器
    list<int> mylist1{ 1,2,3,4 }, mylist2{10,20,30};
    list<int>::iterator it = ++mylist1.begin(); //指向 mylist1 容器中的元素 2
   
    //调用第一种语法格式
    mylist1.splice(it, mylist2); // mylist1: 1 10 20 30 2 3 4
                                 // mylist2:
                                 // it 迭代器仍然指向元素 2，只不过容器变为了 mylist1

    //调用第二种语法格式，将 it 指向的元素 2 移动到 mylist2.begin() 位置处
    mylist2.splice(mylist2.begin(), mylist1, it);   // mylist1: 1 10 20 30 3 4
                                                    // mylist2: 2
                                                    // it 仍然指向元素 2
   
    //调用第三种语法格式，将 [mylist1.begin(),mylist1.end())范围内的元素移动到 mylist.begin() 位置处                  
    mylist2.splice(mylist2.begin(), mylist1, mylist1.begin(), mylist1.end());//mylist1:
                                                                             //mylist2:1 10 20 30 3 4 2
   
    cout << "mylist1 包含 " << mylist1.size() << "个元素" << endl;
    cout << "mylist2 包含 " << mylist2.size() << "个元素" << endl;
    //输出 mylist2 容器中存储的数据
    cout << "mylist2:";
    for (auto iter = mylist2.begin(); iter != mylist2.end(); ++iter) {
        cout << *iter << " ";
    }
    return 0;
}
```

### 7、stack（栈）

### 8、deque（双端队列)

#### 头文件

```
#include <deque>
```

#### 说明：

deque 是 double-ended queue 的缩写，又称双端队列容器。

- deque 容器也擅长在序列尾部添加或删除元素（时间复杂度为`O(1)`），而不擅长在序列中间添加或删除元素。
- deque 容器也可以根据需要修改自身的容量和大小。

和 vector 不同的是，deque 还擅长在序列头部添加或删除元素，所耗费的时间复杂度也为常数阶`O(1)`。并且更重要的一点是，deque 容器中存储元素并不能保证所有元素都存储到连续的内存空间中。

> 当需要向序列两端频繁的添加或删除元素时，应首选 deque 容器。

| 函数成员         | 函数功能                                                     |
| ---------------- | ------------------------------------------------------------ |
| begin()          | 返回指向容器中第一个元素的迭代器。                           |
| end()            | 返回指向容器最后一个元素所在位置后一个位置的迭代器，通常和 begin() 结合使用。 |
| rbegin()         | 返回指向最后一个元素的迭代器。                               |
| rend()           | 返回指向第一个元素所在位置前一个位置的迭代器。               |
| cbegin()         | 和 begin() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| cend()           | 和 end() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| crbegin()        | 和 rbegin() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| crend()          | 和 rend() 功能相同，只不过在其基础上，增加了 const 属性，不能用于修改元素。 |
| size()           | 返回实际元素个数。                                           |
| max_size()       | 返回容器所能容纳元素个数的最大值。这通常是一个很大的值，一般是 232-1，我们很少会用到这个函数。 |
| resize()         | 改变实际元素的个数。                                         |
| empty()          | 判断容器中是否有元素，若无元素，则返回 true；反之，返回 false。 |
| shrink _to_fit() | 将内存减少到等于当前元素实际所使用的大小。                   |
| at()             | 使用经过边界检查的索引访问元素。                             |
| front()          | 返回第一个元素的引用。                                       |
| back()           | 返回最后一个元素的引用。                                     |
| assign()         | 用新元素替换原有内容。                                       |
| push_back()      | 在序列的尾部添加一个元素。                                   |
| push_front()     | 在序列的头部添加一个元素。                                   |
| pop_back()       | 移除容器尾部的元素。                                         |
| pop_front()      | 移除容器头部的元素。                                         |
| insert()         | 在指定的位置插入一个或多个元素。                             |
| erase()          | 移除一个元素或一段元素。                                     |
| clear()          | 移出所有的元素，容器大小变为 0。                             |
| swap()           | 交换两个容器的所有元素。                                     |
| emplace()        | 在指定的位置直接生成一个元素。                               |
| emplace_front()  | 在容器头部生成一个元素。和 push_front() 的区别是，该函数直接在容器头部构造元素，省去了复制移动元素的过程。 |
| emplace_back()   | 在容器尾部生成一个元素。和 push_back() 的区别是，该函数直接在容器尾部构造元素，省去了复制移动元素的过程。 |

#### ex：

1) 创建一个没有任何元素的空 deque 容器：

```
std::deque<int> d;
```

和空 array 容器不同，空的 deque 容器在创建之后可以做添加或删除元素的操作，因此这种简单创建 deque 容器的方式比较常见。

2) 创建一个具有 n 个元素的 deque 容器，其中每个元素都采用对应类型的默认值：

```
std::deque<int> d(10);
```

此行代码创建一个具有 10 个元素（默认都为 0）的 deque 容器。

3) 创建一个具有 n 个元素的 deque 容器，并为每个元素都指定初始值，例如：

```
std::deque<int> d(10, 5)
```

如此就创建了一个包含 10 个元素（值都为 5）的 deque 容器。

4) 在已有 deque 容器的情况下，可以通过拷贝该容器创建一个新的 deque 容器，例如：

```
std::deque<int> d1(5);std::deque<int> d2(d1);
```

注意，采用此方式，必须保证新旧容器存储的元素类型一致。

5) 通过拷贝其他类型容器中指定区域内的元素（也可以是普通数组），可以创建一个新容器，例如：

```C++
	//拷贝普通数组，创建deque容器
  int a[] = { 1,2,3,4,5 };
	std::deque<int>d(a, a + 5);
  //适用于所有类型的容器
  std::array<int, 5>arr{ 11,12,13,14,15 };
	std::deque<int>d(arr.begin()+2, arr.end());
	//拷贝arr容器中的{13,14,15}
```



```C++
#include <iostream>
#include <deque>
using namespace std;
int main()
{
    //初始化一个空deque容量
    deque<int>d;
    //向d容器中的尾部依次添加 1，2,3
    d.push_back(1); //{1}
    d.push_back(2); //{1,2}
    d.push_back(3); //{1,2,3}
    //向d容器的头部添加 0 
    d.push_front(0); //{0,1,2,3}

    //调用 size() 成员函数输出该容器存储的字符个数。
    printf("元素个数为：%d\n", d.size());
   
    //使用迭代器遍历容器
    for (auto i = d.begin(); i < d.end(); i++) {
        cout << *i << " ";
    }
    cout << endl;
    return 0;
}
```

### 9、priority_queue(优先级队列)

### 10、tuple

### 11、bitset

## 三、迭代器

要访问顺序容器和关联容器中的元素，需要通过“迭代器（iterator）”进行。迭代器是一个变量，相当于容器和操纵容器的算法之间的中介。迭代器可以指向容器中的某个元素，通过迭代器就可以读写它指向的元素。从这一点上看，迭代器和指针类似。

1) 正向迭代器，定义方法如下：

```C++
容器类名::iterator 迭代器名;
```

2) 常量正向迭代器，定义方法如下：

```C++
容器类名::const_iterator 迭代器名;
```

3) 反向迭代器，定义方法如下：

```C++
容器类名::reverse_iterator 迭代器名;
```

4) 常量反向迭代器，定义方法如下：

```c++
容器类名::const_reverse_iterator 迭代器名;
```

### 迭代器用法示例

```C++
#include <iostream>
#include <vector>
using namespace std;
int main()
{
    vector<int> v;  //v是存放int类型变量的可变长数组，开始时没有元素
    for (int n = 0; n<5; ++n)
        v.push_back(n);  //push_back成员函数在vector容器尾部添加一个元素
    vector<int>::iterator i;  //定义正向迭代器
    for (i = v.begin(); i != v.end(); ++i) {  //用迭代器遍历容器
        cout << *i << " ";  //*i 就是迭代器i指向的元素
        *i *= 2;  //每个元素变为原来的2倍
    }
    cout << endl;
    //用反向迭代器遍历容器
    for (vector<int>::reverse_iterator j = v.rbegin(); j != v.rend(); ++j)
        cout << *j << " ";
    return 0;
}
```

程序的输出结果是：

```
0 1 2 3 4
8 6 4 2 0
```

第 10 行和第 16 行，写`++i`、`++j`相比于写`i++`、`j++`，程序的执行速度更快。回顾`++`被重载成前置和后置运算符的例子如下：

```C++
CDemo CDemo::operator++ ()
{  //前置++
    ++n;
    return *this;
}
CDemo CDemo::operator ++(int k)
{  //后置++
    CDemo tmp(*this);  //记录修改前的对象
    n++;
    return tmp;  //返回修改前的对象
}
```

后置`++`要多生成一个局部对象 tmp，因此执行速度比前置的慢。同理，迭代器是一个对象，[STL](http://c.biancheng.net/stl/) 在重载迭代器的`++`运算符时，后置形式也比前置形式慢。在次数很多的循环中，`++i`和`i++`可能就会造成运行时间上可观的差别了。因此，本教程在前面特别提到，对循环控制变量i，要养成写`++i`、不写`i++`的习惯。

### 迭代器的功能分类

**顺序迭代器：**

| 顺序迭代器             | 遍历型迭代器   |
| ---------------------- | -------------- |
| iterator               | 正向迭代器     |
| reverse_iterator       | 反向迭代器     |
| const_iterator         | 常量正向迭代器 |
| reverse_const_iterator | 常量反向迭代器 |

```C++
#include<iostream>
#include<iterator>
#include<vector>
using namespace std;

template<typename T>
void show(T&src)//函数模板 正向打印容器内元素
{
	typename T::iterator it = src.begin();
	for (; it != src.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}
template<typename T1>
void show_reverse(T1& src)//函数模板，反向打印容器内元素
{
	typename T1::reverse_iterator it1 = src.rbegin();
	for (; it1 != src.rend(); it1++)
	{
		cout << *it1 << " ";
	}
	cout << endl;
}
template<typename T2>
void show_const(const T2& src)//函数模板，常量正向打印容器内元素
{
	typename T2::const_iterator it = src.cbegin();
	for (; it != src.cend(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}
template <typename T3>
void show_const_reverse(const T3&src)//函数模板，常量反向打印容器内元素
{
	typename T3::const_reverse_iterator it = src.crbegin();
	for (; it != src.crend(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}
int main()
{
	vector<int> v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i + 1);
	}
	show(v1);
	show_reverse(v1);
	cout << "-----------------------------------------------------------------------" << endl;
	const vector<int>v2(v1.begin(), v1.end());//用v1初始化v2
	show_const(v2);
	show_const_reverse(v2);
	return 0;
}

```

**插入迭代器**

| 插入型迭代器          |                  |
| --------------------- | ---------------- |
| insert_iterator       | 随机插入型迭代器 |
| back_insert_iterator  | 后插型迭代器     |
| front_insert_iterator | 前插型迭代器     |

```C++
#include<iostream>
#include<iterator>
#include<vector>
using namespace std;

template<typename T>
void show(T&src)//函数模板 正向打印容器内元素
{
	typename T::iterator it = src.begin();
	for (; it != src.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}
template <typename INSERT_IT,typename IT>//定义插入型模板
void Insert(const IT& first, const IT& last, INSERT_IT insert_it)
{
	IT tmp = first;
	for (; tmp != last; tmp++)
	{
		*insert_it = *tmp;
	}
}
int main()
{
    vector<int> v1;
	vector<int> v2;
	for (int i = 0;i < 10; i++)
	{
		v1.push_back(i + 1);//初始化v1
	}
	cout << "初始化v1" << endl;
	show(v1);
	insert_iterator< vector<int> > it(v2, v2.begin());//用v1初始化v2
	for (int i = 0; i < 10; i++)
	{
		*it = i+1 + 100;
	}
	cout << "初始化v2" << endl;
	show(v2);
	insert_iterator< vector<int> > it1(v2, v2.begin() + 1);//随机插入型迭代器 
	Insert(v1.begin(), v1.end(), it1);//将v1开始到结束插入v2.begin()+1的位置
	//Insert(v1.begin(), v1.end(), inserter(v2, v2.begin() + 1));//等价于上面   c++用inserter封装
	cout << "随机型插型迭代器：" << endl;
	show(v2);
	back_insert_iterator< vector<int> > it2(v2);//尾插型迭代器
	*it2 = 999;//将999插入v2后面
	cout << "后插型迭代器：" << endl;
	show(v2);
	Insert(v1.begin(), v1.begin()+3, it2);//将v1.begin()到v1.begin()+3的值插入v2后面
	//Insert(v1.begin(), v1.begin() + 3, back_inserter(v2));
	cout << "后插型迭代器 插入区间值：" << endl;
	show(v2);
	return 0;
}

```

**流迭代器**

| 流迭代器         |              |
| ---------------- | ------------ |
| ostream_iterator | 输入流迭代器 |
| istream_iterator | 输出流迭代器 |

```C++
ostream_iterator<int> ito(cout, " ");
for (int i = 0; i < 10; i++)
{
	ito = i;
}
cout << endl;
Insert(list1.begin(), list1.end(), ito);//用输出流打印list（已存在）
cout << endl;
istream_iterator<int> iti(cin);//输入数字用输出流打印
int a;
a = *iti;
ito = a;
```

不同容器的迭代器，其功能强弱有所不同。容器的迭代器的功能强弱，决定了该容器是否支持 STL 中的某种算法。例如，排序算法需要通过随机访问迭代器来访问容器中的元素，因此有的容器就不支持排序算法。

常用的迭代器按功能强弱分为输入、输出、正向、双向、随机访问五种，这里只介绍常用的三种。

1) 正向迭代器。假设 p 是一个正向迭代器，则 p 支持以下操作：++p，p++，*p。此外，两个正向迭代器可以互相赋值，还可以用`==`和`!=`运算符进行比较。

2) 双向迭代器。双向迭代器具有正向迭代器的全部功能。除此之外，若 p 是一个双向迭代器，则`--p`和`p--`都是有定义的。`--p`使得 p 朝和`++p`相反的方向移动。

3) 随机访问迭代器。随机访问迭代器具有双向迭代器的全部功能。若 p 是一个随机访问迭代器，i 是一个整型变量或常量，则 p 还支持以下操作：

- p+=i：使得 p 往后移动 i 个元素。
- p-=i：使得 p 往前移动 i 个元素。
- p+i：返回 p 后面第 i 个元素的迭代器。
- p-i：返回 p 前面第 i 个元素的迭代器。
- p[i]：返回 p 后面第 i 个元素的引用。

此外，两个随机访问迭代器 p1、p2 还可以用 <、>、<=、>= 运算符进行比较。`p1<p2`的含义是：p1 经过若干次（至少一次）`++`操作后，就会等于 p2。其他比较方式的含义与此类似。

对于两个随机访问迭代器 p1、p2，表达式`p2-p1`也是有定义的，其返回值是 p2 所指向元素和 p1 所指向元素的序号之差（也可以说是 p2 和 p1 之间的元素个数减一）。

| 容器           | 迭代器功能   |
| -------------- | ------------ |
| vector         | 随机访问     |
| deque          | 随机访问     |
| list           | 双向         |
| set / multiset | 双向         |
| map / multimap | 双向         |
| stack          | 不支持迭代器 |
| queue          | 不支持迭代器 |
| priority_queue | 不支持迭代器 |

例如，vector 的迭代器是随机迭代器，因此遍历 vector 容器有以下几种做法。下面的程序中，每个循环演示了一种做法。

【实例】遍历 vector 容器。

```C++
#include <iostream>
#include <vector>
using namespace std;
int main()
{
    vector<int> v(100); //v被初始化成有100个元素
    for(int i = 0;i < v.size() ; ++i) //size返回元素个数
        cout << v[i]; //像普通数组一样使用vector容器
    vector<int>::iterator i;
    for(i = v.begin(); i != v.end (); ++i) //用 != 比较两个迭代器
        cout << * i;
    for(i = v.begin(); i < v.end ();++i) //用 < 比较两个迭代器
        cout << * i;
    i = v.begin();
    while(i < v.end()) { //间隔一个输出
        cout << * i;
        i += 2; // 随机访问迭代器支持 "+= 整数"  的操作
    }
}
```

list 容器的迭代器是双向迭代器。假设 v 和 i 的定义如下：

```c++
list<int> v;list<int>::const_iterator i;
```

则以下代码是合法的：

```c++
for(i=v.begin(); i!=v.end(); ++i)cout << *i;
```

以下代码则不合法：

```c++
for(i=v.begin(); i<v.end(); ++i)cout << *i;
```

因为双向迭代器不支持用“<”进行比较。以下代码也不合法：

```c++
for(int i=0; i<v.size(); ++i)cout << v[i];
```

因为 list 不支持随机访问迭代器的容器，也不支持用下标随机访问其元素。

### 迭代器的辅助函数

STL 中有用于操作迭代器的三个函数模板，它们是：

- advance(p, n)：使迭代器 p 向前或向后移动 n 个元素。
- distance(p, q)：计算两个迭代器之间的距离，即迭代器 p 经过多少次 + + 操作后和迭代器 q 相等。如果调用时 p 已经指向 q 的后面，则这个函数会陷入死循环。
- iter_swap(p, q)：用于交换两个迭代器 p、q 指向的值。

要使用上述模板，需要包含头文件 algorithm。下面的程序演示了这三个函数模板的 用法。

```C++
#include <list>
#include <iostream>
#include <algorithm> //要使用操作迭代器的函数模板，需要包含此文件
using namespace std;
int main()
{
    int a[5] = { 1, 2, 3, 4, 5 };
    list <int> lst(a, a+5);
    list <int>::iterator p = lst.begin();
    advance(p, 2);  //p向后移动两个元素，指向3
    cout << "1)" << *p << endl;  //输出 1)3
    advance(p, -1);  //p向前移动一个元素，指向2
    cout << "2)" << *p << endl;  //输出 2)2
    list<int>::iterator q = lst.end();
    q--;  //q 指向 5
    cout << "3)" << distance(p, q) << endl;  //输出 3)3
    iter_swap(p, q); //交换 2 和 5
    cout << "4)";
    for (p = lst.begin(); p != lst.end(); ++p)
        cout << *p << " ";
    return 0;
}
```

## 四、算法

### 头文件

```C++
#include <algorithm>
```

### 算法类别

- 非变动性算法；
- 变动性算法；
- 移除性算法；
- 变序性算法；
- 排序算法；
- 已序区间算法；
- 数值算法；

### 非变动性算法

#### 简介

既不改动元素次序，也不改动元素值，透过input、forward迭代器完成；

#### 常用算法

| 算法                      | 作用                                             |
| ------------------------- | ------------------------------------------------ |
| for_each()                | 对每个元素进行操作                               |
| count()                   | 返回元素个数                                     |
| count_if()                | 返回满足某条件的元素个数                         |
| min_element()             | 最小元素                                         |
| max_element               | 最大元素                                         |
| find()                    | 搜寻等于某值的第一个元素                         |
| find_if()                 | 搜寻满足某个条件的第一个元素                     |
| search_n()                | 搜寻前n个连续匹配值                              |
| search()                  | 搜寻某个子区间第一个出现的位置                   |
| find_end()                | 查询最后一次出现位置                             |
| find_first_of()           | 搜寻某个数的第一个元素                           |
| adjacent_find()           | 搜寻连续两个相对的元素                           |
| equal()                   | 判断两个区间是否相等                             |
| mismatch()                | 返回两个序列的各组对应元素中，第一个不相等的元素 |
| lexicographical_cpmpare() | 判断某一序列再字典顺序下是否小于另一序列         |

### 变动性算法

#### 简介

直接改变元素值，或复制到另一个区间的过程中改变元素值；

#### 常用算法

| 算法              | 作用                                                   |      |      |      |      |      |
| ----------------- | ------------------------------------------------------ | ---- | ---- | ---- | ---- | ---- |
| for_each()        | 对每个元素执行操作                                     |      |      |      |      |      |
| copy()            | 第一元素开始复制某段区间                               |      |      |      |      |      |
| copy_backward()   | 从最后一个开始，复制某段区间                           |      |      |      |      |      |
| transform()       | 变动并复制元素 【速度较慢，需要返回赋值给元素】        |      |      |      |      |      |
| merge()           | 合并两个区间【要求已序】                               |      |      |      |      |      |
| swap_ranges()     | 交换两个区间的元素                                     |      |      |      |      |      |
| fill()            | 以给定值替换每一个元素                                 |      |      |      |      |      |
| fill_n()          | 以给定值替换n个元素                                    |      |      |      |      |      |
| generate()        | 以某项操作的结果替换每一个元素                         |      |      |      |      |      |
| generate_n()      | 以某项操作的结果替换n个元素                            |      |      |      |      |      |
| replace()         | 将具有特值的元素替换为另一个值                         |      |      |      |      |      |
| replace_if()      | 将符合某准则的元素替换为另一个值                       |      |      |      |      |      |
| replace_copy()    | 复制整个区间，同时并将具有某特定值的元素替换为另一个值 |      |      |      |      |      |
| replace_copy_if() | 复制整个区间，同时并将符合某个准则的元素替换为另一个值 |      |      |      |      |      |

### 变序算法

#### 简介

透过元素值的`复制`和`交换`，改变元素顺序；

#### 常用算法

| 算法               | 作用                                                         |
| ------------------ | ------------------------------------------------------------ |
| reverse()          | 将元素的次序逆转                                             |
| reverse_copy()     | 复制的同时，逆转元素顺序                                     |
| rotate()           | 旋转元素次序                                                 |
| rotate_copy()      | 复制同时，旋转元素次序                                       |
| next_permutation() | 得到元素的下一个排序次序                                     |
| prev_permutation() | 得到元素的上一个排序次序                                     |
| random_shuffle()   | 将元素次序打乱                                               |
| partition()        | 改变元素次序，使符合某准则的移动到前面                       |
| stable_partition() | 与上一个相似，但保持符合准则与不符合准则之各个元素之间的相对位置 |

### 排序算法

#### 简介

一种特殊性的变序性算法；

#### 常用算法

| 算法                | 作用                                                         |
| ------------------- | ------------------------------------------------------------ |
| sort()              | 排序；快速排序方法，有较好的平均性能O(n*logn)，但也有最差的情况 |
| stable_sort()       | 排序，并保持相等元素间的相对次序；归并排序，当有足够内存O(n*log(n))，否则O(n*logn*logn) |
| partial_sort()      | 排序，直到前n个元素就位；堆排序，任何情况下下O(nlog(n))，速度比快排慢 |
| partial_sort_copy() | 排序，直到前n个元素就位，结果复制到其他处                    |
| nth_element()       | 根据第n个位置进行排序                                        |
| parition()          | 改变元素次序，满足某条件的放前面                             |
| stable_partition()  | 与parition相同，但保持符合准则和不符合准则的各个元素之间的相对位置 |
| make_heap()         | 将一个区间转换为一个heap                                     |
| push_heap()         | 将元素加入一个heap                                           |
| pop_heap()          | 从heap移除一个元素                                           |
| sort_heap()         | 对heap进行排序，执行后不再是heap                             |

### 已序区间算法

#### 常用算法

| 算法                       | 作用                                                       |
| -------------------------- | ---------------------------------------------------------- |
| binary_search()            | 判断某区间内是否包含某个元素                               |
| includes()                 | 判断某区间内的每一个元素是否都涵盖于另一个区间中           |
| lower_bound()              | 搜寻第一个大于给定值的元素                                 |
| upper_bound()              | 搜寻第一个大于给定值的元素                                 |
| equal_range()              | 返回等于给定值的所有元素构成的区间                         |
| merge()                    | 将两个区间的元素合并                                       |
| set_union()                | 求两个区间的并集                                           |
| set_intersection()         | 求两个区间的交集                                           |
| set_difference()           | 求位于第一区间但不位于第二区间的所有元素，形成一个已序区间 |
| set_symmetric_difference() | 找出只出现于两区间之一的所有元素，形成一个已序区间         |
| inplace_merge()            | 将两个连续的已序区间合并                                   |

### 数值算法

#### 常用算法

| 算法                  | 作用                               |
| --------------------- | ---------------------------------- |
| accumulate()          | 组合`所有元素`（求和、积等）       |
| inner_product()       | `组合`两区间内的所有元素           |
| adjacent_difference() | 将每个元素和其`前一元素组合`       |
| partial_sum()         | 将每个元素和其先前的`所有元素`组合 |



### 常用算法

#### sort()排序算法

C++ STL 标准库中的 sort() 函数，本质就是一个模板函数。正如表 1 中描述的，该函数专门用来对容器或普通数组中指定范围内的元素进行排序，排序规则默认以元素值的大小做升序排序，除此之外我们也可以选择标准库提供的其它排序规则（比如`std::greater<T>`降序排序规则），甚至还可以自定义排序规则。

需要注意的是，sort() 函数受到底层实现方式的限制，它仅适用于普通数组和部分类型的容器。换句话说，只有普通数组和具备以下条件的容器，才能使用 sort() 函数：

1. 容器支持的迭代器类型必须为随机访问迭代器。这意味着，sort() 只对 array、vector、deque 这 3 个容器提供支持。
2. 如果对容器中指定区域的元素做默认升序排序，则元素类型必须支持`<`小于运算符；同样，如果选用标准库提供的其它排序规则，元素类型也必须支持该规则底层实现所用的比较运算符；
3. sort() 函数在实现排序时，需要交换容器中元素的存储位置。这种情况下，如果容器中存储的是自定义的类对象，则该类的内部必须提供移动构造函数和移动赋值运算符。

sort() 函数有 2 种用法，其语法格式分别为：

```C++
//对 [first, last) 区域内的元素做默认的升序排序
void sort (RandomAccessIterator first, RandomAccessIterator last);
//按照指定的 comp 排序规则，对 [first, last) 区域内的元素进行排序
void sort (RandomAccessIterator first, RandomAccessIterator last, Compare comp)
```

ex：

```C++
#include <iostream>     // std::cout
#include <algorithm>    // std::sort
#include <vector>       // std::vector
//以普通函数的方式实现自定义排序规则
bool mycomp(int i, int j) {
    return (i < j);
}
//以函数对象的方式实现自定义排序规则
class mycomp2 {
public:
    bool operator() (int i, int j) {
        return (i < j);
    }
};

int main() {
    std::vector<int> myvector{ 32, 71, 12, 45, 26, 80, 53, 33 };
    //调用第一种语法格式，对 32、71、12、45 进行排序
    std::sort(myvector.begin(), myvector.begin() + 4); //(12 32 45 71) 26 80 53 33
    //调用第二种语法格式，利用STL标准库提供的其它比较规则（比如 greater<T>）进行排序
    std::sort(myvector.begin(), myvector.begin() + 4, std::greater<int>()); //(71 45 32 12) 26 80 53 33
   
    //调用第二种语法格式，通过自定义比较规则进行排序
    std::sort(myvector.begin(), myvector.end(), mycomp2());//12 26 32 33 45 53 71 80
    //输出 myvector 容器中的元素
    for (std::vector<int>::iterator it = myvector.begin(); it != myvector.end(); ++it) {
        std::cout << *it << ' ';
    }
    return 0;
}
```

#### stable_sort()

有些场景是需要保证相等元素的相对位置的。例如对于一个保存某种事务（比如银行账户）的容器，在处理这些事务之前，为了能够有序更新这些账户，需要按照账号对它们进行排序。而这时就很有可能出现相等的账号（即同一账号在某段时间做多次的存取钱操作），它们的相对顺序意味着添加到容器的时间顺序，此顺序不能修改，否则很可能出现账户透支的情况。

值得一提的是，stable_sort() 函数完全可以看作是 sort() 函数在功能方面的升级版。换句话说，stable_sort() 和 sort() 具有相同的使用场景，就连语法格式也是相同的，只不过前者在功能上除了可以实现排序，还可以保证不改变相等元素的相对位置。

table_sort() 函数的用法：

```C++
//对 [first, last) 区域内的元素做默认的升序排序
void stable_sort ( RandomAccessIterator first, RandomAccessIterator last );
//按照指定的 comp 排序规则，对 [first, last) 区域内的元素进行排序
void stable_sort ( RandomAccessIterator first, RandomAccessIterator last, Compare comp );
```

ex：

```C++
#include <iostream>     // std::cout
#include <algorithm>    // std::stable_sort
#include <vector>       // std::vector
//以普通函数的方式实现自定义排序规则
bool mycomp(int i, int j) {
    return (i < j);
}
//以函数对象的方式实现自定义排序规则
class mycomp2 {
public:
    bool operator() (int i, int j) {
        return (i < j);
    }
};

int main() {
    std::vector<int> myvector{ 32, 71, 12, 12, 45, 26, 80, 53, 33 };
    //调用第一种语法格式，对 32、71、12、45 进行排序
    std::stable_sort(myvector.begin(), myvector.begin() + 4); //(12 32 45 71) 26 80 53 33
    //调用第二种语法格式，利用STL标准库提供的其它比较规则（比如 greater<T>）进行排序
    std::stable_sort(myvector.begin(), myvector.begin() + 4, std::greater<int>()); //(71 45 32 12) 26 80 53 33

    //调用第二种语法格式，通过自定义比较规则进行排序,这里也可以换成 mycomp2()
    std::stable_sort(myvector.begin(), myvector.end(), mycomp);//12 26 32 33 45 53 71 80
    //输出 myvector 容器中的元素
    for (std::vector<int>::iterator it = myvector.begin(); it != myvector.end(); ++it) {
        std::cout << *it << ' ';
    }
    return 0;
}
```

#### partial_sort()

假设这样一种情境，有一个存有 100 万个元素的容器，但我们只想从中提取出值最小的 10 个元素，该如何实现呢？

语法格式分别为：

```C++
//按照默认的升序排序规则，对 [first, last) 范围的数据进行筛选并排序
void partial_sort (RandomAccessIterator first,
                   RandomAccessIterator middle,
                   RandomAccessIterator last);
//按照 comp 排序规则，对 [first, last) 范围的数据进行筛选并排序
void partial_sort (RandomAccessIterator first,
                   RandomAccessIterator middle,
                   RandomAccessIterator last,
                   Compare comp);
```

ex：

```C++
#include <iostream>     // std::cout
#include <algorithm>    // std::partial_sort
#include <vector>       // std::vector
using namespace std;
//以普通函数的方式自定义排序规则
bool mycomp1(int i, int j) {
    return (i > j);
}
//以函数对象的方式自定义排序规则
class mycomp2 {
public:
    bool operator() (int i, int j) {
        return (i > j);
    }
};

int main() {
    std::vector<int> myvector{ 3,2,5,4,1,6,9,7};

    //以默认的升序排序作为排序规则，将 myvector 中最小的 4 个元素移动到开头位置并排好序
    std::partial_sort(myvector.begin(), myvector.begin() + 4, myvector.end());
    cout << "第一次排序:\n";
    for (std::vector<int>::iterator it = myvector.begin(); it != myvector.end(); ++it)
        std::cout << *it << ' ';
    cout << "\n第二次排序:\n";

    // 以指定的 mycomp2 作为排序规则，将 myvector 中最大的 4 个元素移动到开头位置并排好序
    std::partial_sort(myvector.begin(), myvector.begin() + 4, myvector.end(), mycomp2());
    for (std::vector<int>::iterator it = myvector.begin(); it != myvector.end(); ++it)
        std::cout << *it << ' ';
    return 0;
}
```

#### merge()和inplace_merge()

##### merge()函数

假设有 2 个序列，分别为`5,10,15,20,25`和`7,14,21,28,35,42`，显然它们不仅有序，而且都是升序序列。因此借助 merge() 函数，我们就可以轻松获得如下这个有序序列：

```C++
5 7 10 15 17 20 25 27 37 47 57
```

C++ STL 标准库的开发人员考虑到用户可能需要自定义排序规则，因此为 merge() 函数设计了以下 2 种语法格式：

```C++
//以默认的升序排序作为排序规则
OutputIterator merge (InputIterator1 first1, InputIterator1 last1,
                      InputIterator2 first2, InputIterator2 last2,
                      OutputIterator result);
//以自定义的 comp 规则作为排序规则
OutputIterator merge (InputIterator1 first1, InputIterator1 last1,
                      InputIterator2 first2, InputIterator2 last2,
                      OutputIterator result, Compare comp);
```

EX：

```C++
#include <iostream>     // std::cout
#include <algorithm>    // std::merge
#include <vector>       // std::vector
using namespace std;
int main() {
    //first 和 second 数组中各存有 1 个有序序列
    int first[] = { 5,10,15,20,25 };
    int second[] = { 7,17,27,37,47,57 };
    //用于存储新的有序序列
    vector<int> myvector(11);
    //将 [first,first+5) 和 [second,second+6) 合并为 1 个有序序列，并存储到 myvector 容器中。
    merge(first, first + 5, second, second + 6, myvector.begin());
    //输出 myvector 容器中存储的元素
    for (vector<int>::iterator it = myvector.begin(); it != myvector.end(); ++it) {
        cout << *it << ' ';
    }   
    return 0;
}
```

##### inplace_merge()函数

事实上，当 2 个有序序列存储在同一个数组或容器中时，如果想将它们合并为 1 个有序序列，除了使用 merge() 函数，更推荐使用 inplace_merge() 函数。

和 merge() 函数相比，inplace_merge() 函数的语法格式要简单很多：

```C++
//默认采用升序的排序规则
void inplace_merge (BidirectionalIterator first, BidirectionalIterator middle,
                    BidirectionalIterator last);
//采用自定义的 comp 排序规则
void inplace_merge (BidirectionalIterator first, BidirectionalIterator middle,
                    BidirectionalIterator last, Compare comp);
```

EX：

```C++
#include <iostream>     // std::cout
#include <algorithm>    // std::merge
using namespace std;
int main() {
    //该数组中存储有 2 个有序序列
    int first[] = { 5,10,15,20,25,7,17,27,37,47,57 };
    //将 [first,first+5) 和 [first+5,first+11) 合并为 1 个有序序列。
    inplace_merge(first, first + 5,first +11);

    for (int i = 0; i < 11; i++) {
        cout << first[i] << " ";
    }
    return 0;
}
```

#### find

如下为 find() 函数的语法格式：

```C++
InputIterator find (InputIterator first, InputIterator last, const T& val);
```

另外，该函数会返回一个输入迭代器，当 find() 函数查找成功时，其指向的是在 [first, last) 区域内查找到的第一个目标元素；如果查找失败，则该迭代器的指向和 last 相同。

find() 函数的底层实现，其实就是用`==`运算符将 val 和 [first, last) 区域内的元素逐个进行比对。这也就意味着，[first, last) 区域内的元素必须支持`==`运算符。

ex：

```C++
#include <iostream>     // std::cout
#include <algorithm>    // std::find
#include <vector>       // std::vector
using namespace std;
int main() {
    //find() 函数作用于普通数组
    char stl[] ="http://c.biancheng.net/stl/";
    //调用 find() 查找第一个字符 'c'
    char * p = find(stl, stl + strlen(stl), 'c');
    //判断是否查找成功
    if (p != stl + strlen(stl)) {
        cout << p << endl;
    }
    //find() 函数作用于容器
    std::vector<int> myvector{ 10,20,30,40,50 };
    std::vector<int>::iterator it;

    it = find(myvector.begin(), myvector.end(), 30);
    if (it != myvector.end())
        cout << "查找成功：" << *it;
    else
        cout << "查找失败";
    return 0;
}
```

 find() 函数的底层实现，C++ 标准库中给出了参数代码：

```C++
template<class InputIterator, class T>
InputIterator find (InputIterator first, InputIterator last, const T& val)
{
    while (first!=last) {
        if (*first==val) return first;
        ++first;
    }
    return last;
}
```

## lower_bound()和upper_bound()

lower_bound() 函数用于在指定区域内查找不小于目标值的第一个元素。也就是说，使用该函数在指定范围内查找某个目标值时，最终查找到的不一定是和目标值相等的元素，还可能是比目标值大的元素。upper_bound()用于在指定范围内查找大于目标值的第一个元素。

数的语法格式有：

```C++
//在 [first, last) 区域内查找不小于 val 的元素
ForwardIterator lower_bound (ForwardIterator first, ForwardIterator last,
                             const T& val);
//在 [first, last) 区域内查找第一个不符合 comp 规则的元素
ForwardIterator lower_bound (ForwardIterator first, ForwardIterator last,
                             const T& val, Compare comp);
//查找[first, last)区域中第一个大于 val 的元素。
ForwardIterator upper_bound (ForwardIterator first, ForwardIterator last,
                             const T& val);
//查找[first, last)区域中第一个不符合 comp 规则的元素
ForwardIterator upper_bound (ForwardIterator first, ForwardIterator last,
                             const T& val, Compare comp);
```

ex：

```C++
#include <iostream>     // std::cout
#include <algorithm>    // std::lower_bound
#include <vector>       // std::vector
using namespace std;
//以普通函数的方式定义查找规则
bool mycomp(int i,int j) { return i>j; }

//以函数对象的形式定义查找规则
class mycomp2 {
public:
    bool operator()(const int& i, const int& j) {
        return i>j;
    }
};

int main() {
    int a[5] = { 1,2,3,4,5 };
    //从 a 数组中找到第一个不小于 3 的元素
    int *p = lower_bound(a, a + 5, 3);
    cout << "*p = " << *p << endl;

    vector<int> myvector{ 4,5,3,1,2 };
    //根据 mycomp2 规则，从 myvector 容器中找到第一个违背 mycomp2 规则的元素
    vector<int>::iterator iter = lower_bound(myvector.begin(), myvector.end(),3,mycomp2());
    cout << "*iter = " << *iter;
    return 0;
}
```

```C++
#include <iostream>     // std::cout
#include <algorithm>    // std::upper_bound
#include <vector>       // std::vector
using namespace std;
//以普通函数的方式定义查找规则
bool mycomp(int i, int j) { return i > j; }
//以函数对象的形式定义查找规则
class mycomp2 {
public:
    bool operator()(const int& i, const int& j) {
        return i > j;
    }
};
int main() {
    int a[5] = { 1,2,3,4,5 };
    //从 a 数组中找到第一个大于 3 的元素
    int *p = upper_bound(a, a + 5, 3);
    cout << "*p = " << *p << endl;
    vector<int> myvector{ 4,5,3,1,2 };
    //根据 mycomp2 规则，从 myvector 容器中找到第一个违背 mycomp2 规则的元素
    vector<int>::iterator iter = upper_bound(myvector.begin(), myvector.end(), 3, mycomp2());
    cout << "*iter = " << *iter;
    return 0;
}
```

