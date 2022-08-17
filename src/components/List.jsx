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
  const [showStats, setStatus] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if(toDos.item){
      setStatus("Adicionado");
      const newToDo = {...toDos, isDone: false, id: new Date().getTime().toString()}
      setToDosList([...toDosList, newToDo])
      setToDos({item: ''})
      setTimeout(() => setStatus(""),3000)
    }
  }

  const clearList = () =>{
    setStatus("Itens removidos");
    setToDosList([]);
    setTimeout(() => setStatus(""),3000)
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    setToDos({...toDos, [name]: value})
  }

  const handleDone = (e) =>{
    setStatus("Feito");
    const updatedItem = toDosList.find( elem => elem.id === e.target.parentElement.parentElement.id)
    setToDosList(prevState => prevState.filter(item => item.id !== e.target.parentElement.parentElement.id))
    updatedItem.isDone = !updatedItem.isDone;
    setToDosList(prevState => [...prevState, updatedItem])
    setTimeout(() => setStatus(""),3000)
  }

  const handleDelete = (e) =>{
    setStatus("Removido");
    setToDosList(prevState => prevState.filter(item => item.id !== e.target.parentElement.parentElement.id))
    setTimeout(() => setStatus(""),3000)
  }

  const listDos = toDosList.map((data) => {
    return (
      <div className='list--data' id={data.id} key={data.id}>
        <div className='list--item'>
          <span className={data.isDone ? "done" : "notdone"} >{data.item}</span>
        </div>
        <div className='list--control'>
          <span className="material-icons list--cbtn green" onClick={handleDone}>done</span>
          {/* <span className="material-icons list--cbtn blue">edit</span> */}
          <span className="material-icons list--cbtn red" onClick={handleDelete}>delete</span>
        </div>
      </div>
    )
  })

  React.useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(toDosList))
  }, [toDosList])

  return (
    <>
      <form className='list--form'>
        <input type="text" name="item" placeholder='Adicione um item' onChange={handleChange} value={toDos.item} />
        <button className='list--btn' onClick={handleSubmit} >Adicionar</button>
      </form>
      {showStats==="Itens removidos" && <div className='list--stats bgred'><span className='list--tstats'>{showStats}</span></div> }
      {showStats==="Adicionado" && <div className='list--stats bgreen'><span className='list--tstats'>{showStats}</span></div> }
      {showStats==="Feito" && <div className='list--stats bgblue'><span className='list--tstats'>{showStats}</span></div> }
      {showStats==="Removido" && <div className='list--stats bgred'><span className='list--tstats'>{showStats}</span></div> }
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