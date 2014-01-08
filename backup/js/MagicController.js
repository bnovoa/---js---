define(function(require, exports, module) {
	var $ = require('jquery');
	var Logger = require('./util/Log');
	var logger = new Logger();
	var magicConfig = require('./MagicConfig');
	var magicConstant = require('./MagicConstant');
	var WordPress = require('./cms/WordPress');
	var Magic = require('./cms/Magic');
	var PostList = require('./view/PostList.js');
	// var Cookie = require('./util/Cookie.js');
	var Md5 = require('./util/Md5.js');
	var ContentPage = require('./view/ContentPage.js');
	var ProductDetails = require('./view/ProductDetails.js');
	var EventBus = require('./event/EventBus');
	var CartRow = require('./view/CartRow.js');
	var OrderRow = require('./view/OrderRow.js');
	var Payment = require('./view/Payment.js');
	var OrderDetails = require('./view/OrderDetails.js');
	var Dialog = require("./view/Dialog.js");
	var PagerView = require("./view/Pager/Pager.js");
	var ParseEmailUrl = require('./util/ParseEmailUrl.js');
	module.exports = MagicController;
	/*var console = console || {
		log: function() {
			return false;
		}
	}*/
	/*黑色原价599，优惠价299
	白色原价699，优惠价599
	其他颜色原价599，优惠价399
	功能实现用价，真实定价待产品诞生*/

	var ProductRepo = {
		productList: [{
			"productId": "1",
			"name": "乐跑手环",
			"color": "海洋蓝",
			"colorValue": "#41b8e5",
			"price": "399",
			"inventory": "9999",
			"imageUrl": "images/product-detail-img-blue.png"
		}, {
			"productId": "2",
			"name": "乐跑手环",
			"color": "玄墨黑",
			"colorValue": "#181b1e",
			"price": "399",
			"inventory": "9999",
			"imageUrl": "images/product-detail-img-black.png"
		}, {
			"productId": "3",
			"name": "乐跑手环",
			"color": "浅草绿",
			"colorValue": "#f8f8e4",
			"price": "299",
			"inventory": "9999",
			"imageUrl": "images/product-detail-img-green.png"
		}, {
			"productId": "4",
			"name": "乐跑手环",
			"color": "樱桃紫",
			"colorValue": "#b48ac5",
			"price": "399",
			"inventory": "9999",
			"imageUrl": "images/product-detail-img-purple.png"
		}, {
			"productId": "5",
			"name": "乐跑手环",
			"color": "玫瑰红",
			"colorValue": "#dd594c",
			"price": "399",
			"inventory": "9999",
			"imageUrl": "images/product-detail-img-red.png"
		}, {
			"productId": "6",
			"name": "乐跑手环",
			"color": "象牙白",
			"colorValue": "#f8f8e4",
			"price": "599",
			"inventory": "9999",
			"imageUrl": "images/product-detail-img-white.png"
		}, {
			"productId": "7",
			"name": "乐跑手环",
			"color": "柠檬黄",
			"colorValue": "#f7ed67",
			"price": "399",
			"inventory": "9999",
			"imageUrl": "images/product-detail-img-yellow.png"
		}],
		findByProductId: function(productId) {
			return this.productList[parseInt(productId) - 1];
		}
	};

	/*var OrderStatus = {
		StatusList:{},

	}*/

	function MagicController() {
		this.cms = new WordPress(magicConfig.cmsBase);
		this.magicService = new Magic(magicConfig.magicBase);
		this.cartRow = new CartRow();
		this.dialog = new Dialog();
		this.Payment = new Payment();
	};

	/*Utils*/
	MagicController.prototype.sendEmailRepo = function(email, repoType) {
		ParseEmailUrl.getUrl(email);
		this.showConfirmDialog({
			title: "温馨提示",
			content: "已发送验证邮件至您" + repoType + "的邮箱{" + email + "}，请前往邮箱点击邮件内链接完成" + repoType + "。",
			positiveText: "去激活",
			negtiveText: "等会再说"
		}, function() {
			window.open("http://" + ParseEmailUrl.getUrl(email), "_blank")
		});
	};

	/***购物车模块 */


	/**
	 * 加入购物车
	 * @param productId商品ID,quantity商品数量
	 */
	MagicController.prototype.addProIntoCart = function(productId, quantity, handler) {
		var me = this;
		me.magicService.addProIntoCart(productId, quantity, handler);
	};

	/**
	 * 更新购物车
	 */
	MagicController.prototype.updateCart = function(cartjson) {
		var me = this;
		var userId = 1;
		// console.log(cartjson);
		var cartjsonStr = JSON.stringify(cartjson);
		// var cartjsonStr = [{"productId":"1","quantity":"2","isBuy":"1"}];
		me.magicService.updateCart(cartjsonStr, function(data) {
			/*console.log("更新购物车");
			console.log(cartjsonStr);
			console.log(data);*/
			// location.href = "./userbuyinfo.html";	
			var cartitems = new Array();
			for (var i = 0; i < cartjson.length; i++) {
				cartitems.push(cartjson[i]);
			};
			if (data.ret == 1) {
				var cartitemsStr = JSON.stringify(cartitems);
				location.href = magicConfig.targetUrl.userBuyInfo + "?cart_json=" + encodeURI(cartitemsStr);
			} else {
				me.showAlertDialog(data.msg);
			};
		});
	};
	/**前往购物车*/
	MagicController.prototype.goToCart = function() {
		location.href = magicConfig.targetUrl.cart;
	}
	/**检查购物车商品 是否为空*/
	MagicController.prototype.checkCart = function(success) {
		var me = this;
		var userId = 1;
		me.magicService.showProsFromCart(success);
	};
	/**
	 * 展示购物车商品
	 *	@CONTEX "cartitems":{"userId":"1","productId":1,"cisDel":0,"quantity":5}
	 */
	MagicController.prototype.showCartRow = function(nodeId, totalPriceNode, totalPriceIncludePost, totalQuantityNode, callback) {
		var me = this;
		var userId = 1;
		//	 	Cookie.setCookie("test_cookie","damon",7);
		me.magicService.showProsFromCart(function(data) {
			// console.log("展示购物车商品");
			// console.log(data);
			if (data.ret == 1) {
				var cartList = new Array();
				try {
					var cartitems = data.cartitems;
					// var cartitems = [{"userId":"1","productId":1,"cisDel":0,"quantity":5},{"userId":"1","productId":3,"cisDel":1,"quantity":1},{"userId":"1","productId":4,"cisDel":0,"quantity":5}];
					var totalPrice = 0;
					var totalQuantity = 0;
					if (cartitems.length > 0) {
						var product = null;
						for (i in cartitems) {
							product = ProductRepo.findByProductId(cartitems[i].productId);
							// console.log(parseInt(product.price));
							totalQuantity += parseInt(cartitems[i].quantity);
							totalPrice = parseInt(product.price * cartitems[i].quantity) + parseInt(totalPrice);
							// totalPrice +=product.price*cartitems[i].quantity;
							// console.log(ProductRepo.findByProductId(cartitems[i].productId));
							ProductRepo.findByProductId(cartitems[i].productId)["amount"] = cartitems[i].quantity;
							cartList.push(ProductRepo.findByProductId(cartitems[i].productId));
						}
						me.cartRow.showCartRow(nodeId, cartList);
						$(totalPriceNode).html(totalPrice);
						$(totalPriceIncludePost).html(totalPrice);
						$(totalQuantityNode).html(totalQuantity);
						callback();
					} else {
						$(nodeId).parent(".shopping-list").html("没有商品额。<a color='blue' href='" + magicConfig.targetUrl.productDetails + "'>去购物</a>").css("color", "gray");
					}

				} catch (e) {
					// console.log("nimei");
					// console.log(e);
				}

			} else {
				$(nodeId).html(data.msg).css("color", "red");
			}

			//		var cartitems = [{"userId":"1","productId":1,"cisDel":0,"quantity":5},{"userId":"1","productId":3,"cisDel":1,"quantity":1},{"userId":"1","productId":4,"cisDel":0,"quantity":5}];

			//		EventBus.clearBind(nodeId,function(e){
			//				me.quantitySelect(e.quantityContainer, e.quantityField, e.plusButton, e.minusButton);
			//			});
			//			alert(Cookie.getCookie("test_cookie"));
		});

	};
	/**
	 * 删除购物车
	 */
	MagicController.prototype.delProFromCart = function(productId, success) {
		var me = this;
		me.magicService.delProFromCart(productId, success);
	};
	/***优惠券模块*/
	/**
	 *检查优惠券
	 * error:不存在1009，  已经使用1010， 已经过期1011
	 */
	MagicController.prototype.checkCoupon = function(couponNum, success) {
		var me = this;
		me.magicService.checkCoupon(couponNum, success);
	};
	/**
	 *查找当前用户的绑定优惠券
	 */
	MagicController.prototype.getCurrentCoupons = function(nodeId) {
		var me = this;
		me.magicService.getCoupons(function(data) {
			if (data.ret == 1) {
				// console.log(data);
				var coupons = data.coupons;
				if (coupons.length != 0) {
					$(".coupon-empty").remove();
					for (var i = 0; i < coupons.length; i++) {
						$(nodeId).append("<div class='coupon'>" + coupons[i].couponNum + "</div>");
					};
				}
			} else {
				$(nodeId).html("<div class='coupon-empty'>" + data.msg + "</div>");
			}
			// console.log("绑定优惠券" + data.msg);
		});
	};


	/***订单模块*/

	/**生成订单
	 *userId,couponnum,oisNeedReceipt,oreceiptStyle,oreceiptCompany,realname,province,city,country,street,postalcode,mobile,telephone
	 */
	MagicController.prototype.createOrder = function(params, cartjson) {
		var me = this;
		var PAY_ONLINE = 1,
			PAY_OFFLINE = 0,
			NEED_PAY = 1;
		me.magicService.createOrder(params, cartjson, function(data) {
			if (data.ret == 1) {
				if (data.payType == PAY_ONLINE && data.payCode == NEED_PAY) {
					me.showAlertDialog("下单成功,即将前往支付页面！", function() {
						location.href = magicConfig.targetUrl.paymentType + "?orderId=" + data.orderId;
					});
				} else {
					me.showAlertDialog("下单成功,请耐心等待发货！", function() {
						location.href = magicConfig.targetUrl.myOrder;
					});
				}
			} else {
				me.showAlertDialog(data.msg);
			}

		});

	};

	/**
	 *展示订单商品
	 */
	//var cartJson = urlParams.getUrlParams("cart_json");
	MagicController.prototype.showUserBuyInfo = function(nodeId, totalPriceNode, cartJsonStr) {
		var me = this;
		var totalPrice = 0;
		var userbuyinfo;
		try {
			var cartJson = JSON.parse(decodeURI(cartJsonStr));
		} catch (e) {
			$(nodeId).html("没有下单的商品。");
			return false;
		}
		if (cartJson.length > 0) {
			$(nodeId).html("");
			for (i in cartJson) {
				userbuyinfo = ProductRepo.findByProductId(cartJson[i].productId);
				totalPrice += cartJson[i].quantity * userbuyinfo.price;
				$(nodeId).append('<tr><td>' + userbuyinfo.name + "(" + userbuyinfo.color + ")" + '</td><td>' + userbuyinfo.price + '</td><td>' + cartJson[i].quantity + '</td><td>' + cartJson[i].quantity * userbuyinfo.price + '</td></tr>');
				$(totalPriceNode).html(totalPrice);
			}
		}

	};

	/**
	 *支付模块
	 */

	/*支付页面订单详情*/
	MagicController.prototype.gotoPay = function(userId, orderId, bankId) {
		var me = this;

		if (bankId != "" && bankId != null && bankId != undefined) {
			switch (bankId) {
				case "TENPAY":
					me.magicService.gotoTenpay(userId, orderId);
					break;
				case "ALIPAY":
					me.magicService.gotoAlipay(userId, orderId);
					break;
				default:
					me.magicService.gotoEbank(userId, orderId, bankId);
					break;
			}
			me.showConfirmDialog({
				content: "支付是否成功？",
				negtiveText: "未完成",
				positiveText: "支付成功"
			}, function(e) {
				location.href = magicConfig.targetUrl.myOrder;
			});
			/*me.showConfirmDialog("支付是否成功","未完成","支付成功"){
			}*/
		} else {
			me.showAlertDialog("请选择支付方式！");
		}
	};
	MagicController.prototype.showPaymentOrderContent = function(nodeId, orderId, callback) {
		var me = this;
		me.magicService.getOrderContent(orderId, function(data) {
			if (data.ret == 1) {
				var myOrderItems = data.orderItems;
				var totalPrice = 0;
				for (i in myOrderItems) {
					totalPrice += myOrderItems[i].price * myOrderItems[i].num;
				}
				data["totalPrice"] = totalPrice;
				me.Payment.showOrderContent(nodeId, data);
				callback(data);
			} else {
				$(nodeId).html(data.msg).css("color", "red");
			}
		});
	}


	/**
	 * 根据alipay返回结果,更新订单状态
	 */
	MagicController.prototype.updateOrderStatus = function(oid, oalipayTradeNo, ostatus) {
		var me = this;
		me.magicService.createOrder(oid, oalipayTradeNo, ostatus, function(data) {
			//TODO 更新订单状态

			console.log("更新订单状态");
			console.log(data);
		});
	};

	/***地址模块*/
	/**
	 * 获取已有地址
	 */
	MagicController.prototype.getExistsAddress = function(callback) {
		var me = this;
		me.magicService.getExistsAddress(callback);
	};
	/**
	 * 获取默认地址
	 */
	MagicController.prototype.getDefaultAddress = function(callback) {
		var me = this;
		me.magicService.getDefaultAddress(callback);
	};

	/**
	 * 保存地址
	 * 参数:userId用户ID,realname真实姓名,province省份,city城市,country县区,street街道,postalcode邮编,mobile电话,telephone手机
	 */
	MagicController.prototype.saveAddress = function(obj, callback) {
		var me = this;
		me.magicService.saveAddress(obj, function(data) {

			if (data.ret == 1) {
				callback(data);
			} else {
				me.showAlertDialog(data.msg);
			}

		});
	};

	/**
	 * 展示商品数据
	 */
	MagicController.prototype.showProducDetais = function(nodeId) {
		var me = this;
		var isSellup = false;
		var myProList = new Array();
		me.magicService.getProductDetail(function(data) {
			var myPl = data.productList;
			for (var i = 0; i < myPl.length; i++) {
				if (i == 0) {
					ProductRepo.findByProductId(myPl[i].productId)["cunrrent"] = "current";
				}
				if (myPl[i].inventory < 10) {
					ProductRepo.findByProductId(myPl[i].productId)["forbidden"] = "forbidden";
					isSellup = true;
				}else{
					isSellup = false;	
				}
				myProList.push(ProductRepo.findByProductId(myPl[i].productId));
			};
			if(isSellup){
				location.href = magicConstant.preOrder+"?isSellup=true";
			}
			ProductDetails = new ProductDetails(myProList);
			ProductDetails.showProducDetais(nodeId);
			ProductDetails.showProducDetais(nodeId);
		});
	};

	/**
	 * Dialog
	 */
	MagicController.prototype.showConfirmDialog = function(params, callback) {
		var me = this;
		me.dialog.show(params, true, function(e, nodeId, $maskLayer) {
			$(nodeId).remove();
			$maskLayer.fadeOut(300, function() {
				$(this).remove();
				if (callback) {
					callback();
				};
			});
		});
	};
	MagicController.prototype.showAlertDialog = function(params, callback) {
		var me = this;
		me.dialog.show(params, false, function(e, nodeId, $maskLayer) {
			$(nodeId).remove();
			$maskLayer.fadeOut(300, function() {
				(callback && typeof(callback) === "function") && callback();
				$(this).remove();
			});
		});
	};
	/**header模块*/
	/*MagicController.prototype.sendTelCode = function(telephone) {
		var me = this;
		me.magicService.sendTelCode(telphone, function(data) {
			$('.submit_code').val('5分钟内有效').attr("disabled", "true");
			$('.input-text').attr("disabled", "true");
			alert("验证码已经发送，请查收");
			if (data.ret == 1) {

			} else {
				alert(data.msg);
			}
		});
	};
	MagicController.prototype.login = function() {
		me.closeWin();
		me.resetForm();
	};
	MagicController.prototype.register = function(account, password, regType) {
		var me = this;
		console.log("register start!");
		me.magicService.register(account, password, regType, function(data) {
			console.log(data);
			if (data.ret == 1) {
				me.closeWin();
				alert("注册成功");
				me.resetForm();
			} else {
				alert("注册出错：" + data.msg);
			}
		});
	};*/

	MagicController.prototype.showNewsList = function(category, nodeId) {
		this.cms.getCategoryPosts({
			slug: category,
			include: "title,date"
		}, function(data) {
			var postList = new PostList();
			if (data.status === "ok") {
				for (m in data.posts) {
					data.posts[m].date = data.posts[m].date.substring(5, 10);
				}
			}
			postList.showPostList(nodeId, data);
		});
	};


	MagicController.prototype.showNewsPageListPage = function(nodeId, page, category) {
		var me = this;
		me.cms.getCategoryPosts({
			slug: category,
			page: page,
			count: 12,
			include: "title,date,categories"
		}, function(data) {
			console.log(data)
			var postList = new PostList();
			postList.showNewsPageList(nodeId, data, page);
			postList.bindPageEvents();
			var totalPages = data.pages;
			EventBus.bind("pre", function(e) {
				var currentPage = e.currentPage;
				if (currentPage <= 1) {
					alert("不能再往前了！");
					return false;
				}
				me.showNewsPageListPage(nodeId, parseInt(currentPage) - 1, category);
			});
			EventBus.bind("next", function(e) {
				var currentPage = e.currentPage;
				if (currentPage >= totalPages) {
					alert("已经到尾页了！");
					return false;
				}
				me.showNewsPageListPage(nodeId, parseInt(currentPage) + 1, category);
			});
			EventBus.bind("first", function(e) {
				me.showNewsPageListPage(nodeId, 1, category);
			});
			EventBus.bind("end", function(e) {
				me.showNewsPageListPage(nodeId, totalPages, category);
			});
		});
	};

	MagicController.prototype.showContentPage = function(nodeId, id) {
		this.cms.getPost(id, function(data) {
			var contentPage = new ContentPage();
			contentPage.showContentPage(nodeId, data);
		});
	};

	//FIXME ?这块可以干掉了吧
	MagicController.prototype.activationCode = function() {
		var me = this;
		var domain = 'http://shenqu.hoolai.com',
			cdkeyIput = $('.input-text'),
			validInput = $('.input-key'),
			realname = $('.realname'),
			street = $('.street'),
			subButton = $('.submit_code'),
			submit = $('.submit_reserve'),
			postcode = $('.postcode'),
			email = $('.email');

		subButton.on('click', function() {
			var keyVal = cdkeyIput.val();
			subKey(keyVal);
		});

		function subKey(keyVal) {
			if (isLegalkey(keyVal)) {
				var telphone = $('.input-text').val();
				me.magicService.sendTelCode(telphone, function(data) {
					$('.submit_code').val('5分钟内有效').attr("disabled", "true");
					$('.input-text').attr("disabled", "true");
					alert("验证码已经发送，请查收");
					if (data.ret == 1) {

					} else {
						alert('系统出错，请稍后再试');
					}
				});
			}
		}

		function isLegalkey(keyNum) {
			if (keyNum.trim() == '' || keyNum.trim() == '请填写手机号码') {
				alert('您还没有填写手机号！');
				cdkeyIput.attr("value", "").focus();
				return false;
			} else if (!(/^1[3,4,5,8]{1}[0-9]{9}$/.test(keyNum))) {
				alert('手机号错误，请确保您的手机号为11位数字且正确书写∩_∩~~');
				cdkeyIput.attr("value", "").focus();
				return false;
			} else return true;
		}

	}


	MagicController.prototype.Reservation = function() {
		var me = this;
		$('.goods_color a').on('click', function() {
			$('.selected').removeClass('selected');
			$(this).addClass('selected');
		});
		$('.submit_reserve').on('click', function() {
			//FIXME　暂时改为验证码
			var captchaCode = $("input[name=captchaCode]").val();
			//			var telCode = $('.input-key').val();
			var telphone = $('.input-text').val();
			var nickname = $('.realname').val();
			var shi = $('#Select1').val();
			var xian = $('#Select2').val();
			var site = $('#Select3').val();
			var address = shi + xian + site;
			var email = $('.email').val();
			var zipcode = $('.postcode').val();
			var lpcolor = $('.goods_color a.selected').text();
			var producttype = $('.producttype').text();
			var emailExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

			if (captchaCode == null || captchaCode == '' || captchaCode == undefined || captchaCode == "请填写验证码") {
				alert("请填写验证码！");
				return;
			}
			if (!emailExp.test(email)) {
				alert("邮箱格式不正确");
				return false;
			}
			me.magicService.userSubscribe(telphone, captchaCode, nickname, address, email, zipcode, lpcolor, producttype, function(data) {
				if (data.ret == 1) {
					document.location.href = magicConfig.targetUrl.success;
				} else {
					alert(data.msg);
				}
			});
		})

	};

	/**刷新验证码*/
	MagicController.prototype.refreshVlidCode = function(nodeId) {
		var date = new Date();
		var domain = magicConfig.magicBase;
		$(nodeId).attr('src', domain + '/image/identifying?' + date.getSeconds());
	}
	/**重置密码*/
	MagicController.prototype.restPassWord = function(nodeId, token, psw) {
		var me = this;
		me.magicService.restPassWord(token, Md5.hex_md5(psw), function(data) {

			if (data.ret == 1) {
				$(nodeId).html("重置密码成功，等待<a href='" + magicConfig.targetUrl.indexPage + "'>跳转</a>...");
				var timeOut = setTimeout(function() {
					location.href = magicConfig.targetUrl.indexPage;
				}, 3000);

			} else {
				$(nodeId).html(data.msg);
			}
		});
	}

	/**用户信息**/
	MagicController.prototype.getUserInfo = function(callback) {
		var me = this;
		me.magicService.getUserInfo(callback);
	}
	/**微博 第三方登录 **/
	MagicController.prototype.weiboLogin = function() {
		var me = this;
		me.magicService.weiboLogin(function(data) {
			console.log(data);

		});
	};
	/**补全信息**/
	MagicController.prototype.addUserInfo = function(params, node) {
		var me = this;
		params.password = Md5.hex_md5(params.password);
		me.magicService.addUserInfo(params, function(data) {
			if (data.ret == 1) {
				// Cookie.setCookie("account",params.email);
				// Cookie.setCookie("_pd",params.password);
				node.html("已发送邮件至您的邮箱{" + params.email + "}，请登录该邮箱点击邮件内连接，完成信息补全。<a href='http://" + ParseEmailUrl.getUrl(params.email) + "' target='_blank'>前往您的邮箱</a>。");
			} else {
				me.showAlertDialog(data.msg);
			}
		});
	}

	/**修改邮箱**/
	MagicController.prototype.changeEmail = function(email, captchaCode) {
		var me = this;
		me.magicService.changeEmail(email, captchaCode, function(data) {
			if (data.ret == 1) {
				//修改成功
				me.sendEmailRepo(email, "修改");
			} else {
				me.showAlertDialog(data.msg);
			}
		});
	}

	/**修改密码**/
	MagicController.prototype.changePassword = function(password, new_password) {
		var me = this;

		me.magicService.changePassword(Md5.hex_md5(password), Md5.hex_md5(new_password), function(data) {
			if (data.ret == 1) {
				//修改成功
				me.showAlertDialog("您的密码已成功修改！", function() {
					location.href = magicConfig.targetUrl.personalPage;
				});
			} else {
				me.showAlertDialog(data.msg);
			}
		});
	}

	/**校验找回密码链接**/
	MagicController.prototype.checkUrl = function(nodeId, uuid, callback) {
		var me = this;
		me.magicService.checkUrl(uuid, function(data) {
			if (data.ret == 1) {
				$(nodeId).load(magicConfig.targetUrl.RestPsw, function() {
					if (callback && typeof(callback) === "function") {
						callback();
					}
				});
			} else {
				$(nodeId).html(data.msg);
			}
		});
	}

	/** 展示订单列表*/
	MagicController.prototype.showOrderList = function(nodeId, page) {
		var me = this;
		var orderRow = new OrderRow(nodeId);
		var STATUS_WAIT = "等待付款",
			STATUS_FAIL = "付款失败",
			STATUS_SUCCESS = "付款成功";
		var ACTION_PAY = "付款",
			ACTION_CHECk = "查看"
		me.magicService.getOrderList(page, function(data) {
			if (data.ret == 1) {
				var orderList = data.orderList;
				var orderRepoList = new Array();
				//时间：data.createTime
				// orderList.reverse();
				// console.log(orderList.length);
				if (orderList.length <= 0) {
					$(nodeId).html("没有下单的商品。");
					return false;
				}
				for (i in orderList) {
					// console.log("orderList[i].createTime"+orderList[i].createTime);
					var d = new Date(orderList[i].createTime);
					var curr_month = d.getMonth() + 1; //Months are zero based
					//FIXME 随机取 其中一个商品图片
					var productRepo = ProductRepo.findByProductId(orderList[i].productIds[0]);
					var statusName = "";
					var statusAction = "";
					var statusActionUrl = "";
					switch (orderList[i].status) {

						case 1:
							statusName = STATUS_FAIL
							statusActionUrl = magicConfig.targetUrl.orderDetail + "?orderId=" + orderList[i].orderNum
							statusAction = ACTION_CHECk
							break;
						case 2:
							statusName = STATUS_SUCCESS
							statusActionUrl = magicConfig.targetUrl.orderDetail + "?orderId=" + orderList[i].orderNum
							statusAction = ACTION_CHECk
							break;
						default:
							statusActionUrl = magicConfig.targetUrl.paymentType + "?orderId=" + orderList[i].orderNum
							statusName = STATUS_WAIT
							statusAction = ACTION_PAY
							break;

					}
					orderList[i]["statusName"] = statusName;
					orderList[i]["statusAction"] = statusAction;
					orderList[i]["statusActionUrl"] = statusActionUrl;
					orderList[i]["createTimeStr"] = d.getFullYear() + "-" + curr_month + "-" + d.getDate();
					orderList[i]["imageUrl"] = productRepo.imageUrl;
					orderList[i]["productName"] = productRepo.name + "(" + productRepo.color + ")";
				};
				orderRow.showOrderRow(orderList);
				orderRow.bindPager(new PagerView('noticePager', data.pageCount, data.page));
				EventBus.clearBind('noticePager' + '-jumpTo', function(e) {
					me.showOrderList(nodeId, e.targetPage);
				});
			} else {
				$(nodeId).html(data.msg);
			}
		});

	}

	/** 订单详细*/
	MagicController.prototype.showOrderContent = function(statusNodeId, contentNodeId, logisticsNodeId, proPattenNodeIds, orderId) {

		var me = this;
		var orderDetails = new OrderDetails(statusNodeId, contentNodeId, logisticsNodeId);
		//TODO　订单状态
		me.magicService.getLogisticsInfo(orderId, function(data) {
			// console.log("------->logisticsInfo--------->")
			// console.log(data)
			if (data.ret == 1) {

				var myCreateTime;
				var myClockTime;
				//订单状态
				for (var i = 0; i < data.logisticsInfo.length; i++) {
					var className = "";
					var myTime = data.logisticsInfo[i].time;
					switch (data.logisticsInfo[i].statusCode) {

						case 5:
							className = "order-complete"
							break;
						case 4:
							className = "wait-receipt"
							break;
						case 3:
							className = "ship-goods"
							break;
						case 2:
							className = "payment-success"
							break;
						default:
							className = "submit-order"
							break;
					}
					data.logisticsInfo[i]["createTime"] = myTime.substring(0, 10);
					data.logisticsInfo[i]["clockTime"] = myTime.substring(11, 16);
					data.logisticsInfo[i]["className"] = className;
					if (i == data.logisticsInfo.length - 1) {
						data.logisticsInfo[i]["pointTag"] = "true"
						statusName = data.logisticsInfo[i].status;
					}
				};
				data["orderNum"] = orderId;
				data["statusName"] = statusName
				// console.log(data)
				orderDetails.showOrderStatus(data);
				orderDetails.showOrderLogistics(data.logisticsDetail);
			} else {
				$(statusNodeId).html(data.msg).css("color", "red");
			}
		});
		me.magicService.getOrderContent(orderId, function(data) {
			var DELIVER_TYPE_WEEK = "只工作日送货（双休日、假日不用送）",
				DELIVER_TYPE_WORK = "工作日送货（适合于办公地址）",
				DELIVER_TYPE_ALL = "双休日、假日送货（适合于家庭地址）";
			var PAY_TYPE_ONLINE = "在线支付",
				PAY_TYPE_OFFINE = "货到付款";
			var STATUS_WAIT = "等待付款",
				STATUS_FAIL = "付款失败",
				STATUS_SUCCESS = "付款成功";
			if (data.ret == 1) {

				//商品详情
				switch (data.order.deliveryTimeType) {

					case 1:
						deliverName = DELIVER_TYPE_ALL
						break;
					case 2:
						deliverName = DELIVER_TYPE_WORK
						break;
					default:
						deliverName = DELIVER_TYPE_WEEK
						break;
				}
				switch (data.order.payType) {

					case 2:
						myPayTypeName = PAY_TYPE_OFFINE
						break;
					default:
						myPayTypeName = PAY_TYPE_ONLINE
						break;
				}
				data["payTypeName"] = myPayTypeName;
				data["deliveryTimeTypeName"] = deliverName;
				var invoiceTypeName = "";
				if (data.invoice != null) {
					var INVOICE_TYPE_PESONAL = "个人",
						INVOICE_TYPE_COM = "单位";
					switch (data.invoice.invoiceType) {
						case 2:
							invoiceTypeName = INVOICE_TYPE_COM
							break;
						default:
							invoiceTypeName = INVOICE_TYPE_PESONAL
							break;
					}
					data.invoice["invoiceTypeName"] = invoiceTypeName;
				}

				//商品清单
				// var productList = new Array();
				// for (var i = 0; i < data.orderItems.length; i++) {
				// 	productList.push(ProductRepo.findByProductId(data.orderItems[i].productId));
				// };
				var orderItems = data.orderItems;
				var myTotalPrice = 0;
				var totalNum = 0;
				if (orderItems.length > 0) {
					$(proPattenNodeIds.orderTable).html("");
					for (i in orderItems) {
						userbuyinfo = ProductRepo.findByProductId(orderItems[i].productId);
						// console.log(userbuyinfo);
						totalNum += orderItems[i].num;
						myTotalPrice += orderItems[i].num * userbuyinfo.price;
						$(proPattenNodeIds.orderTable).append('<tr><td>' + userbuyinfo.name + "(" + userbuyinfo.color + ")" + '</td><td>' + userbuyinfo.price + '</td><td>' + orderItems[i].num + '</td><td>' + orderItems[i].num * userbuyinfo.price + '</td></tr>');
						$(proPattenNodeIds.totalPrice).html(myTotalPrice);
						$(proPattenNodeIds.amount).html(totalNum);
					}
				}
				data["userbuyinfo"] = userbuyinfo;
				orderDetails.showOrderContent(data);
			} else {
				$(contentNodeId).html(data.msg).css("color", "red");
			}
		});


		//物流信息
		/*		me.magicService.getLogisticsDetailInfo(orderId, function(data) {
			if (data.ret == 1) {
				orderDetails.showOrderLogistics(data.logisticsDetail);
			} else {
				$(logisticsNodeId).html(data.msg).css("color", "red");
			}
		});*/
	}

});