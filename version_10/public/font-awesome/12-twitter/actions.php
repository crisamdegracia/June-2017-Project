<?

include('functions.php');


if ( $_GET['actions'] === "loginSignup"){

    $error = '';
    $email = $_POST['email'];
    $password = $_POST['password'];

    if(!$email){
        $error .= 'An Email Address is required.';
    } 
    else if(!$password){
        $error .= 'Password is required.';
    }

    else  if(filter_var($email,FILTER_VALIDATE_EMAIL) === false ){

        $error .= 'Please Enter a Valid Email.';
        //        echo 'Please Enter a Valid Email Address.';

    }

    if ($error !== ''){

        echo $error;
        exit();
    }


    //Signing up field, below code checks if the user entered value with the same value from database.(e.g email)
    if($_POST['loginActive'] === '0'){

        $query = "SELECT * FROM `users` WHERE email='".mysqli_real_escape_string($link,$email)."' LIMIT 1";
        $result = mysqli_query($link,$query);

        if(mysqli_num_rows($result) > 0 ) $error =  "That email adress is already taken."; 


        else {  

            $query = "INSERT INTO `users` (`email`,`password`) VALUES('".mysqli_real_escape_string($link,$email)."','".mysqli_real_escape_string($link,$password )."')";

            if(mysqli_query($link,$query)) { // Signed the user u must create Success alert here sam

                $_SESSION['id'] = mysqli_insert_id($link); // gets the id from user input and set it as session ID


                $query = "UPDATE users SET password = '". md5(md5($_SESSION['id']).$password) ."' WHERE id = '".$_SESSION['id']."' LIMIT 1";

                mysqli_query($link,$query);

                echo '1';



            }/*PASSWORD HASH*/  

            else {
                $error = "Couldn't create user, please try again!"; 
            }/*ERROR*/

        }/*INSERT USER*/
        if ($error !== ''){

            echo $error;
            exit();

        } /*ERROR*/


    }/*LOG IN ACTIVE*/
    else {

        $query = "SELECT * FROM `users` WHERE email='".mysqli_real_escape_string($link,$email)."' LIMIT 1";
        $result = mysqli_query($link,$query);

        $row = mysqli_fetch_assoc($result);

        if($row['password'] ===  md5(md5($row['id']).$password)){ //checking if PW is correct

            echo '1';

            $_SESSION['id'] = $row['id'];  // create a session wch tells us the users logged in

        }/*if $row[password]*/
        else {
            $error = "Couldn't find user.";
        }    

        if ($error !== ''){

            echo $error;
            exit();

        } /*ERROR*/

    }/*LOG IN ACTIVE ELSE*/


}

//Following and Unfollowing HERE!

if($_GET['actions'] == 'toggleFollow'){

    $query = "SELECT * FROM isFollowing WHERE follower=".mysqli_real_escape_string($link,$_SESSION['id'])." AND isFollowing = ". mysqli_real_escape_string($link,$_POST['userid'])."  LIMIT 1 ";

    $result = mysqli_query($link,$query);

    if( mysqli_num_rows($result) > 0){ 

        $row = mysqli_fetch_assoc($result);

        mysqli_query($link, "DELETE FROM isFollowing WHERE id = ".mysqli_real_escape_string($link,$row['id'])." LIMIT 1" );

        echo '1';

    } else {

        mysqli_query($link, "INSERT INTO isFollowing (follower, isFollowing) VALUES (".mysqli_real_escape_string($link,$_SESSION['id']).",".mysqli_real_escape_string($link,$_POST['userid']).")");

        echo '2';

    }
}


if($_GET['actions'] == 'postTweet'){
    
    if(!$_POST['tweetContent']){
        
        echo 'The Tweets are empty.';
        
    } else if (strlen($_POST['tweetContent']) > 150 ){
        
        echo 'Your tweet is too long.';
    }
    else {   
          mysqli_query($link, "INSERT INTO tweets(`tweet`,`userid`,`datetime`) VALUES('".mysqli_real_escape_string($link,$_POST['tweetContent'])."','".mysqli_real_escape_string($link,$_SESSION['id'])."', NOW())");
        echo '1';
    }

}
?>