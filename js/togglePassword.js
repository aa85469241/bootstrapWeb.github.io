let password = document.querySelector("input[name='password']");
let eyeIcon = document.getElementById("eye-icon")

eyeIcon.onclick = function() {
    if(password.type === "password"){
        password.type = "text"
        this.setAttribute("src", "../image/eye-open.png")
    }else {
        password.type = "password"
        this.setAttribute("src", "../image/eye-close.png")
    }
}
