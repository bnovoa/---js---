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
var blog = new BlogPost();
//以上代码不需要new Article , 因为可用的实例

//static page (静态)继承了article
//通过借用构造函数模式
function StaticPage() {
	Article.call(this);
}
var page = new StaticPage();
blog.hasOwnProperty('tags'); //false
blog.tags.push("html");//article 的tags 会更新
page.hasOwnProperty('tags');//true
page.tags.push("php");//article 的tags 不会更新