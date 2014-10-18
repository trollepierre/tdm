<?php
  if (count($convert)<=(1+3*$position)) {
    $titre=$convert[3*$position-2];
    $soustitre=$convert[3*$position-1];
    $paragraphe=$convert[3*$position];
    if (count($convert_en)<=(1+3*$position)) {
      $title=$convert_en[3*$position-2];
      $subtitle=$convert_en[3*$position-1];
      $paragraph=$convert_en[3*$position];
    }else{
      $title=$titre;
      $subtitle=$soustitre;
      $paragraph=$paragraphe;
    }
  }else{
    if (count($convert_en)<=(1+3*$position))  {
      $title=$convert_en[3*$position-2];
      $subtitle=$convert_en[3*$position-1];
      $paragraph=$convert_en[3*$position];
      $titre=$title;
      $soustitre=$subtitle;
      $paragraphe=$paragraph;
    }else{
      $title = "Article not written yet";
      $titre = "Article pas encore rédigé";
      $paragraph = "To make you wait, find the first pictures below";
      $paragraphe = "Pour vous faire patienter, retrouver les photos de l'article ci-dessous";
      $soustitre ="";
      $subtitle="";
    }
  }
?>