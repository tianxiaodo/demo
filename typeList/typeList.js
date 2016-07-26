		/*
			效果:可滑动的列表，选中页面中间的元素并修改其样式
			入口为typeList.newClass(urlObj,id)
				urlObj:格式{name,imgurl},可选参数
					   为空时:需要在手动页面构建DOM结构,第二个参数id无效
					   不为空时:会自动在页面构建DOM结构，第二个参数id生效
				id:指定元素(动态构建的DOM结构)添加的位置元素处的id，为空时默认添加到body下
		*/
		var typeList={
			haProtoType:false,
			newClass:function(urlObj,id){
				if(!this.haProtoType){
					this.init.prototype=typeList;
					this.haProtoType=true;
				}
				if(urlObj)
				urlObj?this.createDOM(urlObj,id):void(0);
				return new this.init()
			},
			setActiveLi:function(index){
				var ali=this.boxul.getElementsByClassName("activeli")[0];
				ali?ali.className="":void(0);
				var nli=this.boxlis[index]
				nli?nli.className="activeli":void(0);
			},
			bindEvent:function(){
				var myThis=this;
				myThis.boxul.addEventListener("touchstart",function(e){
						this.startPageX=e.touches[0].pageX;
					},false);
				myThis.boxul.addEventListener("touchmove",function(e){
				
							var endpagex=e.touches[0].pageX;
							var changeCur=endpagex-this.startPageX;
							var minLeft=parseInt(this.style.width)*-1+myThis.liWidth;
							
							if((this.ulLeft==0&&changeCur>0)||(this.ulLeft==minLeft&&changeCur<0))
							{
								return;
							}
							if(this.ulLeft>0)
							{
								this.ulLeft=0;
							}
							else if(this.ulLeft<minLeft)
							{
								this.ulLeft=minLeft;
							}else{
								this.ulLeft=this.ulLeft+changeCur;
							}
							this.style["webkitTransform"]="translate3d("+this.ulLeft+"px,0px,0px)";
							this.startPageX=endpagex;
							var newIndex=parseInt((this.ulLeft-myThis.liWidth/2)/(myThis.liWidth*-1));
							if(newIndex!=myThis.index)
							{
								myThis.setActiveLi(newIndex);
								myThis.index=newIndex;
							}
							console.log(newIndex);

					},false);
			},		
			init:function(id){
				var _this=this;
				_this.whitebox=document.getElementById("white_box");
				_this.boxul=white_box.getElementsByTagName("ul")[0];
				_this.boxlis=white_box.getElementsByTagName("li");
				_this.liWidth=parseInt(getComputedStyle(_this.boxlis[1])["width"]);
				
				var maxWidth=parseInt(getComputedStyle(this.autoCreate?_this.whitebox.parentNode:document.body)["width"]);
				
				_this.ulPaddingLeft=(maxWidth-parseInt(_this.liWidth))/2;;
				_this.boxul.ulLeft=0;
				_this.boxul.index=0;
				_this.boxul.style.width=_this.boxlis.length*parseInt(_this.liWidth)+"px";
				
				_this.boxul.style["padding"]="0 "+_this.ulPaddingLeft+"px";
				_this.boxul.style["-webkit-transform"]="translateX(-0px)";
				
				_this.bindEvent();
			},
			createDOM:function(urlObj,id){
				this.autoCreate=true;
				var div_white_box=document.createElement("div");
				div_white_box.setAttribute("class","white_box");
				div_white_box.setAttribute("id","white_box");
				
				var ulTypeList=document.createElement("ul");
				ulTypeList.setAttribute("class","type_list");
				var n=0;
				for(var key in urlObj){
					var li=document.createElement("li");
					li.setAttribute("class",(n==0?"activeli":""));
					n==0?(n=1):void(0);
					
					var img=document.createElement("img");					
						img.src=urlObj[key];
						li.appendChild(img);
					
					var span=document.createElement("span");
						span.innerHTML=key;
						li.appendChild(span);
					
					ulTypeList.appendChild(li);	
				}
				
				div_white_box.appendChild(ulTypeList);
				ele=document.getElementById(id)||document.body;
				ele.appendChild(div_white_box);
			}
		};