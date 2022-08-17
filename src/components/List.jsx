import React from 'react'

const getLocalStorage = () =>{
  let list = localStorage.getItem('list');
  if (list){
    return (list = JSON.parse(localStorage.getItem('list')));
  }else{
    return [];
  }
}

const List = () => {
  const [toDos, setToDos] = React.useState({
    item: '',
  });
  const [toDosList, setToDosList] = React.useState(getLocalStorage());

  const handleSubmit = (e) => {
    e.preventDefault();
    if(toDos.item){
      const newToDo = {...toDos, isDone: false, id: new Date().getTime().toString()}
      setToDosList([...toDosList, newToDo])
      setToDos({item: ''})
    }
  }

  const clearList = () =>{
    setToDosList([]);
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    setToDos({...toDos, [name]: value})
  }

  const handleDone = (e) =>{
    const updatedItem = toDosList.find( elem => elem.id === e.target.parentElement.parentElement.id)
    setToDosList(prevState => prevState.filter(item => item.id !== e.target.parentElement.parentElement.id))
    updatedItem.isDone = !updatedItem.isDone;
    setToDosList(prevState => [...prevState, updatedItem])
  }

  const handleDelete = (e) =>{
    setToDosList(prevState => prevState.filter(item => item.id !== e.target.parentElement.parentElement.id))
  }

  const listDos = toDosList.map((data) => {
    return (
      <div className='list--data' id={data.id} key={data.id}>
        <div className='list--item'>
          <h4 className={data.isDone ? "done" : "notdone"} >{data.item}</h4>
        </div>
        <div className='list--control'>
          <span className="material-icons list--cbtn green" onClick={handleDone}>done</span>
          {/* <span className="material-icons list--cbtn blue">edit</span> */}
          <span className="material-icons list--cbtn red" onClick={handleDelete}>delete</span>
        </div>
      </div>
    )
  })

  return (
    <>
      <form className='list--form'>
        <input type="text" name="item" placeholder='Adicione um item' onChange={handleChange} value={toDos.item} />
        <button className='list--btn' onClick={handleSubmit} >Adicionar</button>
      </form>
      <hr />
      <section className="list--items">
        {listDos}
      </section>
      <section className='list--clear'>
        {
          listDos.length > 0 ? <hr className='list--line' /> : <></>
        }
        {
          listDos.length > 0 ? <button onClick={clearList}>Limpar</button> : <></>
        }
      </section>
    </>
  )
}

export default List