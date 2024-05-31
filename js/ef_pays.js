(function () {
    let les_pays = document.querySelectorAll(".un_pays");

    let url;
    for (const un_pays of les_pays) {
        un_pays.addEventListener("mousedown", function (e) {
            console.log("ff");
            le_pays = e.target.id;
            url = `https://gftnth00.mywhc.ca/tim39/wp-json/wp/v2/?s=${le_pays}`;
            console.log(url);
        })
    }
})();