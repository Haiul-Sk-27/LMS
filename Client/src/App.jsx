import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center space-y-6">
      <div className="flex space-x-6">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="w-24 hover:scale-110 transition" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="w-24 hover:rotate-12 transition" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-bold">Vite + React + Tailwind</h1>

      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-lg font-semibold"
        >
          Count is {count}
        </button>
        <p className="mt-4 text-gray-300">
          Edit <code className="bg-gray-700 px-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="text-sm text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
