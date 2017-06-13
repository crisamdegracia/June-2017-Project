<!--
FUNCTIONs.php 
takes care of all the input and send it to the mySql update,delete and add users.

april 8 , 2017

-->






<?php

session_start();

$link = mysqli_connect('localhost','cl39-twitter-3iy','Ecg7e2wX-','cl39-twitter-3iy');

if(mysqli_connect_errno()){

    print_r(mysqli_connect_error());
    exit();
}

if($_GET['function'] === "logout"){

    session_unset(); // unsets all of our variable sessions;
}



function time_since($since) {
    $chunks = array(
        array(60 * 60 * 24 * 365 , 'year'),
        array(60 * 60 * 24 * 30 , 'month'),
        array(60 * 60 * 24 * 7, 'week'),
        array(60 * 60 * 24 , 'day'),
        array(60 * 60 , 'hour'),
        array(60 , 'min'),
        array(1 , 'sec')
    );

    for ($i = 0, $j = count($chunks); $i < $j; $i++) {
        $seconds = $chunks[$i][0];
        $name = $chunks[$i][1];
        if (($count = floor($since / $seconds)) != 0) {
            break;
        }
    }

    $print = ($count == 1) ? '1 '.$name : "$count {$name}s";
    return $print;
}

function displayTweets($type){

    global $link; // we set the $link to global to read it here inside the function

    if ($type === 'public'){

        $whereClause = ""; 

    } else if( $type == 'isFollowing'){
        /*We check isFollowing for the id's of the user of our users that we are following
        then contruct a query string base on those*/

        $query = "SELECT * FROM isFollowing WHERE follower=".mysqli_real_escape_string($link,$_SESSION['id'])." LIMIT 1 ";

        $result = mysqli_query($link,$query);

        $whereClause = "";

        
        while($row = mysqli_fetch_assoc($result)){

            if($whereClause == ''){

                $whereClause = "WHERE";
            }
            else {
                $whereClause .= " OR";
            }

            $whereClause.= " userid = ".$_SESSION['id'];  /*$row['userid']*/; //$_SESSIO['id']


        }



    } else if ($type == 'yourtweets'){
        $whereClause = "WHERE userid ='".mysqli_real_escape_string($link,$_SESSION['id'])."'";


    }  else if ($type == 'search'){

        echo '<p> Results Search for "'.mysqli_real_escape_string($link,$_GET['q']).'" </p>';

        $whereClause = "WHERE tweet LIKE '%".mysqli_real_escape_string($link,$_GET['q'])."%'";
    
    }
    // shows the result of the person u have searched and then displays the person followed you.
    else if (is_numeric($type)){
        
       $userQuery = "SELECT * FROM users WHERE id = ".mysqli_real_escape_string($link, $type)." LIMIT 1";
            $userQueryResult = mysqli_query($link, $userQuery);
            $user = mysqli_fetch_assoc($userQueryResult);
        
        echo "<h2>".mysqli_real_escape_string($link, $user['email'])."'s Tweets </h2>";
      
        $whereClause = "WHERE userid = '".mysqli_real_escape_string($link,$type)."'";  
                


    } 

    $query = "SELECT * FROM tweets ".$whereClause." ORDER BY `datetime` DESC LIMIT 10";

    $result = mysqli_query($link, $query);

    if(mysqli_num_rows($result) == 0 ){
        echo 'thers no tweets';
    }
    else {


        while ($row = mysqli_fetch_assoc($result)){

            $userQuery = "SELECT * FROM users WHERE id = ".mysqli_real_escape_string($link, $row['userid'])." LIMIT 1";
            $userQueryResult = mysqli_query($link, $userQuery);
            $user = mysqli_fetch_assoc($userQueryResult);


            // display the email user and the time ago !IMPORTANT AND COOL SAM!
            
            // if u search the user it will show the email that links to the email user..
            
            echo '<div class="tweet"><p><a href="?page=publicprofile&userid='.$user["id"].'">'.$user['email']."</a><span class='time'>  ".time_since(time() - strtotime($row['datetime'])).'  ago </span></p>'; 

            
            
            //displays the tweets
            echo "<p>".$row['tweet']."</p>";

            //following button link
            //checks if putangina!

            echo "<p> <a class='toggleFollow' data-userid='".$row['userid']."'>";

            $isFollowingQuery = "SELECT * FROM isFollowing WHERE follower=".mysqli_real_escape_string($link,$_SESSION['id'])." AND isFollowing = ". mysqli_real_escape_string($link,$row['userid'])."  LIMIT 1 ";

            $isFollowingResult = mysqli_query($link,$isFollowingQuery);

            if( mysqli_num_rows( $isFollowingResult) > 0){ 

                echo "Unfollow";

            } else {

                echo "Follow";

            }
            echo "</a> </p></div>";
        }

    }
}

function displaySearch(){

    echo "<form class='form-inline'>
  <div class='form-group'>

  <input type='hidden' name='page' value='search'> 
  <input type='text' class='form-control' name='q' id='search' placeholder='Search'>
  <button class='btn btn-primary ml-1'>Search Tweets</button></div></form>";

}


function displayTweetBox(){

    if ($_SESSION['id'] > 0){

        echo "
        <div class='alert alert-success' id='tweetSuccess'> Your Tweet was posted successfully.</div>
        <div class='alert alert-danger' id='tweetFailed'> Your Tweet was failed to post.</div>
        <form> 
        <textarea class='form-control' id='tweetContent'></textarea>
        <button class='btn btn-primary mt-2' id='postTweetButton' type='submit'>Post Tweet</button>
        </form>";

    }



}
 


function displayUsers(){
    
    global $link; 
        
    $query = "SELECT * FROM users  LIMIT 10";

    $result = mysqli_query($link, $query);
    
    while($row = mysqli_fetch_assoc($result)){
        
        echo "<p><a href='?page=publicprofile&userid=".$row['id']."'>".$row['email']."</a></p>";
    }    
    
    
}



?>