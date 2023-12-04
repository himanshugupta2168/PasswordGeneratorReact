import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length , setLength ]= useState(8);
  const [numberAllowed, setNumberAllowed]= useState(false);
  const [characterAllowed, setCharacterAllowed]= useState(false);
  const[password, setPassword]= useState("");

// use callback optimises the function  that will be running based in the dependencies whereas useeffect runs the function if it 
// encounters any change in the dependencies 
// use ref hook  needs a variable to run.  it is a reference hook used for refernce of some variable or object 
  const  passwordRef= useRef(null, )
  const passwordGenerator= useCallback(()=>{
    let pass= "";
    let str="QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkhgfdsazxcvbnm";
    if (numberAllowed){
      str+="1234567890";
    }
    if (characterAllowed){
      str+="~`@#$%^&*(){}|:<>?,."
    }
    for (let i =1;i<=length ; i++){
      pass+=str.charAt(Math.floor(Math.random()*str.length));
    }
    setPassword(pass);


  },[length ,numberAllowed, characterAllowed,setPassword]);
  
  useEffect(passwordGenerator, [length, numberAllowed, characterAllowed, passwordGenerator])
  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3)  this one is used to select the element only in between the range 
    window.navigator.clipboard.writeText(password)
  }, [password])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className=' text-4xl text-center text-white my-4'>Password Generator </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" readOnly value={password}  className='outline-none w-full py-1 px-3' placeholder='password'
        ref={passwordRef}/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={8} max={99} value={length} className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"  defaultChecked={numberAllowed} id='numberInput' onChange={()=>{
            setNumberAllowed(prev=>!prev);
          }}/>
          <label htmlFor="numberInput">Numbers</label>
          <input type="checkbox"  defaultChecked={characterAllowed} id='characterInput' onChange={()=>{
            setCharacterAllowed(prev=>!prev);
          }}/>
          <label htmlFor="characterInput"> Characters</label>

        </div>
      </div>
    </div>
    </>
  )
}
export default App;
