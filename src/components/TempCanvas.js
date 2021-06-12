import React from 'react';

export default class TempCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = useRef(null);
    }

    componentDidMount() {
        this.canvas = this.canvasRev.current;
        this.context = this.canvas.getContext('2d');
        this.initCanvas(this.context);
    }
    
    initCanvas(context) {
        context.fillStyle = "#000000";
        context.font= '10px Arial';
        context.fillRect(0,0,context.canvas.width, context.canvas.height);
    }

    render() {
        return (
            <section className="tempCanvas">
                <div className="header">
                    <h3>Temperatura de impresora</h3>
                    <button>?</button>
                </div>
                <div className="leyenda" hidden>
                    <span>Extrusor <span className="blueBox"></span></span>
                    <span>Cama <span className="greenBox"></span></span>
                </div>
                <canvas id="tempCanvas" height="300" width="400"></canvas>
                
            </section>
        );
    }
}