var hotSlide={
			haProtoType:false,
			newClass:function(urlArray,ele){
				urlArray?this.createDOM(urlArray,ele):void(0);
				ele=ele||{};
				if(!this.haProtoType){
					this.init.prototype=hotSlide;
					this.haProtoType=true;
				}
				return new this.init();
			},
			getId:function(id){
			  return typeof id=="string"?document.getElementById(id):id;
			},
			prevPage:function(){

				if(this.item==0)
				{
					this.item=this.lengths-1;
				}
				this.item--;
				this.mainAnimain(this.item);
				this.curAnimate(this.item);
			},
			nextPage:function(){
				this.item++;
				this.mainAnimain(this.item);
				this.curAnimate(this.item);
			},
			bindEvent:function(){
				var myThis=this;
				var eleEvent=myThis.getId("hotSlide");
				eleEvent.addEventListener("touchstart",function(e){

					myThis.initPage.x= e.changedTouches[0].pageX;
					myThis.initPage.y= e.changedTouches[0].pageY;
	
				});
				eleEvent.addEventListener("touchmove",function(e){
					myThis.endPage.x= e.changedTouches[0].pageX;
					myThis.endPage.y= e.changedTouches[0].pageY;
					
					var xcurPage=myThis.endPage.x-myThis.initPage.x-myThis.item*myThis.winWidth;
					var x= myThis.endPage.x-myThis.initPage.x;
					if(myThis.item==0&&x>0)
					{
						myThis.mainContent.style.webkitTransition="0s";
						myThis.mainContent.style["webkitTransform"]="translate3d("+(myThis.item-1)*myThis.winWidth+"px"+",0px,0px)";
						myThis.item=myThis.lengths-1;
						//myThis.mainContent.style["webkitTransform"]="translate3d("+xcurPage+"px,0px,0px)";
					}
					else if(myThis.item==myThis.lengths-1&&x<0)
					{
						myThis.mainContent.style.webkitTransition="0s";
						myThis.mainContent.style["webkitTransform"]="translate3d( 0px"+",0px,0px)";
						myThis.item=0;
						//myThis.mainContent.style["webkitTransform"]="translate3d("+xcurPage+"px,0px,0px)";
					}
					myThis.mainContent.style["webkitTransform"]="translate3d("+xcurPage+"px,0px,0px)";
					e.stopPropagation();
					e.preventDefault();

				});
				eleEvent.addEventListener("touchend",function(e){
					var change=myThis.endPage.x-myThis.initPage.x;
					var start_end=Math.abs(e.changedTouches[0].pageX-myThis.initPage.x);
					if(start_end!=0){
						if(Math.abs(change)>50)
						{
							if(myThis.endPage.x-myThis.initPage.x>0)
							{
								myThis.prevPage();
							}
							else{
								myThis.nextPage();
							}
						}
						else 
						{
						   myThis.mainContent.style.webkitTransform='translate3d(-'+myThis.item*myThis.winWidth+"px,0,0)";
						}
					}
					else{
						history.go(-1);
					}

				});
			},
			curAnimate:function(getItem){
				for(var k=0;k<this.getItem.length;k++)
				{
					this.getItem[k].className="";
				}

				this.getItem[getItem].className="cur"

			},
			mainAnimain:function(item){
				
				var _this=this;
				this.mainContent.style.webkitTransition="0.2s";
				this.mainContent.style["webkitTransform"]="translate3d(-"+item*this.winWidth+"px,0px,0px)";

				if(this.item==this.lengths-1)
				{
					_this.item=0;
					_this.curAnimate(0);
					window.setTimeout(function(){
						_this.mainContent.style.webkitTransition="0";
						console.log(_this.mainContent.style.webkitTransition,":",_this.mainContent.style.webkitTransition);
						//_this.mainContent.style["webkitTransform"]="translate(-0px"+",0px,0px)";
						_this.mainContent.style["webkitTransition"]="0s";
						console.log(_this.mainContent.style.webkitTransition,":",_this.mainContent.style.webkitTransition);
						_this.mainContent.style["webkitTransform"]="translate3d( 0px"+",0px,0px)";

						_this.item=0;
					},200);
				}
			},
			init:function(){
				var _this=this;
				_this.item=0;
				_this.hotSlide=_this.getId("hotSlide");
				_this.mainContent=_this.getId("mainContent");
				
				_this.slideCont=_this.mainContent.getElementsByTagName("div");
				_this.cloneDiv=_this.slideCont[0].cloneNode(true);
				_this.cloneDiv.className="slide-img";
				_this.mainContent.appendChild(_this.cloneDiv);

				_this.winWidth=window.innerWidth;
				_this.lengths=_this.slideCont.length;

				_this.mainContent.style.width=_this.winWidth*_this.lengths+2+"px";
				for(var i=0;i<_this.lengths;i++)
				{
					_this.slideCont[i].style.width=window.innerWidth+"px";
				}
				_this.getItem=_this.getId("get-item").getElementsByTagName("a");
				_this.initPage={
					x:0,y:0
				};
				_this.endPage={
					x:0,y:0
				};
				_this.bindEvent();
			},
			createDOM:function(imgArray,ele){
				var divHotSlide=document.createElement("div");
					divHotSlide.setAttribute("class","slide");
					divHotSlide.setAttribute("id","hotSlide");
				
				var divMainContent=document.createElement("div");
					divMainContent.setAttribute("class","slide-main");
					divMainContent.setAttribute("id","mainContent");
				
				var divMainContent=document.createElement("div");
					divMainContent.setAttribute("class","slide-main");
					divMainContent.setAttribute("id","mainContent");
				
				var divGetItem=document.createElement("div");
				divGetItem.setAttribute("id","get-item");
				this.hotSlideHeight=200;
				for(var i=0;i<imgArray.length;i++)
				{	
					var div=document.createElement("div");
					div.setAttribute("class","slide-img");
					
					var img=document.createElement("img");
					img.index=i;
					var imgd=new Image();
					imgd.src=imgArray[i];
					(function(img,length,divHotSlide){
						var _this=this;
						img.onload=function(){						
							var imgH=window.innerWidth/this.width*this.height;
							img.style.height=imgH+"px";
							_this.hotSlideHeight=_this.hotSlideHeight<imgH?imgH:_this.hotSlideHeight;
							if(img.index==(length-1))
							{
								divHotSlide.style.height=_this.hotSlideHeight+"px";
								divHotSlide.style["margin-top"]=(window.innerHeight-parseInt(_this.hotSlideHeight))/2.0+"px";
							}
						}
					}).call(this,img,imgArray.length,divHotSlide);
					
					img.src=imgArray[i];
					div.appendChild(img);
					divMainContent.appendChild(div);
					
					var a=document.createElement("a");
					a.setAttribute("class",(i==0?"cur":""));
					a.setAttribute("href","javascript:;");
					divGetItem.appendChild(a);
				}
				
				divHotSlide.appendChild(divMainContent);
				divHotSlide.appendChild(divGetItem);
				ele=ele||document.getElementsByTagName("body")[0];
				ele.appendChild(divHotSlide);
			}
		};