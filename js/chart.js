
function renderChart(canvas, width, height) {
    var ctx = canvas.getContext('2d')
    
    var w2 = width / 2
    ctx.beginPath()
    ctx.moveTo(1, height)
    ctx.bezierCurveTo(w2-100, height-1, w2-150, 1, w2, 1)
    ctx.bezierCurveTo(w2+150, 1, w2+100, height-1, width-1, height-1)
    ctx.stroke()
    
    ctx.setLineDash([2, 4]);
    ctx.moveTo(w2,1)
    ctx.lineTo(w2,height-1)
    ctx.stroke()
}

function renderLegend() {
}

function renderBacklogItem() {
}