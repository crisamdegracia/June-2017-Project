

<footer class="container-fluid">
    <section>
        <div class="row">
            <div class="col-lg-12" id="footerNav">
                <i class="fa fa-html5"></i>
                <i class="fa fa-css3"></i>
                <i class="fa fa-android"></i>
                <i class="fa fa-windows"></i>
                <i class="fa fa-code"></i>
            </div><!--col-12-->
        </div>
        <div class="row">
            <div class="col-lg-12" id="footerNav">
                <h4> &copy; Sam De Gracia - 2017</h4>
                <i class="fa fa-linkedin"></i>
                <i class="fa fa-facebook"></i>
                <i class="fa fa-github"></i>
                <i class="fa fa-google-plus"></i>
                <i class="fa fa-twitter"></i>
            </div><!--col-12-->
        </div>
    </section>
</footer>


<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="loginModalTitle">Log in</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger" id="loginAlert"></div>
                <!--                <div class="alert alert-success" id="loginAlertSuccess"></div>-->

                <form>
                    <input type="hidden" name="loginActive" id="loginActive" value="1">
                    <div class="form-group">

                        <label for="email" class="sr-only">Email</label>
                        <input type="email" class="form-control mb-1" id="email" name="email" placeholder="Email Address">

                        <label for="password" class="sr-only">Password</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <a  id="toggleLogin">Sign Up</a>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button id="loginSignUpButton" type="submit" class="btn btn-primary"> Log in</button>
            </div>
        </div>
    </div>
</div>


<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="  crossorigin="anonymous"></script>  
<script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>



<script>

    $('#toggleLogin').click(function(){

        if($('#loginActive').val() === "1"){ // checks login value if 1

            $('#loginActive').val('0'); // sets login active value to 0
            $('#loginModalTitle').html('Sign Up');
            $('#loginSignUpButton').html('Sign Up');
            $('#toggleLogin').html('Log in');
        }
        else {                             // if login value is equal  to 0 then set it to 1
            $('#loginActive').val('1');
            $('#loginModalTitle').html('Log in');
            $('#loginSignUpButton').html('Log in');
            $('#toggleLogin').html('Sign up');
        }
    });

    $('#loginSignUpButton').click(function(){

        $.ajax({ // create apost type with a link from URL 

            type: "POST",
            url: "actions.php?actions=loginSignup",
            data: "email=" + $("#email").val() + "&password=" + $("#password").val() + "&loginActive=" + $("#loginActive").val(),
            success: function(result){

                if(result === "1" ){

                    //Redirecting the user to the home page if info is correct. Cool!
                    window.location.assign("http://79.170.44.83/wordpresswithsam.com/12-twitter/");
                } 

                else {

                    $('#loginAlert').html(result).show();



                }
            }

        })

    });


    $('.toggleFollow').click(function(){
        var id =  $(this).attr('data-userid');

        $.ajax({ // create apost type with a link from URL 

            type: "POST",
            url: "actions.php?actions=toggleFollow",
            data: "userid=" + id,
            success: function(result){

                if ( result == '1') {
                    
                    $(" a[data-userid= '" + id + "' ]  ").html("Follow");

                }
                
                else if( result == '2' ){
                    
                     $("a[data-userid='" + id + "']").html("Unfollow");
                }
            }

        })


    });
    
    
    $('#postTweetButton').click(function(){
        
      $.ajax({ 

            type: "POST",
            url: "actions.php?actions=postTweet",  //postTweet is just any name you like 
            data: "tweetContent=" + $('#tweetContent').val(),
            success: function(result){

             if(result === '1') {
                 
                 $('#tweetSuccess').show();
                  $('#tweetFailed').hide();
                
             } else {
                 $('#tweetFailed').html(result).show();
                 $('#tweetSuccess').hide();
             }
                  
              }
              
            

        })

    });
    

</script>
</body>
</html>