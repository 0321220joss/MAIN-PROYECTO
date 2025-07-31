// CHATBOT FLOTANTE

document.addEventListener("DOMContentLoaded", function () {
    const btnChatbot = document.getElementById("btn-chatbot");
    const cuadroChatbot = document.getElementById("chatbot-cuadro");

    btnChatbot.addEventListener("click", function () {
        if (cuadroChatbot.style.display === "none" || cuadroChatbot.classList.contains("oculto")) {
            cuadroChatbot.style.display = "block";
            cuadroChatbot.classList.remove("oculto");
        } else {
            cuadroChatbot.style.display = "none";
            cuadroChatbot.classList.add("oculto");
        }
    });
});
