export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
        // ctx.lineWidth = 10;
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}

export class PlanetComposable {
    constructor(position, renderAlgorithm, moveAlgorithm) {
        this.position = position;
        this.offset = new Position(0, 0);
        this.renderAlgorithm = renderAlgorithm;
        this.moveAlgorithm = moveAlgorithm;
    }
    move() {
        if (this.moveAlgorithm) {
            this.moveAlgorithm.move(this.position, this.offset);
        }
    }
    render(ctx) {
        if (this.renderAlgorithm) {
            this.renderAlgorithm.render(ctx, this.position);
        }
    }
}

export class Sun extends Planet {
    constructor(position) {
        super('red', 'yellow', position, 100);
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

export class Earth extends RotatedPlanet {
    constructor(center, radius) {
        super('green', 'blue', 40, center, radius, 0.03);
    }
    render(ctx) {
        super.render(ctx);
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.position.x - 10, this.position.y, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export class Mars extends RotatedPlanet {
    constructor(center, radius) {
        super('lightsalmon', 'palevioletred', 20, center, radius, 0.05);
    }
    render(ctx) {
        super.render(ctx);
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.position.x - 5, this.position.y, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export class Moon extends RotatedPlanet {
    constructor(center, radius) {
        super('gray', 'palevioletred', 5, center, radius, -0.1);
    }
    render(ctx) {
        super.render(ctx);
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
export class RenderSquarePlanetAlgorithm {
    constructor(color, atmosphere, size) {
        this.color = color;
        this.atmosphere = atmosphere;
        this.size = size;
    }
    render(ctx, position) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.strokeStyle = this.atmosphere;
        ctx.rect(position.x, position.y, this.size, this.size);
        ctx.stroke();
        ctx.fill();
    }
}
export class MoveRotateAlgorithm {
    constructor(radius, speed) {
        this.radius = radius;
        this.speed = speed;
        this.alpha = 0;
    }
    move(position, offset) {
        this.alpha += this.speed / Math.PI;
        position.x = this.radius * Math.sin(this.alpha) + offset.x;
        position.y = this.radius * Math.cos(this.alpha) + offset.y;
        if (this.alpha >= 2 * Math.PI) this.alpha = 0;
    }
}