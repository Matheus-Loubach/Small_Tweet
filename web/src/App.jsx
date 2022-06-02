import { HeartIcon } from '@heroIcons/react/outline'
import { useState } from 'react'

const MAX_TWEET_CHAR = 250

function TweetForm(){
  const [text, setText] = useState('')

  function changeText(e){
    setText(e.target.value)
  }
  //console.log(text)
  return(

    <div className='border-b border-silver p-4 space-y-6'>
      <div className='flex space-x-5'>
        <img src= '/src/Mask group.png' className='w-7'/>
        <h1 className='font-bold text-xl'>Página inicial</h1>
      </div>

      <form className='pl-12 text-lg flex flex-col'>
        <textarea
        name='text'
        value={text}
        placeholder='O que está acontecendo?'
        className='bg-transparent outline-none disabled:opacity-50'
        onChange={changeText}
        // disabled={text.length > MAX_TWEET_CHAR}
        />        
        <div className='flex justify-end items-center space-x-3'>
        <span className='text-sm'>
          <span>{text.length}/</span><span className='text-birdblue'>{MAX_TWEET_CHAR}</span>
        </span>
        <button
         className='bg-birdblue px-5 py-2 rounded-full disabled:opacity-50'
         disabled={text.length > MAX_TWEET_CHAR}
         >Tweet
         </button>
        </div>
      </form>

    </div>
  )
}
function Tweet({name, username, avatar, children}){
  return(
    <div className="flex space-x-3 p-4 border-b border-solid border-silver">
    <div> 
      <img src={avatar}/>
      </div>
      <div className='space-y-1'>
        <span className="hover:text-birdblue font-bold text-sm">
          {name}
        </span>{' '}

        <span className="text-sm text-silver">
          @{username}
        </span>

        <p>{children}</p> 

        <div className='flex space-x-1 text-silver text-sm items-center'>
        <HeartIcon className='w-4 stroke-1 stroke-silver'/>
        <span>1.5k</span>
        </div>
      </div>
  </div>
  )
}

export function App(){
  return(/*dinamico*/
  <>
  <TweetForm />
  
  <div>
    <Tweet name="Elon Musk" username="elonMusk" avatar="/src/Mask group.png">
    Let's make twitter maximu fun
    </Tweet>

    <Tweet name="Matheus Affonso" username="loubach" avatar="/src/Mask group.png">
    Hello world
    </Tweet>
    </div>
  </>
    
  )
}

