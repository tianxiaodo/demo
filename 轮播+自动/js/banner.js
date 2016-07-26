/**
 * Created by Administrator on 2015/4/21 0021.
 */
var hotSlide = {
    hasProtoType: false,
    newClass: function(ele){
        ele = ele || {};
        if(this.hasProtoType == false){
            this.init.prototype = hotSlide;
            this.hasProtoType = true;
        }
        return new this.init(ele);
    },
    getId: function(id){
        return typeof id == 'string' ? document.getElementById(id) : id;
    },
    prevPage: function(){
        if(this.item == 0) {
            this.item = this.lengths;
        }
        this.item--;
        this.mainAnimate(this.item);
        this.curAnimate(this.item);
		var myThis=this;
		myThis.timer=window.setTimeout((function(){return function(){myThis.nextPage();}})(),2000);
    },
    nextPage: function(){
        this.item++;
        if(this.item == this.lengths){
            this.item = 0;
        }
        this.mainAnimate(this.item);
        this.curAnimate(this.item);
		var myThis=this;
		myThis.timer=window.setTimeout((function(){return function(){myThis.nextPage();}})(),2000);
    },
    bindEvent: function(ele){
        var myThis = this;
        var eleEvent = myThis.getId(ele.wrap);
        eleEvent.addEventListener('touchstart',function(e){
			window.clearTimeout(myThis.timer);
            myThis.initPage.x = e.changedTouches[0].pageX;
            myThis.initPage.y = e.changedTouches[0].pageY;
        });
        eleEvent.addEventListener('touchmove',function(e){
            myThis.endPage.x = e.changedTouches[0].pageX;
            myThis.endPage.y = e.changedTouches[0].pageY;
            var xcurPage = myThis.endPage.x - myThis.initPage.x-myThis.item*myThis.winWidth;
            if(myThis.endPage.x-myThis.initPage.x > 0){
                if(myThis.item==0) {
                    myThis.item = myThis.lengths - 1;
                    myThis.mainContent.style.webkitTransition = '0';
                    myThis.mainContent.style.webkitTransform = 'translate3d(-' + myThis.item * myThis.winWidth + 'px' + ',0,0)';
                }
            }else{
                if(myThis.item==myThis.lengths-1) {
                    myThis.item = 0;
                    myThis.mainContent.style.webkitTransition = '0';
                    myThis.mainContent.style.webkitTransform = 'translate3d(-' + myThis.item * myThis.winWidth + 'px' + ',0,0)';
                }
            }
            myThis.mainContent.style.webkitTransform = 'translate3d('+xcurPage+'px'+',0,0)';
        });
        eleEvent.addEventListener('touchend',function(e){
            if(Math.abs(myThis.endPage.x-myThis.initPage.x)>50){
                if(myThis.endPage.x-myThis.initPage.x > 0){
                    myThis.prevPage();
                }else{
                    myThis.nextPage();
                }
            }else{
                myThis.mainContent.style.webkitTransform = 'translate3d(-'+myThis.item*myThis.winWidth+'px'+',0,0)';
            }
        });
		myThis.timer=window.setTimeout((function(){return function(){myThis.nextPage();}})(),2000);
    },
    mainAnimate: function(setItem){
        var _this = this;
		if(_this.item==_this.lengths-1) {
			_this.item = 0;
			_this.mainContent.style.webkitTransition = '0';
			_this.mainContent.style.webkitTransform = 'translate3d(-' + _this.item * _this.winWidth + 'px' + ',0,0)';
		}
		//console.log(setItem);
        _this.mainContent.style.webkitTransition = '0.4s';
        _this.mainContent.style.webkitTransform = 'translate3d(-'+(setItem*_this.winWidth)+'px'+',0,0)';
		window.setTimeout(function(){_this.mainContent.style.webkitTransition = '0';
		_this.mainContent.style.webkitTransform = 'translate3d(-' + _this.item * _this.winWidth + 'px' + ',0,0)';},400);
    },
    curAnimate: function(getItem){
        for(var k=0; k<this.getItem.length; k++){
            this.getItem[k].className='';
        }
        getItem==this.lengths-1 ? this.getItem[0].className='cur' : this.getItem[getItem].className='cur';
		
    },
    init: function(ele){
        var _this = this;
        _this.item = 0;
        _this.mainContent = _this.getId(ele.mainContent);
        _this.slideCont = _this.mainContent.getElementsByTagName('div');
        _this.cloneDiv = _this.slideCont[0].cloneNode(true);
        _this.cloneDiv.className = ele.slideImg;
        _this.mainContent.appendChild(_this.cloneDiv);
        _this.winWidth = window.innerWidth;
        _this.lengths = _this.slideCont.length;
        _this.mainContent.style.width = _this.winWidth*_this.lengths+2+'px';
        for(var i=0; i<_this.lengths; i++){
            _this.slideCont[i].style.width = _this.winWidth+'px';
        }
        _this.getItem = _this.getId(ele.getId).getElementsByTagName('a');
        _this.initPage = {
            x: 0,
            y: 0
        };
        _this.endPage = {
            x: 0,
            y: 0
        };
        _this.bindEvent(ele);
    }
};
pageObj = {
    wrap: 'hotSlide',
    mainContent: 'mainContent',
    getId: 'get-item',
    slideImg: 'slide-img'
}
var hos=hotSlide.newClass(pageObj);

