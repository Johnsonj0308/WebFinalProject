window.onload=function()
{
    //document.write("Hello JavaScript!");
};//加載對象時發生onload事件。onload通常在<body>元素中用於在網頁完全加載所有內容（包括圖像，腳本文件，CSS文件等）後執行腳本。object.onload = function(){myScript};
$(document).ready(function(){
    $("input").click(function(){
        var numberOfListItem = $("#foodUl li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        //Math.floor(數字) 把 數字 無條件捨去至整數
		//$("li").eq(number).text()  第number個li的內文
         $("#FoodNameH1").text($("#foodUl li").eq(randomChildNumber).text());//eq = equal
        $("img").attr("src","images/"+randomChildNumber+".jpg");
    })
});