<?php
/**
 * Package Pays
 * Version 1.0.0
 */
/*
Plugin name: Pays
Plugin uri: https://github.com/eddytuto
Author: Leyna Feknous
Version: 1.0.0
Description: Permet d'afficher les destinations qui répondent à certains critères
*/
function pays_enqueue()
{
// filemtime // retourne en milliseconde le temps de la dernière modification
// plugin_dir_path // retourne le chemin du répertoire du plugin
// __FILE__ // le fichier en train de s'exécuter
// wp_enqueue_style() // Intègre le link:css dans la page
// wp_enqueue_script() // intègre le script dans la page
// wp_enqueue_scripts // le hook

$version_css = filemtime(plugin_dir_path( __FILE__ ) . "style.css");
$version_js = filemtime(plugin_dir_path(__FILE__) . "js/ef_pays.js");
wp_enqueue_style(   'em_plugin_pays_css',
                     plugin_dir_url(__FILE__) . "style.css",
                     array(),
                     $version_css);

wp_enqueue_script(  'em_plugin_pays_js',
                    plugin_dir_url(__FILE__) ."js/ef_pays.js",
                    array(),
                    $version_js,
                    true);
}
add_action('wp_enqueue_scripts', 'pays_enqueue');

function creation_pays(){
    
    $les_pays = ["France","États-Unis", "Canada", "Argentine", "Chili", "Belgique", "Maroc", "Mexique", "Japon", "Italie", "Islande", "Chine", "Grèce", "Suisse"];

   $contenu = '<div class="les_pays">';
   foreach ($les_pays as $un_pays) {
       $contenu .= '<button  id="' . $un_pays. '" class="un_pays">' . $un_pays . '</button>';
   }
   $contenu .= '</div> 
   <div class="contenu__restapi destinations_pays"></div>';
   return $contenu;
}

add_shortcode('pays_populaires', 'creation_pays');