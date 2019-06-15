<?php
$score = $_POST['score'];
	if ( !( $database = mysqli_connect( "localhost", "root", "galaxyh94" ) ) )
    die( "Could not connect to database </body></html>" );
	if ( !mysqli_select_db( $database , "game" ) )
		die( "Could not open game database </body></html>" );
	$query = "SELECT * FROM `ranking` ORDER BY `score` DESC";

	if ( !( $result = mysqli_query($database , $query ) ))
	{
		print( "<p>Could not execute query!</p>" );
		die( mysqli_error() . "</body></html>" );
	}
	mysqli_close( $database );
	$isScore = false;
	$totalData = 0;
	$AllScore = [];
	while ( $row = mysqli_fetch_row( $result ) )//每抓到一行resultr就
	{
		$totalData++;
		foreach ( $row as $value )//每抓到一個row的資料就
		{
			if($isScore)
			{
				$AllScore[$totalData-1] = $value;
				$isScore = false;
			}
			else
			{
				$isScore = true;
			}
		}
	}

	$rank = 0;
	for($i = 0; $i < $totalData; $i++)
	{
		if($AllScore[$i] < $score)
		{
			break;
		}
		$rank++;
	}
	
	$rankperstant = number_format(($totalData-$rank)/$totalData*100,1);
	
	print("<script>d3.select('#fillgauge3').on('valueChanged')(Math.floor($rankperstant));</script>");
	
?>