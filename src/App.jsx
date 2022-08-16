import React from 'react'
import List from './components/List'

function App() {
  return (
    <main className='container'>
      <header>
        <h1>toDo Lite</h1>
      </header>
      <section>
        <List />
      </section>
    </main>
  )
}

export default App