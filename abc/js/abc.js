var abcGame = {

    matrix : {
        A: {x: 60, y: 104, onPlace: false},
        AI: {x: 179, y: 40, onPlace: false},
        B: {x: 272, y: 112, onPlace: false},
        C: {x: 394, y: 73, onPlace: false},
        CS: {x: 495, y: 73, onPlace: false},
        D: {x: 693, y: 88, onPlace: false},
        E: {x: 788, y: 57, onPlace: false},
        EI: {x: 822, y: 102, onPlace: false},
        F: {x: 60, y: 307, onPlace: false},
        G: {x: 171, y: 332, onPlace: false},
        GY: {x: 338, y: 309, onPlace: false},
        H: {x: 519, y: 278, onPlace: false},
        I: {x: 662, y: 307, onPlace: false},
        II: {x: 704, y: 276, onPlace: false},
        J: {x: 733, y: 334, onPlace: false},
        K: {x: 855, y: 294, onPlace: false}
    },
    letterElements: {},
    restartButton: {},
    deviceSettings: {},
    preSet: function() {
        //work with DOM

        var startButton = document.getElementById("start"),
            BGDiv = document.getElementById("playFieldBG"),
            allDiv = document.getElementById("all"),
            lettersArr = document.getElementsByClassName("letter"),
            startTextBlock = document.getElementById("startText"),

        deviceInfo = {
            "mobileDc": /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent),
            "screenHeight": screen.height,
            "screenWidth": screen.width,
            "ratio": window.devicePixelRatio || 1,
            "windowInnerWidth": window.innerWidth,
            "window.innerHeight": window.innerHeight,
            "is_touch_device": "ontouchstart" in document.documentElement
        },
        deviceVariants = {
            desktop: {
                "freeSpaceVert": 550,
                "bgImage": "#f4f4f4 url(images/bgSnow.png) no-repeat",
                "allDivPosition": "relative",
                "letMaxHeight": "22%",
                "letMaxWidth": "22%",
                "dmatrix": {
                    A: {x: 60, y: 104, onPlace: false},
                    AI: {x: 179, y: 40, onPlace: false},
                    B: {x: 272, y: 112, onPlace: false},
                    C: {x: 394, y: 73, onPlace: false},
                    CS: {x: 495, y: 73, onPlace: false},
                    D: {x: 693, y: 88, onPlace: false},
                    E: {x: 788, y: 57, onPlace: false},
                    EI: {x: 822, y: 102, onPlace: false},
                    F: {x: 60, y: 307, onPlace: false},
                    G: {x: 171, y: 332, onPlace: false},
                    GY: {x: 338, y: 309, onPlace: false},
                    H: {x: 519, y: 278, onPlace: false},
                    I: {x: 662, y: 307, onPlace: false},
                    II: {x: 704, y: 276, onPlace: false},
                    J: {x: 733, y: 334, onPlace: false},
                    K: {x: 855, y: 294, onPlace: false}
                },
                "restartButtonTop": "464px",
                "startButtonTop": "150px",
                "startTextBlock": "500px"
            },
            mob:  {
                "freeSpaceVert": 310,
                "bgImage": "#f4f4f4 url(images/bgSnowMob.gif) no-repeat",
                "allDivPosition": "fixed",
                "letMaxHeight": "18%",
                "letMaxWidth": "18%",
                "dmatrix": {
                     A: {x: 84, y: 81, onPlace: false},
                     AI: {x: 182, y: 27, onPlace: false},
                     B: {x: 272, y: 65, onPlace: false},
                     C: {x: 395, y: 57, onPlace: false},
                     CS: {x: 497, y: 37, onPlace: false},
                     D: {x: 693, y: 41, onPlace: false},
                     E: {x: 788, y: 10, onPlace: false},
                     EI: {x: 822, y: 55, onPlace: false},
                     F: {x: 93, y: 229, onPlace: false},
                     G: {x: 176, y: 243, onPlace: false},
                     GY: {x: 354, y: 222, onPlace: false},
                     H: {x: 513, y: 205, onPlace: false},
                     I: {x: 669, y: 240, onPlace: false},
                     II: {x: 711, y: 239, onPlace: false},
                     J: {x: 754, y: 240, onPlace: false},
                     K: {x: 847, y: 218, onPlace: false}
                },
                "restartButtonTop": "80px",
                "startButtonTop": "30px",
                "startTextBlock": "300px"
            }
        };
        for (let letterName in abcGame.matrix){
            if (abcGame.matrix.hasOwnProperty(letterName)){
                abcGame.letterElements[letterName] =
                document.getElementById(letterName);
            }
        }
        if ( deviceInfo.mobileDc || deviceInfo.is_touch_device ) {
            abcGame.deviceSettings = deviceVariants.mob;
        }else{
            abcGame.deviceSettings = deviceVariants.desktop;
        }
        abcGame.restartButton = document.getElementById("reStart");

        // device Settings
        allDiv.style.position = abcGame.deviceSettings.allDivPosition ;
        BGDiv.style.background = abcGame.deviceSettings.bgImage;
        for (let il=0; il < lettersArr.length; il++) {
            lettersArr[il].style.maxHeight = abcGame.deviceSettings.letMaxHeight;
            lettersArr[il].style.maxWidth = abcGame.deviceSettings.letMaxWidth;
        }
        //"dmatrix"
        abcGame.matrix = abcGame.deviceSettings.dmatrix;
        //"restartButtonTop"

        abcGame.restartButton.style.top =
        abcGame.deviceSettings.restartButtonTop;
        if (let startButton && (startButton != undefined)) {
            //"startButtonTop"
            startButton.style.top = abcGame.deviceSettings.startButtonTop;
            startTextBlock.style.top = abcGame.deviceSettings.startTextBlock;
            if ( deviceInfo.screenHeight < 450 ){
            startTextBlock.style.zIndex = "99";
            startTextBlock.style.top = "230px"
            }
        }
        //end device settings

        // drag drop for letters
        for ( let letterImgName1 in abcGame.matrix) {
            if (abcGame.matrix.hasOwnProperty(letterImgName1)){
                Drag.init(abcGame.letterElements[letterImgName1]);
            }
        }

        if (startButton && (startButton != undefined)) {
            startButton.addEventListener("click", function() {
                abcGame.abcStart(startButton,startText);
            }, false)
        }

        abcGame.restartButton.addEventListener("click", function() {
            abcGame.abcReStart(abcGame.restartButton);
        }, false);

        document.addEventListener("keypress", function(e){
            if ( e.keyCode == 13 ) {
                abcGame.abcStart(startButton,startText);
            };
        });
        function checkAllOnPlace(){
            for (let h in abcGame.matrix) {
                if (abcGame.matrix.hasOwnProperty(h)){
                    if ( abcGame.matrix[h].onPlace === false ){
                        return false;
                    };
                }
            }
            return true;
        }
        //Create Check Lisyeners
        (function () {
          for (let k in abcGame.matrix) {
           if (abcGame.matrix.hasOwnProperty(k)){
            (function(key) {
              abcGame.letterElements[key].onDragEnd = function(){
                var letter = position.getCurrentPosition(key);
                var cond = (letter.x < (abcGame.matrix[key].x + 150)) &&
                ((abcGame.matrix[key].x - 150) < letter.x) &&
                (letter.y < (abcGame.matrix[key].y + 150)) &&
                ((abcGame.matrix[key].y - 150) < letter.y );
                if ( cond ) {
                  abcGame.letterElements[key].style.top =
                  String(abcGame.matrix[key].y)+"px";
                  abcGame.letterElements[key].style.left =
                  String(abcGame.matrix[key].x)+"px";
                  abcGame.matrix[key].onPlace = true;
                  if (checkAllOnPlace() ) {
                    abcGame.abcVictory();
                   }
                }
              };
            })(k);
            (function(key){
              abcGame.letterElements[key].addEventListener("touchend",  function(){
                var letter = position.getCurrentPosition(key);
                var cond = (letter.x < (abcGame.matrix[key].x + 150)) &&
                ((abcGame.matrix[key].x - 150) < letter.x) &&
                (letter.y < (abcGame.matrix[key].y + 150)) &&
                ((abcGame.matrix[key].y - 150) < letter.y );
                if ( cond ) {
                  abcGame.letterElements[key].style.top =
                  String(abcGame.matrix[key].y)+"px";
                  abcGame.letterElements[key].style.left =
                  String(abcGame.matrix[key].x)+"px";
                  abcGame.matrix[key].onPlace = true;
                  if (checkAllOnPlace() ){
                      abcGame.abcVictory();
                  }
                }
              });
            })(k);
          }
         }
        })()
    },

    move:  function(){
        return{
            chaos : function(){
                //presettingtrktoriaArr = [
                //    {"name": "A", "x": 90, "y": 91, position: {}, trjCalcul: {diagonalDelta: 3, arrX: [], arrY: []}},
                //    {"name": "AI", "x": 208, "y": 67, position: {}, trjCalcul: {diagonalDelta: 3, arrX: [], arrY: []}},
                //    {"name": "B", "x": 294, "y" :91, position:{}, trjCalcul: {diagonalDelta: 3, arrX: [], arrY: []}}
                //],
                var fromPosition,
                    data ={},
                    mLen = abcGame.matrix.length,
                    o = {},
                    trajectArr = [];
                for (let k in abcGame.matrix) {
                    o.name = k;
                    o.x = abcGame.matrix[k].x;
                    o.y = abcGame.matrix[k].y;
                    o.position = {};
                    o.trjCalcul = {diagonalDelta: 3, arrX: [], arrY: []};
                    trajectArr.push(o);
                    o = {};
                }
                // set jump trajectory
                for (let countTrj=0; countTrj < trajectArr.length; countTrj++ ) {
                    fromPosition =
                    position.getCurrentPosition(trajectArr[countTrj].name);

                    //add to position obj
                    trajectArr[countTrj].position.fromX = fromPosition.x;
                    trajectArr[countTrj].position.fromY = fromPosition.y;

                    //add random destination to trjCalcul obj
                    trajectArr[countTrj].trjCalcul.toX =
                    Math.floor( Math.random() * 780 );
                    trajectArr[countTrj].trjCalcul.toY =
                    Math.floor(Math.random() * abcGame.deviceSettings.freeSpaceVert);

                    trajectArr[countTrj].trjCalcul.diagonal =
                    Math.sqrt(Math.pow((trajectArr[countTrj].position.fromX -
                    trajectArr[countTrj].trjCalcul.toX ), 2) +
                    Math.pow((trajectArr[countTrj].position.fromY -
                    trajectArr[countTrj].trjCalcul.toY ), 2) );
                    if (trajectArr[countTrj].trjCalcul.diagonal === 0) {
                        return
                    }
                    trajectArr[countTrj].trjCalcul.NumOfSt =
                    Math.floor( trajectArr[countTrj].trjCalcul.diagonal / 3);
                    trajectArr[countTrj].trjCalcul.horizDelta =
                    ( trajectArr[countTrj].trjCalcul.toX -
                    trajectArr[countTrj].position.fromX )/trajectArr[countTrj].trjCalcul.NumOfSt;
                    trajectArr[countTrj].trjCalcul.vertDelta =
                    ( trajectArr[countTrj].trjCalcul.toY -
                    trajectArr[countTrj].position.fromY )/trajectArr[countTrj].trjCalcul.NumOfSt;

                    //whay diformation
                    trajectArr[countTrj].trjCalcul.arrX[0] = 0;
                    for ( let j=1; j < trajectArr[countTrj].trjCalcul.NumOfSt; j++) {
                      trajectArr[countTrj].trjCalcul.arrX[j] =
                      trajectArr[countTrj].trjCalcul.horizDelta +
                      trajectArr[countTrj].trjCalcul.arrX[j-1];
                    }
                    //trjCalcul.arrY = [0,3,5,7,8,10,8,7,4,2,0];
                    for (let j=0; j < Math.floor(trajectArr[countTrj].trjCalcul.NumOfSt/2)+1; j++){
                      trajectArr[countTrj].trjCalcul.arrY[j] =
                      trajectArr[countTrj].trjCalcul.arrX[j] *
                      trajectArr[countTrj].trjCalcul.arrX[j] * 0.1;
                    }
                    for (let j=0; j < Math.floor(trajectArr[countTrj].trjCalcul.NumOfSt/2)+1; j++){
                      trajectArr[countTrj].trjCalcul.arrY[trajectArr[countTrj].trjCalcul.NumOfSt - j] =
                      trajectArr[countTrj].trjCalcul.arrY[j];
                    }
                };
                var maxNumOfSteps = trajectArr[0].trjCalcul.NumOfSt;
                for( let countTrj=0; countTrj < trajectArr.length; countTrj++ ) {
                    if ( maxNumOfSteps < trajectArr[countTrj].trjCalcul.NumOfSt) {
                        maxNumOfSteps = trajectArr[countTrj].trjCalcul.NumOfSt
                    }
                }

                counterSt=0;
                launchX = function() {
                  if( counterSt < maxNumOfSteps ){
                    for( let counterLetter = 0;counterLetter < trajectArr.length; counterLetter++ ){
                      if( counterSt <= trajectArr[counterLetter].trjCalcul.NumOfSt ){
                        data.dataLeft =
                        String(Math.floor( trajectArr[counterLetter].position.fromX +
                        counterSt*trajectArr[counterLetter].trjCalcul.horizDelta ) );
                        data.dataTop =
                        String(Math.floor( trajectArr[counterLetter].position.fromY +
                        trajectArr[counterLetter].trjCalcul.vertDelta*counterSt -
                        trajectArr[counterLetter].trjCalcul.arrY[counterSt] ) );
                        position.setPosition(trajectArr[counterLetter].name,
                        data.dataLeft,
                        data.dataTop );

                      }
                    }
                    setTimeout( "launchX()", 50);
                    counterSt =  counterSt + 1;
                  }
                }
                launchX();
            },

            order: function() {
                for ( let k in abcGame.matrix){
                    if (abcGame.matrix.hasOwnProperty(k)) {
                        position.setPosition(k,abcGame.matrix[k].x,
                        abcGame.matrix[k].y );
                    }
                }
            },
            wowJump : function(){
                var deltaWow = 40,
                matrixLen = Object.keys(abcGame.matrix).length,
                arrSteps = [],
                // [
                //    {"name": "A", "x": 90, "y": 91, "onPlace": false},
                //    {"name": "AI", "x": 208, "y": 67, "onPlace": false},
                //    {"name": "B", "x": 294, "y": 91, "onPlace": false}
                //],
                n= 0, o = {};

                for (let k in abcGame.matrix) {
                    o.name = k;
                    o.x = abcGame.matrix[k].x;
                    o.y = abcGame.matrix[k].y;
                    arrSteps.push(o);
                    o = {};
                }
                arr = [deltaWow , 2*deltaWow, deltaWow];
                for (let i = 0; i < arrSteps.length; i++) {
                    arr.push(0);
                    arr.unshift(0);
                }

                step = function(k) {
                    stepNum = "step"+k;
                    for (let i = 0; i < arrSteps.length; i++) {
                      arrSteps[i][stepNum] = arr[16-k+2+i]
                    }
                    for (let i = 0; i < arrSteps.length; i++) {
                      position.setPosition(arrSteps[i].name,
                      arrSteps[i].x,
                      arrSteps[i].y - arrSteps[i][stepNum]);
                    }
                    if ( k < arrSteps.length +2) {
                      setTimeout( function(){ step(n); } ,200);
                      n = n+1;
                    }
                };
                step(0);
            }
        }
    },
    // --- //move ---

    //buttons functions
    abcStart: function (startButton,startText) {
        startButton.remove();
        startText.remove();
        abcGame.move.chaos();
    },
    abcVictory: function() {
        abcGame.move.wowJump();
        abcGame.restartButton.style.display = "inline";
    },
    abcReStart: function() {
        abcGame.restartButton.style.display = "none";
        abcGame.preSet();
        abcGame.move.chaos();
    },
    on: function() {
        abcGame.preSet();
        abcGame.move = abcGame.move();
        abcGame.move.order();
    }
}

// end abcGame
window.onload = function () {
    abcGame.on();
}