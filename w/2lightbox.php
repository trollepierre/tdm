<?php include_once("analyticstracking.php");?>

    <div class="designlicks"><a href="article.php" title="<?php echo ALTART; ?>" ><?php echo ARTICLE; ?></a>     </div>
    <div class="designlicks2"><a href="challenge.php" title="<?php echo ALTCHAL; ?>"><?php echo CHALLENGE; ?></a>     </div>
    <div class="designlicks3"><a href="https://docs.google.com/forms/d/1haLT0oeLTtqSajX0dWijHWcxbW49N886hrpj5s_EtQQ/viewform"  title="<?php echo ALTPROP; ?>" target="_blank"><?php echo THANK; ?></a>     </div>
    
    <div id="lightbox" style="display: none;">
        <ul class="nav">
            <li class="nav-one"><a href="#particulier" class="current"><?php echo PROPOSE; ?></a>
            </li>
            <li class="nav-two"><a href="#professionnel"><?php echo EXISTINGCHALLENGES; ?></a>
            </li>
        </ul>

        <div class="list-wrap">

            <div id="particulier">
                <h2><?php echo WEARECHALLENGERS; ?> </h2>
                <ul id="addresses">
                    <?php echo CHAEWW; ?>
				</ul>
                <div class="answer">
                    <h2><?php echo YOUHAVECHALLENGES; ?> <span style="font-weight:normal"><?php echo READYTODO; ?> </span></h2>
                    <a href="https://docs.google.com/forms/d/1haLT0oeLTtqSajX0dWijHWcxbW49N886hrpj5s_EtQQ/viewform" target="_blank">
                        <div id="answer-button"><?php echo PROPOSEACHALLENGE; ?></div>
                    </a>
                </div>
            </div>

            <div id="professionnel" class="hide">
                
                <h2><?php echo GALTTEC; ?></h2>
                <ul id="addresses2">
                    <?php echo CHAEWW; ?>
                </ul>
                <div class="answer">
                    <h2><?php echo NEEDINSPIRATION; ?><span style="font-weight:normal"><?php echo CTECTFNO; ?> </span></h2>
                    <a href="https://docs.google.com/spreadsheets/d/1gQNjOhUrOleH3qTK2RYkR_Fit1rnkjLZvfQJMd0tMIA/edit#gid=1537311595" target="_blank">
                        <div id="answer-button2"><?php echo VIEWCHALLENGES; ?></div>
                    </a>
                </div>
            </div>
        </div>
        <div class="bg-lightbox"></div>
    </div>

    <div class="bar-nav">
        <div class="clear"></div>
    </div>
    <div class="fixed-top">
        <div id="left-border">
            <a href="#lightbox" class="ellipse fancybox desktop">
                <?php echo CHALLENGEUS; ?>
            </a>
        </div>

    </div>
        
