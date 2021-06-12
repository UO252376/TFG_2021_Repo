import React from 'react';

export default class TempCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.showLegend = false;
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = "#FF00FF";
        this.context.font= '10px Arial';
        this.context.fillRect(0,0, this.context.canvas.width, this.context.canvas.height);
    }

    render() {
        return (
            <section className="tempCanvas">
                <div className="header">
                    <h3>Temperatura de impresora</h3>
                    <button onClick={() => this.showLegend = !this.showLegend}>?</button>
                </div>
                <canvas ref={this.canvasRef} id="tempCanvas"></canvas>
                {this.showLegend &&
                    <div className="leyenda">
                        <span>Extrusor <span className="blueBox"></span></span>
                        <span>Cama <span className="greenBox"></span></span>
                    </div>
                }
                
            </section>
        );
    }
}