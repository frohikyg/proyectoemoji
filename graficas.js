/* Pie chart based on the pen by aaronlsilber (http://codepen.io/aaronlsilber/pen/IqrkL) which is based on an article by James Litten (http://html5.litten.com/graphing-data-in-the-html5-canvas-element-part-iv-simple-pie-charts/) */

/* Pie Chart Javascript
=====================================================================*/
var pieColors = ['rgb(236, 208, 120)', 'rgba(217, 91, 67, 0.7)', 'rgba(192, 41, 66, 0.7)', 'rgba(84, 36, 55, 0.7)', 'rgba(83, 119, 122, 0.7)', 'rgba(119, 146, 174, 0.7)'];

function getTotal( arr ){
    var j,
        myTotal = 0;
    
    for( j = 0; j < arr.length; j++) {
        myTotal += ( typeof arr[j] === 'number' ) ? arr[j] : 0;
    }
    
    return myTotal;
}

function drawPieChart( canvasId ) {
    var i,
        canvas = document.getElementById( canvasId ),
        pieData = canvas.dataset.values.split(',').map( function(x){ return parseInt( x, 10 )}),
        halfWidth = canvas.width * .5,
        halfHeight = canvas.height * .5,
        ctx = canvas.getContext( '2d' ),
        lastend = 0,
        myTotal = getTotal(pieData);

    ctx.clearRect( 0, 0, canvas.width, canvas.height );

    for( i = 0; i < pieData.length; i++) {
        ctx.fillStyle = pieColors[i];
        ctx.beginPath();
        ctx.moveTo( halfWidth, halfHeight );
        ctx.arc( halfWidth, halfHeight, halfHeight, lastend, lastend + ( Math.PI * 2 * ( pieData[i] / myTotal )), false );
        ctx.lineTo( halfWidth, halfHeight );
        ctx.fill();
        lastend += Math.PI * 2 * ( pieData[i] / myTotal );
    }
}

drawPieChart('canPie');

/* Peak Chart Javascript
=====================================================================*/
var peakColors = ['rgb(236, 208, 120)', 'rgba(217, 91, 67, 0.7)', 'rgba(192, 41, 66, 0.7)', 'rgba(84, 36, 55, 0.7)', 'rgba(83, 119, 122, 0.7)', 'rgba(119, 146, 174, 0.7)'];

function drawPeakChart( canvasId ) {
    var i, start, peakPoint,
        canvas = document.getElementById( canvasId ),
        peakData = canvas.dataset.values.split(',').map( function(x){ return parseInt( x, 10 )}),
        ctx = canvas.getContext( '2d' ),
        max = Math.max.apply( Math, peakData ),
        plotBase = canvas.width / peakData.length,
        overlap = plotBase * .4;
        plotBase += canvas.width * .05;
    
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    
    for( i = 0; i < peakData.length; i++) {
        start = i === 0 ? 0 : i * plotBase - i * overlap;
        peakPoint = canvas.height - Math.round( canvas.height * ( peakData[i] / max ) );
        ctx.fillStyle = peakColors[i];
        ctx.beginPath();
        ctx.moveTo( start, canvas.height );
        ctx.lineTo( start + plotBase * .5, peakPoint );
        ctx.lineTo( start + plotBase, canvas.height );
        ctx.lineTo( start, canvas.height );
        ctx.fill();
    }
}

drawPeakChart('canPeak');

/* Bar Chart Javascript
=====================================================================*/
var barColors = ['rgb(236, 208, 120)', 'rgba(217, 91, 67, 0.7)', 'rgba(192, 41, 66, 0.7)', 'rgba(84, 36, 55, 0.7)', 'rgba(83, 119, 122, 0.7)', 'rgba(119, 146, 174, 0.7)'];

function drawBarChart( canvasId ) {
    var i, start, top,
        canvas = document.getElementById( canvasId ),
        barData = canvas.dataset.values.split(',').map( function(x){ return parseInt( x, 10 )}),
        ctx = canvas.getContext( '2d' ),
        max = Math.max.apply( Math, barData ),
        padding = 20,
        plotWidth = canvas.width / barData.length - padding;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for( i = 0; i < barData.length; i++) {
        start = i === 0 ? 0 : i * ( plotWidth + padding );
        top = canvas.height - Math.round( canvas.height * ( barData[i] / max ) );
        ctx.fillStyle = peakColors[i];
        ctx.fillRect( start, top, plotWidth, canvas.height - top);
    }
}

drawBarChart('canBar');