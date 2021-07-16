import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import './App.css';
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './characters'
import 'react-toastify/dist/ReactToastify.css'
import {COPY_SUCCESS} from './message'
import Typewriter from 'typewriter-effect'

function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] =useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] =useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSpecialcharacters, setIncludeSpecialcharacters] = useState(false)
  
  const handleGeneratePassword = (e) => {

    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecialcharacters) {
      notify('You must select at least one option', true)
    }
    let characterList = ''

    if(includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if(includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if(includeNumbers) {
      characterList = characterList + numbers
    }

    if(includeSpecialcharacters) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for(let i=0; i < passwordLength; i++) {
        const characterIndex = Math.round(Math.random() * characterListLength)
        password = password + characterList.charAt(characterIndex)
    }
    return password 
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    }
  }

  const handleCopyPassword = (e) => {
    if(password === '') {
      notify('Nothing to copy', true)
    } else {
      copyToClipboard() 
      notify(COPY_SUCCESS)
    }
  }

  const handleResetPassword = (e) => {
    window.location.reload()
  }

  return <div className='App'>
    <div className='container'>
      <div className='generator'>
        <h2 className='generator__header'>
           <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("iSafe - a secure password generator").start();
            }}
          />
          </h2>
        <div className='generator__password'>
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className='copy__btn' >Copy</button>
        </div>

        <div className='form-group'>
            <label htmlFor='password-length'>Password length</label>
            <input 
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type='number'
              id='password-length'
              name='password-length' 
              max='20' 
              min='8'
              />
        </div>

        <div className='form-group'>
            <label htmlFor='uppercase-letters'>Include uppercase letters</label>
            <input 
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type='checkbox' 
              id='uppercase-letters' 
              name='uppercase-letters'
              />
        </div>

        <div className='form-group'>
            <label htmlFor='lowercase-letters'>Include lowercase letters</label>
            <input 
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type='checkbox' 
              id='lowercase-letters' 
              name='lowercase-letters'
              />
        </div>

        <div className='form-group'>
            <label htmlFor='include-numbers'>Include numbers</label>
            <input 
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type='checkbox' 
              id='include-numbers' 
              name='include-numbers'
              />
        </div>

        <div className='form-group'>
            <label htmlFor='include-specialcharacters'>Include special characters</label>
            <input 
              checked={includeSpecialcharacters}
              onChange={(e) => setIncludeSpecialcharacters(e.target.checked)}
              type='checkbox' 
              id='include-specialcharacters' 
              name='include-specialcharacters'
              />
        </div>

        <button onClick={handleGeneratePassword} className='generator__btn' >Generate</button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />

        <button onClick={handleResetPassword} className='reset__btn' >Reset</button>
      </div>
    </div>
  </div>
}

export default App