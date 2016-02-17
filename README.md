# tdm
# Travel blog updated with Dropbox webhook - learn Dropbox webhooks, PHP, SQL, JS,...
===
*to write again*

Visible sur l'adresse [www.recontact.me](www.recontact.me)


## Synopsis

This project is a project and task manager program. Developed from scratch with PHP/jQuery

Le site raconte notre voyage et se remplira au fur et à mesure de notre synchronisation sur Dropbox.  
On utilise PHP (avec l'extension php_curl)  
et l'interface avec Dropbox se fait avec la Core API Dropbox. (cf le dossier lib)

## Code Example

**Contenu**

Dans ce dossier, on trouve de nombreux dossiers et fichiers. Ainsi :

    article/ permet l upload automatique d articles. L appel à ce dossier vient de
    article.php, le modèle de page des articles
    challenge/ idem
    challenge.php idem
    destination/ contient le contenu des pages destinations c'est à dire img et le fichier d import image : destination_img. Également le contenu textuel séparé entre les différentes langues
    destination.php pour l appel de ses destinations
    ...


## Motivation

Share the articles and pictures of my website when travelling. Uploads come from Dropbox. Dropbox webhooks are used to launch synchronisation.

## Installation

Fork it

## API Reference

None

## Tests

Use your localhost

## Maintainer

[Pierre Trolle](https://github.com/trollepierre) - [@trollepierre](https://twitter.com/PierreTrolle)

## License (MIT)

Copyright (c) Pierre Trolle ("Author")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
