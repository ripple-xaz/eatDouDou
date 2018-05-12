let gameTimer = null;


class CountTimer{
	constructor(callback) {
	  this.timer = null
	  this.callback = callback
	  this.state = {
	  	ms:0, //毫秒
	  	ss:0, //秒
	  	mm:0  //分
	  }
	}

	count(){
	  let state = this.state;
	  state.ms++;
	  if(state.ms==100){
	      state.ms=0;
	      ++state.ss;
	      if(state.ss==60){
	          state.ss=0;
	          ++state.mm;
	        if(state.mm==60){
	            state.mm=0;
	        }
	      }
	  }
	  this.render()
	}

	begin(){
		this.state = {
		  	ms:0, //毫秒
		  	ss:0, //秒
		  	mm:0  //分
		 }
		this.timer = setInterval(() =>{
			this.count()
		},10)
	}

	stop(){
		clearInterval(this.timer)
	}

	checkTime(i){
		if (i<10) {
		      i="0" + i;
		  }
		return i;
	}

	getStrByBum(str){ //将链上返回的时间用字符串显示
	    var str = str.toString()
	    switch (str.length) {
	      case 6 :
	        return str.slice(0,2)+':'+str.slice(2,4)+':'+str.slice(4,6);
	        break
	      case 5 :
	        return '0'+str.slice(0,1)+':'+str.slice(1,3)+':'+str.slice(3,5);
	        break
	      case 4 :
	        return '00'+':'+str.slice(0,2)+':'+str.slice(2,4)
	        break
	      case 3 :
	        return '00'+':'+'0'+str.slice(0,1)+':'+str.slice(1,3)
	        break
	      case 2:
	        return '00'+':'+'00'+':'+str.slice(0,2)
	        break
	      case 1:
	        return '00'+':'+'00'+':'+'00'
	        break
	     }
	}

	getNumByStr(num){
		let state = this.state
		return parseInt(state.mm+''+state.ss+''+state.ms)
	}


	render(){
	  var state = this.state
	  // console.log('-------------begin-----------')
	  let str=this.checkTime(state.mm)+":"+this.checkTime(state.ss)+":"+this.checkTime(state.ms)
	  document.getElementById("cost-time").innerHTML=str;
	  this.callback && this.callback(str)
	  // console.log(str)
	}
}
