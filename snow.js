function createSnowflake() {
            const snowflake = document.createElement("div");
            snowflake.innerHTML = "❄";
            snowflake.classList.add("snowflake");

            snowflake.style.left = Math.random() * 100 + "vw";
            snowflake.style.animationDuration = (Math.random() * 3 + 2) + "s"; // Entre 2 y 5s
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = (Math.random() * 10 + 10) + "px"; // Entre 10px y 20px

            document.body.appendChild(snowflake);

            setTimeout(() => {
                snowflake.remove();
            }, 5000);
        }

        setInterval(createSnowflake, 200);

document.addEventListener("DOMContentLoaded", function () {
    const esquiador = document.querySelector(".borde-contenedor img");
    const contenedor = document.querySelector(".borde-contenedor");
    
    let posicionX = 45; // Posición inicial en X (horizontal)
    let posicionY = 140; // Posición inicial en Y (vertical)

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft" && posicionX > 5) {
            posicionX -= 4; // Mueve a la izquierda
        } else if (event.key === "ArrowRight" && posicionX < 85) {
            posicionX += 4; // Mueve a la derecha
        } else if (event.key === "ArrowDown" && posicionY <  50) {
            posicionY -= 10; // Mueve hacia abajo
        }

        esquiador.style.left = posicionX + "%";
        esquiador.style.bottom = posicionY + "px"; // Mueve en el eje Y
    });
});



//iniciar juego
function start(){
    i = document.getElementById('iniciar')
    i.style.display = "none";
    arbolito();
}

//creador de arbolito
function arbolito() {
            const arbol = document.getElementById("arbol");
            //rbol.innerHTML = "🎄";
            //arbol.classList.add("arbol");
            arbol.style.left = Math.random() * 60  + "vw";
            arbol.style.right = Math.random() * 15  + "vw";
            arbol.style.animationDuration = (Math.random() * 9 + 2) + "s"; // Entre 2 y 5s
            //arbol.style.opacity = Math.random();
            //arbol.style.fontSize = (Math.random() * 10 + 10) + "px"; // Entre 10px y 20px

            document.body.appendChild(cont-arbol);

            setTimeout(() => {
                arbol.remove();
            }, 5000);
        }

        setInterval(arbolito, 1200);