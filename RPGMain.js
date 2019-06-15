var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy;

//$(document)意思是說，獲取整個網頁文件物件（類似的於window.document）
$(document).ready(function()
{
    //設定遊戲地形
    //0可走 1障礙 2終點 3敵人
    mapArray = [0,1,1,0,0,0,3,1,2];
    //getContext() 方法返回一个用于在画布上绘图的环境。
    //Canvas物件.getContext(contextID)
    //参数 contextID 指定了您想要在画布上绘制的类型。
    //目前唯一的合法值是 "2d"，它指定了二维绘图，并且导致这个方法返回一个环境对象，该对象导出一个二维绘图 API。
    //提示：在未来，如果 <canvas> 标签扩展到支持 3D 绘图，getContext() 方法可能允许
    ctx = $("#myCanvas")[0].getContext("2d");
    
    //擺上主角 - 使用預設位置
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMainX = 0;
    currentImgMainY = 0;
    //加載對象時發生onload事件。
    //onload通常在<body>元素中用於在網頁完全加載所有內容（包括圖像，腳本文件，CSS文件等）後執行腳本。
    //object.onload = function(){myScript};
    imgMain.onload = function()
    {
        //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);  
    };
    
    //擺上障礙物與敵人
    imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";
    imgMountain.onload = function(){
        imgEnemy.onload = function(){
			//var x in object x回傳object的每個keyname
            for(var x in mapArray)
            {
                if(mapArray[x]==1)
                {
                    ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200);        
                }
				else if(mapArray[x]==3)
				{
					ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200);
				}
            }
        };
    };
    
    
});

$(document).keydown(function(event)
{
    var targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
	//targetImgMainX, targeImgMainY,  主角即將要到的座標
	//targetBlock, 主角即將要到的格子編號
	//cutImagePositionX 依據主角朝什麼方向決定圖片
	event.preventDefault();
	//避免瀏覽器出現其他行為 放大,換頁 ....
	
	//event.which 回傳哪個按鍵被按下
	switch(event.which)
	{
		case 37:
			targetImgMainX = currentImgMainX-200;
			targetImgMainY = currentImgMainY;
			cutImagePositionX = 175;
			break;
		case 38:
			targetImgMainX = currentImgMainX;
			targetImgMainY = currentImgMainY-200;
			cutImagePositionX = 355;
			break;
		case 39:
			targetImgMainX = currentImgMainX+200;
			targetImgMainY = currentImgMainY;
			cutImagePositionX = 540;
			break;
		case 40:
			targetImgMainX = currentImgMainX;
			targetImgMainY = currentImgMainY+200;
			cutImagePositionX = 0;
			break;
		default://其他按鍵被按下
			return;
	}
	console.log(targetImgMainY);
	if(targetImgMainX<=400 && targetImgMainX >= 0 && targetImgMainY <= 400 && targetImgMainY >= 0)//沒有超出邊界
	{
		targetBlock = targetImgMainX/200+targetImgMainY/200*3;
	}
	else
	{
		targetBlock = -1;//-1代表異常
	}
	console.log(targetBlock);
	ctx.clearRect(currentImgMainX, currentImgMainY,200,200);//清除主角原來的位置
	if(targetBlock == -1 || mapArray[targetBlock] == 1 || mapArray[targetBlock] == 3)
	{
		
	}
	else
	{
		$("#talkBox").text("");
		currentImgMainX = targetImgMainX;
		currentImgMainY = targetImgMainY;
	}
	
	ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);
	
	switch(mapArray[targetBlock])
	{
		case undefined:
			$("#talkBox").text("邊界");
			break;
		case 1:
			$("#talkBox").text("有山");
			break;
		case 2:
			$("#talkBox").text("抵達終點");
			break;
		case 3:
			$("#talkBox").text("嗨");
			break;
	}
	
});