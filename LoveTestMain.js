$(document).ready(function(){
    //建立currentQuiz 儲存目前作答到第幾題
    var currentQuiz = null;
    //當按下按鈕後
    $("#startButton").click(function(){
        //第一次作答
        if(currentQuiz == null)
        {
            //設定目前做達到第0題
            currentQuiz = 0;
            //顯示題目
            
            $("#question").text(questions[0].question);
            //text（）方法設置或返回所選元素的文本內容。
            //當此方法用於返回內容時，它將返回所有匹配元素的文本內容（將刪除HTML標記）。
            //當此方法用於設置內容時，它會覆蓋所有匹配元素的內容。
            
            //每次將先前的選項清空 .text()會覆蓋 .append()不會 直接在尾端加入
            $("#options").empty();
            for(var x = 0; x < questions[0].answers.length; x++)
            {
                $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[0].answers[x][0]+"</label><br><br>");
            }
            //把按鈕改成next
            $("#startButton").attr("value","Next");
        }
        else//之後的作答
        {
            //尋訪每個選項是否有被選取(得知使用者選了什麼)
            //$.each($(":radio"),function(i,val){}) = $(":radio").each(function(i,val){})
            //每一個type=radio 都做一次function(){}
            //總共有n個radio選項 便會出現一個 radio[n]一一對應每個radio選項
            //i會從零開始 每次回傳radio[i]到val裡 再i++ 直到radio[i]沒東西了
            $.each($(":radio"),function(i,val){
                console.log(i);
                if(val.checked)//找到使用者選的選項後
                {
                    console.log(val);
                    //判斷是否是最終選項
                    //isNaN 是不是"不是數字"
                    if(isNaN(questions[currentQuiz].answers[i][1]))
                    {
                        //finalResult 紀錄是哪個最終結果
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //顯示結果標題
                        console.log(finalResult);
                        $("#question").text(finalAnswers[finalResult][0]);
                        //將選項區域清空
                        $("#options").empty();
                        //顯示結果內容
                        $("#options").append(finalAnswers[finalResult][1])
                        //將currentQuiz初始化 用來重新開始
                        currentQuiz = null;
                        //將按鈕改成重新開始
                        $("#startButton").attr("value","重新開始");
                        
                    }
                    else//如果不是最終選項
                    {
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;
                        $("#question").text(questions[currentQuiz].question);
                        
                        $("#options").empty();
                        
                        for(var x = 0; x < questions[currentQuiz].answers.length; x++)
                        {
                            $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[currentQuiz].answers[x][0]+"</label><br><br>");
                        }
                        
                    }
                    //完成後即可跳出迴圈
                    return false;  
                }
            });
            //指定下個題目 answers[][0]是答案選項 answers[][1]是會答此答案後下一題題號(從1開始)
        }
    });
})