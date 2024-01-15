const checkboxes = Array.from(document.querySelectorAll("input.checkbox"));
checkboxes.forEach((cb) => {
    cb.addEventListener("change", e => {
        if(e.target.checked) {
            e.target.parentElement.querySelector("p").classList.add("checked")
        }else {
            e.target.parentElement.querySelector("p").classList.remove("checked")
        }
    })
})