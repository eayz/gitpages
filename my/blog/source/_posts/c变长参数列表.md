1.使用模板中的变长参数函数声明
<!--more-->
> ```c++
> #include <iostream>
> using namespace std;
> 
> /*变长参数函数模板声明*/
> template <typename... T>
> void print(T... val);
> 
> /*边界条件*/
> void print(void)
> {
> cout<<"here end"<<endl;
> }
> 
> /*递归的特例化定义*/
> template <typename T1, typename... T2>
> void print(T1 start, T2... var)
> {
> cout<<"sizeof ... now is: "<<sizeof... (var)<<endl;
> cout<<start<<endl;
> print(var...);
> }
> 
> 
> int main(void)
> {
> print(1,2,3,4);
> return 0;
> }
> ```
>
> 其中的声明其实是没什么用的，只是告诉使用者可以按照这样的格式使用，如果不做这个声明，只保留"边界条件"和"递归的特例化定义"，这样虽然可行，但是未免会造成困惑
>
> 执行结果如下：
>
> ![](https://img2020.cnblogs.com/blog/1641561/202012/1641561-20201203082207083-624831700.jpg)
>
> 实际上，这个"变长"付出的代价还是很大的，要递归的实例出n个函数，最终再调用边界条件的函数。过程如下
>
> ![](https://img2020.cnblogs.com/blog/1641561/202012/1641561-20201203082225289-1073870079.jpg)
>
> ![](https://img2020.cnblogs.com/blog/1641561/202012/1641561-20201203082245640-1559202511.jpg)

2.使用va_list()函数实现变长参数列表

> 以一个矩阵自动识别维度的程序为例
>
> arrayMat.h
>
> ```c++
> #include<iostream>
> #include<string>
> #include<stdarg.h>
> using namespace std;
> typedef int dtype;
> 
> class mat
> {
> public:
> 	mat();
> 	~mat();
> 	void set_dim(int dim);
> 	void mat::set_mat_shape(int i,...);
> 	int  get_dim();
> 	int* get_mat_shape();
> 	void print_shape();
> 	dtype* make_mat();
> private:
> 	int dim;
> 	int *shape;
> 	dtype *enterMat;
> };
> 
> ```
>
> arrayMat.cpp
>
> ```c++
> #include"arrayMat.h"
> mat::mat()
> {
> }
> 
> mat::~mat()
> {
> }
> 
> int mat::get_dim() {
> 	return this->dim;
> }
> 
> int * mat::get_mat_shape() {
> 	return this->shape;
> }
> 
> void mat::print_shape()
> {
> 	for (int a = 0; a < this->dim; a++) {
> 		std::cout << shape[a] << " " ;
> 	}
> }
> 
> 
> 
> void mat::set_dim(int i) {
> 	this->dim = i;
> }
> 
> void mat::set_mat_shape(int i, ...) {
> 	va_list _var_list;
> 	va_start(_var_list, i);
> 	int count = 0;
> 	int *temp=new int[100];
> 	while (i != -1) {
> 		//cout << i <<" ";
> 		temp[count] = i;
> 		count++;
> 		i = va_arg(_var_list, int);
> 	}
> 	va_end(_var_list);
> 	this->set_dim(count);
> 	this->shape = temp;
> 	//std::cout << std::endl;
> 	//this->shape = new int [count];
> 	//for (int j = 0; j < count; j++)
> 		//shape[j] = temp[j];
> }
> 
> //Mat2D A[i][j] = B[i + j * rows]
> ```
>
> main.cpp
>
> ```c++
> #include"arrayMat.h"
> 
> 
> int main() {
> 	mat m1,m2;
> 	m1.set_mat_shape(1,3,128,128,-1);
> 	int *shape = m1.get_mat_shape();
> 	int dim = m1.get_dim();
> 	cout << "dim: " << dim<<endl;
> 	for (int i = 0; i < dim; i++)
> 		cout <<*(shape+i) <<" ";
> 	m1.print_shape();
> 	//m1.make_mat();
> 	//m2.set_mat_shape(3,3);
> 	//m2.make_mat();
> 	//m2.print_mat();
> 	return 0;
> }
> 
> ```
>
> 运行结果：
>
> ![](https://img2020.cnblogs.com/blog/1641561/202012/1641561-20201203082818149-1412833863.jpg)
>
> 

