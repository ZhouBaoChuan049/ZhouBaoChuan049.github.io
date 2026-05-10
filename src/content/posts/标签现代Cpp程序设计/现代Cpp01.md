---
title: Re：C++11列表初始化&Initializer_List
published: 2026-04-22
pinned: false
description: 本期将重点讲解：基础且重要的“列表初始化”以及initializer_list。
tags: [ModernC++, C++程序设计]
category: 【主题曲】C++程序设计
licenseName: "CC BY 4.0"
author: 小此方
sourceLink: "https://blog.csdn.net/Z2314246476/article/details/159748538?spm=1001.2014.3001.5501"
draft: false
date: 2026-04-22
image:
  url: './WellPaperForCpp01.jpg'
  alt: '封面'
cover: ./WellPaperForCpp01.jpg
pubDate: 2025-01-20
---

<meta name="referrer" content="no-referrer" />


# 概要&序論

>&emsp;&emsp;&emsp; **这里是此方，好久不见。** 本专栏是【**主题曲：C++程序设计**】专栏的补充篇【**插曲：现代C++**】。本系列将优先深度解析C++11标准，力求内容详实，无微不至。C++14~C++20的进阶内容将在后续间隔一段时间后连载。本期将重点讲解：基础且重要的“列表初始化”以及initializer_list。**好的，让我们现在开始吧。**







# 一，浅谈C++的发展史

&emsp;&emsp;&emsp; C++11 是 C++ 的第二个主要版本，并且是从 C++98 起的`最重要更新`。它引入了大量更改，标准化了既有实践，并改进了对 C++ 程序员可用的抽象。在它最终由 ISO 在 2011 年 8 月 12 日采纳前，人们曾使用名称` “C++0x”`，**因为它曾被期待在 2010 年之前发布。C++03 与 C++11 期间花了 8 年时间，故而这是迄今为止最长的版本间隔。**`从那时起，C++ 有规律地每 3 年更新一次`。

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/1f93211be8cb4d63aad57dda7fbd1196.png#pic_center )

# 二，列表初始化
## 2.1源自1998的传统

&emsp;&emsp;&emsp; C++98中`一般数组和结构体`可以用{}进行初始化。但是这实际上也是从C那里继承过来的方法。

```cpp
1  struct Point
2  {
3      int _x;
4      int _y;
5  };
6  int main()
7  {
9      int array1[] = { 1, 2, 3, 4, 5 };
10     int array2[5] = { 0 };
11     Point p = { 1, 2 };
12     return 0;
13 }
```

## 2.2C++11中的{}列表初始化


>&emsp;&emsp;&emsp;**先说结论**：<font color ="red"><b>C++11以后想统一初始化方式，试图实现一切对象皆可用{}初始化，{}初始化也叫做列表初始化。</b></font>


1. **内置类型支持，自定义类型也支持**，自定义类型本质是类型转换，中间会产生**临时对象**，编译器最后优化了以后变成直接构造。
2. {}初始化的过程中，**可以省略掉=。**
3.C++11列表初始化的本意是想实现一个`大统一的初始化方式`
4. **C++11列表初始化在有些场景下带来的不少便利**，如容器push/insert多参数构造的对象时，{}初始化会很方便。

**我们详细讲：**


### 2.2.1内置类型支持
&emsp;&emsp;&emsp;实际上是为了和**类类型的列表初始化**做一个对称。


```cpp
 int x1 = { 2 };
```
&emsp;&emsp;&emsp;C++标准允许，那么编译器就许可这种情况在语法树中的存在，**在编译的时候都会转换成相同的汇编代码和机器指令**。
&emsp;&emsp;&emsp;对于内置类型实际上就是表层不一样，**底层都是一回事**，如下图，底层的汇编代码是一样的：

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/c9b8db4461324b44bf6f97c04743f144.png)




### 2.2.2类类型支持
&emsp;&emsp;&emsp;先写一个用来测试的Date类。


```cpp
#include<iostream>
#include<vector>
using namespace std;
class Date{
public:
        Date(int year = 1, int month = 1, int day = 1)
                :_year(year)
                , _month(month)
                , _day(day)
        {cout << "Date(int year, int month, int day)" << endl;}
        Date(const Date& d)
                :_year(d._year)
                , _month(d._month)
                , _day(d._day)
        {cout << "Date(const Date& d)" << endl;}
private:
        int _year;
        int _month;
        int _day;
};
```


```cpp
Date d1 = { 2025, 1, 1 };
```
&emsp;&emsp;&emsp;这里本质是用{ 2025, 1, 1 }构造一个**Date临时对象**临时对象再去**拷贝构造d1**，`编译器优化`后合二为一变成{ 2025, 1, 1 }**直接构造初始化d1。**

```cpp
const Date& d2 = { 2024, 7, 25 };
```

&emsp;&emsp;&emsp;这里d2引用的是{ 2024, 7, 25 }构造的临时对象，**所以必须加const**。
&emsp;&emsp;&emsp;需要注意的是C++98支持**单参数时类型转换**，也可以不用{} 。
```cpp
Date d3 = { 2025}; //c++11
Date d4 = 2025;  //c++98
```

&emsp;&emsp;&emsp;列表初始化，第一个参数被改了，后面的参数用缺省参数，**单参数构造函数支持隐式类型转换。** 有人说：我是全缺省的呀？全缺省的构造函数可以当成有任意个参数的构造函数。（比如：**有四个缺省参数的全缺省构造函数，可以当成有0~4参数的构造函数**）
### 2.2.3也可以省略掉等号

&emsp;&emsp;&emsp;可以省略=。自定义类型本质上都是**隐式类型转换**。
```cpp
Point p1 { 1, 2 };
int x2 { 2 };
Date d6 { 2024, 7, 25 };
const Date& d7 { 2024, 7, 25 };
```
&emsp;&emsp;&emsp;不支持，只有{}初始化，才能省略=。
```cpp
Date d8 2025;
```

### 2.2.4{}在代码优化上的性价比

&emsp;&emsp;&emsp;比起有名对象和匿名对象传参，**这里{}更有性价比**。
```cpp
vector<Date> v;
v.push_back(d1);
v.push_back(Date(2025, 1, 1));
v.push_back({ 2025, 1, 1 });
```

### 2.2.5<补充内容·了解>窄化转换与窄化检查

#### 2.2.5.1什么是窄化转换与窄化检查

**窄化转换（Narrowing Conversion）：**

>一种数值类型转换可能导致数值丢失、溢出或精度下降的转换。常见例子包括大整数赋给小整数、浮点数转整数、负数赋给无符号类型等。

**窄化检查（Narrowing Check）：**

>C++11 列表初始化（{}）在编译时对可能发生窄化转换的赋值进行检测，若存在窄化风险，则报编译错误，从而防止运行时的值溢出或精度损失。


#### 2.2.5.2常见窄化检查报错



```cpp
short s1{ 50000 };     //  超出short范围 → 编译错误
int i1{ 3.14 };        //  浮点截断 → 编译错误
unsigned u1{ -1 };     // 负数赋给无符号 → 编译错误
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/9c3d620b977f4dd28f40115af7859dd6.png)

# 三，C++11中的std::initializer_list
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/0ad4d4c6fcab4abf80eed6b7ab71a15a.png#pic_center )
## 3.1什么是std::initializer_list
&emsp;&emsp;&emsp;**C-Library给出一个标准定义：**（**这是他的文档**：[initializer_list](https://legacy.cplusplus.com/reference/initializer_list/initializer_list/)）

><font color =”red” ><b>&emsp;&emsp;&emsp;它是一个”只读数组的轻量引用视图”（view），不是容器本身。</b></font>

&emsp;&emsp;&emsp; 它支持的接口**非常精炼**，其中迭代器和构造是最主要的。

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/bd553024830741648e34f534536f33c3.png#pic_center )

```cpp
auto il = { 10, 20, 30 }; // the type of il is an initializer_list
```




&emsp;&emsp;&emsp;上面的列表初始化已经很方便，但是对象容器初始化还是不太方便，比如一个vector对象，我想用N个值去构造初始化，那么我们得实现很多个构造函数才能支持。**C++11的initializer_list出来之后它支持你这么用：**
```cpp
vector<int> v1 = {1,2,3}; vector<int> v2 = {1,2,3,4,5};
```

&emsp;&emsp;&emsp;容器支持一个std::initializer_list的构造函数，**也就支持任意多个值构成的 {x1, x2, x3...} 进行初始化**。STL中的容器支持任意多个值构成的 {x1, x2, x3...} 进行初始化，**就是通过 std::initializer_list 的构造函数支持的。**


## 3.2Initializer_List有三种写法

```cpp
//方法一:
vector<int> v1 = { 1,2,3,4 };
vector<int> v2 = { 10,20,30,1,1,1,1,1,1,1,1 };
const vector<int>& v4 = { 10,20,30,1,1,1,1,1,1,1,1 };
//方法二:
vector<int> v1{ 1,2,3,4 };
vector<int> v2{ 10,20,30,1,1,1,1,1,1,1,1 };
const vector<int>& v4 { 10,20,30,1,1,1,1,1,1,1,1 };
//方法三:
vector<int> v3({ 10,20,30,1,1,1,1,1,1,1,1 });
```

## 3.2Initializer_List的迭代器与底层

### 3.2.1一些前提

&emsp;&emsp;&emsp;**这个东西不大好讲清楚，我们先解释一些概念：**

&emsp;&emsp;&emsp;std::initializer_list内部有两个迭代器（底层是原生指针），**std::initializer_list支持迭代器遍历。**
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/81e24504b7af48e2b085da9b19b70994.png#pic_center )


&emsp;&emsp;&emsp;列表初始化类类型对象，{}传递的时候，除了会像上面一样，`去构造一个临时对象`。还有可能可以传递给一个`initializer_list`。
&emsp;&emsp;&emsp;那么什么时候{}列表会被识别为一个initializer_list呢？
>**答案是 :**<font color = "red"><b> 当容器重载了一个initializer_list初始化的时候。</b></font>


&emsp;&emsp;&emsp;比如我们**拿vector举一个例子**：
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/1d9cdd2a994f48c1a6d43af2763d7392.png#pic_center )

### 3.2.2列表传递构造容器对象的时候到底经历了什么


&emsp;&emsp;&emsp; **第一步：构造并维护initializer_list：** 容器对象有initializer_list初始化的时候，列表传递给 initializer_list，然后 initializer_list 在**栈**上开辟空间，把列表的数据拷贝过来，用两个迭代器（指针）指着这块空间来维护。
&emsp;&emsp;&emsp; **为什么在栈上？如图(可以放大)：**
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/b4f60e8504294b16b849884a9ac25ee4.png#pic_center )

&emsp;&emsp;&emsp; **第二步：隐式类型转换**：然后再从 initializer_list 到 vector 进行`单参数构造函数的隐式类型转换`，为什么可以隐式类型转换，因为vector重载了一个。

>&emsp;&emsp;&emsp;vector (`initializer_list<value_type> il`,const allocator_type& alloc = allocator_type());


&emsp;&emsp;&emsp;**这个构造的底层又是这样的**

```cpp
vector(initializer_list<T> l){
    for (auto e : l)
        push_back(e);
}
```




### 3.2.3 现代编译器的优化
&emsp;&emsp;&emsp;现代编译器（C++11 及以后）会做拷贝消除（Copy Elision）**，尤其在这种构造临时对象再用作参数的情况：**
```cpp
std::vector<int> v{1, 2, 3, 4};
```
>&emsp;&emsp;&emsp;<font color ="red"><b> 编译器可能直接在 vector 内部构造好元素数组，而不会真正生成一个完整的临时 initializer_list 对象。</b></font>
>
&emsp;&emsp;&emsp; 这就意味着表面上看像是两步操作（生成列表 + 拷贝），底层实际上可能只剩一步：**直接在 vector 内存里初始化元素。**

**然而，值得注意的是：**
>-initializer_list **本身是轻量的，只包含指针**，不会控制内存生命周期，所以即使临时对象存在，也很轻量。
>-编译器的优化只是省掉了额外的“**临时对象生命周期和拷贝**”开销。


&emsp;&emsp;&emsp;所以有的时候，**vector(initializer_list<value_type> il, const allocator_type& alloc = allocator_type());** 只是一种语法许可，并非真正出现了 initializer_list。<font color ="red"><b>C++委员会允许，不代表编译器厂商会照做。</b></font>

---

<center><b>好了，本期内容到此结束，我是此方，我们下期再见。バイバイ！
