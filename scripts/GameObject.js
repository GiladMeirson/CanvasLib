
export  class GameObject{
    constructor(x,y,shape,size,outLineOnly,color,outlineColor,lineWidth){
        this.CenterX = x+size/2;
        this.CenterY = y+size/2;
        this.Shape = shape;
        this.Size = size;
        this.Color = color;
        this.OutlineColor = outlineColor;
        this.X=x;
        this.Y=y;
        this.OutLineOnly = outLineOnly;
        this.LineWidth = lineWidth;

    }
    draw(ctx){
        if (this.OutLineOnly) {
            if (this.Shape == 'circle') {
                ctx.beginPath();
                ctx.arc(this.CenterX, this.CenterY, this.Size/2, 0, Math.PI * 2, false);
                ctx.strokeStyle = this.Color; // Set the stroke color
                ctx.lineWidth = this.LineWidth; // Set the stroke width
                ctx.stroke(); // Draw the outline
                ctx.closePath();
            }
            else if (this.Shape == 'sqaure') {
                ctx.strokeStyle = this.Color; // Set the stroke color
                ctx.lineWidth = this.LineWidth; // Set the stroke width
                ctx.strokeRect(this.X-this.Size/2, this.Y-this.Size/2, this.Size, this.Size); // Draw the outline
            }
            else if (this.Shape == 'triangle') {
                ctx.beginPath();
                ctx.moveTo(this.X, this.Y);
                ctx.lineTo(this.X+this.Size, this.Y);
                ctx.lineTo(this.X+this.Size/2, this.Y+this.Size);
                ctx.closePath();
                ctx.strokeStyle = this.Color; // Set the stroke color
                ctx.lineWidth = this.LineWidth; // Set the stroke width
                ctx.stroke(); // Draw the outline
            }
        }

        else{

            if (this.Shape == 'circle') {
                ctx.beginPath();
                ctx.arc(this.CenterX, this.CenterY, this.Size/2, 0, Math.PI * 2, false);
                ctx.fillStyle = this.Color;
                ctx.fill();
                ctx.closePath();
                
            }
            else if (this.Shape == 'sqaure') {
                ctx.fillStyle = this.Color;
                ctx.fillRect(this.X-this.Size/2, this.Y-this.Size/2, this.Size, this.Size);
            }
            else if (this.Shape == 'triangle') {
                ctx.beginPath();
                ctx.moveTo(this.X, this.Y);
                ctx.lineTo(this.X+this.Size, this.Y);
                ctx.lineTo(this.X+this.Size/2, this.Y+this.Size);
                ctx.fillStyle = this.Color;
                ctx.fill();
                ctx.closePath();
            }
        }



    }


}
