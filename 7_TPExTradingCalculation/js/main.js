$(document).ready(function (e) {


  // .custom-select
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
  // .custom-select END


  // jQuery input filter
  // Restricts input for each element in the set of matched elements to the given inputFilter.
  $.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
  // Install input filters.
  // Integer
  $("#intTextBox").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
  });
  // Integer >= 0	
  $("#uintTextBox").inputFilter(function (value) {
    return /^\d*$/.test(value);
  });
  // Integer >= 0 and <= 500	
  $("#intLimitTextBox").inputFilter(function (value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500);
  });
  // Float (use . or , as decimal separator)	
  $("#floatTextBox").inputFilter(function (value) {
    return /^-?\d*[.,]?\d*$/.test(value);
  });
  // Currency (at most two decimal places)	
  $("#currencyTextBox").inputFilter(function (value) {
    return /^-?\d*[.,]?\d{0,2}$/.test(value);
  });
  // A-Z only	
  $("#latinTextBox").inputFilter(function (value) {
    return /^[a-z]*$/i.test(value);
  });
  // Hexadecimal	
  $("#hexTextBox").inputFilter(function (value) {
    return /^[0-9a-f]*$/i.test(value);
  });

  // Custom filters
  $("#fee").inputFilter(function (value) {
    return /^-?\d*[.,]?\d{0,2}$/.test(value) && (value === "" || parseInt(value) <= 10);
  });
  $("#unit").inputFilter(function (value) {
    return /^\d*$/.test(value);
  });
  $("#buy,#sell").inputFilter(function (value) {
    return /^-?\d*[.,]?\d{0,2}$/.test(value) && (value === "" || parseInt(value) <= 10000);
  });
  // jQuery input filter END

  // 浮點數相乘
  function accMul(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  };
  // multiplication END

  //浮點數相除
  function FloatDiv(arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch (e) {}
    with(Math) {
      r1 = Number(arg1.toString().replace(".", ""))
      r2 = Number(arg2.toString().replace(".", ""))
      return (r1 / r2) * pow(10, t2 - t1);
    }
  };
  //浮點數相除 END

  // 加入貨幣符號 $("selector").digits();
  $.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}
  // 加入貨幣符號 END

  // plus & minnus btn
$(".icon-plus").click(function(e){
  e.preventDefault;
  var unitData = parseInt($("#unit").val())+1;
  if (isNaN(unitData)) {
    $("#unit").val(1);
  } else{
    $("#unit").val(unitData);
  };
});

$(".icon-minus").click(function(e){
  e.preventDefault;
  var unitData = Math.max((parseInt($("#unit").val())-1),1);
  if (isNaN(unitData)) {
    $("#unit").val(1);
  } else{
    $("#unit").val(unitData);
  };
});


  // plus & minnus btn END


  // btn-start
  $(".btn-start").click(function (e) {
    e.preventDefault();

    var formData = $("#form1").serializeArray();
    var traddingType = formData[0].value,
      traddingFee = accMul(formData[1].value, 0.1),
      traddingUnit = accMul(formData[2].value, 1000),
      traddingBuy = formData[3].value,
      traddingSell = formData[4].value;

    if (traddingType=="" || traddingFee=="" || traddingUnit=="" || traddingBuy=="" || traddingSell=="") {
      if(traddingType==""){
        $("#form1 .select-selected").addClass("not-select").addClass("not-selected");
        $("#form1 .not-select").bind("animationend", function (e) {
          $("#form1 .select-selected").removeClass("not-select");
        });
      } else {
        $("#form1 .select-selected").removeClass("not-selected");
      };

      if(traddingFee==""){
        $("#form1 .tradding-fee input").addClass("not-select").addClass("not-selected");
        $("#form1 .not-select").bind("animationend", function (e) {
          $("#form1 .tradding-fee input").removeClass("not-select");
        });
      } else {
        $("#form1 .tradding-fee input").removeClass("not-selected");
      };


      if(traddingUnit==""){
        $("#form1 #unit").addClass("not-select").addClass("not-selected");
        $("#form1 .not-select").bind("animationend", function (e) {
          $("#form1 #unit").removeClass("not-select");
        });
      } else {
        $("#form1 #unit").removeClass("not-selected");
      };

      if(traddingBuy==""){
        $("#form1 #buy-price input").addClass("not-select").addClass("not-selected");
        $("#form1 .not-select").bind("animationend", function (e) {
          $("#form1 #buy-price input").removeClass("not-select");
        });
      }else {
        $("#form1 #buy-price input").removeClass("not-selected");
      };

      if(traddingSell==""){
        $("#form1 #sell-price input").addClass("not-select").addClass("not-selected");
        $("#form1 .not-select").bind("animationend", function (e) {
          $("#form1 #sell-price input").removeClass("not-select");
        });
      }else {
        $("#form1 #sell-price input").removeClass("not-selected");
      };

      return;
    } else {
      $("#form1 .select-selected,#form1 input").removeClass("not-selected");
    };


    if (traddingType == "normal-trading") {
      traddingType = 0.003;
    } else if (traddingType == "day-trading") {
      traddingType = 0.0015;
    } else if (traddingType == "etf-trading") {
      traddingType = 0.001;
    };

    // buy Calculation
    var amountBuy = accMul(traddingBuy, traddingUnit),
      buyinFee = Math.max(Math.ceil(accMul(Math.floor(accMul(amountBuy, 0.001425)), traddingFee)), 20),
      totalBuy = amountBuy + buyinFee,
      // sell Calculation
      amountSell = accMul(traddingSell, traddingUnit),
      selloutFee = Math.max(Math.ceil(accMul(Math.floor(accMul(amountSell, 0.001425)), traddingFee)), 20),
      stockTax = Math.floor(accMul(amountSell, traddingType)),
      totalSell = amountSell - selloutFee - stockTax,
      // profit or loss
      netProfitorloss = totalSell - totalBuy,
      percentProfitorloss = (Math.round((FloatDiv(netProfitorloss,totalBuy))*1000)/10)+"%" ;
    // console.log("交易類型:" + traddingType);
    // console.log("手續費折數:" + traddingFee);
    // console.log("交易股數:" + traddingUnit);
    // console.log("買入價:" + traddingBuy);
    // console.log("賣出價:" + traddingSell);
    // console.log("買入金額:" + amountBuy);
    // console.log("買入手續費:" + buyinFee);
    // console.log("總支出:" + totalBuy);
    // console.log("賣出金額:" + amountSell);
    // console.log("賣出手續費:" + selloutFee);
    // console.log("證交稅:" + stockTax);
    // console.log("總收入:" + totalSell);
    // console.log("淨損益:" + netProfitorloss);
    // console.log("損益率:" + percentProfitorloss);
    $(".net-profitorloss span").html("$"+netProfitorloss).digits();
    $(".percent-profitorloss span").html(percentProfitorloss);

    $(".amount-buy span").html("$"+amountBuy).digits();
    $(".fee-buy span").html("$"+buyinFee).digits();
    $(".total-buy span").html("$"+totalBuy).digits();

    $(".amount-sell span").html("$"+amountSell).digits();
    $(".fee-sell span").html("$"+selloutFee).digits();
    $(".tax span").html("$"+stockTax).digits();
    $(".total-sell span").html("$"+totalSell).digits();

    $("html,body").animate({scrollTop:$('#list .income-statement').offset().top},1000);
  });
    // btn-start END
});