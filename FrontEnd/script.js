async function getAllProjets() {
  const response = await fetch(`http://localhost:5678/api/works`);
  const data = await response.json();

  var gallery = document.querySelector(".gallery");

  var texte = "";

  for (let i = 0; i < data.length; i++) {
    console.log(i);
    console.log(data[i]["title"]);
    console.log(data[i]["imageUrl"]);

    texte += `
    <figure>
            <img src="${data[i]["imageURL"]}" alt="${data[i]["title"]}" />
            <figcaption>${data[i]["title"]}</figcaption>
    </figure>
    `;
  }

  gallery.innerHTML = texte;
}

getAllProjets();
