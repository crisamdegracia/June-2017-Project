<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
        <link href="font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href="css/style.css" type="text/css">


    </head>
    <body>
        <nav class="navbar navbar-toggleable-md fixed-top navbar-inverse bg-inverse">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="http://79.170.44.83/wordpresswithsam.com/12-twitter/">Twitter</a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="?page=timeline">Your Timeline <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="?page=yourtweets">Your Tweets</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="?page=publicprofile"> Public Profile</a>
                    </li>
                </ul>
                <div class="form-inline my-2 my-lg-0">
                    <?php if($_SESSION['id']){ ?> <!--if the id has value or the users logged in  buttons has logout-->

                    <a class="btn btn-outline-success my-2 my-sm-0" href="?function=logout">Log Out </a>

                    <?  } else { ?>
                    <button class="btn btn-outline-success my-2 my-sm-0"  data-toggle="modal" data-target="#myModal" type="submit">Login/Sign Up</button>

                    <? } ?>
                </div>
            </div>
        </nav>