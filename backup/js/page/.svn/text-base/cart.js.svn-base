define(function(require) {

  var $ = require('jquery');
  var EventBus = require('../event/EventBus');
  var MagicController = require('MagicController');
  var magicController = new MagicController();
  $(function() {
    //展示购物车
    $("#header_div").load("_header.html", function() {
        /** 调用header.html需要的js */
        seajs.use('page/_header.js');
    });
      $("#footer_div").load("_footer.html",function () {
          seajs.use('page/_footer.js');
      });
    magicController.showCartRow("#cartBarList", ".total-price", ".total-price-includ-postage", ".total-quantity", function() {
      calculateTotal();
    });
    // 数字加减表单
    quantitySelect('.quantity-container', '.quantity-field', '.icon_Plus', '.icon_Minus');

    function quantitySelect(quantityContainer, quantityField, plusButton, minusButton) {
      var stockNum = 9999;
      var $quantityContainer = $(quantityContainer);
      $quantityContainer.live("click", function(event) {
        var me = this;
        var $plusButton = $(plusButton, me),
          $minusButton = $(minusButton, me),
          $quantityField1 = $(quantityField, me),
          quantityNum = $quantityField1.val();
        //      $plusButton.live("click",function() {
        //      $quantityField.val(++$quantityField[0].value);
        // });

        // 加按钮 和 减按钮

        if ($(event.target).is(minusButton)) {
          var $quantityField = $(event.target).closest(quantityContainer).find(quantityField);
          if (parseInt($quantityField.val()) <= 1) {
            $quantityField.val(1);
            return;
          }
          $quantityField.val(--$quantityField[0].value);
          calculateTotal();
        } else if ($(event.target).is(plusButton)) {
          var $quantityField = $(event.target).closest(quantityContainer).find(quantityField);
          if (parseInt($quantityField.val()) >= 99) {
            $quantityField.val(99);
            return;
          }
          $quantityField.val(++$quantityField[0].value);
          calculateTotal();
        }

        // 点减按钮小于1时无效
        // $minusButton.live("click",function() {
        //    if(parseInt($quantityField.val()) <= 1) {
        //   	  $quantityField.val(1);
        //   	  return;
        // 	  }
        //   	$quantityField.val(--$quantityField[0].value);
        // 	});

        // 失焦时检查数量是否有效
        $quantityField1.live("change", function() {
          if (parseInt($(this).val()) <= 1) {
            $(this).val(1);
          } else if (parseInt($(this).val()) >= Math.min(stockNum, 99)) {
            $(this).val(Math.min(stockNum, 99));
          }
        });

        // 输入非数字重置为1
        $quantityField1.live("keyup", function(event) {
          var pattern = /\D/;
          var text = event.target.value;
          if (text == 0 || pattern.test(text)) {
            event.target.value = 1;
          }
        });

      });
    };

    var isCartBarButtonClickable = true;
    //更新订单
    $(".cartBarBtn").click(function() {
      //FIXME 这里是下一步的操作
      if (!isCartBarButtonClickable) {
        return false;
      }
      //得到productId 和 quantity
      var productId = $("[name='check-field']:checked").attr("action-pid");
      var quantity = $("[name='check-field']:checked").attr("action-qty");
      //FIXME 测试
      productId = 1;
      quantity = 1;
      var cartjson = getCartData();
      magicController.updateCart(cartjson);
    });

    var $delete = $('.cartBarClum .delete'),
      $checkAllButton = $('[name=check-all]:checkbox'),
      $listItems = $('.list-item'),
      $checkFields = $('[name=check-field]:checkbox'),
      itemQuantity = $listItems.length,
      $deleteCheckedItems = $('.delete-checked-items');

    // 删除订单
    $delete.live("click", function(event) {
      var me = this;
      if ($('.list-item').length <= 1) {
        magicController.showAlertDialog("当前只有一个商品，不能再删除了！");
        // dialog.showConfirm(params);
        return false;
      }
      var productId = $(this).closest('.list-item').find('[action-pid]').attr('action-pid');
      console.log(productId);
      magicController.delProFromCart(productId, function(data) {
        console.log("删除购物车");
        console.log(data);
        if (data.ret == 1) {
          // alert("删除成功！");
          $(me).closest('.list-item').animate({
            height: 0,
            opacity: 0
          }, 200, function() {
            $(this).remove();
          }).find('[name=check-field]:checkbox').prop({
            checked: false
          });
          calculateTotal();
        } else {
          magicController.showAlertDialog(data.msg);
        }
      });
    });

    // 勾选所有
    $checkAllButton.live("change", function(event) {
      $('[name=check-field]:checkbox').prop({
        checked: event.target.checked
      });
      calculateTotal();
    });

    // 单个复选框都选中，选中所有的复选框自动选中
    $checkFields.live("change", function(event) {
      var tmp = $('[name=check-field]:checkbox');
      $checkAllButton.prop({
        checked: tmp.length == tmp.filter(':checked').length
      });
      calculateTotal();
    })


    // 计算总价 和 个数
    function calculateTotal() {
      var total = {
        quantity: 0,
        price: 0
      }

      $('.list-item').has($('[name=check-field]:checkbox:checked')).each(function() {
        var itemPrice = parseFloat($('.item-price', this).html());
        var quantity = parseInt($('.quantity-field', this).val());
        total.price += itemPrice * quantity;
        total.quantity += quantity;

      });
      $('.total-price, .total-price-includ-postage').html(total.price);
      $('.total-quantity').html(total.quantity);

      // console.log(total.quantity, total.price);
      if (total.quantity === 0) {
        isCartBarButtonClickable = false;
        $(".cartBarBtn").addClass("next-button-gray");
      } else {
        isCartBarButtonClickable = true;
        $(".cartBarBtn").removeClass("next-button-gray");
      }
      return total;
    }



    // 获取订单json
    function getCartData() {
      var cartjson = [];
      $('.list-item').each(function() {
        var productId = $(this).find('[action-pid]').attr('action-pid');
        var quantity = $(this).find('.quantity-field').val();
        var isBuy = $(this).find(':checkbox')[0].checked ? "1" : "0";
        var data = {
          productId: productId,
          quantity: quantity,
          // isBuy: isBuy
        };
        cartjson.push(data);
      })

      // console.log(cartjson);
      return cartjson;
    }

  });
});