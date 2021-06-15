import React from 'react';

export default class TempCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            showLegend: false
        }
        this.toggleLegend = this.toggleLegend.bind(this);
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = "#FF00FF";
        this.context.font= '10px Arial';
        this.context.fillRect(0,0, this.context.canvas.width, this.context.canvas.height);
    }

    toggleLegend() {
        this.setState((state) => ({
            showLegend: !state.showLegend
        }));
    }

    render() {
        return (
            <section className={"tempCanvas " + (!this.state.showLegend && "hide")}>
                <div className="header">
                    <h3>Temperatura de impresora</h3>
                    <button onClick={this.toggleLegend}>?</button>
                </div>
                <canvas ref={this.canvasRef} id="tempCanvas"></canvas>
                {this.state.showLegend &&
                    <div className="leyenda">
                        <span>Extrusor <span className="spanBox blueBox"></span></span>
                        <span>Cama <span className="spanBox greenBox"></span></span>
                    </div>
                }
                
            </section>
        );
    }
}