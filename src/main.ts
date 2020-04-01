let canv :CanvasRenderingContext2D;
let canvHeight : number, canvWidth : number;

abstract class BaseSort {

    /**
     * Each function has to implement its own render
     * function, as it depends on the algorith, what
     * shall be rendered
     */
    abstract render(...arg : any[]) : void;

    abstract start(count : number) : void;

    abstract sort() :void;

    delay(ms : number) :Promise<unknown> {
        return new Promise( resolve => setTimeout(resolve, ms));
    }

    swap (a : number, b : number) {
        let tmp : number = this.list[a];
        this.list[a] = this.list[b];
        this.list[b] = tmp;
    }

    isSorted() : boolean {
        for( let i : number = 0; i< this.list.length; i++) {
            if(this.list[i] > this.list[i+1]) {
                return false;
            }
        }
        return true;
    }


    shuffleList () : void {
        for(let i : number = 0; i< this.list.length; i++) {
            this.swap(i, Math.floor(this.list.length * Math.random()));
        }
    }

    initList(count : number) : void {
        this.list = [];
        for(let i : number = 0; i< count ; i++) {
            this.list.push(i + 1);
        }
    }

    initRandomList(count: number) : void {
        this.initList(count);
        this.shuffleList();
    }

    printList() : void {
        for(let i : number = 0; i < this.list.length; i++) {
            console.log(this.list[i]);
        }
    }

    list : Array<number>;
}

class Bubblesort extends BaseSort {

    private blockWidth : number;
    private blockHeight : number;

    constructor(protected count : number) {
        super();
        this.start(count);
        this.blockWidth = Math.floor(canvWidth / count);
        this.blockHeight = Math.floor(canvHeight / count);
    }

    render(finished : number, active : number) : void {
        canv.clearRect(0,0,canvWidth, canvHeight);
        for(let i : number = 0; i < finished; i++) {
            if(i == active) {
                canv.fillStyle = "#0000ff";
            } else {
                canv.fillStyle = "#000000";
            }
            canv.fillRect(i * this.blockWidth, canvHeight, this.blockWidth, -1 * this.list[i] * this.blockHeight);
        }

        canv.fillStyle = "#00ff00";
        for(let i : number = finished; i < this.list.length; i++) {
            canv.fillRect(i * this.blockWidth, canvHeight, this.blockWidth, -1 * this.list[i] * this.blockHeight);
        }
    }

    start (count : number) : void {
        this.initRandomList(count);
    }

    async sort () : Promise<void> {
        console.log('sorting...');
        let didSomething : boolean = false;
        for(let i : number = 0; i < this.list.length; i++) {
            didSomething = false;
            for( let j : number = 0; j < this.list.length - i; j++) {
                if (this.list[j] > this.list[j+1]) {
                   this.swap(j, j+1); 
                   didSomething = true;
                }
                this.render(this.list.length - i, j);
                await this.delay(50);
            }
            // premature exit
            if(!didSomething) {
                this.render(0, -1);
                return;
            }
        }

    }
}

class Bogosort extends BaseSort {
    private elemCount : number = 0;
    private blockWidth : number;
    private blockHeight : number;

    constructor(count : number) {
        super();
        this.start(count);
        this.blockWidth = Math.floor(canvWidth / count);
        this.blockHeight = Math.floor(canvHeight / count);
    }

    render(finished: boolean): void {
        canv.clearRect(0, 0, canvWidth, canvHeight);
        if (finished) {
            canv.fillStyle = "#00ff00";
        }
        else {
            canv.fillStyle = "#ff0000";
        }
        for (let i: number = 0; i < this.list.length; i++) {
            canv.fillRect(i * this.blockWidth, canvHeight, this.blockWidth, -1 * this.list[i] * this.blockHeight);
        }
    }

    async sort(): Promise<void> {
        while (!this.isSorted()) {
            this.shuffleList();
            this.render(false);
            await this.delay(50);
        }
        this.render(true);
        return;
    }

    start(count : number) {
        this.initRandomList(count);
    }

}

function init() {
    let canvElem = <HTMLCanvasElement> document.getElementById('canv');
    canvHeight = canvElem.height;
    canvWidth = canvElem.width;
    canv = canvElem.getContext('2d');

//    testCanvas();

    // testBubblesort();
    testBogosort();

//    Bogosort(shuffle([...Array(10).keys()]));
}

function testBubblesort() : void {
    let b : Bubblesort = new Bubblesort(50);
    b.printList();
    b.sort();
}
function testBogosort() : void {
    let b : Bogosort = new Bogosort(4);
    b.printList();
    b.sort();
}

function testCanvas() :void {
    canv.moveTo(100,100);
    canv.lineTo(300,400);
    canv.stroke();
}