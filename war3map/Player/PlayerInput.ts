export class PlayerInput {
    public up: boolean = false;
    public down: boolean = false;
    public left: boolean = false;
    public right: boolean = false;


    public isInputActive() {
        return (this.up || this.left || this.down || this.right);
    }

    public getInputDirection() {
        let x = 0;
        let y = 0;
        if (this.up) y = -1;
        if (this.left) x = -1;
        if (this.down) y = +1;
        if (this.right) x = +1;
        let radians =  math.atan(y, x);
        return -(radians * 180 / Math.PI);

    }
}