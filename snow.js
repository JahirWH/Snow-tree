document.addEventListener("DOMContentLoaded", function () {
    // Variables del juego
    const esquiador = document.querySelector(".borde-contenedor img");
    const contenedor = document.querySelector(".cont_arbol");
    const botonInicio = document.querySelector("#iniciar");
    const contadorElement = document.querySelector(".contador");
    const alertaElement = document.getElementById('alerta');
    const recordElement = document.querySelector("#record");
    const maxRecordElement = document.querySelector("#max-record");
    
    let jugando = false;
    let posicionX = 45;
    let puntuacion = 0;
    let record = localStorage.getItem('snowTreeRecord') || 0;
    let velocidadArboles = 3000; // Tiempo inicial entre grupos de árboles (ms)
    let cantidadArboles = 1;     // Cantidad inicial de árboles por intervalo
    let intervaloArboles;
    let intervaloPuntuacion;
    let intervaloSnow;
    let gameSpeed = 1;           // Factor de velocidad general del juego

    // Inicialización del juego
    function inicializarJuego() {
        maxRecordElement.textContent = record;
        contadorElement.textContent = `Puntos: 0 | Record: ${record}`;
        
        // Generar nieve inicial
        for (let i = 0; i < 20; i++) {
            createSnowflake();
        }
    }

    // Función para crear copos de nieve
    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.innerHTML = "❄";
        snowflake.classList.add("snowflake");

        snowflake.style.left = Math.random() * 100 + "vw";
        snowflake.style.animationDuration = (Math.random() * 3 + 5/gameSpeed) + "s";
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = (Math.random() * 10 + 10) + "px";
        
        // Efecto de viento (movimiento horizontal aleatorio)
        const windDirection = Math.random() > 0.5 ? 'Left' : 'Right';
        snowflake.style.animationName = `fall${windDirection}`;

        document.body.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 7000);
    }

    // Función de inicio del juego
    window.start = function() {
        botonInicio.style.display = "none";
        jugando = true;
        puntuacion = 0;
        gameSpeed = 1;
        velocidadArboles = 3000;
        cantidadArboles = 1;
        
        // Actualizar contador en tiempo real
        intervaloPuntuacion = setInterval(() => {
            if(jugando) {
                puntuacion++;
                contadorElement.textContent = `Puntos: ${puntuacion} | Record: ${record}`;
                
                // Aumentar dificultad cada 20 puntos
                if(puntuacion % 20 === 0) {
                    aumentarDificultad();
                }
            }
        }, 200);
        
        intervaloArboles = setInterval(generarGrupoArboles, velocidadArboles);
        intervaloSnow = setInterval(createSnowflake, 200);
        
        // Añadir animación al esquiador
        esquiador.classList.add('skiing');
    };

    // Función para aumentar la dificultad progresivamente
    function aumentarDificultad() {
        gameSpeed += 0.1;
        
        // Aumentar velocidad (reducir intervalo entre grupos)
        velocidadArboles = Math.max(800, velocidadArboles - 200);
        
        // Aumentar cantidad de árboles (hasta máximo 4 por intervalo)
        cantidadArboles = Math.min(4, cantidadArboles + 0.2);
        
        // Reiniciar el intervalo con los nuevos parámetros
        clearInterval(intervaloArboles);
        intervaloArboles = setInterval(generarGrupoArboles, velocidadArboles);
    }

    // Generar un grupo de árboles (1-4 dependiendo de la dificultad)
    function generarGrupoArboles() {
        if (!jugando) return;
        
        const arbolesAGenerar = Math.floor(cantidadArboles) + 
                               (Math.random() < (cantidadArboles % 1) ? 1 : 0);
        
        for (let i = 0; i < arbolesAGenerar; i++) {
            // Espaciamiento entre árboles del mismo grupo
            setTimeout(crearArbol, i * 300);
        }
    }

    // Creación de árboles individuales
    function crearArbol() {
        if (!jugando) return;

        let arbol = document.createElement("img");
        arbol.src = "pino.png";
        arbol.classList.add("arbol");
        arbol.style.left = Math.random() * 60 + 10 + "vw"; // Evitar bordes
        arbol.style.animationDuration = (4/gameSpeed) + "s";
        
        // Estado inicial del árbol (animación no completada)
        arbol.dataset.animacionCompleta = "false";
        
        contenedor.appendChild(arbol);

        // Configurar detección de colisión después de la animación
        arbol.addEventListener("animationend", () => {
            arbol.dataset.animacionCompleta = "true";
            iniciarDeteccionColision(arbol);
        });

        // Limpieza del árbol después de tiempo
        setTimeout(() => {
            if (arbol.parentNode) {
                arbol.remove();
            }
        }, 5000/gameSpeed);
    }

    // Iniciar detección de colisión para un árbol específico
    function iniciarDeteccionColision(arbol) {
        const checkColision = setInterval(() => {
            if (!jugando || !arbol.parentNode) {
                clearInterval(checkColision);
                return;
            }
            
            if (arbol.dataset.animacionCompleta === "true" && colision(esquiador, arbol)) {
                terminarJuego();
                clearInterval(checkColision);
            }
        }, 50);
    }

    // Función de detección de colisión mejorada
    function colision(obj1, obj2) {
        const rect1 = obj1.getBoundingClientRect();
        const rect2 = obj2.getBoundingClientRect();

        // Margen para hacer la colisión un poco más indulgente
        const margin = 10;
        
        return !(
            rect1.bottom - margin < rect2.top + margin ||
            rect1.top + margin > rect2.bottom - margin ||
            rect1.right - margin < rect2.left + margin ||
            rect1.left + margin > rect2.right - margin
        );
    }

    // Terminar el juego
    function terminarJuego() {
        jugando = false;
        
        // Actualizar récord si es necesario
        if (puntuacion > record) {
            record = puntuacion;
            localStorage.setItem('snowTreeRecord', record);
            maxRecordElement.textContent = record;
        }
        
        // Mostrar mensaje de fin de juego
        alertaElement.style.display = "flex";
        recordElement.textContent = puntuacion;
        
        // Detener todos los intervalos
        clearInterval(intervaloArboles);
        clearInterval(intervaloPuntuacion);
        clearInterval(intervaloSnow);
        
        // Quitar animación del esquiador
        esquiador.classList.remove('skiing');
    }

    // Función para reiniciar el juego
    window.otra = function() {
        alertaElement.style.display = "none";
        
        // Limpiar todos los árboles
        document.querySelectorAll('.arbol').forEach(arbol => arbol.remove());
        
        // Resetear posición del esquiador
        posicionX = 45;
        esquiador.style.left = posicionX + "%";
        esquiador.style.transform = "scaleX(1)";
        
        // Volver a iniciar el juego
        start();
    };

    // Control del esquiador con teclado
    document.addEventListener("keydown", function (event) {
        if (!jugando) return;

        const movimiento = 2 * gameSpeed; // Movimiento más rápido con mayor dificultad
        
        if (event.key === "ArrowLeft" && posicionX > 5) {
            posicionX -= movimiento;
            esquiador.style.transform = "scaleX(-1)"; // Voltear imagen al moverse izquierda
        } else if (event.key === "ArrowRight" && posicionX < 85) {
            posicionX += movimiento;
            esquiador.style.transform = "scaleX(1)"; // Voltear imagen al moverse derecha
        }

        esquiador.style.left = posicionX + "%";
    });

    // Inicializar el juego al cargar
    inicializarJuego();
});