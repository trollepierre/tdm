
<div class="scroller_anchor"></div>
<header class="scroller">
    <div class="menu">
        <ul>
            <li>
                 <form class="paypal" action="http://www.recontact.me" method="post" target="_top"  title="<?php echo ALTHOME; ?>">
                    <input type="hidden" name="cmd" value="_s-xclick">
                    <input type="hidden" name="hosted_button_id" value="C753VV9DE7LH8">
                        <?php if ($lang=='fr' ) { 
                            echo '<input type="image" src="http://www.recontact.me/img/paypal-ribbon_fr.png" name="submit" alt="<?php echo ALTHOME; ?>">      ';
                         }else{ 
                            echo '<input type="image" src="http://www.recontact.me/img/paypal-ribbon_en.png" name="submit" alt="<?php echo ALTHOME; ?>">';
                        } ?>
                    <img alt="" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1">
                </form>
            </li>
            <li>
                <a href="http://www.recontact.me/articles.php"  title="<?php echo ALTARTICLES; ?>">
                    <?php echo ARTICLES; ?>
                </a>
            </li>
            <li>
                <a href="http://www.recontact.me/challenges.php"  title="<?php echo ALTCHALLENGES; ?>">
                    <?php echo CHALLENGES; ?>
                </a>
            </li>
            <li>
                <a href="http://www.recontact.me/destinations.php" title="<?php echo ALTAVION; ?>">
                    <img alt="nos destinations" class="logo" src="img/avion.png" />
                </a>
            </li>
             <li class="dropdown">
                <a href="" class="dropdown-toggle" data-toggle="dropdown"  title="<?php echo ALTDEST; ?>">
                    <?php echo DESTINATION; ?><b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                    <li class="dropdown-header">
                        <a href="destination.php?dest=southAmerica">
                            <?php echo SOUTHAMERICA; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=brazil">
                            <?php echo BRAZIL; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=argentina">
                            <?php echo ARGENTINA; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=paraguay">
                            <?php echo PARAGUAY; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=bolivia">
                            <?php echo BOLIVIA ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=peru">
                            <?php echo PERU; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=chile">
                            <?php echo CHILE; ?>
                        </a>
                    </li>
                    <li class="dropdown-header">
                        <a href="destination.php?dest=oceania">
                            <?php echo OCEANIA; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=newZealand">
                            <?php echo NZ; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=australia">
                            <?php echo AUSTRALIA; ?>
                        </a>
                    </li>
                    <li class="dropdown-header">
                        <a href="destination.php?dest=asia">
                            <?php echo ASIA; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=singapore">
                            <?php echo SINGAPOUR; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=indonesia">
                            <?php echo INDONESIA; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=thailand">
                            <?php echo THAILAND; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=cambodia">
                            <?php echo CAMBODIA; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=vietnam">
                            <?php echo VIETNAM; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=china">
                            <?php echo CHINA; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=tibet">
                            <?php echo TIBET; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=nepal">
                            <?php echo NEPAL; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=india">
                            <?php echo INDIA; ?>
                        </a>
                    </li>
                    <li>
                        <a href="destination.php?dest=uae">
                            <?php echo UAE; ?>
                        </a>
                    </li>
                </ul>
            </li>

            <li>
                <a href="http://www.recontact.me/contact.php" title="<?php echo ALTCONTACT; ?>">
                    <?php echo CONTACT; ?>
                </a>
            </li>
        </ul>
    </div>
</header>