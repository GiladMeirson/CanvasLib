export class Component {
  constructor(ctx,shape,x,y,width,height,color,outlineColor,lineWidth,id) {
    this.Ctx=ctx;
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

  draw(){
    if (this.Color == 'transparent') {
        if (this.Shape == 'circle') {
            this.Ctx.beginPath();
           this.CenterX=this.X;
            this.CenterY=this.Y;
            this.Ctx.arc(this.CenterX, this.CenterY, this.Width/2, 0, Math.PI * 2, false);
            this.Radius = this.Width/2;
            this.Ctx.strokeStyle = this.OutlineColor; // Set the stroke color
            this.Ctx.lineWidth = this.LineWidth; // Set the stroke width
            this.Ctx.stroke(); // Draw the outline
            this.Ctx.closePath();
        }
        else if (this.Shape == 'sqaure') {
            this.Ctx.strokeStyle = this.OutlineColor; // Set the stroke color
            this.Ctx.lineWidth = this.LineWidth; // Set the stroke width
            this.Ctx.strokeRect(this.X, this.Y, this.Width, this.Height); // Draw the outline
        }
        else if (this.Shape == 'triangle') {
            this.Ctx.beginPath();
            this.Ctx.moveTo(this.X, this.Y);
            this.Ctx.lineTo(this.X+this.Width, this.Y);
            this.Ctx.lineTo(this.X+this.Width/2, this.Y+this.Width);
            this.Ctx.closePath();
            this.Ctx.strokeStyle = this.OutlineColor; // Set the stroke color
            this.Ctx.lineWidth = this.LineWidth; // Set the stroke width
            this.Ctx.stroke(); // Draw the outline
        }

        else if(this.Shape == 'roundedRect'){
            this.Ctx.strokeStyle = this.OutlineColor; // Set the stroke color
            this.Ctx.lineWidth = this.LineWidth; // Set the stroke width
            roundedRect(this.Ctx,this.X,this.Y,this.Width,this.Height,10);

        }
    }

    else{

        if (this.Shape == 'circle') {
            this.Ctx.beginPath();
            this.CenterX=this.X;
            this.CenterY=this.Y;
            this.Ctx.arc(this.CenterX, this.CenterY, this.Width/2, 0, Math.PI * 2, false);
            this.Radius = this.Width/2;
        
            this.Ctx.fillStyle = this.Color;
            this.Ctx.fill();
            this.Ctx.closePath();
            
        }
        else if (this.Shape == 'sqaure') {
            this.Ctx.fillStyle = this.Color;
            this.Ctx.fillRect(this.X, this.Y, this.Width, this.Height);
        }
        else if (this.Shape == 'triangle') {
            this.Ctx.beginPath();
            this.Ctx.moveTo(this.X, this.Y);
            this.Ctx.lineTo(this.X+this.Width, this.Y);
            this.Ctx.lineTo(this.X+this.Width/2, this.Y+this.Width);
            this.Ctx.fillStyle = this.Color;
            this.Ctx.fill();
            this.Ctx.closePath();
        }

        else if(this.Shape == 'roundedRect'){
            this.Ctx.strokeStyle = this.OutlineColor; // Set the stroke color
            this.Ctx.lineWidth = this.LineWidth; // Set the stroke width
            roundedRect(this.Ctx,this.X,this.Y,this.Width,this.Height,10);
            this.Ctx.fillStyle = this.Color;
            this.Ctx.fill();
        }
    }

    return this;

}

    shadow(color,blur,offsetX,offsetY){
        this.Ctx.shadowColor = color;
        this.Ctx.shadowBlur = blur;
        this.Ctx.shadowOffsetX = offsetX;
        this.Ctx.shadowOffsetY = offsetY;
        return this;
    }

    resetShadow(){
        this.Ctx.shadowColor = 'transparent';
        this.Ctx.shadowBlur = 0;
        this.Ctx.shadowOffsetX = 0;
        this.Ctx.shadowOffsetY = 0;
        return this;
    
    }

    rotate(angle){
        this.Ctx.translate(this.CenterX, this.CenterY);
        this.Ctx.rotate(angle * Math.PI / 180);
        this.Ctx.translate(-this.CenterX, -this.CenterY);
        return this;
    }

    linearGRD(colors){
        let grd = this.Ctx.createLinearGradient(this.X, this.Y, this.X+this.Width, this.Y+this.Height);
        colors.forEach((color,index)=>{
            grd.addColorStop(index/colors.length, color);
        });
        this.Ctx.fillStyle = grd;
        this.Color=grd;
        return this;
    }
    
    radialGRD(colors){
        let grd = this.Ctx.createRadialGradient(this.CenterX, this.CenterY, 0, this.CenterX, this.CenterY, this.Width);
        colors.forEach((color,index)=>{
            grd.addColorStop(index/colors.length, color);
        });
        this.Ctx.fillStyle = grd;
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



    onKeyBoard_left(func){
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                func();
            }
        });
        return this;

    }
    onKeyBoard_right(func){
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                func();
            }
        });
        return this;

    }
    onKeyBoard_up(func){
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') {
                func();
            }
        });
        return this;

    }
    onKeyBoard_down(func){
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown') {
                func();
            }
        });
        return this;

    }

    onKeyBoard_space(func){
        window.addEventListener('keydown', (event) => {
            if (event.key === ' ') {
                func();
            }
        });
        return this;

    }

    onKeyBoard_enter(func){
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                func();
            }
        });
        return this;

    }

    onKeyBoard_A(func){
        window.addEventListener('keydown', (event) => {
            if (event.key === 'a') {
                func();
            }
        });
        return this;
    }

    onKeyBoard_D(func){
        window.addEventListener('keydown', (event) => {
            if (event.key === 'd') {
                func();
            }
        });
        return this;
    }

    onKeyBoard_W(func){
        window.addEventListener('keydown', (event) => {
            if (event.key === 'w') {
                func();
            }
        });
        return this;
    }

    onKeyBoard_S(func){
        window.addEventListener('keydown', (event) => {
            if (event.key === 's') {
                func();
            }
        });
        return this;
    }
    
}





export class TextComponent{
    constructor(ctx,x,y,text,font,fontSize,color,outlineColor,id){
        this.X=x;
        this.Y=y;
        this.Text=text;
        this.Font=fontSize+'px '+font;
        this.Color=color;
        this.Ctx=ctx;
        this.OutlineColor=outlineColor;
        this.Id = id==undefined || id==null || id==''?Math.random().toString(36).substring(7):id;

    }

    draw(){
        if (this.Color!='transparent') {
            this.Ctx.font = this.Font;
            this.Ctx.fillStyle = this.Color;
            this.Ctx.fillText(this.Text, this.X, this.Y);
            return this;
        }
        else{
            this.Ctx.font = this.Font;
            this.Ctx.strokeStyle = this.OutlineColor;
            this.Ctx.strokeText(this.Text, this.X, this.Y);
            return this;
        }

    }

    resetShadow(){
        this.Ctx.shadowColor = 'transparent';
        this.Ctx.shadowBlur = 0;
        this.Ctx.shadowOffsetX = 0;
        this.Ctx.shadowOffsetY = 0;
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