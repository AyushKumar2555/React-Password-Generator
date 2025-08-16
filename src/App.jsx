import { useState, useCallback, useEffect,useRef } from 'react'

function App() {
  //useState hooks 

  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charactersAllowed, setcharactersAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copyText , setCopyText]=useState("Copy")
  //useCallback hook 
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charactersAllowed) str += "!@#$%^&*(){}[]|~`"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charactersAllowed,setPassword])
  
  //useRef hook
  const passwordRef=useRef(null)
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy")
        
      , 2000);
    })
  } ,[password])

  //useEffect hook 
  useEffect(() => {
      passwordGenerator()
    },[length,numberAllowed,charactersAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 '>
        <h1 className='text-white text-center  font-bold pt-2 pb-2 '> Password Generator</h1>
        <div className='flex shadow rounde-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            ref={passwordRef}
            className='outline-none w-full   text-gray-500 mb-4 mt-1 bg-white rounded-lg  h-8 mr-4 pl-3'
            placeholder='Password'
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none w-20 text-l font-medium  mb-4 mt-1  text-white bg-blue-900 rounded-lg h-8'
          >{copyText}</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'></div>
          <input
            type="range"
            min={6}
            max={10}
            value={length}
            className="cursor-pointer mb-4"
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label className='mb-4 text-bold'>Length:{length}</label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              className='mb-4 cursor-pointer'
              onChange={() => {
                setnumberAllowed((prev) => !prev
                );
              }}
          />
          <label htmlFor="numberInput">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
            id='charactersInput'
            className='mb-4 cursor-pointer'
              onChange={() => {
                setcharactersAllowed((prev) => !prev
                );
              }}
          />
          <label htmlFor="charactersInput">Characters</label>
        </div>

      </div>
    </>
  )
}

export default App
