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