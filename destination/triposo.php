<?php
if (isset($_GET['dest'])) {
    switch (htmlspecialchars($_GET['dest'])) {
        case 'rio':
            header('Location: https://www.triposo.com/loc/Rio_de_Janeiro');
            break;
        case 'sao':
            header('Location: https://www.triposo.com/loc/SC3A3o_Paulo');
            break;
        case 'iguazu':
            header('Location: http://www.triposo.com/loc/Iguazu_Falls');
            break;
        case 'ibera':
            header('Location: https://www.triposo.com/loc/Colonia_Carlos_Pellegrini');
            break;
        case 'resistencia':
            header('Location: http://www.triposo.com/loc/Resistencia2C_Chaco');
            break;
        case 'salta':
            header('Location: http://www.triposo.com/loc/Salta');
            break;
        case 'trinidad':
            header('Location: http://www.triposo.com/loc/Trinidad2C_Paraguay');
            break;
        case 'uyuni':
            header('Location: http://www.triposo.com/loc/Uyuni');
            break;
        case 'potosi':
            header('Location: http://www.triposo.com/loc/PotosC3AD');
            break;
        case 'lapaz':
            header('Location: http://www.triposo.com/loc/La_Paz');
            break;
        case 'routeDeLaMort':
            header('Location: http://en.wikipedia.org/wiki/Yungas_Road');
            break;
        case 'machupicchu':
            header('Location: http://www.triposo.com/loc/Machu_Picchu');
            break;
        case 'cusco':
            header('Location: http://www.triposo.com/loc/Cusco');
            break;
        case 'nazca':
            header('Location: http://www.triposo.com/loc/Nazca/Understand');
            break;
        case 'lima':
            header('Location: http://www.triposo.com/loc/Lima');
            break;
        case 'santiago':
            header('Location: http://www.triposo.com/loc/Santiago');
            break;
        case 'auckland':
            header('Location: http://www.triposo.com/loc/Auckland');
            break;
        case 'tekapo':
            header('Location: https://www.triposo.com/loc/Lake_Tekapo_28town29');
            break;
        case 'cook':
            header('Location: http://www.triposo.com/poi/N__60598015');
            break;
        case 'queenstown':
            header('Location: http://www.triposo.com/loc/Queenstown2C_New_Zealand');
            break;
        case 'milford':
            header('Location: http://www.triposo.com/loc/Milford_Sound');
            break;
        case 'haastPass':
            header('Location: http://www.triposo.com/loc/Haast2C_New_Zealand');
            break;
        case 'sydney':
            header('Location: http://www.triposo.com/loc/Sydney');
            break;
        case 'bluemountains':
            header('Location: https://www.triposo.com/loc/Blue_Mountains_National_Park');
            break;
        case 'melbourne':
            header('Location: http://www.triposo.com/loc/Melbourne');
            break;
        case 'brisbane':
            header('Location: http://www.triposo.com/loc/Brisbane');
            break;
        case 'barrier':
            header('Location: http://www.triposo.com/loc/Belize_Barrier_Reef');
            break;
        case 'singapore':
            header('Location: http://www.triposo.com/loc/Singapore');
            break;
            case 'bali':
            header('Location: http://www.triposo.com/loc/Bali');
            break;
        case 'giliIslands':
            header('Location: http://www.triposo.com/loc/Gili_Islands');
            break;
        case 'komodo':
            header('Location: http://en.wikipedia.org/wiki/Komodo_dragon');
            break;
        case 'borobudur':
            header('Location: http://en.wikipedia.org/wiki/Borobudur');
            break;
        case 'bromo':
            header('Location: http://www.triposo.com/poi/T__41d80a583c8d');
            break;
        case 'bangkok':
            header('Location: http://www.triposo.com/loc/Bangkok');
            break;
        case 'angkor':
            header('Location: http://www.triposo.com/loc/Angkor');
            break;
        case 'phnomPenh':
            header('Location: http://www.triposo.com/loc/Phnom_Penh');
            break;
        case 'hochiminh':
            header('Location: http://www.triposo.com/loc/Ho_Chi_Minh_City');
            break;
        case 'hanoi':
            header('Location: http://www.triposo.com/loc/Hanoi');
            break;
        case 'halongbay':
            header('Location: http://www.triposo.com/loc/Ha_Long');
            break;
        case 'sichuan':
            header('Location: http://www.triposo.com/poi/T__f3aaf429e35a');
            break;
        case 'jiuzhaigou':
            header('Location: http://www.triposo.com/loc/Jiuzhaigou_Valley');
            break;
        case 'guilin':
            header('Location: http://www.triposo.com/loc/Guilin');
            break;
         case 'mountHuang':
            header('http://www.triposo.com/loc/Wuhan');
            break;    
        case 'beijing':
            header('Location: http://www.triposo.com/loc/Beijing');
            break;
        case 'wall':
            header('Location: http://www.triposo.com/loc/Great_Wall_of_China');
            break;
        case 'zhangye':
            header('Location: http://www.triposo.com/loc/Zhangye');
            break;
        case 'lhasa' :
            header('Location: http://www.triposo.com/loc/Lhasa');
            break;
        case 'tibetan':
            header('Location: http://www.tibetdiscovery.com/tibet-landscape/');
            break;
        case 'everest':
            header('Location: http://www.triposo.com/loc/Mount_Everest');
            break;
        case 'everest2':
            header('Location: http://www.triposo.com/loc/Mount_Everest');
            break;
        case 'kathmandu':
            header('Location: http://www.triposo.com/loc/Kathmandu');
            break;
        case 'varanasi':
            header('Location: http://www.triposo.com/loc/Varanasi');
            break;
        case 'kolkata':
            header('Location: http://www.triposo.com/loc/Kolkata');
            break;
        case 'rajasthan':
            header('Location: http://fr.wikipedia.org/wiki/Rajasthan');
            break;
        case 'agra':
            header('Location: http://www.triposo.com/loc/Agra');
            break;
        case 'ladakh':
            header('Location: http://www.triposo.com/loc/Ladakh');
            break;
        case 'newDelhi':
            header('Location: http://www.triposo.com/loc/New_Delhi');
            break;
        case 'dubai':
            header('Location: http://www.triposo.com/loc/Dubai');
            break;
        case 'collect':
            header('Location: http://www.workingabroadmagazine.com/jobs-abroad/australia-jobs/cool-jobs-australia-for-non-australians/');
            break;
        default:

            break;
    }
} else {

} 
?>