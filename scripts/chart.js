
var testprojects = [
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
]

function getCurvePoints(width, height) {
    var w2 = width / 2
    return [
        { x: 1, y: height-1 },
        { x: w2-100, y: height-1 },
        { x: w2-150, y: 1 },
        { x: w2, y: 1 },
        { x: w2, y: 1 },
        { x: w2+150, y: 1 },
        { x: w2+100, y: height-1 },
        { x: width-1, y: height-1 }
    ]
}

function renderChart(canvas, width, height) {
    var ctx = canvas.getContext('2d')
    
    var w2 = width / 2
    var pts = getCurvePoints(width, height)
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    ctx.bezierCurveTo(pts[1].x, pts[1].y, pts[2].x, pts[2].y, pts[3].x, pts[3].y)
    ctx.bezierCurveTo(pts[5].x, pts[5].y, pts[6].x, pts[6].y, pts[7].x, pts[7].y)
    ctx.stroke()
    
    ctx.setLineDash([2, 4]);
    ctx.moveTo(w2,1)
    ctx.lineTo(w2,height-1)
    ctx.stroke()
}

function pointOnHillCurve(value, pts) {

    // https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Cubic_B%C3%A9zier_curves
    var t = value / 100
    if (t <= 0.5) {
        x = Math.pow(1-t,3)*pts[0].x + 3*Math.pow(1-t,2)*t*pts[1].x + 3*(1-t)*t*t*pts[2].x + t*t*t*pts[3].x
        y = Math.pow(1-t,3)*pts[0].y + 3*Math.pow(1-t,2)*t*pts[1].y + 3*(1-t)*t*t*pts[2].y + t*t*t*pts[3].y
    } else {
        t = t - 0.5
        x = Math.pow(1-t,3)*pts[4].x + 3*Math.pow(1-t,2)*t*pts[5].x + 3*(1-t)*t*t*pts[6].x + t*t*t*pts[7].x
        y = Math.pow(1-t,3)*pts[4].y + 3*Math.pow(1-t,2)*t*pts[5].y + 3*(1-t)*t*t*pts[6].y + t*t*t*pts[7].y
    }
    return { x: x, y: y }
}

function renderLegend() {
}

function renderBacklogItem(canvas, item, width, canvasWidth, canvasHeight) {
    var ctx = canvas.getContext('2d')

    var center = pointOnHillCurve()

    context.beginPath();
    context.arc(center.x, center.y, width/2, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = item.color;
    context.stroke();
}