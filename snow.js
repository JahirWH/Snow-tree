document.addEventListener("DOMContentLoaded", function () {
    setInterval(createSnowflake, 200); // Genera un copo de nieve cada 500ms
});

function createSnowflake(){
    const snowflake = document.createElement("div");
    snowflake.innerHTML = "❄";
    snowflake.classList.add("snowflake");

    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = (Math.random() * 3 + 5) + "s";
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = (Math.random() * 10 + 10) + "px";

    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 7000);
}

document.addEventListener("DOMContentLoaded", function () {
    const esquiador = document.querySelector(".borde-contenedor img");
    const contenedor = document.querySelector(".cont_arbol");
    const botonInicio = document.querySelector("#iniciar");
    let jugando = false;
    let posicionX = 45;

    function start() {
        botonInicio.style.display = "none";
        jugando = true;
        setInterval(crearArbol, 3000);
       // setInterval(createSnowflake, 500);
        setInterval(detectarColision, 100);
    }

    document.addEventListener("keydown", function (event) {
        if (!jugando) return;

        if (event.key === "ArrowLeft" && posicionX > 5) {
            posicionX -= 3;
        } else if (event.key === "ArrowRight" && posicionX < 85) {
            posicionX += 3;
        }

        esquiador.style.left = posicionX + "%";
    });

    function crearArbol() {
        if (!jugando) return;

        let arbol = document.createElement("img");
        arbol.src = "pino.png";
        arbol.style.display = "block";
        arbol.classList.add("arbol");
        arbol.style.left = Math.random() * 60 + "vw";
        //arbol.style.bottom = "0px"; 
        arbol.style.animationDuration = "4s";
        contenedor.appendChild(arbol);
    
         // Esperar a que termine la animación antes de activar la colisión
        arbol.addEventListener("animationend", () => {
            setInterval(() => {
                if (colision(esquiador, arbol)) {
                    alert("¡Perdiste! 🌲💥");
                    location.reload();
                }
            }, 100);
        });
        
        setTimeout(() => {
            arbol.remove();
        }, 5000);
    }

 
    
    function colision(obj1, obj2) {
        let rect1 = obj1.getBoundingClientRect();
        let rect2 = obj2.getBoundingClientRect();

        return !(
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom ||
            rect1.right < rect2.left ||
            rect1.left > rect2.right
        );
    }

    window.start = start;
});

