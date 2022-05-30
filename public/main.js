var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var postOrder = document.querySelector("button");

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const order = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("messages", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'name': name,
        'order': order,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
