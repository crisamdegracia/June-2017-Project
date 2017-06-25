<div class="container mainContainer">
    <div class="row">
        <div class="col-md-8">
        
        <?php if($_GET['userid']){ ?>
        
    <?php displayTweets($_GET['userid']); ?>      
    
        <?} else {  ?>
        
        
       
        <h2>ACTIVE USERS</h2>     
        
              <?php displayUsers(); ?>      
        </div>
         <? } ?>
        
        <div class="col-md-4" id="widget">
           <h2> Who's That Pokemon</h2>
           
           <?php displaySearch(); ?>
           <br>
           
           <h1> WOOOO!</h1>
           <?php displayTweetBox(); ?>
            
        </div>    
        
    </div>
    
    
</div>
