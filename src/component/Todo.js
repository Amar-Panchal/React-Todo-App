import React, {useState, useEffect} from 'react';
import todo from "../images/todo.jpg";
import "../App.css";

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setinputdata] = useState('');
    const [items, setitems] = useState(getLocalItmes());
    const [togglesub, setTogglesub] = useState(true);
    const [isEditItem,setIsEditItem] = useState(null);
    const addItem = () => {
        if (!inputData) {
            alert('🚫 Empty Data Not allowed 🚫');
        }else if (inputData && !togglesub) {
            setitems(
                items.map((elem)=> {
                    if(elem.id === isEditItem){
                        return{...elem, name : inputData}
                    }
                    return elem;
                    
                })
            )
            setTogglesub(true);
            setinputdata('');
            setIsEditItem(null);
            

        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
            setitems([...items, allInputData]);
            setinputdata('')
        }
    }

    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setitems(updateditems);
    }   

    const editItem = (id) =>{
        let newEdititem = items.find((elem)=>{
            return elem.id === id;
        });
        setTogglesub(false);
        setinputdata(newEdititem.name)
        setIsEditItem(id);
    }

    const removeAll = () => {
         setitems([]);
    }

    useEffect(() => {
       localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Items..."
                           value={inputData} 
                           onChange={(e) => setinputdata(e.target.value) }
                        />
                        {

                            togglesub ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                            <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>

                        }
                       
                    </div>

                    <div className="showItems">
                        
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name} </h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Update Item" onClick={()=>editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                  </div>
                                )
                            })

                        }
                       
                    </div>
                
                    
                        <button className="btn removebtn" data-sm-link-text="Remove All" onClick={removeAll}><span> Remove All </span> </button>
                    </div>
          </div>  
        </>
    )
}

export default Todo
