
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector("#abrirInvitacion");
    const portada = document.querySelector("#portada");
    const interior = document.querySelector("#interiorInvitacion");

    if (!boton || !portada || !interior) {
        return;
    }

    boton.addEventListener("click", () => {
        boton.disabled = true;

        const ancho = portada.offsetWidth;
        const alto = portada.offsetHeight;

        const centroX = ancho / 2;
const centroY = alto / 2;

        const espacioSVG = "http://www.w3.org/2000/svg";

        // Creamos la máscara transparente con forma de corazón
        const svg = document.createElementNS(espacioSVG, "svg");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("width", "0");
        svg.setAttribute("height", "0");

        const mascara = document.createElementNS(espacioSVG, "mask");
        mascara.setAttribute("id", "mascaraCorazon");
        mascara.setAttribute("maskUnits", "userSpaceOnUse");
        mascara.setAttribute("maskContentUnits", "userSpaceOnUse");
        mascara.setAttribute("x", "0");
        mascara.setAttribute("y", "0");
        mascara.setAttribute("width", ancho);
        mascara.setAttribute("height", alto);
        mascara.setAttribute("mask-type", "luminance");

        const fondoMascara = document.createElementNS(espacioSVG, "rect");
        fondoMascara.setAttribute("width", ancho);
        fondoMascara.setAttribute("height", alto);
        fondoMascara.setAttribute("fill", "white");

        const corazon = document.createElementNS(espacioSVG, "path");
        corazon.setAttribute(
            "d",
            "M 0 82 C -14 68 -88 25 -88 -24 C -88 -67 -36 -82 0 -39 C 36 -82 88 -67 88 -24 C 88 25 14 68 0 82 Z"
        );
        corazon.setAttribute("fill", "black");
        corazon.setAttribute(
            "transform",
            `translate(${centroX} ${centroY}) scale(0.02)`
        );

        mascara.append(fondoMascara, corazon);
        svg.appendChild(mascara);
        document.body.appendChild(svg);

        // Mostramos la invitación detrás de la portada
        interior.hidden = false;
        interior.setAttribute("aria-hidden", "false");
        interior.classList.add("preparandoTransicion");

        // Aplicamos la máscara a la portada
        portada.classList.add("enTransicion");
        portada.style.mask = "url(#mascaraCorazon)";
        portada.style.webkitMask = "url(#mascaraCorazon)";

        const escalaFinal = Math.max(ancho, alto) / 45;
        const duracion = 2000;
        const inicio = performance.now();

        function expandirCorazon(ahora) {
            const progreso = Math.min((ahora - inicio) / duracion, 1);
            const suavizado = progreso * progreso * (3 - 2 * progreso);

            const escala = 0.02 + (escalaFinal - 0.02) * suavizado;

            corazon.setAttribute(
                "transform",
                `translate(${centroX} ${centroY}) scale(${escala})`
            );

            if (progreso < 1) {
                requestAnimationFrame(expandirCorazon);
                return;
            }

            // Terminamos la transición
            portada.hidden = true;
            portada.classList.remove("enTransicion");
            portada.style.mask = "";
            portada.style.webkitMask = "";

            interior.classList.remove("preparandoTransicion");
            interior.classList.add("interiorVisible");

            svg.remove();
        }

        requestAnimationFrame(expandirCorazon);
    });
});
