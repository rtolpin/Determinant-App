import React from 'react';
import ReactDOM from 'react-dom';

class MatrixInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {size: undefined, matrixVals: [], determinant: undefined};
        this.renderMatrixRows = this.renderMatrixRows.bind(this);
    }

    componentDidMount() {
	}

    setSize(e){
        const newSize = e.target.value;
        if(newSize === ""){
            this.setState({size: undefined, matrixVals: [], determinant: undefined});
        }else if(!isNaN(newSize)){
            this.setState({size: Number(newSize)});
        }
    }

    addToMatrixVals(e){
        if(!isNaN(e.target.value) || e.target.value === ""){
            const matVals = this.state.matrixVals.slice();
            const parentEle = e.target.parentNode;
            const children = parentEle.childNodes;
            const inputVals = Array.prototype.slice.call(children);
            const key = parentEle.id;
            if(matVals[key] === undefined){
                matVals[key] = [];
            }
            const row = matVals[key].slice();
            for(let i = 0; i < inputVals.length; ++i){
                const curr = inputVals[i];
                if(curr.value === ""){
                    row[i] = curr.value;
                }else if(!isNaN(curr.value)){
                    row[i] = Number(curr.value);
                }
            }
            matVals[key] = row;
            console.log(matVals);
            this.setState({matrixVals: matVals});
            console.log(this.state.matrixVals);
        }
    }

    renderMatrixRows(ele, key){
        const cols = [];
        for(let i = 0; i < this.state.size; ++i){
            cols.push(<input key={i} type='text' className='input matrix-box'></input>);
        }

        return(
            <div key={key} id={key} onChange={(e)=> this.addToMatrixVals(e)}>{cols}</div>
        );
    }
    
    submitMatrix(e){
        e.preventDefault();
        if(!this.state.matrixVals.length || this.state.matrixVals.length !== this.state.size){
            console.log("form was not submitted");
            return false;
        }
        const containsEmpty = this.state.matrixVals.map((arr)=>{
            return arr.filter((ele)=> ele === "");
        });
        console.log(containsEmpty);
        let isBlankValues = false; 
        for(let i = 0; i < containsEmpty.length; ++i){
            if(containsEmpty[i].length){
                isBlankValues = true;
                break;
            }
        }
        if(isBlankValues){
            console.log("form was not submitted");
            return false;
        }
        const url = 'http://localhost:8080/post/matrix';
        console.log("form was submitted");
        fetch(url, {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: "size=" + this.state.size + "&matrix=" + JSON.stringify(this.state.matrixVals)})
        .then(res => res.json())
        .then(response =>{ 
            console.log("Success:", JSON.stringify(response));
            console.log(response["determinant"]);
            this.setState({"determinant": response["determinant"]});
        })
        .catch(error => console.log("Error:", error));
        return true;
    }

    render(){
        return(
            <div>
                <form className="matrix_input_form" onSubmit={(e)=>this.submitMatrix(e)}>
                    <label>
                        <p>Enter Size of Matrix:</p>
                        <input type="text" name="size" className="input size-input" onChange={(e)=> this.setSize(e)}/>
                    </label>
                    {this.state.size > 0 && this.state.size % 1 === 0 && <Matrix size={this.state.size} renderMatrixRows={this.renderMatrixRows} />}
                </form>
                {this.state.determinant ? <Determinant determinant={this.state.determinant}/> : null}
            </div>
        );
    }
}

function Matrix(props){
    const rows = [];
    for(let i = 0; i < props.size; ++i){
        rows.push(<div className="matrix-row"></div>);
    }
    return( 
        <div className="matrix-submission">
           <div>{rows.map((ele, i)=>props.renderMatrixRows(ele,i))}</div>
           <div className="submit-matrix">
                <input type="submit" className="btn btn-primary btn-sm" value="Submit Matrix" /> 
            </div>  
        </div>
    );
}

function Determinant(props){
    return(
        <div className="result">
            <p className="text">Determinant:</p>
            <p className="determinant">{props.determinant}</p> 
        </div>
    );
}

ReactDOM.render(<MatrixInput/>, document.getElementById('root'));
