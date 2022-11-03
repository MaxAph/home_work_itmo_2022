import {
    Earth,
    Mars,
    Moon,
    MoveRotateAlgorithm,
    PlanetComposable,
    Position,
    RenderCirclePlanetAlgorithm,
    RenderSquarePlanetAlgorithm,
    RotatedPlanet,
    Sun,
} from './src/solar_system.js';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#f1f1f1';

document.getElementById('app').append(canvas);

const ctx = canvas.getContext('2d');

const sun = new Sun(new Position(canvas.width / 2, canvas.height / 2));
const earth = new Earth(sun.position, sun.size + 100);
const mars = new Mars(sun.position, sun.size + 250);
const moon = new Moon(earth.position, earth.size + 30);

const planets = [sun, earth, moon, mars];

window.requestAnimationFrame(renderPlanets);

const r1 = new RenderCirclePlanetAlgorithm('blue', 'lightblue', 50);
const r2 = new RenderSquarePlanetAlgorithm('red', 'lightblue', 30);
const m1 = new MoveRotateAlgorithm(150, 0.04);

const planetComposable = new PlanetComposable(new Position(100, 100), r1, m1);

document.onclick = (e) => {
    planetComposable.offset = new Position(e.pageX, e.pageY);
    if (planetComposable.renderAlgorithm instanceof RenderCirclePlanetAlgorithm) {
        planetComposable.renderAlgorithm = r2;
    } else planetComposable.renderAlgorithm = r1;
    asteroids.push(createRandomAsteroids(e.pageX, e.pageY));
};

const asteroids = new Array(5).fill(10).map(() => createRandomAsteroids());

function renderPlanets() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    planetComposable.move();

    renderAsteroids(canvas, asteroids);

    planets.forEach((item) => {
        if (item instanceof RotatedPlanet) {
            item.rotate();
        }
        item.render(ctx);
    });
    planetComposable.render(ctx);

    window.requestAnimationFrame(renderPlanets);
}
function renderAsteroids(canvas, array) {
    const ctx = canvas.getContext('2d');
    let counter = array.length;
    const draw = (index) => {
        const position = array[index];
        ctx.fillStyle = 'black';
        ctx.fillRect(position.x, position.y, 10, 10);
        ctx.stroke();
        ctx.fill();
        if (++index < counter) draw(index);
    };
    draw(0);
}
function randomRange(max, min = 0) {
    if(isNaN(max) || isNaN(min)) throw new Error('randomRange - error: "Input parameters  must')
    return Math.random() * (max - min) + min;
}
function createRandomAsteroids(x, y) {
    const borderSize = 40;
    const randomX = x || randomRange(canvas.width - borderSize, borderSize);
    const randomY = y || randomRange(canvas.height - borderSize, borderSize);
    return new Position(randomX, randomY);
}

window.requestAnimationFrame(renderPlanets);