define(function(require) {

	var $ = require('jquery');
	var UrlParams = require('util/UrlParams');
	var urlParams = new UrlParams();
	var MagicController = require('MagicController');
	var magicController = new MagicController();
	var addressId = 0;
	var isAddressHide = false;
	/**
	 * 立即下单
	 */
	$(function(){
		$("#header_div").load("_header.html", function() {
			seajs.use('page/_header.js');
		});
		
		//优惠券初始化
		var useCoupon = false;
		magicController.getCurrentCoupons(".coupon-popup");
		var cartJsonStr = urlParams.getUrlParams("cart_json");

		magicController.showUserBuyInfo("#proList", ".total-price", cartJsonStr);
		//FIXME 判断当必填项目 有不合法的情况时 不能提交 并有提示信息
		/* 		magicController.showUserBuyInfo("#proList"); */
		$(".buy-submit").click(function(event) {
			if(!isAddressHide){
				$('.required').blur();
				if ($('.form-hint').length) {
					$('.form-hint').eq(0)[0].scrollIntoView();
					return false;
				}
			}
			// alert('表单验证通过');
			event.preventDefault();
			var params = $('#myForm').serialize();
			magicController.createOrder(params + "&addressId=" + addressId, decodeURI(cartJsonStr));
		});
		$("#valid_button").click(function(event) {
			//TODO转圈
			var $outerWrapper = $(this).closest('.coupon-verification');
			var $btn = $(this);
			var $textField = $outerWrapper.find('input[type=text]');
			var $loading = $('<span class="loading-small"></span>');
			if ($textField.val() === "") {
				return false;
			}

			$outerWrapper.find('.coupon-popup').hide();

			// 去掉原按钮，并插入loading图			
			$btn.hide();
			$textField.prop({
				disabled: true
			}).after($loading);
			var couponNum = getCoupon();
			magicController.checkCoupon(couponNum, function(data) {
				$loading.remove();
				$textField.prop({
					disabled: false
				});
				$btn.show();
				$('.coupon-verification').find('alert').remove();
				if (data.ret == 1) {

					var coupon = data.coupon;
					if (data.coupon) {
						$('.coupon-verification').append('<p class="alert alert-success">此码可优惠' + coupon.discountAmount + '元！</p>');
						$("#valid_button")[0].disabled = true;
					} else {
						$('.coupon-verification').append('<p class="alert alert-error">此优惠码无效！</p>');
					}
					var totalPrice = parseFloat($('.total-price').html());
					$('.total-price').html(totalPrice -= coupon.discountAmount);
					/*
					if(data.coupon = ""){
						//TODO 修改 页面上的商品的价格
					}
				*/
				} else {
					// alert(data.msg);
					magicController.showAlertDialog(data.msg);
				}
			});
			return false;
		});
		//表单验证
		$('input.required').blur(function() {
			var $parent = $(this).parent();
			switch (this.name) {
				case 'realName':
					if (this.value == '') {
						var hintMessage = '<span class="form-hint">真实姓名为必埴项</span>';
						$parent.find('.form-hint').remove();
						$parent.append(hintMessage);
					} else {
						$parent.find('.form-hint').remove();
					}
					break;
				case 'street':
					if (this.value == '') {
						var hintMessage = '<span class="form-hint">地址为必埴项</span>';
						$parent.find('.form-hint').remove();
						$parent.append(hintMessage);
					} else {
						$parent.find('.form-hint').remove();
					}
					break;
				case 'postalCode':
					if (this.value == '') {
						var hintMessage = '<span class="form-hint">邮政编码为必埴项</span>';
						$parent.find('.form-hint').remove();
						$parent.append(hintMessage);
					} else if (!/^\d{6}$/.test(this.value)) {
						var hintMessage = '<span class="form-hint">邮政编码格式不正确</span>';
						$parent.find('.form-hint').remove();
						$parent.append(hintMessage);
					} else {
						$parent.find('.form-hint').remove();
					}

					break;
				case 'telephone':
				case 'mobile':
					var $insertPoint = $(this).closest('.tablebox');
					if ($('input[name=telephone]').val().length === 0 && $('input[name=mobile]').val().length === 0) {
						var hintMessage = '<p class="form-hint telephone-hint">手机和固定电话必须填入一项</p>';
						$insertPoint.find('.form-hint.telephone-hint').remove();
						$insertPoint.append(hintMessage);
					} else {
						$insertPoint.find('.form-hint.telephone-hint').remove();
						if (this.name == 'mobile' && !/^\d{11}$/.test(this.value)) {
							var hintMessage = '<p class="form-hint telephone-hint">手机格式输入错误</p>';
							$insertPoint.find('.form-hint.telephone-hint').remove();
							$insertPoint.append(hintMessage);
							if ($('input[name=telephone]')[0].value.length > 0 && !/^\d*$/.test($('input[name=telephone]')[0].value)) {
								var hintMessage = '<p class="form-hint telephone-hint">固定电话格式输入错误</p>';
								$insertPoint.append(hintMessage);
							}
						}
						if (this.name == 'telephone' && !/^\d*$/.test(this.value)) {
							var hintMessage = '<p class="form-hint telephone-hint">固定电话格式输入错误</p>';
							$insertPoint.find('.form-hint.telephone-hint').remove();
							$insertPoint.append(hintMessage);
						}
					}
					break;
			}
		});

		// 是否开发票
		$('#row-invoice [name=oisNeedReceipt]').change(function() {
			var $container = $(this).closest('.tablebox');
			var $inputField = $container.find('input[name=title]');
			if ($(this).parent().find('.invoice-on').prop('checked')) {
				$(this).closest('.parent').siblings('.child-row-invoice').show();
				if (!$container.find('.invoice-company').prop('checked')) {
					$container.find('.company-row').hide();
				}
			} else {
				$(this).closest('.parent').siblings('.child-row-invoice').hide();
				$inputField.removeClass('required').off('blur');
				$container.find('.form-hint').remove();
			}
		}).change();

		$('[name=invoiceType]').change(function() {
			var $container = $(this).closest('.tablebox');
			var $inputField = $container.find('input[name=title]');
			var $companyRow = $container.find('.company-row').hide();
			if ($(this).closest('.child-row-invoice').find('.invoice-company').prop('checked')) {
				$companyRow.show();
				$inputField.addClass('required').blur(function() {
					if (this.value == '') {
						var hintMessage = '<span class="form-hint">单位名称为必埴项</span>';
						$container.find('.form-hint').remove();
						$inputField.after(hintMessage);
					} else {
						$container.find('.form-hint').remove();
					}
				})
			} else {
				$companyRow.hide();
				$inputField.removeClass('required').off('blur');
				$container.find('.form-hint').remove();
			}
		});

		// 应用placeholder插件
		seajs.use('lib/jquery.placeholder.min.js', function() {
			$('input, textarea').placeholder();
		});

		// 优惠码表单focus时弹出小窗
		$('.coupon-field').focus(function() {
			$(this).siblings('.coupon-popup').fadeIn(100);
		});

		// 点击其他区隐藏
		$(document).click(function(event) {
			if ($('.coupon-popup').has(event.target).length == 0 && !$('.coupon-popup').is(event.target) && $('.field-popup').has(event.target).length == 0 && !$('.field-popup').is(event.target)) {
				$('.coupon-popup').fadeOut(200)
			}
		});

		// 点击优惠码插入输入框并隐藏优惠码
		$('.field-popup-container .coupon').live("click", function(event) {
			$(this).closest('.field-popup-container').find('.coupon-field').val(event.target.innerHTML)
				.end().find('.coupon-popup').fadeOut(200);
			$('.field-popup-container').find("[name='couponnum']").val(event.target.innerHTML);
		});

		// 得到优惠码的值
		function getCoupon() {
			return $('.coupon-field').val();
		}

		// 三级地址联动下拉框
		seajs.use('lib/jsAddress.js', function() {
			addressInit('Select1', 'Select2', 'Select3');

		});

		// 地址白名单
		var addressWhiteList = [{name: '北京',cityList: ['市辖区', '县']}, {name: '上海',cityList: ['市辖区', '县']}, {
			name: '浙江',
			cityList: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市']
		}];

		// function checkWhiteList() {

		// }

			//saveAddress 
		magicController.getDefaultAddress(function(data) {
			// console.log("---------->已存在的地址<-------------");
			// console.log(data);

			var addressTable = $(".address-info table");
			var addressInfo = $(".address-content");
			if (data.ret == 1 && null != data.address) {
				addressInfo.parent().hide();
				var address = data.address;
				addressId = address.id;
				addressTable.hide(function() {
					isAddressHide = true;
				});

				addressInfo.parent().show(function() {
					addressInfo.html("地址：" + address.province + address.city + address.country + address.street + " (" + address.realName + "收) 联系方式：" + address.telephone + address.mobile);
					$("#setAddress").click(function() {
						//显示表格
						// console.log(address.id);
						// addressTable.find("[name='addressId']").val();
						addressTable.find("[name='realName']").val(address.realName);
						addressTable.find("[name='postalCode']").val(address.postalCode);
						addressTable.find("[name='mobile']").val(address.mobile);
						addressTable.find("[name='telephone']").val(address.telephone);
						addressTable.find("[name='street']").val(address.street);
						addressInit('Select1', 'Select2', 'Select3', address.province, address.city, address.country);
						addressTable.show(function() {
							isAddressHide = false;
						});
						addressInfo.parent().hide();
					});
				});
			}
			$("#save_address").click(function() {
				$('.address-info .required').blur();
				if ($('.address-info .form-hint').length) {
					$('.address-info .form-hint').eq(0)[0].scrollIntoView();
					return false;
				} else {
					var addressParent = $(this).closest("table");
					var realname = addressParent.find("[name='realName']").val();
					var province = addressParent.find("[name='province']").val();
					var city = addressParent.find("[name='city']").val();
					var country = addressParent.find("[name='country']").val();
					var street = addressParent.find("[name='street']").val();
					var postalCode = addressParent.find("[name='postalCode']").val();
					var mobile = addressParent.find("[name='mobile']").val();
					var telephone = addressParent.find("[name='telephone']").val();
					var obj = {
						"realName": realname,
						"province": province,
						"city": city,
						"country": country,
						"street": street,
						"postalCode": postalCode,
						"mobile": mobile,
						"telephone": telephone
					};
					magicController.saveAddress(obj, function(data) {

						addressTable.hide(function() {
							isAddressHide = true;
						});
						// console.log(myData);
						address = obj;
						addressId = data.addressId;
						addressInfo.parent().show(function() {
							addressInfo.html("地址：" + obj.province + obj.city + obj.country + obj.street + " (" + obj.realName + "收) 联系方式：" + obj.telephone + obj.mobile);
							$("#setAddress").click(function() {
								//显示表格
								addressTable.find("[name='realName']").val(address.realName);
								addressTable.find("[name='postalCode']").val(address.postalCode);
								addressTable.find("[name='mobile']").val(address.mobile);
								addressTable.find("[name='telephone']").val(address.telephone);
								addressTable.find("[name='street']").val(address.street);
								addressInit('Select1', 'Select2', 'Select3', address.province, address.city, address.country);
								addressTable.show(function() {
									isAddressHide = false;
								});
								addressInfo.parent().hide();
							});
						});
					});
				}
			});
		});

		/*     $('select[name=province], select[name=city], select[name=country]') */

		/*$(' select[name=city]').change(function(event) {
			var flag = false;
			var target = event.target;
			var selectedOption = target.options[target.selectedIndex];
			var $cashOnDelivery = $('#cash-on-delivery');
			var provinceName = $('select[name=province]').val();
			var cityName = $('select[name=city]').val();
			console.log(cityName)
			if(target.selectedIndex == -1) return;
			for(var i = 0, len = addressWhiteList.length; i < len; i++) {
				if(addressWhiteList[i].name != provinceName) continue;
				
				if($.inArray(cityName, addressWhiteList[i].cityList) > 0) {
  				flag = true;
				}
			}
				
			if(flag) {
				$cashOnDelivery.show();
			}	else {
				$cashOnDelivery.hide();
			}
				
		}).triggerHandler('change');

    $('select[name=province]').change(function() {
      select[name=city].change();
    })*/
	$("#footer_div").load("_footer.html", function() {
				seajs.use('page/_footer.js');
	});
	});
});