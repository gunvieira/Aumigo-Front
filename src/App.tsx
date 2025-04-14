import Acesso from "@/components/myui/Acesso/Acesso.tsx";

function App() {
  return (
    <>
      <div>
          <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
              <h1 className="text-lg font-semibold">Logo</h1>
              <Acesso/>
          </header>
          <Acesso/>



      </div>
      
    </>
  )
}

export default App
