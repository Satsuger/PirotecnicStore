document.querySelectorAll(".price").forEach((node) => {
  node.textContent = new Intl.NumberFormat("us-US", {
    currency: "usd",
    style: "currency",
  }).format(node.textContent);
});

document.querySelectorAll(".js-remove").forEach((item) => {
  item.addEventListener("click", (e) => {
    const id = e.target.dataset.id;

    fetch("/card/remove/" + id, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((card) => {
        
        console.log(card);
      });
  });
});
