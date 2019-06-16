<?php
$name = $_POST['name'];
$score = $_POST['score'];
$score -= 457;
      if($score%331 == 0 || $score == -475)
	  {
		$score/=331;
		if ( !( $database = mysqli_connect( "localhost", "root", "galaxyh94" ) ) )
		die( "Could not connect to database </body></html>" );
		if ( !mysqli_select_db( $database , "game" ) )
			die( "Could not open game database </body></html>" );
		$query = "SELECT * FROM `ranking` ORDER BY `score` DESC";
		$sql = "INSERT INTO `ranking` (`name`,`score`) VALUES ('".$name."',".$score.")";//value 的 $name 不一定是數字 要加 '' 使其成為字串
		if($name != "")
		{
			if(!mysqli_query($database , $sql )){
				print( "<p>Could not insert data!</p>" );
				die( mysqli_error() . "</body></html>" );
			}
		}
		if ( !( $result = mysqli_query($database , $query ) ))
		{
			print( "<p>Could not execute query!</p>" );
			die( mysqli_error() . "</body></html>" );
		}
		mysqli_close( $database );
		  
		$isName = true;
		$RankNmae = [];
		$RankScore = [];
		$DataCount = 0;
		while ( $row = mysqli_fetch_row( $result ) )//每抓到一行resultr就
		{
			foreach ( $row as $value )//每抓到一個row的資料就
			{
				if($isName)
				{
					$isName = false;
					$RankNmae[$DataCount] = $value;
				}
				else
				{
					$isName = true;
					$RankScore[$DataCount] = $value;
				}
			}
			$DataCount++;
			if($DataCount === 11)
			{
			   break;
			}
		}
		print("<div style='color:white;font-weight:bold;font-size:50px'>Leaderboard</div><table style='margin-left:auto; margin-right:auto;'>");
		for($i = 0; $i < $DataCount-1; $i++)
		{
			print( "<tr>" );
			$num = $i+1;

			if($RankNmae[$i] == $name && $RankScore[$i] == $score)
			{
				print("<td width='10%' style='color:#FFFF00'>$num</td>");
				print( "<td width='20%'  style='color:#FFFF00'>$RankNmae[$i]</td>" );
				print( "<td width='10%'  style='color:#FFFF00'>$RankScore[$i]</td>" );
			}
			else
			{
				print("<td width='10%'>$num</td>");
				print( "<td width='20%'>$RankNmae[$i]</td>" );	
				print( "<td width='10%'>$RankScore[$i]</td>" );
			}		
			print( "</tr>" );
		}
		print("</table>");
	  }
      else if($score%331 != 0 && $score != -457)
	  {
		  $score+=457;
		  print( "<p>...So you think cheating is fun?</p>" );
		  print( "$score" );
	  }
		
		
	


?>
