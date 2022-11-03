import { Earth, Mars, Moon, PlanetComposable, Position, RotatedPlanet, Sun, MoveRotateAlgorithm,RenderCirclePlanetAlgorithm } from './src/solar_system.js';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#f1f1f1';

document.getElementById('app').append(canvas);

const ctx = canvas.getContext('2d');
const sun = new Sun(new Position(canvas.width / 2, canvas.height / 2));
const earth = new Earth(sun.position, sun.size + 100);
const mars = new Mars(sun.position, sun.size + 300);
const moon = new Moon(earth.position, earth.size + 20);

const planets = [sun, earth, mars, moon];

window.requestAnimationFrame(renderPlanets);

function renderPlanets() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    planetComposable.render(ctx);
    planetComposable.move();

    planets.forEach((item) => {
        if (item instanceof RotatedPlanet) {
            item.rotate();
        }
        item.render(ctx);
    });

    window.requestAnimationFrame(renderPlanets);
}




const planetComposable = new PlanetComposable(
    new Position(100, 100),
    new RenderCirclePlanetAlgorithm('blye', 'black', 50),
    new MoveRotateAlgorithm(sun.position, 100, 0.04)
);
document.onclick = (e) => {
    planetComposable.offset = new Position(e.pageX, e.pageY);
};