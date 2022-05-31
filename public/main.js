let thumbUp = document.getElementsByClassName("fa-thumbs-up");
let trash = document.getElementsByClassName("fa-trash");
let thumbDown = document.getElementsByClassName("fa-thumbs-down");
let postOrder = document.querySelector("button");
let pencil = document.getElementsByClassName("fa-pencil");

Array.from(pencil).forEach(function (element) {
  element.addEventListener("click", function () {
    const readOnlyText = this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling
    const inputForm = this.parentNode.previousSibling.previousSibling
    const inputText = this.parentNode.previousSibling.previousSibling.childNodes[1]
    if (inputForm.classList.contains("hide")) {
      inputForm.classList.toggle("hide")
      readOnlyText.classList.toggle("hide")
    } else {
      inputForm.classList.toggle("hide")
      readOnlyText.classList.toggle("hide")
      if (inputText.value) {
        fetch("messages", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order: inputText.value,
           _id: readOnlyText.dataset.id
          }),
        }).then( res =>  {
          readOnlyText.innerHTML = inputText.value
      })
  }
    }})
  })

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const readOnlyText = this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling
    console.log(readOnlyText)
    fetch("messages", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: readOnlyText.dataset.id
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
