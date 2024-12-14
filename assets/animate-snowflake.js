console.log("Snow script loaded!");
const MAX_SNOWFLAKES = 200;
const snowflakes = [];

const createSnowflake = () => {
    if (snowflakes.length >= MAX_SNOWFLAKES) return;

    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    const size = Math.random() * 4 + 5;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;


    // Set the fall distance dynamically to match the document's height
    const fallDistance = `${document.documentElement.scrollHeight}px`;
    snowflake.style.setProperty('--fall-distance', fallDistance);

    const pixelsPerSecond = 200;
    const duration = document.documentElement.scrollHeight/ pixelsPerSecond;

    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + duration}s`;

    document.body.appendChild(snowflake);
    snowflakes.push(snowflake);

    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        const index = snowflakes.indexOf(snowflake);
        if (index !== -1) snowflakes.splice(index, 1);
    });
};

setInterval(createSnowflake, 100);