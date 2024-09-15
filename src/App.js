import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setlength]=useState(8)
  const [numberAllowed, setnumberAllowed]=useState(false)
  const [charAllowed, setCharAllowed]=useState(false)
  const [password,setpassword]=useState("")
const passwordRef=useRef(null);
  //let now generate pass
  const genpassword=useCallback(()=>{
    let pass="" //here we will store our password as str
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    //str to generate pass
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$$^&**(){}:?><"
//console.log(str)
    for(let i=0;i<length;i++)
    {
      let index=Math.floor(Math.random()*str.length)
        pass+=str.charAt(index);
        //console.log(pass)
    }
    //console.log(pass);
    setpassword(pass);

  },[length,numberAllowed,charAllowed, setpassword])
const handlecopy=()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password);
}

  useEffect(()=>{
    genpassword()
  },[length, numberAllowed, charAllowed,setpassword])

  return (
    <div className="text-white text-xl text-center my-3">
      <h1>Password Generator</h1>
      <div className="bg-gray-800 my-10 py-3 shadow-lg rounded-lg w-[37%] mx-auto text-black">
        <input type="text" 
        ref={passwordRef}
        placeholder="Password" value={password} 
        readOnly
        className="text-orange-600 p-1 rounded-l-lg w-[80%]"/>
        <button className="bg-blue-500 px-3 py-1 rounded-r-lg text-white" onClick={handlecopy}>Copy</button>
        
        <div className="flex justify-start py-4 mx-6">
          
          <input type="range" 
          min={8}
          max={100}
          value={length}
          onChange={(e)=>setlength(e.target.value)}
         className="cursor-pointer"/>
          <label className="text-orange-600 mx-2">Length:{length}</label>
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          onChange={()=>setnumberAllowed(!numberAllowed)}
         className="ml-4"/>
          <label className="text-orange-600 px-1">Numbers</label>
          
          <input type="checkbox"
          defaultChecked={charAllowed}
          onChange={()=>setCharAllowed(!charAllowed)} 
         className="ml-4"/>
          <label className="text-orange-600 px-1">Characters</label>
        </div>
      </div>
      </div>
  );
}

export default App;
