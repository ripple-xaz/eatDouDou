let gameover = document.querySelector('#game-over')
let score = 0;
let preventClickflag = true;
let gameisbegin = false;



let checkWin = (moves, options) => {
  let msg = ''

  if (moves === 'over') { //胜利


    let getStrByBum = gameTimer.getStrByBum

    let state = gameTimer.state

    gameTimer.stop()

    // console.log(startTimer)

        let costTime = parseInt(gameTimer.checkTime(state.mm) + '' + gameTimer.checkTime(state.ss) + '' + gameTimer.checkTime(state.ms))



        console.log('-----------------查询costtime----------------')
        console.log(costTime)
        console.log('-----------------查询costtime----------------')
        newTransaction(contractAddress,"welcomeHero","[" + score + "," + costTime + "]",uploadSocre)

        function uploadSocre(resp){
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

              $('#game-over').attr('class', 'over-game')

        }
          
      



  } else if (moves === 'login') {
    $('#game-over').attr('class', 'login-game')
    // <div onclick="start()"></div>
    //           <div id="kaishi">
    //             Unlock the wallet and start the game.
    //           </div>
    //           <div id="wallet">
    //             <span id="file-text">
    //               Select Wallet
    //             </span>
    //             <input type="file" id="keyfile"  class="keyfile" style="position:absolute;opacity: 0;top:0;left:0;width: 100%;height: 100%;" >
    //           </div>
    //           <div id="jiami">
    //             Wallet is encrypted. Please enter password.
    //           </div>
    //           <div id="password" style="background-color:#0C2544;">
    //             <input type="password"  style="height: 45px;width:100%;font-size: 18px; box-sizing: border-box;background-color:transparent;color: white;border: 0 none;padding-left:14px;" >
    //           </div>
    msg = `<div id="login">

                <img  style="margin-bottom:40px;width:187px;" src="logo.png">

                <div id="lock">
                  Play
                </div>
            </div>`

    gameover.innerHTML = msg

    preventClickflag = true

    $('#game-over').attr('class', 'login-game')

  } else if (moves === 'begin') {
    let img = '<img  style="margin-bottom:40px;width:187px;" src="logo.png">';
    console.log(gameisbegin)
    if (gameisbegin) {

    } else {
      startGame()
      // img = ''
    }



    msg = `<div id="begin">
                  ${img}
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
    $('#game-over').attr('class', 'begin-game')
    preventClickflag = true
  } else if (moves === 'rank') {

    let getStrByBum = gameTimer.getStrByBum
    let state = gameTimer.state

    let func = "getTopN"
    let args = "[" + 10 + "]"
    onSimulateCallClick(contractAddress,func, args, callback1);
    // webGetNonce()
    //   .then((data) => {
    //     console.log('-----------------查询nonce----------------')
    //     console.log(data)
    //     console.log('-----------------查询nonce----------------')
    //     if (data.balance === '0') {
    //       dialog($('#dialog-cnt'), 'insufficient balance')
    //       var rank = $('.rank')
    //       $('.loader').remove()
    //       return
    //     }
    //     config.nonce = parseInt(data.nonce) + 1;
    //     
    //     console.log('-----------------查询config----------------')
    //     console.log(config)
    //     console.log('-----------------查询config----------------')
    //     webCall()
    //       .then((data) => {

    //         console.log('-----------------查询rank----------------')
    //         console.log(data)
    //         console.log('-----------------查询rank----------------')
    function callback1(resp) {
      

      var lists= JSON.parse(resp.result);

      var list = '';
      var totalIndex = 0;

      console.log('-------------lists----------------')
      console.log(lists)

      lists.forEach((v, i) => {
        renderList(i, v)
          .then((data) => {
            lists[i]['template'] = data.li
            // console.log(data.curIndex)

            if (totalIndex === 10 || totalIndex === lists.length) {

              console.log(lists)

              let lis = '';

              lists.forEach((v, i) => {
                lis += v['template']

              })

              renderMyBest(lis)
            }
          })
      })

      function renderList(curIndex, list) {

        var heroAddress = list.hero
        return new Promise(function(resolve, reject) {
          let func = "searchValue"
          let args = "[\"" + heroAddress + "\"]"

          console.log('--------------nickNameAddress---------------------')
          console.log(nickNameAddress)

          onSimulateCallClick(nickNameAddress,func, args, callback2);

          function callback2(resp) {
            console.log(resp)
               var data = resp;
            function getName(name) {
              name = JSON.parse(name)
              var reg = /"|'/g
              if (name.indexOf('TypeError') < 0 && name) {
                return name
              } else {
                return heroAddress
              }
            }
            let index;
            let style;
            switch (curIndex) {
              case 0:
                style = "color:#EF4868;"
                index = '<span style="background:url(crown-1.png) 50% center/22px no-repeat"></span>'
                break;
              case 1:
                style = "color:#FFA820;"
                index = '<span style="background:url(crown-2.png) 50% center/20px no-repeat"></span>'
                break;
              case 2:
                style = "color:#37AFFA;"
                index = '<span style="background:url(crown-3.png) 50% center/18px no-repeat"></span>'
                break;
              default:
                style = "line-height:20px;"
                index = '<span>' + (curIndex + 1) + '</span>'
                break;
            }

            totalIndex++

            var borderList;
            if (heroAddress === config.userAddress) {
              borderList = 'my-list'
              console.log(true)
            } else {
              borderList = ''
            }

            console.log(borderList)

            var li = `<li class="list-wrap ${borderList}"    style="${style}">
                                                          ${index}
                                                          <span>${getName(data.result)}</span>
                                                          <span>${list.score}</span>
                                                          <span>${getStrByBum(list.time)}</span>
                                                       </li> `
            resolve({
              li,
              curIndex
            })
          }



        })
      }




      function renderMyBest(list) {
         onSimulateCallClick(contractAddress,"getHero", "[]", callback3);
        function callback3(resp){
            data = JSON.parse(resp.result)
            console.log('-----------------查询自己最高分----------------')
            console.log(data)
            console.log('-----------------查询自己最高分----------------')
            let myLastScore = 0; //最后一次
            let myscore = 0;
            let mytime = 0;

            let curScore = score //当前
            let curTime = gameTimer.checkTime(state.mm) + ':' + gameTimer.checkTime(state.ss) + ':' + gameTimer.checkTime(state.ms)

            if (data.result === 'null' || data.result === '[]' || !data.result) { //如果最后一次返回的结果为空，没有玩过则以当前分数最高分
              myscore = score
              mytime = curTime
            } else { //之前玩过，并且有分数

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
                                                <div class="list-wrap" style="border-bottom:1px solid rgba(0,0,0,0.5);padding-bottom:3px;margi-bottom:5px;">
                                                    <span>#</span>
                                                    <span>
                                                        address / nickname
                                                        <a href="http://naspp.xyz" target="_blank" style="display:inline-block;margin-left:10px;," >
                                                            <img src="explain.svg" style="vertical-align:middle;width:15px;" >
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
                                              <span class="back-to-begin" style="">Back</span>
                                            </div>
                                            
                                            `

            gameover.innerHTML = msg
            $('#game-over').attr('class', 'rank-game')


            preventClickflag = true
            $('.loading').remove

        }
      }
    }


    //     })
    // })
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
                        <p>4. The goal of the game is to accumulate points by eating all the Pac-Dots in the maze and achieve the highest score </p>
                    </div>

                    <div style=" color: #F46E6E;" class="how-tit">Scoreboard</div>
                    <div>
                       <p>1.Top 10 players on the scoreboard are ranked by score</p>
                        <p>2.You can try again to refresh your score and achieve higher-ranking</p>
                        <p>3.All the related data will be upload into Nebulas, tamper-resistant</p>
                    </div>
                </div>
                <div  class="back-to-begin" style="background-color:#FFC300;margin-top:30px;">
                  <span class="back-to-begin" style="color: #fff;background-color:#FFC300;">Back</span>
                </div>
              </div>`

    gameover.innerHTML = msg
    preventClickflag = true
    $('#game-over').attr('class', 'how-game')
  } else if (moves === 'none') {
    msg = ``
    $('#game-over').attr('class', 'gaming-game')
    gameover.innerHTML = msg
  }
}