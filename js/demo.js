$(function() {
	//newGameStart();
	var NebPay = require("nebpay");
	var nebPay = new NebPay();
	var serialNumber;
	var to;
	var value = '0';
	var callFunction;
	var callArgs;
	var browser = getBrowserInfo();
	var name;
	var score;
	var heighscore;
	onSimulateCallClick();

	function onSimulateCallClick() {
		to = 'n1uNk2EnQaCULEkTG3ycu4LyYRmwSAJwELx';
		value = '0';
		callFunction = 'starts';
		var callArgs = `["start"]`;
		nebPay.simulateCall(to, value, callFunction, callArgs, {
			qrcode: {
				showQRCode: false
			},
			goods: {
				name: "test",
				desc: "test goods"
			},
			listener: setScore //set listener for extension transaction result
		});
	}

	$("#start").click(function() {

		if (browser == 'chrome') {
			if (typeof(webExtensionWallet) === "undefined") {
				layer.alert("请先安装星云谷歌拓展钱包.")
			} else {
				to = 'n1uNk2EnQaCULEkTG3ycu4LyYRmwSAJwELx';
				value = '0';
				callFunction = 'starts';
				var callArgs = `["start"]`;
				//              window.postMessage({
				//                "target": "contentscript",
				//                "data":{
				//                  "to" : to,
				//                  "value" : value,
				//                  "contract" : {
				//                    "function" : callFunction,
				//                    "args" : callArgs
				//                  }
				//                },
				//                "method": "neb_call"
				//              }, "*");
				serialNumber = nebPay.call(to, value, callFunction, callArgs, {
					qrcode: {
						showQRCode: false
					},
					goods: {
						name: "test",
						desc: "test goods"
					},
					listener: listener //set listener for extension transaction result
				});
				setTimeout(() => {
					onrefreshClick();
				}, 1000);
			}
		} else {
			layer.alert('请在谷歌浏览器下输入');
		}
	});

	$("#uploadscore").click(function() {
		layer.open({
			type: 1,
			title: false //不显示标题栏
				,
			closeBtn: false,
			area: '300px;',
			shade: 0.8,
			id: 'LAY_layuipro' //设定一个id，防止重复弹出
				,
			btn: ['提交', '取消'],
			btnAlign: 'c',
			moveType: 1 //拖拽模式，0或者1
				,
			content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;"><form class="layui-form" action="">\n' +
				'  <div class="layui-form-item">\n' +
				'    <div class="layui-input-block" style="margin-left: 0px;">\n' +
				'      <input type="text" id="name" required maxlength="5"  name="title" lay-verify="title" autocomplete="off" placeholder="输入你的名字吧" class="layui-input" style="margin-left: 0px;">\n' +
				'    </div>\n' +
				'  </div>',
			success: function(layero) {
				// var btn = layero.find('.layui-layer-btn');
				// btn.find('.layui-layer-btn0').attr({
				//     href: 'http://www.layui.com/'
				//     ,target: '_blank'
				// });
			}
		});
	});



	$(document).on("click", 'body .layui-layer-btn0', function() {
		name = $('#name').val();
		score = $('#finSumScore').text();
		score = parseInt(score);
		var browser = getBrowserInfo();
		if (typeof(webExtensionWallet) === "undefined") {
			layer.alert("请先安装星云谷歌拓展钱包.")
		} else {
			if (browser == 'chrome' && name) {
				//向星云链提交数据
				var to = 'n1uNk2EnQaCULEkTG3ycu4LyYRmwSAJwELx';
				var value = '0';
				var callFunction = 'setcore';
				timestamp = Date.parse(new Date());
				var callArgs = '["' + name + '",{"userrname":"' + name + '","timestamp":' + timestamp + ',"score":' + score + '}]';
				serialNumber = nebPay.call(to, value, callFunction, callArgs, {
					qrcode: {
						showQRCode: false
					},
					goods: {
						name: "test",
						desc: "test goods"
					},
					listener: updateScore //set listener for extension transaction result
				});
				setTimeout(() => {
					onrefreshClick();
				}, 1000);

			} else {
				layer.alert('请在谷歌浏览器下输入您的大名');
			}
		}
	});

	function onrefreshClick() {
		nebPay.queryPayInfo(serialNumber) //search transaction result from server (result upload to server by app)
			.then(function(resp) {
				console.log(resp);
			})
			.catch(function(err) {
				console.log(err);
			});
	}

	function setScore(resp) {
		heighscore = 0;
		var heighscoretext = '0';
		if (resp.result) {
			var result = JSON.parse(resp.result);
			heighscoretext = result.userrname + '   ' + result.score + '分';
			heighscore = parseInt(result.score);
		}
		$("#heighScore").text(heighscoretext);
	}

	function listener(resp) {
		begin();
	}

	function begin() {
		name = '';
		score = 0;
		$.jweGame.gameStart();
	}

	function updateScore(resp) {
		location.reload();

	}

})