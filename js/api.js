var Neb = require("nebulas").Neb;
var neb = new Neb();
var NebPay = require("nebpay");
var nebPay = new NebPay();

var browser = function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  	return "Chrome";
 }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}()

var webExtensionWallet = function(){
	if(typeof(webExtensionWallet) === "undefined"){
		return false
	}else{
		return true
	}
}()

var contractAddress = "n2384jMDpgu7J6uLjXXBLxJohNCMPnN5HnG" //项目合约地址
var nickNameAddress = "n1gHbworeeX9Q3Png44YysZDWpxbmyoXDw2"  //拉去昵称的合约地址
var userAddress = '' //用户钱包地址，默认为空


function onSimulateCallClick(contractAddress,func,args,callback) {  //call查询调用函数，（合约地址，函数名，参数，回调）
	to  = contractAddress;
	value = '0';
	callFunction =  func;
	var callArgs =args;
	nebPay.simulateCall(to, value, callFunction, callArgs, {
		qrcode: {
			showQRCode: false
		},
		goods: {
			name: "test",
			desc: "test goods"
		},
		listener: callback 
	});
}




function newTransaction(contractAddress,callFunction,callArgs,callback) {  //合约交易调用函数，（合约地址，函数名，参数，回调）
	value = '0';
	serialNumber = nebPay.call(contractAddress, value, callFunction, callArgs, {
		listener: callback 
	});
	setTimeout(() => {
		onrefreshClick(serialNumber);
	}, 1000);
		
}


function onrefreshClick(serialNumber) {
	nebPay.queryPayInfo(serialNumber) //search transaction result from server (result upload to server by app)
		.then(function(resp) {
			console.log('----------------queryPayInfo-----------');
			console.log(resp);
		})
		.catch(function(err) {
			console.log('----------------queryPayInfo-----------');
			console.log(err);
		});
}
















/*********************************************************忽略下面的代码************************************************************/ 

function dialog(ctx, text) { //弹出框
	var str =
		`<div class='dialog'>
			  	${text}
			</div>`
	$(ctx).append(str)
	setTimeout(function() {
		$(ctx).html('')
	}, 1500)
}

function loading(ctx) {  //loading样式
	var str =
		`<div class='loader'>
			  <div>
			    <div>
			      <div>
			        <div>
			          <div>
			            <div></div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>`

	$(ctx).css('position', 'relative')

	$(ctx).append(str)
}