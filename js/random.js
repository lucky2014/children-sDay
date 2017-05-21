var random = {
	shareUrl: "/PICCWxServerAdvance/html/jsConfig.do",
	percentage: [2,5,6,8,10,12,15,18,21,26,30,33,40,45,50,51,52,53,55,58,60,63,67,70,75,77,80,83,87,90,92,98],
	compareInit: function(num){
		if(num >= 1 && num <= 10){
			return 0;
		}else if(num >= 11 && num <= 20){
			return 1;
		}else if(num >= 21 && num <= 30){
			return 2;
		}else if(num >= 31 && num <= 40){
			return 3;
		}else if(num >= 41 && num <= 50){
			return 4;
		}else if(num >= 51 && num <= 60){
			return 5;
		}else if(num >= 61 && num <= 70){
			return 6;
		}else if(num >= 71 && num <= 80){
			return 7;
		}else if(num >= 81 && num <= 90){
			return 8;
		}else if(num >= 91 && num <= 100){
			return 9;
		}else if(num >= 101 && num <= 110){
			return 10;
		}else if(num >= 111 && num <= 120){
			return 11;
		}else if(num >= 121 && num <= 130){
			return 12;
		}else if(num >= 131 && num <= 140){
			return 13;
		}else if(num >= 141 && num <= 199){
			return 14;
		}else if(num >= 200 && num <= 400){
			return 15;
		}else if(num >= 401 && num <= 600){
			return 16;
		}else if(num >= 601 && num <= 800){
			return 17;
		}else if(num >= 801 && num <= 900){
			return 18;
		}else if(num >= 901 && num <= 999){
			return 19;
		}else if(num >= 1000 && num <= 1500){
			return 20;
		}else if(num >= 1501 && num <= 2000){
			return 21;
		}else if(num >= 2001 && num <= 3000){
			return 22;
		}else if(num >= 3001 && num <= 4000){
			return 23;
		}else if(num >= 4001 && num <= 5000){
			return 24;
		}else if(num >= 5001 && num <= 6000){
			return 25;
		}else if(num >= 6001 && num <= 7000){
			return 26;
		}else if(num >= 7001 && num <= 8000){
			return 27;
		}else if(num >= 8001 && num <= 9000){
			return 28;
		}else if(num >= 9001 && num <= 10000){
			return 29;
		}else if(num >= 10001 && num <= 15000){
			return 30;
		}else if(num >= 15001){
			return 31;
		}
	},
	init: function(){
		var num = $("input[name=num]").val();

		if(!num){
			alert("请输入具体的数值！");
			$(".showResult").hide();
		}else if(num == 0){
			$(".showResult .bg").attr("src", "imgs/p5_3.png");
			$(".percent").hide();
			$(".showResult").show();
		}else{
			var index = random.compareInit(num.replace(/\,/g, ""));
			var percent = random.percentage[index];

			if(percent>0 && percent <=10){
				$(".showResult .bg").attr("src", "imgs/p5_4.png");
				$(".showResult .bb img").eq(0).attr("src", "imgs/p5_7.png");
				$(".showResult .bb img").eq(1).attr("src", "imgs/p5_8.png");
			}else if(percent>10 && percent <=50){
				$(".showResult .bg").attr("src", "imgs/p5_5.png");
				$(".showResult .bb img").eq(0).attr("src", "imgs/p5_7.png");
				$(".showResult .bb img").eq(1).attr("src", "imgs/p5_8.png");
			}else{
				$(".showResult .bg").attr("src", "imgs/p5_6.png");
				$(".showResult .bb img").eq(0).attr("src", "imgs/p5_11.png").attr("id","buyBtn");
				$(".showResult .bb img").eq(1).attr("src", "imgs/p5_12.png").attr("id","shareBtn");
			}

			$(".percent").html(percent).show();
			$(".showResult").show();
		}
	},
	shareInit: function(){
		var me = this;
		$(".shareMark").show();
		me.getConfig(function(){
			me.wxShare();
		});
	},
	getConfig: function(cb){
		var me = this;
		$.ajax({
			type: 'post',
			url: me.shareUrl,
			data: {url:window.location.href},
			dataType: 'json',
			success: function(msg){
				if(msg.code==100){
					var obj = JSON.parse(msg.result);
					
					//二维码扫描
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: obj.appId, // 必填，公众号的唯一标识
						timestamp: obj.timestamp, // 必填，生成签名的时间戳
						nonceStr: obj.nonceStr, // 必填，生成签名的随机串
						signature: obj.signature,// 必填，签名，见附录1
						jsApiList: [ 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideOptionMenu', 'showOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});

					cb && cb();
				}else{
				}
			}
		});
	},
	wxShare: function(){
		var title = "六一节活动";
		var link = "../shareDetail.html";
		var imgUrl = "../imgs/p1_0.png";
		var desc = "六一节活动";

		//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
		wx.onMenuShareTimeline({
		    title: title, // 分享标题
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
			success: function (res) {
				//Dialog('已分享');
			},
			cancel: function (res) {
				//Dialog('已取消');
			},
			fail: function (res) {
				//Dialog(JSON.stringify(res));
			}
		});
		//获取“分享给朋友”按钮点击状态及自定义分享内容接口
		wx.onMenuShareAppMessage({
		    title: title, // 分享标题
		    desc: '', // 分享描述
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    type: '', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    	//Dialog("分享成功！");
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
		
		//获取“分享到QQ”按钮点击状态及自定义分享内容接口
		wx.onMenuShareQQ({
			title: title, // 分享标题
		    desc: '', // 分享描述
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    success: function () { 
		       // 用户确认分享后执行的回调函数
		    	//Dialog("分享成功！");
		    },
		    cancel: function () { 
		       // 用户取消分享后执行的回调函数
		    }
		});
		
		//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
		wx.onMenuShareWeibo({
			title: title, // 分享标题
		    desc: '', // 分享描述
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    success: function () { 
		       // 用户确认分享后执行的回调函数
		    	//Dialog("分享成功！");
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
		
		//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
		wx.onMenuShareQZone({
			title: title, // 分享标题
		    desc: '', // 分享描述
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    success: function () { 
		       // 用户确认分享后执行的回调函数
		    	//Dialog("分享成功！");
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
	}
};

//点击看熊孩子指数
$(".p5 .btn .bb").click(function(){
	random.init(); 
});

//点击晒晒我的乖乖娃
$(".showResult .bb").delegate("#shareBtn","click",function(){
	random.shareInit();
});

//点击提前做万能准备
$(".showResult .bb").delegate("#buyBtn","click",function(){
	location.href = "buy.html";
});

//点击蒙版，隐藏蒙版
$("body").click(function(){
	$(".shareMark").hide();
});
