@packgeName: lepao-ap-js
@intr:  a simple js mvc frame..
命名规范：
1、习惯上我们js的文件名采用“连字符”格式，ex:"user.js/user-data.js"
2、由于是模块依赖加载，所以各个模块特别是在M、V、C这三个模块 里面的文件最好添加后缀名，ex:"user-view/user-controller" ;
3、属于模块内部的文件（非外部调用）或者是模版文件、片段文件可以在文件前面加上前缀"_", ex:"_header.html";
4、代码命名，每个模块文件必须添加注释解释该代码的核心功能。
web前端框架

乐跑运动必须支持IE6-IE8

efeelink可以不支持IE6-IE8，待定

MVC分离， 

ember.js like

====================
变量名不要用首字母大写
     对象首字母小写
     类名首字母大写


单数？复数？ Events 看不懂apply
     s 一致的规则？

下划线何时使用？
     内部使用的成员变量或函数，用下划线_ 来开始

me的写法
     成员变量，更优

el表示啥？
     缩写的规范
     尽量不缩写。 缩写必须白名单维护，所有人知晓



常用方法名
     render?
     白名单

对象成员变量没有集中声明？

User-> UserRepo， 若包含login， -> userService
     User 来表示DTO（BO）
