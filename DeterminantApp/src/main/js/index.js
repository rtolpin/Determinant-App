import React from 'react';
import ReactDOM from 'react-dom';

class MatrixInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {size: undefined, matrixVals: [], determinant: undefined, isValidSize: undefined, wasSubmitted: undefined};
        this.renderMatrixRows = this.renderMatrixRows.bind(this);
    }

    componentDidMount() {
	}

    setSize(e){
        const newSize = e.target.value;
        const form = document.getElementsByClassName('matrix_input_form')[0];
        const sizeInput = document.getElementsByClassName('size-input')[0];
        if(newSize === ""){
            if(this.state.isValidSize === false){
                const error = document.querySelector('.error-message.size');
                form.removeChild(error);
                sizeInput.classList.remove('error');
            }
            this.setState({size: undefined, matrixVals: [], determinant: undefined, isValidSize: undefined});
        }else if(!isNaN(newSize) && newSize % 1 === 0 && newSize > 0 && newSize <= 10){
            if(this.state.isValidSize === false){
                const error = document.querySelector('.error-message.size');
                form.removeChild(error);
                sizeInput.classList.remove('error');
            }
            this.setState({size: parseInt(newSize, 10), isValidSize: true});
        }else{
            if(!sizeInput.classList.contains('error')){
                sizeInput.classList.add('error');
                const errorMessage = document.createElement('div');
                errorMessage.className = "error-message size";
                errorMessage.innerHTML = "Size Must be a Whole Number between 1-10!";
                form.appendChild(errorMessage);
                this.setState({isValidSize: false});
            }
        }
    }

    addToMatrixVals(e){
        const parentEle = e.target.parentNode;
        const children = parentEle.childNodes;
        const inputVals = Array.prototype.slice.call(children);
        if(isNaN(e.target.value)){
            if(!e.target.classList.contains('error')){
                e.target.classList.add('error');
            }
        }
        if(!isNaN(e.target.value)){
            if(e.target.classList.contains('error')){
                e.target.classList.remove('error');
            }
            const matVals = this.state.matrixVals.slice();
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
            this.setState({matrixVals: matVals});
        }
    }

    renderMatrixRows(ele, key){
        const cols = [];
        for(let i = 0; i < this.state.size; ++i){
            cols.push(<input key={i} type='text' className='input matrix-box'></input>);
        }

        return(
            <div className="matrix-row" key={key} id={key} onChange={(e)=> this.addToMatrixVals(e)}>{cols}</div>
        );
    }
    
    submitMatrix(e){
        e.preventDefault();
        if(!this.state.matrixVals.length || this.state.matrixVals.length !== this.state.size){
            console.log("form was not submitted");
            this.setState({wasSubmitted: false});
            return false;
        }
        const containsEmpty = this.state.matrixVals.map((arr)=>{
            return arr.filter((ele)=> ele === "");
        });
        let isBlankValues = false; 
        for(let i = 0; i < containsEmpty.length; ++i){
            if(containsEmpty[i].length){
                isBlankValues = true;
                break;
            }
        }
        if(isBlankValues){
            console.log("form was not submitted");
            this.setState({wasSubmitted: false});
            return false;
        }
        const url = 'http://localhost:8080/post/matrix';
        console.log("form was submitted");
        this.setState({wasSubmitted: true});
        fetch(url, {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: "size=" + this.state.size + "&matrix=" + JSON.stringify(this.state.matrixVals)})
        .then(res => res.json())
        .then(response =>{ 
            console.log("Success:", JSON.stringify(response));
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
                        <input type="text" name="size" className="input size-input" onChange={(e)=> this.setSize(e)} />
                    </label>
                    {this.state.isValidSize ? <Matrix size={this.state.size} renderMatrixRows={this.renderMatrixRows} /> : null}
                </form>
                {!isNaN(this.state.determinant) && this.state.wasSubmitted ? <Determinant determinant={this.state.determinant}/> : null}
                {this.state.wasSubmitted === false ? <p className="form_info error-message">Matrix was not submitted.</p>: null}
            </div>
        );
    }
}

function Matrix(props){
    const rows = [];
    for(let i = 0; i < props.size; ++i){
        rows.push(i);
    }
    return( 
        <div className="matrix-submission">
           <div className="matrix" id="matrix">{rows.map((ele, i)=>props.renderMatrixRows(ele,i))}</div>
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
