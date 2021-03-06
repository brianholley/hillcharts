
class Feature {
    public name: string;
    public hill_progress: number;
    public color: string;
}

let testfeatures : Feature[] = [
    {
        name: "A",
        hill_progress: 0,
        color: '#ff0000'
    },
    {
        name: "B",
        hill_progress: 25,
        color: '#0000ff'
    }
];

class Point {
    public x: number;
    public y: number;
}

function getCurvePoints(width: number, height: number, margin: number) : Point[] {
    let w2 = width / 2;
    return [
        { x: margin, y: height-margin },
        { x: w2-100, y: height-margin },
        { x: w2-150, y: margin },
        { x: w2, y: margin },
        { x: w2, y: margin },
        { x: w2+150, y: margin },
        { x: w2+100, y: height-margin },
        { x: width-margin, y: height-margin }
    ];
}

function renderChart(canvas: HTMLCanvasElement, width: number, height: number, margin: number) {
    console.log(`renderChart ${width}x${height}, margin=${margin}`)

    let ctx = canvas.getContext('2d');
    
    let w2 = width / 2;
    let pts = getCurvePoints(width, height, margin);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.bezierCurveTo(pts[1].x, pts[1].y, pts[2].x, pts[2].y, pts[3].x, pts[3].y);
    ctx.bezierCurveTo(pts[5].x, pts[5].y, pts[6].x, pts[6].y, pts[7].x, pts[7].y);
    ctx.stroke();
    
    ctx.setLineDash([2, 4]);
    ctx.moveTo(w2,1);
    ctx.lineTo(w2,height-1);
    ctx.stroke();

    for (var f of testfeatures) {
        renderBacklogItem(canvas, f, 24, width, height, margin);
    }
    console.log(`renderChart complete`);
}

function pointOnHillCurve(value: number, pts: Point[]) : Point {

    // https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Cubic_B%C3%A9zier_curves
    var t = value / 100;
    if (t <= 0.5) {
        let x = Math.pow(1-t,3)*pts[0].x + 3*Math.pow(1-t,2)*t*pts[1].x + 3*(1-t)*t*t*pts[2].x + t*t*t*pts[3].x;
        let y = Math.pow(1-t,3)*pts[0].y + 3*Math.pow(1-t,2)*t*pts[1].y + 3*(1-t)*t*t*pts[2].y + t*t*t*pts[3].y;
        return {x: x, y: y};
    } else {
        t = t - 0.5;
        let x = Math.pow(1-t,3)*pts[4].x + 3*Math.pow(1-t,2)*t*pts[5].x + 3*(1-t)*t*t*pts[6].x + t*t*t*pts[7].x;
        let y = Math.pow(1-t,3)*pts[4].y + 3*Math.pow(1-t,2)*t*pts[5].y + 3*(1-t)*t*t*pts[6].y + t*t*t*pts[7].y;
        return {x: x, y: y};
    }
}

function renderLegend() {
}

function renderBacklogItem(
    canvas: HTMLCanvasElement, 
    item: Feature, 
    width: number, 
    canvasWidth: number, 
    canvasHeight: number, 
    canvasMargin: number) {

    let ctx = canvas.getContext('2d');

    let pts = getCurvePoints(canvasWidth, canvasHeight, canvasMargin);
    let center = pointOnHillCurve(item.hill_progress, pts);

    console.log(`Project ${item.name}: ${item.hill_progress} -> ${center.x},${center.y}`);

    ctx.beginPath();
    ctx.arc(center.x, center.y, width/2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.setLineDash([]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = item.color;
    ctx.stroke();
}