window.onload = function(){
	var blankY = "300px";
	var blankX = "300px";
	var pieces = document.getElementById("puzzlearea").getElementsByTagName("div");
	var flag = false;
	var shuff = document.getElementById("shufflebutton");

	var movable = function (position){
		if (up(blankX, blankY) == (position-1)) {
			return true;
		}else if(down(blankX, blankY) == (position-1)) {
			return true;
		}else if(right(blankX, blankY) == (position-1)) {
			return true;
		}else if(left(blankX, blankY) == (position-1)) {
			return true;
		}
	}

	var left = function (x, y){
		var tempx = parseInt(x);
		var tempy = parseInt(y);

		if (tempx > 0){
			for (var i = 0; i < pieces.length; i++) {
				if (parseInt(pieces[i].style.left) + 100 == tempx && parseInt(pieces[i].style.top) == tempy){
					return i;
				} 
			}
		}else {
			return -1;
		}
	}

	var right = function (x, y) {
		var tempx = parseInt(x);
		var tempy = parseInt(y);
		if (tempx < 300){
			for (var i =0; i<pieces.length; i++){
				if (parseInt(pieces[i].style.left) - 100 == tempx && parseInt(pieces[i].style.top) == tempy){
					return i;
				}
			}
		}else{
			return -1;
		} 
	}

	var up = function (x, y) {
		var tempx = parseInt(x);
		var tempy = parseInt(y);
		if (tempy > 0){
			for (var i=0; i<pieces.length; i++){
				if (parseInt(pieces[i].style.top) + 100 == tempy && parseInt(pieces[i].style.left) == tempx) {
					return i;
				}
			} 
		}else {
			return -1;
		}
	}

	var down = function (x, y)
	{
		var tempx = parseInt(x);
		var tempy = parseInt(y);
		if (tempy < 300){
			for (var i=0; i<pieces.length; i++){
				if (parseInt(pieces[i].style.top) - 100 == tempy && parseInt(pieces[i].style.left) == tempx){
					return i;
				}
			}
		}else{
			return -1;
		} 
	}

	function highlightMovable(){
		for (var i = pieces.length - 1; i >= 0; i--) {
			pieces[i].onmouseover = function(){
				if (movable(this.innerHTML)){
					this.className+=" movablepiece";
				}
			}
			pieces[i].onclick= function(){
				if (movable(parseInt(this.innerHTML))){
					move(this.innerHTML-1);
				}
			} 
			pieces[i].onmouseout = function(){
				this.className = "puzzlepiece";
			}
		}
	}


	//attach on click

	function markAsMoveable(){
		if (movable(parseInt(this.innerHTML))){
			move(this.innerHTML-1);
		}
	}

//	function removeMovable(){
//		if(!movable(parseInt(this.innerHTML))){
//			this.className="puzzlepiece";
//			this.removeAttribute("onclick");
//		}
//	}

	//move the piece 
	function move(position){
		var h = pieces[position].style.top;
		pieces[position].style.top = blankY;
		blankY = h;

		h = pieces[position].style.left;
		pieces[position].style.left = blankX;
		blankX = h;
		highlightMovable();
	}

	//WHERE IT ALL COMES TOGETHER

	//label all the pieces and give them a location
	for (var i = pieces.length - 1; i >= 0; i--) {
		pieces[i].className = "puzzlepiece";
		pieces[i].style.top = (parseInt(i/4)*100) + "px";
		pieces[i].style.left = ((i%4)*100)+"px";
		pieces[i].style.backgroundPosition = "-" + pieces[i].style.left+ " -"+pieces[i].style.top;
	}
	highlightMovable();
	shuff.onclick = function(event){
		event.preventDefault();
		for (var i = 0; i < 100; i++) {
			rand= Math.floor(Math.random()*15)
			move(rand);
		}

	}

	//highlight the first movable pieces.

	//set an event handle for the movable pieces
}

