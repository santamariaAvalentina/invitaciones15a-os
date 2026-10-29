
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector("#abrirInvitacion");
    const portada = document.querySelector("#portada");
    const interior = document.querySelector("#interiorInvitacion");

    if (!boton || !portada || !interior) {
        return;
    }

    boton.addEventListener("click", () => {
        portada.classList.add("portadaCerrada");

        window.setTimeout(() => {
            portada.hidden = true;
            interior.hidden = false;
            interior.setAttribute("aria-hidden", "false");
        }, 650);
    });
});
