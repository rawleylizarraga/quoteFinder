// event listeners
let authorLinks = document.querySelectorAll("a");
for (authorLink of authorLinks) {
    authorLink.addEventListener("click", getAuthorInfo);
}
document.querySelector("#likesBtn").addEventListener("click", validateLikes);

// variables


// functions
async function getAuthorInfo() {
    // alert(this.id);

    var myModal = new bootstrap.Modal(document.getElementById('authorModal'));
    myModal.show();

    let url = `/api/author/${this.id}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);

    let authorInfo = document.querySelector("#authorInfo");
    authorInfo.innerHTML = `<h1> ${data[0].firstName} ${data[0].lastName} </h1>`;
    authorInfo.innerHTML += `<img src="${data[0].portrait}" width="200"> <br>`;
    authorInfo.innerHTML += `Born: ${data[0].dob.split("T")[0]} <br>`;
    authorInfo.innerHTML += `Died: ${data[0].dod.split("T")[0]} <br>`;
    authorInfo.innerHTML += `Profession: ${data[0].profession} <br>`;
    authorInfo.innerHTML += `Country: ${data[0].country} <br><br>`;
    authorInfo.innerHTML += `${data[0].biography} <br>`;
}

function validateLikes(e) {
    let minLikes = Number(document.querySelector("#minLikes").value);
    let maxLikes = Number(document.querySelector("#maxLikes").value);

    if (isNaN(minLikes) || isNaN(maxLikes) || minLikes < 0 || maxLikes < minLikes) {
        e.preventDefault();
    }
}