define(function(require, exports, module) {
	var $ = require('jquery');
	var Logger = require('../util/Log');
	var xaj = require('util/XAjax.js');
	var logger = new Logger();
	var REG_TYPE_PHONE = 1;
	var REG_TYPE_MAIL = 2;
	//TODO configuration should be filtered by profile setting.
	var DEFAULT_DOMAIN = "http://127.0.0.1:88/wordpress/";


	module.exports = Magic;

	/**
	 * 请参考WordPress JSON API插件
	 */
	function Magic(domain) {
		if (domain !== null) {
			this.domain = domain;
		} else {
			this.domain = DEFAULT_DOMAIN;
		}
	}
	/** 
	 *支付模块
	 */

	/**
	 *alipay: 支付宝入口
	 */
	Magic.prototype.gotoAlipay = function(userId, orderId) {
		window.open(this.domain + "/doublepay/directpayapi.jsp?userId=" + userId + "&orderId=" + orderId, "_blank");
	}
	/**
	 *tenpay: 财付通
	 */
	Magic.prototype.gotoTenpay = function(userId, orderId) {
		// console.log(this.domain + "/tenpay/tenpayapi.jsp?userId=" + userId + "&orderId=" + orderId);
		window.open(this.domain + "/tenpay/tenpayapi.jsp?userId=" + userId + "&orderId=" + orderId, "_blank");
	}
	/**
	 *网银支付入口: 提供银行id
	 */
	Magic.prototype.gotoEbank = function(userId, orderId, bankId) {
		window.open(this.domain + "/ebank/ebankalipayapi.jsp?userId=" + userId + "&orderId=" + orderId + "WIDdefaultbank=" + bankId, "_blank");
	}
	/**
	 * 一、购物车:
	 */
	/**
	 *根据数据库中的数据初始化
	 */
	Magic.prototype.initCartItemsWhenLogin = function(success) {
		$.post(this.domain + "/h/v2/cartItem/initCartItemsWhenLogin?time=" + new Date().getTime(), success, "json");
	};
	/**
	 *展示购物车中的商品
	 */
	Magic.prototype.showProsFromCart = function(success) {
		$.post(this.domain + "/h/v2/cartItem/getCartItems?time=" + new Date().getTime(), success, "json");
	};
	/**
	 *添加购物车
	 */
	Magic.prototype.addProIntoCart = function(productId, quantity, success) {
		$.post(this.domain + "/h/v2/cartItem/addCartItem?time=" + new Date().getTime(), {
			productId: productId,
			quantity: quantity
		}, success, "json");
	};
	/**
	 *更新购物车
	 */
	Magic.prototype.updateCart = function(cartjson, success) {
		$.post(this.domain + "/h/v2/cartItem/updateCart?time=" + new Date().getTime(), {
			cartjson: cartjson
		}, success, "json");
	};
	/**
	 *删除购物车商品
	 */
	Magic.prototype.delProFromCart = function(productId, success) {
		$.post(this.domain + "/h/v2/cartItem/removeCartItem?time=" + new Date().getTime(), {
			productId: productId
		}, success, "json");
	};


	/**
	 *二、优惠券:
	 */

	/**
	 *检查优惠券
	 */
	Magic.prototype.checkCoupon = function(couponNum, success) {
		$.post(this.domain + "/h/v2/coupon/checkCoupon?time=" + new Date().getTime(), {
			couponNum: couponNum
		}, success, "json");
	};
	/**
	 *查找当前用户的绑定优惠券
	 */
	Magic.prototype.getCoupons = function(success) {
		$.post(this.domain + "/h/v2/coupon/getCoupons?time=" + new Date().getTime(), success, "json");
	};
	/***三,地址模块
	1,获取已有地址
	http://192.168.150.85:8080/order/h/v2/address/getExistsAddress?userId=1
	2,
	保存地址
	http://192.168.150.85:8080/order/h/v2/address/saveAddress?
	userId=1&realname=测试汉字&province=测试汉字&city=测试汉字&country=测试汉字&street=1232sss&postalcode=10010&mobile=&telephone=154444
	*/

	/**
	 * 获取已有地址
	 */
	Magic.prototype.getExistsAddress = function(success) {
		$.post(this.domain + "/h/v2/address/getExistsAddress?time=" + new Date().getTime(), success, "json");
	};

	/**
	 * 保存地址
	 * 参数:realname真实姓名,province省份,city城市,country县区,street街道,postalcode邮编,mobile电话,telephone手机
	 */
	Magic.prototype.saveAddress = function(obj, success) {
		$.post(this.domain + "/h/v2/address/saveAddress?time=" + new Date().getTime(), obj, success, "json");
	};

	/***四,订单模块:
		1,生成订单
		http://192.168.150.85:8080/order/h/v2/order/createOrder?
		参数:userId用户ID,couponnum优惠券号码,oisNeedReceipt是否需要发票(0否1是),oreceiptStyle发票类型(0个人,1公司),oreceiptCompany公司名称,realname真实姓名,province省份,city城市,country县区,street街道,postalcode邮编,mobile电话,telephone手机
		
		{"ret":1,"payentity":{"widseller_email":"乐跑手环","body":"乐跑手环","out_trade_no":"HL20131104082446185344","subject":"乐跑手环订购","widshow_url":"http://www.lepao.com","widreceive_name":"??Ժ??",
		"widreceive_zip":"10010","receive_phone":"154444","receive_mobile":"","widquantity":"11","widprice":2689.0,"logistics_type":"快递","logistics_fee":"0.00","logistics_payment":"卖家承担运费"},"msg":"success"}
		
		2,根据alipay返回结果,更新订单状态
		http://192.168.150.85:8080/order/h/v2/order/updateOrderStatus?oid=HL20131104062407477550&oalipayTradeNo=54321&ostatus=WAIT_SELLER_SEND
		参数:oid订单号,oalipayTradeNo支付宝交易号,ostatus订单状态
		{"ret":1,"UPDATE_RESULT":"UPDATED_BEFORE","msg":"success"}
		*/
	/**
	 * 生成订单
	 */

	Magic.prototype.createOrder = function(params, cartjson, success) {
		$.post(this.domain + "/h/v2/order/createOrder?time=" + new Date().getTime() + "&" + params, {
			cartjson: cartjson
		}, success, "json");
	};
	/**
	 * 根据alipay返回结果,更新订单状态
	 */
	Magic.prototype.updateOrderStatus = function(oid, oalipayTradeNo, ostatus, success) {
		$.post(this.domain + "/h/v2/order/updateOrderStatus?time=" + new Date().getTime(), {
			oid: oid,
			oalipayTradeNo: oalipayTradeNo,
			ostatus: ostatus
		}, success, "json");
	};
	/**
	 * 订单管理-展示订单列表
	 */
	Magic.prototype.getOrderList = function(page, success) {
		$.post(this.domain + "/h/v2/order/getOrders?time=" + new Date().getTime(), {
			page: page
		}, success, "json");
	}
	/**
	 * 订单管理-物流信息
	 */
	Magic.prototype.getLogisticsDetailInfo = function(orderId, success) {
		$.post(this.domain + "/h/v2/logistics/getLogisticsDetailInfo?time=" + new Date().getTime(), {
			orderId: orderId
		}, success, "json");
	}
	/**
	 * 订单管理-物流状态
	 */
	Magic.prototype.getLogisticsInfo = function(orderId, success) {
		$.post(this.domain + "/h/v2/logistics/getLogisticsInfo?time=" + new Date().getTime(), {
			orderId: orderId
		}, success, "json");
	}
	/**
	 * 订单管理-订单详情
	 */
	Magic.prototype.getOrderContent = function(orderId, success) {
		$.post(this.domain + "/h/v2/order/getOrderDetails?time=" + new Date().getTime(), {
			orderId: orderId
		}, success, "json");
	}
	/**
	 *验证码
	 */
	Magic.prototype.userSubscribe = function(telphone, captchaCode, nickname, address, email, zipcode, lpcolor, producttype, success) {
		$.post(this.domain + "/h/v2/subscribe/userSubscribe?time=" + new Date().getTime(), {
			telphone: telphone,
			captchaCode: captchaCode,
			nickname: nickname,
			address: address,
			email: email,
			zipcode: zipcode,
			lpcolor: lpcolor,
			producttype: producttype
		}, success, "json");
	};
	Magic.prototype.sendTelCode = function(telphone, success) {
		$.post(this.domain + "/h/v2/user/sendTelCode?time=" + new Date().getTime(), {
			telphone: telphone
		}, success, "json");
	};
	Magic.prototype.login = function(account, password) {
		$.post(this.domain + "/h/v2/user/login?time=" + new Date().getTime(), {
			telphone: telphone
		}, success, "json");
	};
	/**
	 *用户信息
	 */
	Magic.prototype.getUserInfo = function(success){
		$.post(this.domain+"/h/v2/user/myAccount?time="+new Date().getTime(),success,"json");
	}
	 //修改邮箱
	Magic.prototype.changeEmail = function(email,captchaCode,success){
		$.post(this.domain+"/h/v2/user/bindOrAlterEmail?time="+new Date().getTime(),{"email":email,"captchaCode":captchaCode},success,"json");
	}
	//重置密码
	Magic.prototype.restPassWord = function(token, passwd, success) {
		// http://localhost:8090/magic/page/resetPassword.html#confirm?token=emZjeWIyMDA5QDE2My5jb20=
		$.post(this.domain + "/h/v2/user/resetPasswd?time=" + new Date().getTime(), {
			token: token,
			passwd: passwd
		}, success, "json");
	};
	//设置密码
	Magic.prototype.changePassword = function(password,new_password, success) {
		// http://localhost:8090/magic/page/resetPassword.html#confirm?token=emZjeWIyMDA5QDE2My5jb20=
		$.post(this.domain + "/h/v2/user/changePassword?time=" + new Date().getTime(),{"password":password,"change_password":new_password}, success, "json");
	};
	//检测链接是否失效
	Magic.prototype.checkUrl = function(uuid, success) {
		$.post(this.domain + "/h/v2/user/isValidURL?time=" + new Date().getTime(), {
			uuid: uuid
		}, success, "json");
	};
	Magic.prototype.register = function(params, success) {
		if (regType == REG_TYPE_MAIL) {

			$.post(this.domain + "/h/v2/user/register?time=" + new Date().getTime(), {
				email_account: account,
				passwd: password,
				reg_type: regType
			}, success, "json");
		}
		if (regType == REG_TYPE_PHONE) {
			$.post(this.domain + "/h/v2/user/register?time=" + new Date().getTime(), {
				phone_account: account,
				passwd: password,
				reg_type: regType
			}, success, "json");
		}
	};

});