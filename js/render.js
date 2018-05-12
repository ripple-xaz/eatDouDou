let gameover = document.querySelector('#game-over')
let score = 0;
let preventClickflag = true;



let checkWin = (moves,options) => {
  let msg = ''

  if (moves === 'over') { //胜利
    

    let getStrByBum = gameTimer.getStrByBum

    let state = gameTimer.state

    gameTimer.stop()

    // console.log(startTimer)

    webGetNonce()
    .then((data) => {

        config.nonce = parseInt(data.nonce) + 1;
        config.func = "welcomeHero"
        let costTime = parseInt(state.mm + '' + state.ss + '' + state.ms)
        config.args = "[" + score +","+ costTime + "]"


        console.log('-----------------查询costtime----------------')
        console.log(costTime)
        console.log('-----------------查询costtime----------------')

        webTransaction()
        .then((data) => {

            cmpScore = getStrByBum(costTime)

            msg = ` 
                  <div style="text-align:center;margin-bottom:30px;">
                    <img src="You-Win.png" style="width:50vmin;,margin-bottom:20px;"><br />
                    <span id="cost-time" class="cost-time" style="font-size:16px;color:#fff" >score：${score}  &nbsp&nbsp&nbsp  time：${cmpScore}</span>
                  </div>
                  <div class=" over" ><span class="new-game"> Play Again!</span> </div>
                  <div class=" over" ><span class="rank">Rank</span></div>
                `
            gameover.innerHTML = msg

            $('#game-over').attr('class','over-game')

            console.log(data)
        })
    })

        
      
     
  } else if (moves === 'login') {
      $('#game-over').attr('class','login-game')
      msg = `<div id="login">

                <img  style="margin-bottom:40px;width:187px;" src="logo.png">
                <div id="kaishi">
                  Unlock the wallet and start the game.
                </div>
                <div id="wallet">
                  <span id="file-text">
                    Select Wallet
                  </span>
                  <input type="file" id="keyfile"  class="keyfile" style="position:absolute;opacity: 0;top:0;left:0;width: 100%;height: 100%;" >
                </div>
                <div id="jiami">
                  Wallet is encrypted. Please enter password.
                </div>
                <div id="password" style="background-color:#0C2544;">
                  <input type="password"  style="height: 45px;width:100%;font-size: 18px;background-color:transparent;color: white;border: 0 none;padding-left:14px;" >
                </div>
                <div id="lock">
                  Login
                </div>
            </div>`

          gameover.innerHTML = msg

          preventClickflag = true

          $('#game-over').attr('class','login-game')

  } else if (moves === 'begin') {
    

    msg = `<div id="begin">
                  <span class="new-game">
                    New Game
                  </span>
                  <span  class="rank">
                    Rank
                  </span>
                  <span class="howtoplay">
                    How To Play
                  </span>
              </div>`

          gameover.innerHTML = msg
          $('#game-over').attr('class','begin-game')
          preventClickflag = true
  } 
  else if (moves === 'rank') {
  
    let getStrByBum = gameTimer.getStrByBum
    let state = gameTimer.state


    webGetNonce()
      .then((data) => {
        console.log('-----------------查询nonce----------------')
        console.log(data)
        console.log('-----------------查询nonce----------------')
        if (data.balance === '0') {
          dialog($('#dialog-cnt'), 'insufficient balance')
          var rank = $('.rank')
          $('.loader').remove()
          return
        }
        config.nonce = parseInt(data.nonce) + 1;
        config.func = "getTopN"
        config.args = "[" + 10 + "]"
        console.log('-----------------查询config----------------')
        console.log(config)
        console.log('-----------------查询config----------------')
        webCall()
          .then((data) => {

            console.log('-----------------查询rank----------------')
            console.log(data)
            console.log('-----------------查询rank----------------')

            var lists = JSON.parse(data.result)
            var list = '';
            var totalIndex = 0;


            lists.forEach((v,i) =>{
              renderList(i,v)
              .then((data) =>{
                lists[i]['template'] = data.li
                 console.log(data.curIndex)
                        
                if(totalIndex === 10 || totalIndex === lists.length){

                      console.log(lists)

                      let lis = '';

                      lists.forEach((v,i) =>{
                          lis += v['template']

                      }) 

                      renderMyBest(lis)
                }
              })
            })

            function renderList(curIndex,list){
                var heroAddress = list.hero
                return new Promise (function (resolve,reject){

                    config.contractAddress = nickNameAddress //查询昵称
                    config.func = 'searchValue'
                    config.args = "[\""+heroAddress+"\"]"
                    config.nonce = config.nonce + 1;

                    webCall(config)
                    .then((data) =>{
                          console.log()
                          function getName(name){
                              name = JSON.parse(name)
                              var reg = /"|'/g
                              if(name.indexOf('TypeError')<0 && name ){
                                return  name
                              }else{
                                return heroAddress
                              }
                          }
                          let index;
                          let style;
                          switch(curIndex){
                            case 0 :
                              style = "color:#EF4868;"
                              index = '<span style="background:url(crown-1.png) 50% center/22px no-repeat"></span>'
                              break;
                            case 1 :
                              style = "color:#FFA820;"
                              index = '<span style="background:url(crown-2.png) 50% center/20px no-repeat"></span>'
                              break;
                            case 2:
                              style = "color:#37AFFA;"
                              index = '<span style="background:url(crown-3.png) 50% center/18px no-repeat"></span>'
                              break;
                            default:
                              style = "line-height:20px;"
                              index = '<span>'+(curIndex+1)+'</span>'
                              break;
                          }

                          totalIndex ++

                          var li = `<li class="list-wrap"  style="${style}">
                                      ${index}
                                      <span>${getName(data.result)}</span>
                                      <span>${list.score}</span>
                                      <span>${getStrByBum(list.time)}</span>
                                   </li> `
                          resolve({li,curIndex}) 
                    })      
                })
            }

            function renderMyBest(list){
                  config.contractAddress = contractAddress
                  config.nonce = parseInt(config.nonce) + 1;
                  config.func = "getHero"
                  config.args = "[]"
                  webCall(config)
                    .then((data) => {
                      console.log('-----------------查询自己最高分----------------')
                      console.log(data)
                      console.log('-----------------查询自己最高分----------------')
                      let myLastScore = 0; //最后一次
                      let myscore = 0;
                      let mytime = 0;

                      let curScore = score //当前
                      let curTime = state.mm+':'+state.ss+':'+state.ms

                      if (data.result === 'null' || data.result === '[]' || !data.result) { //如果最后一次返回的结果为空，没有玩过则以当前分数最高分
                          myscore = score
                          mytime = curTime
                      }
                      else  { //之前玩过，并且有分数

                        let result = JSON.parse(data.result);
                        if (curScore === 0) { //如果当前分数为0，则取之前的分数

                           myscore = result.score

                           mytime = getStrByBum(result.time)

                        } else if (curScore < result.score) {

                          myscore = result.score
                          mytime = getStrByBum(result.time)

                        } else if (curScore >= result.score) {

                           myscore = curScore

                           mytime = curTime
                        }
                      }
                      msg = `<div id="rank">
                                <div style="font-size:28px;color:#00BFDD;text-align:center;margin-bottom:7px;">TOP 10</div>
                                <div class="list-wrap">
                                    <span>#</span>
                                    <span>
                                        <a href="http://naspp.xyz" target="_blank" style="display:inline-block;" >
                                            address <img src="explain.svg" style="vertical-align:middle;width:15px;" >
                                        </a>
                                    </span>
                                    <span>score</span>
                                    <span>time</span>
                                </div>
                                <ul style="padding-left:0;">
                                  ${list}
                                </ul>
                            </div>
                            <div style="color:#EF4868;font-size:22px;margin:20px 0;text-align:center;">
                             Your Best &nbsp  &nbsp   ${myscore}    &nbsp time ${mytime} 
                            </div>
                            <div style="font-size:14px;text-align:center;margin-bottom:10px;">An average of 30s is required when uploading historic records to Nebulas</div>
                            <div  class="back-to-begin">
                              <span class="back-to-begin" style="">Exit</span>
                            </div>
                            
                            `

                      gameover.innerHTML = msg
                      $('#game-over').attr('class','rank-game')


                      preventClickflag = true
                      $('.loading').remove

                    })
            }
        })
    })
  } else if (moves === 'howtoplay') {
   
    msg = `<div id="howtoplay">
                <div class="how-text" style="font-size: 18px;text-align:left;">


                    <div style="color: #FFC300;"  class="how-tit">Log in</div>
                    <div>
                        <p>1. Click “New Game”</p>
                        <p>2. Log in with your wallet address and password, click “Start Game”</p>
                    </div>

                    <div style=" color: #F46E6E;" class="how-tit">How to play?</div>
                    <div>
                        <p>1. Pac-Man, our hero, munches his way through a maze containing various dots, known as Pac-Dots</p>
                        <p>2. There are four multi-colored ghosts roam the maze, trying to kill Pac-Man. If any of the ghosts hit Pac-Man, he loses a life, Pac-Man has 3 lives in each round, when all lives have been lost, the game is over.</p>
                        <p>3. In the maze, there are four "Power Pellets", which when Pac-Man eats one, the ghosts turn gray and move slowly. </p>
                        <p>4. The goal of the game is to accumulate points by eating all the Pac-Dots in the maze and achieve the highest score 360</p>
                    </div>

                    <div style=" color: #F46E6E;" class="how-tit">Scoreboard</div>
                    <div>
                       <p>1.Top 10 players on the scoreboard are ranked by score</p>
                        <p>2.You can try again to refresh your score and achieve higher-ranking</p>
                        <p>3.All the related data will be upload into Nebulas, tamper-resistant</p>
                    </div>
                </div>
                <div  class="back-to-begin" style="background-color:#FFC300;margin-top:30px;">
                  <span class="back-to-begin" style="color: #fff;background-color:#FFC300;">back</span>
                </div>
              </div>`

    gameover.innerHTML = msg
    preventClickflag = true
     $('#game-over').attr('class','how-game')
  }
  else if(moves === 'none'){
    msg = ``
    gameover.innerHTML = msg
  }
}

