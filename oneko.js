(function oneko() {
    const nekoEl = document.createElement("div");
    let nekoPosX = window.innerWidth / 2 - 16; // Start in the middle
    let nekoPosY = window.innerHeight - 32; // Fixed Y position near the bottom
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
    let nekoSpeed = 7; // Reduced speed for a slower pace
    const lineLength = window.innerWidth / 4; // Length of the line
    const lineStart = window.innerWidth / 2 - lineLength / 2; // Starting X position of the line

    const spriteSets = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratch: [
            [-5, 0],
            [-6, 0],
            [-7, 0],
        ],
        tired: [[-3, -2]],
        sleeping: [
            [-2, 0],
            [-2, -1],
        ],
        N: [
            [-1, -2],
            [-1, -3],
        ],
        NE: [
            [0, -2],
            [0, -3],
        ],
        E: [
            [-3, 0],
            [-3, -1],
        ],
        SE: [
            [-5, -1],
            [-5, -2],
        ],
        S: [
            [-6, -3],
            [-7, -2],
        ],
        SW: [
            [-5, -3],
            [-6, -1],
        ],
        W: [
            [-4, -2],
            [-4, -3],
        ],
        NW: [
            [-1, 0],
            [-1, -1],
        ],
    };
    function create() {
        nekoEl.id = "oneko";
        nekoEl.style.width = "32px";
        nekoEl.style.height = "32px";
        nekoEl.style.position = "fixed";
        nekoEl.style.backgroundImage = "url('./oneko.gif')";
        nekoEl.style.imageRendering = "pixelated";
        nekoEl.style.left = `${nekoPosX}px`;
        nekoEl.style.top = `${nekoPosY}px`;

        document.body.appendChild(nekoEl);

        window.onekoInterval = setInterval(frame, 100);
    }

    function setSprite(name, frame) {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${
            sprite[1] * 32
        }px`;
    }

    function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
    }

    function idle() {
        idleTime += 1;

        // every ~ 5-10 seconds
        if (
            idleTime > 50 &&
            Math.floor(Math.random() * 100) == 0 &&
            idleAnimation == null
        ) {
            idleAnimation = "sleeping";
        }

        switch (idleAnimation) {
            case "sleeping":
                if (idleAnimationFrame < 8) {
                    setSprite("tired", 0);
                    break;
                }
                setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                if (idleAnimationFrame > 192) {
                    resetIdleAnimation();
                    idleTime = 0; // Reset idleTime after sleeping
                }
                break;
            default:
                setSprite("idle", 0);
                return;
        }
        idleAnimationFrame += 1;
    }

    function frame() {
        frameCount += 1;

        // If idle, run the idle function and return
        if (idleAnimation !== null) {
            idle();
            return;
        }

        // If neko reaches the right edge of the line, turn around
        if (nekoPosX > lineStart + lineLength - 32) {
            nekoSpeed = -Math.abs(nekoSpeed); // Ensure nekoSpeed is negative
            setSprite("W", frameCount); // Set walking west sprite
        }
        // If neko reaches the left edge of the line, turn around
        else if (nekoPosX < lineStart) {
            nekoSpeed = Math.abs(nekoSpeed); // Ensure nekoSpeed is positive
            setSprite("E", frameCount); // Set walking east sprite
        }
        else{
             nekoSpeed > 0 ? setSprite("E", frameCount) : setSprite("W", frameCount);
        }

        nekoPosX += nekoSpeed;

        nekoEl.style.left = `${nekoPosX}px`;
        nekoEl.style.top = `${nekoPosY}px`;
        
        // Randomly decide to become idle
        if (Math.floor(Math.random() * 250) == 0) {
            idleAnimation = null;
            idleTime = 1;
        }
    }

    create();
})();
