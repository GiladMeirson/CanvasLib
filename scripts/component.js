export class Component {
  constructor(shape,x,y,width,height,color,outlineColor,lineWidth,id) {
    this.CenterX = x+width/2;
    this.CenterY = y+height/2;
    this.Rightest = x+width+lineWidth/2;
    this.Bottomest = y+height;
    this.Topest = y;
    this.Leftest = x-lineWidth/2;
    this.Shape = shape;
    this.Width = width;
    this.Height = height;
    this.Color = color;
    this.OutlineColor = outlineColor;
    this.X=x;
    this.Y=y;
    this.Id = id==undefined || id==null || id==''?Math.random().toString(36).substring(7):id;
    this.LineWidth = lineWidth;
  }

  draw(ctx){
    if (this.Color == 'transparent') {
        if (this.Shape == 'circle') {
            ctx.beginPath();
           this.CenterX=this.X;
            this.CenterY=this.Y;
            ctx.arc(this.CenterX, this.CenterY, this.Width/2, 0, Math.PI * 2, false);
            this.Radius = this.Width/2;
            ctx.strokeStyle = this.OutlineColor; // Set the stroke color
            ctx.lineWidth = this.LineWidth; // Set the stroke width
            ctx.stroke(); // Draw the outline
            ctx.closePath();
        }
        else if (this.Shape == 'sqaure') {
            ctx.strokeStyle = this.OutlineColor; // Set the stroke color
            ctx.lineWidth = this.LineWidth; // Set the stroke width
            ctx.strokeRect(this.X, this.Y, this.Width, this.Height); // Draw the outline
        }
        else if (this.Shape == 'triangle') {
            ctx.beginPath();
            ctx.moveTo(this.X, this.Y);
            ctx.lineTo(this.X+this.Width, this.Y);
            ctx.lineTo(this.X+this.Width/2, this.Y+this.Width);
            ctx.closePath();
            ctx.strokeStyle = this.OutlineColor; // Set the stroke color
            ctx.lineWidth = this.LineWidth; // Set the stroke width
            ctx.stroke(); // Draw the outline
        }

        else if(this.Shape == 'roundedRect'){
            ctx.strokeStyle = this.OutlineColor; // Set the stroke color
            ctx.lineWidth = this.LineWidth; // Set the stroke width
            roundedRect(ctx,this.X,this.Y,this.Width,this.Height,10);

        }
    }

    else{

        if (this.Shape == 'circle') {
            ctx.beginPath();
            this.CenterX=this.X;
            this.CenterY=this.Y;
            ctx.arc(this.CenterX, this.CenterY, this.Width/2, 0, Math.PI * 2, false);
            this.Radius = this.Width/2;
        
            ctx.fillStyle = this.Color;
            ctx.fill();
            ctx.closePath();
            
        }
        else if (this.Shape == 'sqaure') {
            ctx.fillStyle = this.Color;
            ctx.fillRect(this.X, this.Y, this.Width, this.Height);
        }
        else if (this.Shape == 'triangle') {
            ctx.beginPath();
            ctx.moveTo(this.X, this.Y);
            ctx.lineTo(this.X+this.Width, this.Y);
            ctx.lineTo(this.X+this.Width/2, this.Y+this.Width);
            ctx.fillStyle = this.Color;
            ctx.fill();
            ctx.closePath();
        }

        else if(this.Shape == 'roundedRect'){
            ctx.strokeStyle = this.OutlineColor; // Set the stroke color
            ctx.lineWidth = this.LineWidth; // Set the stroke width
            roundedRect(ctx,this.X,this.Y,this.Width,this.Height,10);
            ctx.fillStyle = this.Color;
            ctx.fill();
        }
    }

    return this;

}

    shadow(ctx,color,blur,offsetX,offsetY){
        ctx.shadowColor = color;
        ctx.shadowBlur = blur;
        ctx.shadowOffsetX = offsetX;
        ctx.shadowOffsetY = offsetY;
        return this;
    }

    rotate(ctx,angle){
        ctx.translate(this.CenterX, this.CenterY);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-this.CenterX, -this.CenterY);
        return this;
    }

    colorGRD(ctx,colors){
        let grd = ctx.createLinearGradient(this.X, this.Y, this.X+this.Width, this.Y+this.Height);
        colors.forEach((color,index)=>{
            grd.addColorStop(index/colors.length, color);
        });
        ctx.fillStyle = grd;
        this.Color=grd;
        return this;
    }

    left(num=1){
        this.X-=num;
        return this;
    
    }
    right(num=1){
        this.X+=num;
        return this;
    
    }
    up(num=1){
        this.Y-=num;
        return this;
    
    }
    down(num=1){
        this.Y+=num;
        return this;
    
    }
    
}


function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    // you can fill or stroke the rectangle as you wish, for example:
    ctx.stroke();
}