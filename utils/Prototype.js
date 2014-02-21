/*prototype inherit**/
/*author:damonzhaofei*/
/*
	代码复用技术（前提：优先使用对象组合、而不是继承）
	传统继承：通过构造函数child() 获取来自于Parent() 的属性，从而创建对象。

*/
//------>classical
// 圆形属性必须只想一个对象，而不是一个函数；问题在于子构造函数到父构造函数的参数传递问题                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
function Parent(name) {
	this.name = name || 'damon'
}
Parent.prototype.say = function() {
	return this;
}

function Child(name) {

}
inherit(Child, Parent);

function inherit(C, P) {
	C.prototype = new P();
}
//<-----end classical

//------->借用构造函数 
//只能继承父构造函数中添加到this的属性。同时，并不能集成那些已经添加到原型中的成员
function Child(a, b, c, d) {
	Parent.apply(this, arguments)
}
//differ
function Article() {
	this.tags = ['js', 'css'];
}
var article = new Article();
//blog 文章对象继承了article对象
//via classical pattern #1
function BlogPost() {};
BlogPost.prototype = article;
//以上代码不需要new Article , 因为可用的实例

//static page (静态)继承了article
//通过借用构造函数模式
function StaticPage() {
	Article.call(this);
}

var blog = new BlogPost();
blog.hasOwnProperty('tags'); //false

var page = new StaticPage();
page.hasOwnProperty('tags'); //true

///直接继承prototype
1 / Cat.prototype = new Animal(); //将Cat的原型对象指向Animal的实例，就能继承animal了
2 / Cat.prototype = Animal.prototype; //更加节省内存 问题在于 两个实例指向同一个对象 任何对Cat.prototype的修改，都会反映到Animal.prototype

　　
Cat.prototype.constructor = Cat; //为新的prototype对象加上constructor属性，并将这个属性指回原来的构造函数 
　　
var cat1 = new Cat("大毛", "黄色");　　
alert(cat1.species); // 动物
///利用空对象作为中介
var F = function() {};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.constructor = Cat;

//继承的封装
function extend(Child, Parent) {
	var F = function() {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype; //备选属性
}
// 拷贝继承
function extend2(Child, Parent) {
	var C = Child.prototype;
	var P = Parent.prototype;
	for (var i in P) {
		C[i] = P[i];
	}
	C.uber = P;
}

//非构造函数继承
　
//object 方式
function object(o) {　　
	function F() {}　　
	F.prototype = o;　　
	return new F();
}

var Child = object(Parent);
Child.name = "haha";

//浅拷贝 早起 jquery做法 但是 o的属性是一个数组或者对象，呢么c得到的只是一个内存地址，对c操作，o也会改变
function extendCopy(o) {
	var c = {};
	for (i in o) {
		c[i] = o[i];
	}
	c.uber = o;
	return c;
}

// 深拷贝 改进浅拷贝

function deepCopy(P,C){
	var c = c || {};
	for(var i in P){
		if(typeof P[i]){
			C[i] = (P[i].constructor === Array())?[]:{};
			deepCopy(P[i],C[i]);
		}else{
			C[i] = P[i];
		}
	}
}