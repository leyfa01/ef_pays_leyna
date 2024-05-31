(function () {
    let les_pays = document.querySelectorAll(".un_pays");

    let url;
    for (const un_pays of les_pays) {
        un_pays.addEventListener("mousedown", function (e) {
            console.log("ff");
            le_pays = e.target.id;
            url = `https://gftnth00.mywhc.ca/tim39/wp-json/wp/v2/posts?search=${le_pays}&_embed`;
            fetchUrlPays(url);
        })
    }
    

    function fetchUrlPays(url) {
        fetch(url)
            .then(function (response) {
                // Vérifier si la réponse est OK (statut HTTP 200)
                if (!response.ok) {
                    throw new Error("La requête a échoué avec le statut " + response.status);
                }
                // Analyser la réponse JSON
                return response.json();
            })
            .then(function (data) {
                // La variable "data" contient la réponse JSON
                console.log(data);
                let restapi = document.querySelector(".contenu__restapi");
                restapi.innerHTML = "";
                // Maintenant, vous pouvez traiter les données comme vous le souhaitez
                // Par exemple, extraire les titres des articles comme dans l'exemple précédent
                data.forEach(function (article) {
                    let titre = article.title.rendered;
                    // Couper le contenu
                    let contenu = article.content.rendered.split(" ").slice(0, 30).join(" ") + "..";
                    // Creer la carte
                    let carte = document.createElement("div");
                    carte.classList.add("restapi__carte");
                    
                    let imageUrl = "https://via.placeholder.com/150";

                    if (article._embedded['wp:featuredmedia'] && article._embedded['wp:featuredmedia'][0] && article._embedded['wp:featuredmedia'][0].source_url) {
                        imageUrl = article._embedded['wp:featuredmedia'][0].source_url;
                    }
                    // Remplir la carte
                    carte.innerHTML = `
                    <div class="carte">
                        <h4><a href="https://gftnth00.mywhc.ca/tim39/?p=${article.id}">${titre}</a></h4>
                        <div class="carte_description">
                            <img src="${imageUrl}" alt="">
                            ${contenu}</p>
                        </div>
                        
                    </div>
                    `;
                    restapi.appendChild(carte);
                });
            })
            .catch(function (error) {
                // Gérer les erreurs
                console.error("Erreur lors de la récupération des données :", error);
            });
    }

    fetchUrlPays(`https://gftnth00.mywhc.ca/tim39/wp-json/wp/v2/posts?search=France&_embed`);
})();