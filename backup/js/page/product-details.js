define(function(require) {

  var $ = require('jquery');
  var MagicController = require('MagicController');
  var magicController = new MagicController();
  var clickAble = false;
  $(function() {
    // 下一步按钮默认点击无效
    $("#header_div").load("_header.html", function() {
        /** 调用header.html需要的js */
        seajs.use('page/_header.js');
    });
      $("#footer_div").load("_footer.html",function () {
          seajs.use('page/_footer.js');
      });
    /**检查购物车*/
    magicController.checkCart(function(data) {
      if (data.ret == 1) {
        try {
          var cartitems = data.cartitems;
          if (cartitems.length > 0) {
            enableNextButton();
          }
        } catch (e) {
          // console.log(e);
        }
      }
    });
    /*initProduct*/
    magicController.initProduct();
    /**
     * 添加购物车
     */
    $(".DetailsBtn1").on("click", function() {
      var productId = getProductId();
      var quantity = getProductNumber();
      magicController.addProIntoCart(productId, quantity, function(data) {
        if (data.ret == 1) {
          $(".cart-hint").html("加入成功，继续选择商品加入购物车或下一步").fadeIn(100).css("color", "gray").fadeOut(3000);
          enableNextButton();
        } else {
          $(".cart-hint").html(data.msg).fadeIn(100).css("color", "red");
        }
      });
    });
    /**
     * 下一步
     */
    $(".DetailsBtn2").on("click", function(event) {
      //TODO next 
      if (clickAble) {
        event.preventDefault();
        magicController.goToCart();
      } else {
        return false;
      }
    });

    // 库存量    
    var stockNum = parseInt($('#select-color .tab-panel.current .stock-num').text());

    // 商品详情页 选择样式
    $('#select-color').each(function() {

      var $tabPanel = $('.tab-panel', this);
      var $tabButton = $('.tab-nav li', this);
      var productDetailImg = $('#product-detail-img img');

      $tabButton.click(function() {
        // console.log($(this).hasClass("current"));
        $tabButton.removeClass('current');
        $(this).addClass('current');
        $tabPanel.hide().removeClass('current').eq($(this).closest('li').index()).show().addClass('current');
        productDetailImg[0].src = $(this).find('a')[0].href;
        stockNum = $('#select-color .tab-panel.current .stock-num').text();
        return false;
      }).filter(':first').click();
    });

    // 显示已加入购物车提示
    function showCartHint() {
      $('.cart-hint').fadeIn(100);
    }

    // 取得数量
    function getProductNumber() {
      return $('.quantity-field').val();
    }

    // 取得选中的的ProductId
    function getProductId() {
      return $('#select-color .tab-panel.current').attr('action-pid');
    }

    // 添加到购物车成功后亮起 下一步 按钮
    function enableNextButton() {
      $('.next-button').removeClass('next-button-gray');
      clickAble = true;
    }

    quantitySelect('.quantity-container', '.quantity-field', '.icon_Plus', '.icon_Minus');
    // 数字加减表单
    function quantitySelect(quantityContainer, quantityField, plusButton, minusButton) {
      var stockNum = 9999;
      var $quantityContainer = $(quantityContainer);
      $quantityContainer.each(function() {
        var me = this;
        var $plusButton = $(plusButton, me),
          $minusButton = $(minusButton, me),
          $quantityField = $(quantityField, me),
          quantityNum = $quantityField.val();
        /*
	  $plusButton.live("click",function() {
	     $quantityField.val(++$quantityField[0].value);
	  });
*/

        // 加按钮 和 减按钮
        $(document).click(function(event) {
          if ($(event.target).is(minusButton)) {
            var $quantityField = $(event.target).closest(quantityContainer).find(quantityField);
            if (parseInt($quantityField.val()) <= 1) {
              $quantityField.val(1);
              return;
            }
            $quantityField.val(--$quantityField[0].value);
          } else if ($(event.target).is(plusButton)) {
            var $quantityField = $(event.target).closest(quantityContainer).find(quantityField);
            if (parseInt($quantityField.val()) >= 99) {
              $quantityField.val(99);
              return;
            }
            $quantityField.val(++$quantityField[0].value);
          }
        })

        /*
		// 点减按钮小于1时无效
		$minusButton.live("click",function() {
	    if(parseInt($quantityField.val()) <= 1) {
    	  $quantityField.val(1);
    	  return;
  	  }
    	$quantityField.val(--$quantityField[0].value);
  	});
*/

        // 失焦时检查数量是否有效
        $quantityField.live("change", function() {
          if (parseInt($(this).val()) <= 1) {
            $(this).val(1);
          } else if (parseInt($(this).val()) >= Math.min(stockNum, 99)) {
            $(this).val(Math.min(stockNum, 99));
          }
        });

        // 输入非数字重置为1
        $quantityField.live("keyup", function(event) {
          var pattern = /\D/;
          var text = event.target.value;
          if (text == 0 || pattern.test(text)) {
            event.target.value = 1;
          }
        });

      });

    };

  });
});