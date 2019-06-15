$(document).ready(function(){
    var inputDay = prompt("請輸日期","2019.1.1");//彈出輸入視窗
    startDate = new Date(inputDay);
    
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th><tr>");//append（）方法在所選元素的末尾插入指定的內容。
    //注意用Jquary getID 時要加#("# ID ")
    
    var topicCount = topic.length;//陣列.lenght 回傳陣列長度 會因為.lenght前放的東西不同而有不同功能
    console.log(topicCount);
    var secondUnit = 1000;
    var minuteUnit = secondUnit * 60;
    var hourUnit = minuteUnit * 60;
    var dayUnit = hourUnit * 24;
    
    for(var x = 0; x < topicCount; x++)
    {   
        var wordcolor = "black";
        if(topic[x] == "國定假日")
        {
            wordcolor = "red";
        }
        else
        {
            wordcolor = "black"
        }
        console.log(wordcolor);
       $("#courseTable").append("<tr><td>"+(x+1)+"<td>"+(new Date(startDate.getTime()+x*7*dayUnit)).toLocaleDateString().slice(5)+"</td><td> <font color="+wordcolor+">"+topic[x]+"</font></td></tr>");
        //Date物件.getTime() 返回1970年1月1日午夜到指定日期之間的毫秒數。
        //Date物件.toLocaleDateString() 返回Date對象的日期（而不是時間）轉換為可讀字符串。
        //string物件.slice(start,end) 擷取第start個字 到 第end個字 只寫一個數字 擷取start以後的所有字
        
    }
})