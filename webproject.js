function loadgame() {
	WallOP();
    var canvas = document.getElementById("mycanvas");
    document.getElementById("button").setAttribute("style", "display:none");
	document.getElementById("ground").setAttribute("style", "display:inherit;position:absolute;top:610px;left:210px;");
	document.getElementById("Tower").setAttribute("style", "display:inherit;position:absolute;top:160px;left:148px;");
	document.getElementById("wall").setAttribute("style", "display:inherit;position:absolute;top:173px;left:1237px;");
	document.getElementById("Helthbar").setAttribute("style", "display:inherit;position:absolute;top:-2px;left:150px;");
	document.getElementById("Menu").setAttribute("style", "display:none;");
	document.getElementById("Title").setAttribute("style", "display:none;");
	var anime;
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var boomx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var boomy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var boomcounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var boomRadius = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var fallingspeed = 2;
    var dy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var manHeight = 90;
    var manWidth = 75;
    var manX = canvas.width - manWidth - 600;
    var manY = canvas.height - manHeight - 100;
    var rightPressed = false;
    var leftPressed = false;
    var barrierPressed = false;
    var barrierActive = false;
	var finalsmash = false;
	var shoot = false;
    var barrierTime = -300;
    var score = 0;
    var lives = 1000;
    var time = 0;
    var level = 1;
	var TowerButton = 0;
	var prepareFinalSmash = 0;
	var GAMEOVER = false;
    for (var k = 0; k < 10; k++) {
        x[k] = Math.random() * canvas.width;
        dy[k] = 3 + Math.random() * 2;
    }
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    function keyDownHandler(e) {
        if (e.keyCode == 68)
            rightPressed = true;
        else if (e.keyCode == 65)
            leftPressed = true;
        else if (e.keyCode == 75)
            barrierPressed = true;
		else if (e.keyCode == 74)
            finalsmash = true;
		else if(e.keyCode == 76)
			shoot = true;
    }
    function keyUpHandler(e) {
        if (e.keyCode == 68)
            rightPressed = false;
        else if (e.keyCode == 65)
            leftPressed = false;
        else if (e.keyCode == 75)
            barrierPressed = false;
		else if (e.keyCode == 74)
            finalsmash = false;
		else if(e.keyCode == 76)
			shoot = false;
    }
	var missile = document.createElement("img");
    missile.src = "images/missile.svg";
    function drawBall(x, y) {
        ctx.beginPath();
		ctx.drawImage(missile,x,y);
        /*ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();*/
        ctx.closePath();
    }
	var i = 0;////////////////要改
	var repeat = false;
	var solwdown = 0;
    function drawMan() {
        /*ctx.beginPath();
        ctx.arc(manX + manWidth / 2, manY + 20, 20, 0, Math.PI * 2);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.moveTo(manX + manWidth / 2, manY + 40);
        ctx.lineTo(manX + manWidth / 2 + 25, manY + 60);
        ctx.moveTo(manX + manWidth / 2, manY + 40);
        ctx.lineTo(manX + manWidth / 2 - 25, manY + 60);
        ctx.moveTo(manX + manWidth / 2, manY + 40);
        ctx.lineTo(manX + manWidth / 2, manY + 65);
        ctx.lineTo(manX + manWidth / 2 - 25, manY + 90);
        ctx.moveTo(manX + manWidth / 2, manY + 65);
        ctx.lineTo(manX + manWidth / 2 + 25, manY + 90);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();*/
		
			var people = document.createElement("img");
			people.src = "images/people1.png";
			if(rightPressed != true /*|| leftPressed == true*/)
			{
				if(manX <= 97 || prepareFinalSmash == 1)
				{
					people.src = "images/empty.svg";
				}
				else
				{
					people.src = "images/people0"+i+".png";
				}
			
				if(solwdown==0)
				{
					i++
				}
				
				solwdown++
				if(solwdown == 3)
				{
					solwdown = 0;
				}
				
				if(i == 5)
				{
					i = 0;
				}
				else if(i == 0 || i == 1 || i == 2)
				{
					manY = canvas.height - manHeight - 100 + i;
				}
				else if(i == 3 )
				{
					manY = canvas.height - manHeight - 100 + 4;
				}
				else if(i == 4 )
				{
					manY = canvas.height - manHeight - 100 + 2;
				}
			
			}
			ctx.drawImage(people,manX,manY);
		
		
		var Shield = document.createElement("img");
		Shield.src = "images/Shield.svg";
        ctx.beginPath();
        if (barrierActive) {
			ctx.drawImage(Shield,manX-58,manY-18);
            /*ctx.arc(manX + manWidth / 2, manY + manHeight / 2, manHeight / 2 + 10, Math.PI * 0.5, Math.PI * 1.5);
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#00FFFF";
            ctx.stroke();
            ctx.lineWidth = 1;*/
        }
		if(manX < canvas.width - manWidth - 80)
		{
			manX+=3;
		}
        ctx.closePath();
    }
    function drawScore() {
        ctx.font = "25px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(score/331, 8, 18);
    }
    function drawLives() {
        /*ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + lives, canvas.width - 200, 20);*/
    }
	var red = 255;
	var green = 125;
	var blue = 0;
    function drawEnergyBar() {
        ctx.beginPath();
        ctx.rect(0, 610, 50, barrierTime/2);
		if(barrierTime > -800)
		{
			ctx.fillStyle = "#00FFFF";
		}
		else if(barrierTime <= -800)
		{
			ctx.fillStyle = "rgb("+ red +","+ green +","+ blue +")";
			red+=2;
			green+=2;
			blue+=2;
			if(red>255)
			{
				red=0;
			}
			if(green>255)
			{
				green=0;
			}
			if(blue>225)
			{
				blue=0;
			}
		}
        ctx.fill();
        ctx.closePath();
    }
	function drawHealthBar(anime) {
        ctx.beginPath();
        ctx.rect(185, 0, lives*0.85, 22);
		if(lives >= 700)
		{
			ctx.fillStyle = "#33FF33";
		}
		else if(lives < 700 && lives >= 300)
		{
			ctx.fillStyle = "#FFFF33";
		}
		else if(lives < 300 && lives > 100)
		{
			ctx.fillStyle = "#FF3333";
		}
		else
		{
			ctx.fillStyle = "#880000";
		}

		//ctx.fillStyle = "rgb("+ red +","+ green +","+ blue +")";
        ctx.fill();
        ctx.closePath();
    }
    function levelUp() {
        if (time < 800)
            time++;
        else if (level < 10 && time >= 800) {
			fallingspeed+=0.5;
            level++;
            time = 0;
        }
    }
    function activeBarrier() {
        if (barrierPressed && manX > 101) {
			barrierTime+=4;
			if(barrierTime < 0)
			{
				barrierActive = true;
			}
			else
			{
				barrierActive = false;
			}            
        }
		else
		{
			barrierActive = false;
		}   
		
    }
	function drawEnegryTower() {//畫能量塔按鈕動作和按按鈕小人
		if(manX <= 98 && solwdown==0)
		{
			document.getElementById("ButtonMan").setAttribute("style", "display:inherit;position:absolute;top:502px;left:257px;");
			document.getElementById("ButtonMan").setAttribute("src", "images/people1"+i+".png");
			if(i%2 == 0)
			{
				document.getElementById("Tower").setAttribute("src", "images/Tower.svg");
			}
			else
			{
				document.getElementById("Tower").setAttribute("src", "images/Tower2.svg");
			}
		}
		else if(solwdown==0)
		{
			document.getElementById("Tower").setAttribute("src", "images/Tower.svg");
		}
		if(manX > 98)
		{
			document.getElementById("ButtonMan").setAttribute("style", "display:none;position:absolute;top:-13px;left:0px;");
		}
    }
	function GameOver(){
		score += 457;
		WallClose();
		getScoreRecording(score);
		document.getElementById("Menu").setAttribute("style", "display:block;");
	    document.getElementById("Title").setAttribute("style", "display:block;");
		GAMEOVER  =true;
		cancelAnimationFrame(anime);
        alert("GAME OVER");
		var name = '';
		name = window.prompt("Please enter your name.(if you enter an empty name,it woun't be saved.)","Name");
		if(name != undefined && name != "")
			ranking(name,score);/**/
		$("#scoreText").html((score-457)/331);
		//document.location.href = "projext.html";
	}
	//var boomRadius = 20;
	function missileboom(x1,y1,boomRadius)
	{
		ctx.beginPath();
		ctx.arc(x1+18, y1+20, boomRadius, 0, Math.PI * 2-0.001 ,false);
		ctx.fillStyle = "#FFBB00";
		ctx.fill();
		ctx.closePath();
	}
	/*function drawBoom(x1,y1,boomRadius)
	{
		ctx.beginPath();
		ctx.arc(x1, y1, boomRadius, 0, Math.PI * 2-0.001 ,false);
		ctx.fillStyle = "#FFBB00";
		ctx.fill();
		ctx.closePath();
	}*/
	var Fman = 0;
	var Fbar = 0;
	var Fmanback = false;
	var Fbarback = false;
	function drawFinalSmash()
	{
		document.getElementById("ground").setAttribute("src", "groundF.png");
		Fbarback = false;
		Fmanback = false;
		Fman = 0;
		Fbar = 1;
		document.getElementById("ButtonMan").setAttribute("style", "position:absolute;top:-13px;left:0px;display:none");
		document.getElementById("FinalMan").setAttribute("style", "display:inherit;position:absolute;top:475px;left:"+ (manX+90) +"px;");
		for(var i = 0 ; i < 13 ;i++)
		{
			setTimeout(function(){drawFman();},i*40);
		}
		document.getElementById("FinalBar").setAttribute("style", "display:inherit;position:absolute;top:"+ -340 +"px;left:"+ (manX+220) +"px;");
		for(var i = 0 ; i < 64 ;i++)
		{
			setTimeout(function(){drawFbar();},600+i*40);
		}
		for(var i = 0 ; i < 12 ;i++)
		{
			setTimeout(function(){drawFman();},3160+i*40);
		}
		setTimeout(function(){FinalSmashEnd();},5000);
		prepareFinalSmash = 0;
	}
	function drawFman()
	{
		if(!Fmanback){
			Fman++;
			if(Fman == 13){
				Fmanback = true;
			}
		}
		else if(Fmanback){
			Fman--;
		}
		document.getElementById("FinalMan").setAttribute("src", "images/FinalMan/Op"+Fman+".png");
	}
	function drawFbar()
	{
		document.getElementById("FinalBar").setAttribute("height", "900");
		document.getElementById("FinalBar").setAttribute("width", Fbar*15 );
		document.getElementById("FinalBar").setAttribute("style", "display:inherit;position:absolute;top:"+ -340 +"px;left:"+ (manX+220-Fbar*7.5) +"px;");
		document.getElementById("FinalBar").setAttribute("src", "images/FinalBar/"+Fbar+".svg");
		if(!Fbarback){
			Fbar++;
			if(Fbar == 32){
				Fbarback = true;
			}
		}
		else if(Fbarback){
			Fbar--;
			if(Fbar==1)
			{
				document.getElementById("FinalBar").setAttribute("style", "display:none;");
			}
		}
	}
	function FinalSmashEnd()
	{
		document.getElementById("ground").setAttribute("src", "ground.gif");
		document.getElementById("FinalMan").setAttribute("style", "display:none;");
	}
	function Continue()
	{
		anime = requestAnimationFrame(draw);
	}
	
	var monster = [document.createElement("img"),document.createElement("img")];
	monster[0].src = "images/monster0.png";
	monster[1].src = "images/monster1.png";
	var monsterx = 300;
	var monstery = -240;
	var monsterPower = [document.createElement("img"),document.createElement("img"),document.createElement("img"),document.createElement("img"),document.createElement("img"),document.createElement("img"),document.createElement("img")];
	for(var k = 0 ; k < 7; k++)
	{
		monsterPower[k].src = "images/monsterPow"+k+".png";
	}
	var monsterwait = [0,0];
	var monDie = 1;
	var monsterappear = 0;
	var monsterlives = true;
	
	function drawmonster()
	{
		ctx.beginPath();
		if(monsterx<1000 && monsterlives)
		{
			ctx.drawImage(monster[1],monsterx,monstery-((monDie-1)*130),105,130*monDie);
		}
		else
		{
			ctx.drawImage(monster[0],monsterx,monstery-((monDie-1)*130),105,130*monDie);
		}
        ctx.closePath();
		
		
		if(bulletX-9 < monsterx && bulletX+9 > monsterx && monstery >= 470)
		{
			monsterlives = false;
		}
		
		if(monsterlives)
		{
			if(monsterx<1000)
			{
				if(monstery >= 470)
				{
					monsterx += 5;//被履帶往右送
				}
				else
				{
					monstery += 3;//掉下來
				}
			}
			else
			{	
				monsterwait[0]++;
				if(monsterwait[0] <= 250)
				{
					ctx.beginPath();
					if(monsterwait[0] <= 14)
					{
						ctx.drawImage(monsterPower[0],-350,490);
					}
					else if(monsterwait[0] > 14 && monsterwait[0] < 35)
					{
						ctx.drawImage(monsterPower[parseInt((monsterwait[0]-14)/3)],-350,490);
					}
					else if(monsterwait[0] > 216)
					{
						var n = 6-parseInt((monsterwait[0]-216)/3);
						if(n > 0)
						{
							ctx.drawImage(monsterPower[n],-350,490);
						}
					}
					else
					{
						if(!barrierActive)
						{
							lives -= 2;	
							//if (lives <= 0) AAA
							//{
							//	setTimeout(function(){ GameOver(); }, 1000);
							//}
						}
						ctx.drawImage(monsterPower[6-parseInt((Math.random()*1)/0.5)],-350,490);
					}
					ctx.closePath();
				}
				else if(monsterwait[0] > 250)
				{
					monsterwait[1]++;
					monDie+=0.1;
					monstery -= 35;
					if(monsterwait[1] == 15)
					{
						monsterx = 300;
						monstery = -240;
						monsterwait[0] = 0;
						monsterwait[1] = 0;
						monDie = 1;
						monsterappear = 3200 + (5-level)*500;
					}
				}
			}	
		}
		else
		{
			monsterwait[1]++;
			if(monsterwait[1] < 7)
			{
				monstery -= 20;
			}
			else if(monsterwait[1] > 14 && monsterwait[1] < 34)
			{
				monstery += 20;
			}
			else if(monsterwait[1] == 34)
			{
				monsterx = 300;
				monstery = -240;
				monsterwait[0] = 0;
				monsterwait[1] = 0;
				monDie = 1;
				monsterappear = 3200 + (5-level)*500;
				monsterlives = true;
			}
		}
			
			
		
		
	}
	
	var bullet = document.createElement("img");
	bullet.src = "images/bullet.png";
	var bulletX = 0;
	var bulletY = 0;
	var bulletBoomX = 0;
	var bulletBoomY = 0;
	var bulletShooting = 0;
	var bulletboomRadius = 0;
	function drawbullet()
	{
		if(shoot && bulletShooting == 0 && barrierTime < -100 && manX > 101 && bulletboomRadius == 0)//發射
		{
			bulletX = manX-25;
			bulletY = manY;
			bulletShooting = 100;
			barrierTime += 100;
		}
		if(bulletShooting != 0)
		{
			ctx.beginPath();
			ctx.drawImage(bullet,bulletX,bulletY);
			ctx.closePath();
			bulletX-=8;
			bulletShooting--;
		}
		if(bulletX-9 < monsterx && bulletX+9 > monsterx && monstery >= 450)//如果打中怪獸
		{
			bulletShooting = 0;
			bulletboomRadius = 20;
			bulletBoomX = bulletX;
			bulletBoomY = bulletY;
		}
		if(bulletboomRadius != 0)//bulletboomRadius != 0 代表爆炸中
		{
			bulletboom(bulletBoomX+18,bulletBoomY+20,bulletboomRadius)
			bulletboomRadius += 10;
			if(bulletboomRadius >= 80)
			{
				bulletboomRadius = 0;
				bulletX = 0;
				bulletY = 0;
			}
		}
	}
	
	function bulletboom(x1,y1,bulletboomRadius)
	{
		ctx.beginPath();
		ctx.arc(x1+30, y1+40, bulletboomRadius, 0, Math.PI * 2-0.001 ,false);
		ctx.fillStyle = "#00FFFF";
		ctx.fill();
		ctx.closePath();
	}
	
    function draw() {
		//console.log(lives);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "black";
        ctx.fillRect(1150, 0, canvas.width, canvas.height);
		if(lives > 1000){
			lives = 1000;
		}
		else if(lives <= 0){
			lives=0;
			setTimeout(function(){ GameOver(); }, 10);//只需要極短時間(0.001秒) 讓最後一帪畫完
		}
        for (var i = 0; i < level; i++)
            drawBall(x[i], y[i]);
		
		if(monsterappear == 0)
		{
			drawmonster(x[0], y[0]);
		}
		else
		{
			monsterappear--;
		}
        drawMan();
        drawScore();
        drawEnergyBar();
		drawHealthBar();
        //drawLives();
        levelUp();
        activeBarrier();
		drawEnegryTower();
		drawbullet();
		
		if(manX > 1010)
		{
			document.getElementById("wall").setAttribute("src", "images/wall2.svg");
			lives-=1;
			//if (lives <= 0) 
			//{AAA
			//   setTimeout(function(){ GameOver(); }, 1000);
            //}
		}
		else
		{
			document.getElementById("wall").setAttribute("src", "images/wall.svg");
		}
		
        for (var j = 0; j < level; j++) {
			if(boomRadius[j] != 0)
			{
				missileboom(boomx[j],boomy[j],boomRadius[j])
				boomRadius[j]+=15;
				if(boomRadius[j]>=80)
				{
					boomRadius[j]=0;
				}
			}
            y[j] += dy[j];
            if (y[j] + dy[j] - ballRadius > manY - 34 && y[j] /*+ dy[j]*/ + ballRadius < manY + manHeight + 10) {
                if (x[j] + ballRadius > manX - 20 && x[j] < manX + manWidth - 10) {
                    if (!barrierActive)
						lives-=100;
					boomRadius[j] = 20;
                    missileboom(x[j],y[j],boomRadius[j]);
					boomx[j] = x[j];
					boomy[j] = y[j];
					x[j] = 100 + Math.random() * (900);
					dy[j] = 4 + Math.random() * fallingspeed;
					y[j] = 0;
                    //if (lives <= 0) AAA
					//{
					//	setTimeout(function(){ GameOver(); }, 1000);
                    //}
                }
            }
            if (y[j] + dy[j] > canvas.height - ballRadius) {
                x[j] = 100 + Math.random() * (900);
                dy[j] = 4 + Math.random() * fallingspeed;
                y[j] = 0;
            }
        }
		
        if (manX < 101 && barrierTime > -800)//按按鈕
            barrierTime--;
        if (rightPressed && manX < canvas.width - manWidth - 80) {//如果沒碰到刺 往右
            manX += 4;
        }
        else if (leftPressed && manX > 95) {//如果沒碰到按鈕 往左
            manX -= 7;
        }
		barrierTime-=0.2;
		if(barrierTime < -800)
		{
			barrierTime = -800;
		}
		else if(barrierTime > 1)
		{
			barrierTime = 1;
		}
		
		score += 331;
		console.log(score);
		if(!GAMEOVER){
			setTimeout(Continue,prepareFinalSmash*5000);
		}
		
		if(prepareFinalSmash == 1)
		{
			for (var j = 0; j < level; j++) {
				if(x[j] > manX-220 && x[j] < manX+300){
					    lives+=80;
						boomRadius[j] = 20;
						setTimeout(function(){missileboom(x[j],y[j],boomRadius[j]);},2000);
						boomx[j] = x[j];
						boomy[j] = y[j];
						x[j] = 100 + Math.random() * (900);
						dy[j] = 3 + Math.random() * fallingspeed;
						y[j] = 0;
				}
			}
			drawFinalSmash();
		}	
		
		if(finalsmash && barrierTime <= -800)
		{
			barrierTime=0;
			prepareFinalSmash = 1;
		}
    }
	draw();
}

var WallLX = 0;
var WallRX = 540;
function WallOP(){
	if(WallLX > -675)
	{
		document.getElementById("WallL").setAttribute("style", "display:inherit;position:absolute;top:20px;left:"+WallLX+"px;");
		document.getElementById("WallR").setAttribute("style", "display:inherit;position:absolute;top:20px;left:"+WallRX+"px;");
		WallLX-=10;
		WallRX+=10;
		setTimeout(WallOP,20);
	}
}

function WallClose(){
	if(WallLX <= 0)
	{
		document.getElementById("WallL").setAttribute("style", "display:inherit;position:absolute;top:20px;left:"+WallLX+"px;");
		document.getElementById("WallR").setAttribute("style", "display:inherit;position:absolute;top:20px;left:"+WallRX+"px;");
		WallLX+=10;
		WallRX-=10;
		setTimeout(WallClose(),20);
	}
	else
	{
		document.getElementById("button").setAttribute("style", "display:block; border:5px #FFFFFF solid; z-index:10; position:absolute;top:330px;left:680px; padding: 10px;");
		$("html,body").animate({scrollTop:$("#scoreTitle").offset().top}, 2000);
		/*d3.select("#fillgauge5").call(d3.liquidfillgauge, 20, {
			circleThickness: 0.15,
			circleColor: "#FFFFFF",
			textColor: "#FFFFFF",
			waveTextColor: "#000000",
			waveColor: "#00FFFF",
			textVertPosition: 0.8,
			waveAnimateTime: 1000,
			waveHeight: 0.05,
			waveAnimate: true,
			waveRise: false,
			waveOffset: 0.25,
			textSize: 0.75,
			waveCount: 3
		});*/
	}
}

function ranking(name,score){//
	console.log(score);
	$.ajax({
	url:'ranking.php',
	data:{
		name:name,
		score:score, // 可以不要這麼缺德嗎....
	},
	type:'POST',
	datatype:'html',
		success: function( output ) {
			$("#rank").html(output);
	    },
		error : function(){
		    alert( "Request failed." );
		}
	});
}

function getScoreRecording(score){
	//console.log(score);
	$.ajax({
	url:'getScoreRecording.php',
	data:{
		score:score,
	},
	type:'POST',
	datatype:'script',
		success: function( output ) {
			$("#LiquidGaugeScrept").html(output);
	    },
		error : function(){
		    alert( "Can't get score recording!." );
		}
	});
}
