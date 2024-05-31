(function () {
    let les_pays = document.querySelectorAll(".un_pays");

    let url;
    for (const un_pays of les_pays) {
        un_pays.addEventListener("mousedown", function (e) {
            console.log("ff");
            le_pays = e.target.id;
            url = `https://gftnth00.mywhc.ca/tim39/wp-json/wp/v2/posts?search=${le_pays}`;
            fetchUrl(url);
        })
    }

    function fetchCategories() {
        let url = `https://gftnth00.mywhc.ca/tim39/wp-json/wp/v2/categories`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(categorie => {
                    dataCategories[categorie.id] = {nom: categorie.name, lien: categorie.link};
                });
            })
            .catch(function (error) {
                // Gérer les erreurs
                console.error("Erreur lors de la récupération des données :", error);
            });
    }

    function fetchUrl(url) {
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
                    // Fait un element a, pour le lien de la categorie

                    // Couper le contenu
                    let contenu = article.content.rendered.split(" ").slice(0, 10).join(" ") + "..";
                    // Creer la carte
                    let carte = document.createElement("div");
                    carte.classList.add("restapi__carte");
                    
                    // Remplir la carte
                    carte.innerHTML = `
                    <div class="carte">
                        <h4>${titre}</h4>
                        ${contenu}</p>
                        <a href="https://gftnth00.mywhc.ca/tim39/?p=${article.id}">En savoir plus</a>
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
})();