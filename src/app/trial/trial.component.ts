import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';

@Component( {
    selector: 'app-trial',
    templateUrl: './trial.component.html',
    styleUrls: ['./trial.component.css']
} )
export class TrialComponent implements OnInit {
    @ViewChild( 'canvas', { static: true } ) canvas: ElementRef<HTMLCanvasElement>;
    ctx: any;
    tmi: any = "j";
    space = 12;
    totalNum = 30;
    startX = -100
    hr = 0;
    min = 0;
    sec = 0;
    counter = 0;
    secRem = "";
    count = 1;
    numSmallTicks = 4;
    some: any = "";
    prevSecs = 0;

    constructor( private ngZone: NgZone ) {

    }

    ngAfterViewInit(): void {
        this.ctx = this.canvas.nativeElement.getContext( '2d' );
        this.startAnimation( 10 )
        //setInterval(()=>this.startAnimation(10),200)
        var timeoutfunc = setTimeout(()=>this.timeoutfunction(), 1000 );
    }

    ngDoCheck(): void{
    }
    
    ngOnInit() {
        //this.ngZone.runOutsideAngular( () => this.startAnimation( 10 )
        //);
        //this.startAnimation( 10 )
    }

    timeoutfunction() {
        console.log( 'INtimefunc' )
        this.currentTime();
        let timeinterval = this.some;
        var date = new Date();
        var secSinceEpoch = new Date().getTime() / 1000; //current time in seconds since epoch

        console.log( "secSinceEpoch", secSinceEpoch );
        var Seconds = date.getSeconds();
        var Minutes = date.getMinutes();
        var Hours = date.getHours();

        this.ctx.clearRect( 0, 0, 2000, 200 );
        this.drawFixedLine( parseInt( JSON.stringify( 2 * this.space * ( ( this.numSmallTicks * 2 ) + 2 ) ) ) );


        var newspace = parseFloat( JSON.stringify( this.space / ( timeinterval / 10 ) ) );
        console.log( "newspace is : ", newspace );

        var startXValue = 0 - parseFloat( JSON.stringify( ( ( ( Minutes * 60 ) + Seconds ) % timeinterval ) * ( newspace ) ) );
        console.log( "Yahi", startXValue, Minutes )

        var secSinceEpo;

        if ( timeinterval > 600 ) {
            if ( ( ( Hours * 3600 ) + ( Minutes * 60 ) + Seconds ) % timeinterval == 0 ) {
                secSinceEpo = secSinceEpoch
            }
            else {

                secSinceEpo = secSinceEpoch - parseFloat( JSON.stringify( ( ( Hours * 3600 ) + ( Minutes * 60 ) + Seconds ) % timeinterval ) );
                console.log( "YAHAPE DEKHE", secSinceEpo )
            }
        }

        if ( timeinterval > 60 ) {
            if ( ( ( Minutes * 60 ) + Seconds ) % timeinterval == 0 ) {
                secSinceEpo = secSinceEpoch
            }
            else {

                secSinceEpo = secSinceEpoch - parseFloat( JSON.stringify( ( ( Minutes * 60 ) + Seconds ) % timeinterval ) );
                console.log( "YAHAPE DEKHE", secSinceEpo )
            }
        }

        if ( Seconds % timeinterval == 0 ) {
            secSinceEpo = secSinceEpoch;
        }
        else {
            secSinceEpo = secSinceEpoch - parseFloat( JSON.stringify( secSinceEpoch % timeinterval ) );
        }
        this.drawTimeLineNew( startXValue/*start X value*/, 0/*cnt*/, parseFloat( JSON.stringify( secSinceEpo - ( 2 * timeinterval ) ) )/*starttime*/, timeinterval /*timeinterval*/, this.numSmallTicks/*number of small ticks*/ );
        let t= setTimeout( ()=>this.timeoutfunction(), 1000 );
    }



    drawFixedLine( fixedLineX: any ) {
        console.log( fixedLineX )
        // var startX = 200+(date.getSeconds()%10 * 10);
        console.log( "indrawfixedline" )
        this.ctx.beginPath();
        this.ctx.moveTo( fixedLineX, 150 );
        this.ctx.lineTo( fixedLineX, 10 );

        this.ctx.strokeStyle = "#FF0000";
        this.ctx.stroke();
    }

    startAnimation( initialTimeInterval: any ) {
        //document.getElementById( "gap" ).inne;
        console.log( "instartanimation" )
        this.some = initialTimeInterval
        this.currentTime();

        var date = new Date();
        var secSinceEpoch = new Date().getTime() / 1000; //current time in seconds since epoch
        console.log( secSinceEpoch );

        var Seconds = date.getSeconds();

        this.drawFixedLine( 2 * this.space * ( ( this.numSmallTicks * 2 ) + 2 ) );
        var newspace = this.space / ( initialTimeInterval / 10 );
        console.log( "newspace is : ", newspace );

        var startXValue = 0 - ( Seconds % initialTimeInterval ) * ( newspace );
        console.log( initialTimeInterval );

        this.drawTimeLineNew( startXValue/*start X value*/, 0/*cnt*/, secSinceEpoch - ( 2 * initialTimeInterval )/*starttime*/, initialTimeInterval /*timeinterval*/, this.numSmallTicks/*number of small ticks*/ );
    }

    zeroPad( nr: any, base: any ) {
        console.log( "inzeropad" )
        var len = ( String( base ).length - String( nr ).length ) + 1;
        return len > 0 ? new Array( len ).join( '0' ) + nr : nr;
    }

    drawTimeLineNew( startXValue: any, cnt: any, startTimeSinceEpoch: any, timeinterval: any, numSmallTicks: any ) {
        console.log( "indrawtimelinenew" )
        //we have start time and time interval     
        var date = new Date( 0 );
        date.setSeconds( parseInt( startTimeSinceEpoch ) );

        var Seconds = date.getSeconds();
        var Hours = date.getHours();
        var Minutes = date.getMinutes();

        var timeText = this.zeroPad( Hours, 10 ) + ":" + this.zeroPad( Minutes, 10 ) + ":" + this.zeroPad( Seconds, 10 );

        console.log( cnt + " - " + timeinterval + " : " + startTimeSinceEpoch + " - " + Seconds + " --- " + date.toLocaleString() + " : " + timeText + "startx : " + startXValue );

        var x = startXValue;

        this.ctx.font = "10px Arial";
        this.ctx.fillText( timeText, startXValue - 25, 25 ); //rect size

        //vertical big line
        this.drawLine( x, x, 40, 28 )

        //horizontal line
        this.drawLine( x, ( x + this.space ), 40, 40 )
        x = x + this.space;
        for ( var j = 0; j < numSmallTicks * 2 + 1; j++ ) {
            if ( j == numSmallTicks ) {
                //middle line
                this.drawLine( x, x, 40, 32 )
            } else {
                //vertical samll line
                this.drawLine( x, x, 40, 36 )
            }
            //horizontal line
            this.drawLine( x, ( x + this.space ), 40, 40 )
            x = x + this.space;
        }

        cnt++;
        if ( cnt <= 16 )
            this.drawTimeLineNew( parseInt( startXValue + this.space * ( ( numSmallTicks * 2 ) + 2 ) ), cnt, startTimeSinceEpoch + parseFloat( timeinterval ), timeinterval, numSmallTicks );

    }


    //current time shown on upper left of the window

    updateTime( k: any ) {
        console.log( "updatetime" )
        //depending on the scale (timegap between each of the line), you need to manipulate the time
        if ( k < 10 ) {
            return "0" + k;
        }
        else {
            return k;
        }
    }

    currentTime() {
        console.log( "incurrenttime" )
        var date = new Date(); /* creating object of Date class */
        var hour = this.updateTime( date.getHours() );
        var min = this.updateTime( date.getMinutes() );
        var sec = this.updateTime( date.getSeconds() );

        this.tmi = hour + " : " + min + " : " + sec; /* adding time to the div */
        var t = setTimeout( () => this.currentTime(), 1000 ); /* setting timer */
    }


    drawLine( startx: any, endx: any, starty: any, endy: any ) {
        console.log( "indrawline" )
        this.ctx.beginPath();
        this.ctx.moveTo( startx, starty );
        this.ctx.lineTo( endx, endy );
        this.ctx.strokeStyle = "#000000";
        this.ctx.stroke();
    }

    zoom() {
        console.log( "inzoom" )
        var timeinterval = this.some;
        let newtimeinterval: any = "";
        if ( timeinterval == 10 ) { newtimeinterval = 20; }
        if ( timeinterval == 20 ) { newtimeinterval = 60; }
        if ( timeinterval == 60 ) { newtimeinterval = 120; }
        if ( timeinterval == 120 ) { newtimeinterval = 300; }
        if ( timeinterval == 300 ) { newtimeinterval = 600; }
        if ( timeinterval == 600 ) { newtimeinterval = 1200; }
        if ( timeinterval == 1200 ) { newtimeinterval = 3600; }
        if ( timeinterval == 3600 ) { newtimeinterval = ( 3600 * 2 ); }
        if ( timeinterval == 3600 * 2 ) { newtimeinterval = ( 3600 * 4 ); }

        this.ctx.clearRect( 0, 0, 2000, 200 );

        //clearTimeout( this.timeoutfunc )
        this.startAnimation( newtimeinterval );
    }

    zoom1() {
        console.log( "inzoom1" )
        var timeinterval = this.some;
        let newtimeinterval: any = "";
        if ( timeinterval == 20 ) { newtimeinterval = 10; }
        if ( timeinterval == 60 ) { newtimeinterval = 20; }
        if ( timeinterval == 120 ) { newtimeinterval = 60; }
        if ( timeinterval == 300 ) { newtimeinterval = 120; }
        if ( timeinterval == 600 ) { newtimeinterval = 300; }
        if ( timeinterval == 1200 ) { newtimeinterval = 600; }
        if ( timeinterval == 3600 ) { newtimeinterval = 1200; }
        if ( timeinterval == 3600 * 2 ) { newtimeinterval = 3600; }
        if ( timeinterval == 3600 * 4 ) { newtimeinterval = 3600 * 2; }


        this.ctx.clearRect( 0, 0, 2000, 200 );

        //clearTimeout( this.timeoutfunc )
        this.startAnimation( newtimeinterval );
    }

}