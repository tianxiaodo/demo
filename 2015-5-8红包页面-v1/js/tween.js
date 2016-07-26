function getCss(ele,attr){
	if(window.getComputedStyle){
		return parseFloat(getComputedStyle(ele,null)[attr]);
	}else{
		if(attr=="opacity"){
			//var reg=/alpha\(opacity=(\d{1,3})\)/;
			var reg=/alpha\(opacity=(\d+(?:\.\d+)?)\)/;
			var opacity=ele.currentStyle.filter;
			if(reg.test(opacity)){
				var val=RegExp.$1/100;
				if(val>=1){//如果在IE中opacity的值超过了上限，则返回1
					return 1;
				}else if(val <0.01){//超过了下限则返回0
					return 0	
				}else{//否则返回正常值
					return val;	
				}
			}else{//如果根本就没有写filter样式，则返回默认值1
				return 1;
			}
			//return opacity;
		}
		return parseFloat(ele.currentStyle[attr]);
	}
}

function setCss(ele,attr,val){
	if(attr=="opacity"){
		ele.style.opacity=val;
		ele.style.filter="alpha(opacity="+val*100+")"
	}else if(attr=="float"){
		ele.style.cssFloat=val;
		ele.style.styleFloat=val;
		
	}else if(/^background/.test(attr)){
		ele.style[attr]=val;
	}else{
		ele.style[attr]=val+"px";	
	}
	
}

var effect = {
	//当前时间*变化量/持续时间+初始值
	zfLinear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {//二次方的缓动（t^2）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {//三次方的缓动（t^3）
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {//四次方的缓动（t^4）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {//5次方的缓动（t^5）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {//正弦曲线的缓动（sin(t)）
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {//指数曲线的缓动（2^t）；
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动；
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	zfBounce: {//指数衰减的反弹缓动。
		easeIn: function(t,b,c,d){
			return c - effect.zfBounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return effect.zfBounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return effect.zfBounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
};
function animate(ele,obj,duration,type,fnCallback){
	clearInterval(ele.timer);
var fnType=effect.Expo.easeOut;
	if(typeof type =="number"){
		if(type===0){
			
		}else if(type ===1){			
			fnType=effect.zfLinear;;
		}else if(type ===2 ){
			fnType=effect.Back.easeOut;
		}else if(type===3){
			fnType=effect.Elastic.easeOut;
		}else if(type===4){
			fnType=effect.zfBounce.easeOut;
		}
	}else if(typeof type=="object"){
		//['Elastic','easeInOut']
		if(type instanceof Array){
			if(type.length==1){
				//["zfLinear"]
				fnType=effect[type[0]];
			}else if(type.length==2){
				fnType=effect[type[0]][type[1]]
				//effect.Back.easeOut;
				//effect["Back"]["easeOut"]
			}
		}
	}else if(typeof type=="function"){
		fnCallback=type;	
	}
	
	var oBegin={};//不同方向的起始值begin
	var oChange={};//保存不同方向的运动的距离change
	var flag=0;
	for(var attr in obj){
		var begin=getCss(ele,attr);
		var target=obj[attr];
		var change=target-begin;
		if(change){//如果运动的距离不为0，再保存
			oBegin[attr]=begin;
			oChange[attr]=change;
			flag++
		}
	}
	if(flag===0){
		if(typeof fnCallback=="function"){
			fnCallback.call(ele);			
		}
		return;
	}
	var interval=15;
	var times=0;
	
	function step(){
		times+=interval;
		if(times>=duration){
			clearInterval(ele.timer);
			ele.timer=null;
			for(var attr in obj){
				setCss(ele,attr,obj[attr]);
			}
			if(typeof fnCallback=="function"){
				fnCallback.call(ele);	
			}
		}else{
			for(var attr in oChange){
				//动画效果由这儿决定
				var val=fnType(times,oBegin[attr],oChange[attr],duration);
			
				setCss(ele,attr,val);
			}
		}
		
	}
	ele.timer=window.setInterval(step,interval);
}