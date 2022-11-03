export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class RenderCirclePlanetAlgorithm {
    constructor(color, atmosphere, size) {
        this.color = color;
        this.atmosphere = atmosphere;
        this.size = size;
    }
    render(ctx, position) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.strokeStyle = this.atmosphere;
        ctx.arc(position.x, position.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}

export class MoveRotateAlgorithm {
    constructor(center, radius, speed) {
        this.center = center;
        this.radius = radius;
        this.speed = speed;
        this.alpha = 0;
    }
    move(position) {
        this.alpha += this.speed / Math.PI;
        position.x = this.radius * Math.sin(this.alpha) + this.center.x;
        position.y = this.radius * Math.cos(this.alpha) + this.center.y;
        if (this.alpha >= 2 * Math.PI) this.alpha = 0;
    }
}

export class Planet {
    constructor(color, atmosphere, position, size) {
        this.color = color;
        this.atmosphere = atmosphere;
        this.position = position;
        this.size = size;
    }
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.strokeStyle = this.atmosphere;
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}
export class PlanetComposable {
    constructor(position, renderAlgorithm, moveAlgorithm) {
        this.position = position;
        this.renderAlgorithm = renderAlgorithm;
        this.moveAlgorithm = moveAlgorithm;
    }
    move() {
        if (this.moveAlgorithm) {
            this.moveAlgorithm.move(this.position);
        }
    }
    render(ctx) {
        if (this.renderAlgorithm) {
            this.renderAlgorithm.render(ctx, this.position);
        }
    }
}
export class RotatedPlanet extends Planet {
    constructor(color, atmosphere, size, center, radius, speed) {
        super(color, atmosphere, new Position(center.x + radius + size, center.y + radius + size), size);
        this.radius = radius;
        this.center = center;
        this.alpha = 0;
        this.speed = speed;
    }
    rotate() {
        this.alpha += this.speed / Math.PI;
        this.position.x = this.radius * Math.sin(this.alpha) + this.center.x;
        this.position.y = this.radius * Math.cos(this.alpha) + this.center.y;
        if (this.alpha >= 2 * Math.PI) this.alpha = 0;
    }
}
export class Sun extends Planet {
    constructor(position) {
        super('yellow', 'red', position, 100);
    }
}
export class Mars extends RotatedPlanet {
    constructor(center, radius) {
        super('red', 'pink', 20, center, radius, 0.03);
    }
    render(ctx) {
        super.render(ctx);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.position.x - 10, this.position.y, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}
export class Earth extends RotatedPlanet {
    constructor(center, radius) {
        super('green', 'blue', 40, center, radius, 0.01);
    }
    render(ctx) {
        super.render(ctx);
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}
export class Moon extends RotatedPlanet {
    constructor(center, radius) {
        super('white', 'gray', 15, center, radius, -0.1);
    }
    render(ctx) {
        super.render(ctx);
        ctx.fillStyle = 'gray';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}