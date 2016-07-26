var turnTable={
			hasPrototype:false,
			newClass:function(chanceArr,offset,callback){
				if(!this.hasPrototype)
				{
					this.init.prototype=turnTable;
					this.hasPrototype=true;
				}
				return new this.init(chanceArr,offset,callback);
			},
			bindEvent:function(){
				var _this=this;
				var ele=this.aEle||this.dzp;
				var event="ontouchstart" in document?"touchstart":"click";
				ele.addEventListener(event,function(e){
					
					if(!_this.step){
						_this.step=function(){
							var sd=(_this.rotate-_this.rotateNow)/60;
							if(sd*20<-0.5){
								_this.rotateNow+=sd;
								_this.dzp.getElementsByTagName("img")[0].style["transform"]="rotate("+_this.rotateNow+"deg)"
								_this.timer=window.setTimeout(_this.step,13);
							}
							else
							{
								_this.dzp.getElementsByTagName("img")[0].style["transform"]="rotate("+_this.rotate+"deg)"
								window.clearTimeout(_this.timer);
								_this.key=1;
								if(_this.callback)
								{
									_this.callback(_this.index);
								}
							}
						}
					}
					if(_this.key)
					{	
						_this.key=0;
						_this.rotateNow=0;
						
						var r=_this.random(8,12);
						_this.rotate=-360*r+offset-_this.random(_this.index*360/_this.chanceArr.length+1,(_this.index+1)*360/_this.chanceArr.length);
						_this.dzp.getElementsByTagName("img")[0].style["transform"]="rotate(0deg)"
						_this.step();
					}
					e.stopPropagation();
					e.preventDefault();
					
				},false);
			},
			init:function(chanceArr,offset,callback){
				this.key=1;
				this.chanceArr=chanceArr;
				this.offset=offset;
				this.index=this.getIndex();
				this.dzp=document.getElementById("divZp");
				if(typeof callback=="function")
				{
					this.callback=callback;
				}
				var zpStyle=getComputedStyle(this.dzp);
				this.aEle=this.dzp.getElementsByTagName("a")[0];
				if(this.aEle){
					var aStyle=getComputedStyle(this.aEle);
					this.aEle.style["left"]=(parseInt(zpStyle["width"])-parseInt(aStyle["width"]))/2+"px";
					this.aEle.style["top"]=(parseInt(zpStyle["height"])-parseInt(aStyle["height"]))/2+"px";
				}
				this.bindEvent();
			},
			getIndex:function(){
				var r=parseInt(Math.random()*100+1);
				for(var i=0;i<this.chanceArr.length;i++)
				{	
					var sum=this.getSum(i);
					
					if(r<=sum)
					{
						return i;
					}
				}
			},
			getSum:function(index){
				if(index==0)
				{
					return this.chanceArr[0];
				}
				else{
					return this.chanceArr[index]+this.getSum(index-1);
				}
			},
			random:function(min,max){
				// 包括min不包括max
				return Math.floor(min+Math.random()*(max-min));
			}
		}