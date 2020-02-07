/**
 * Created by ��ٻ on 2017/4/3.
 */
class Circle {
    //��������
    //��һ��ԲΪ����
    //��������� x��y���꣬r�뾶��_mx��_my�ƶ��ľ���
    //this.r�Ǵ���Բ�İ뾶������Խ��뾶Խ��
    //this._mx,this._my���ƶ��ľ��룬����Խ���ƶ�
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 10 ;
        this._mx = Math.random() ;
        this._my = Math.random() ;

    }

    //canvas ��Բ�ͻ�ֱ��
    //��Բ������������canvas��һ��Բ
    //��ֱ��������Բ���ߣ�Ϊ�˱���ֱ�߹��࣬��ԲȦ����������һ��ֵ�������Զ��ԲȦ���Ͳ������ߴ���
    drawCircle(ctx) {
        ctx.beginPath();
        //arc() ����ʹ��һ�����ĵ�Ͱ뾶��Ϊһ�������ĵ�ǰ��·������һ������
        ctx.arc(this.x, this.y, this.r, 0, 360)
        ctx.closePath();
        ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
        ctx.fill();
    }

    drawLine(ctx, _circle) {
        let dx = this.x - _circle.x;
        let dy = this.y - _circle.y;
        let d = Math.sqrt(dx * dx + dy * dy)
        if (d < 150) {
            ctx.beginPath();
            //��ʼһ��·�����ƶ���λ�� this.x,this.y����������λ�� _circle.x,_circle.y ��һ���ߣ�
            ctx.moveTo(this.x, this.y);   //��ʼ��
            ctx.lineTo(_circle.x, _circle.y);   //�յ�
            ctx.closePath();
            ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
            ctx.stroke();
        }
    }

    // ԲȦ�ƶ�
    // ԲȦ�ƶ��ľ����������Ļ��Χ��
    move(w, h) {
        this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
        this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
        this.x += this._mx / 2;
        this.y += this._my / 2;
    }
}
//���㻭Բ��˸�䶯
class currentCirle extends Circle {
    constructor(x, y) {
        super(x, y)
    }

    drawCircle(ctx) {
        ctx.beginPath();
        //ע������Ϊ��꽹��ĵط�ԲȦ�뾶�仯
        //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
        this.r = 8;
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.closePath();
        //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
        ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
        ctx.fill();

    }
}
//����ҳ����requestAnimationFrame���setTimeout
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let w = canvas.width = canvas.offsetWidth;
let h = canvas.height = canvas.offsetHeight;
let circles = [];
let current_circle = new currentCirle(0, 0)

let draw = function () {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < circles.length; i++) {
        circles[i].move(w, h);
        circles[i].drawCircle(ctx);
        for (j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(ctx, circles[j])
        }
    }
    if (current_circle.x) {
        current_circle.drawCircle(ctx);
        for (var k = 1; k < circles.length; k++) {
            current_circle.drawLine(ctx, circles[k])
        }
    }
    requestAnimationFrame(draw)
}

let init = function (num) {
    for (var i = 0; i < num; i++) {
        circles.push(new Circle(Math.random() * w, Math.random() * h));
    }
    draw();
}
window.addEventListener('load', init(60));
window.onmousemove = function (e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
}
window.onmouseout = function () {
    current_circle.x = null;
    current_circle.y = null;

};