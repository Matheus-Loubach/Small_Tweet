import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/outline'
import { PauseIcon } from '@heroicons/react/outline'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { useFormik} from 'formik'
import axios from 'axios'
import avatar from './avatar.png'
// import { AiOutlineHome } from 'react-icons/Ai';
// import { AiFillGithub } from 'react-icons/Ai';
// import { AiOutlinePoweroff } from 'react-icons/Ai';

const MAX_TWEET_CHAR = 140

function TweetForm({ loggedInUser, onSuccess})
{


  
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/tweets`,
        headers:{
          'authorization': `Bearer ${loggedInUser.accessToken}`
        },
        data: {
          text: values.text
        },
      })

      form.setFieldValue('text', '')
      onSuccess()
    },
    initialValues: {
      text: ''
    }
  })

  function changeText(e) {
    setText(e.target.value)
  }

 
  return (
    
    <>
    <div className='inline-block lg:fixed ml-10 mt-20 mr-10 uppercase text-xl'>
    <div className="flex space-x-1 text-2xl items-center">
              { <HomeIcon className="w-6 stroke-1"/> }
             <a className='cursor-pointer hover:text-birdBlue'><span>home</span></a> 
            </div>
            <div className="flex space-x-1 text-2xl items-center">
              { <ExternalLinkIcon className="w-6 stroke-1"/> }
              <a href='https://github.com/Matheus-Loubach' className='cursor-pointer hover:text-birdBlue'><span>perfil</span></a> 
            </div>
            <div className="flex space-x-1 text-2xl items-center">
              {<PauseIcon className="w-6 stroke-1"/> }
              <a href='https://small-tweet-web.vercel.app/login' className='cursor-pointer hover:text-birdBlue'><span>sair</span></a> 
            </div>
    </div>
    

      <div className="p-2 flex flex-col justify-center w-full md:max-w-4xl md:mx-auto md:border-x-2 md:border-silver md:border-b-birdBlue border-b-2">
        <div><h2 className="font-bold text-3xl mb-5 p-4">Bem vindo(a),  (@{loggedInUser.username})</h2></div>
       
        <div className="flex space-x-5 p-3">
          <img src={avatar} className="w-7" />

          <h1 className="font-bold text-xl">Página Inicial</h1>
        </div>

        <div>

        </div>

        <form className="mt-5 pl-12 text-lg flex flex-col" onSubmit={formik.handleSubmit}>
          <textarea
            name="text"
            value={formik.values.text}
            placeholder="O que está acontecendo?"
            className="bg-transparent outline-none disabled:opacity-50"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting} />

          <div className="flex justify-end items-center space-x-3">
            <span className="text-sm">
              <span>{formik.values.text.length}</span> / <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
            </span>
            <button
              type="submit"
              className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
              disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting}
            >
              Tweet
            </button>
          </div>
        </form>
        
      </div></>

  )


  
}



function Tweet({ name, username, avatar, children }) {
 
 
  return (
    <div className='flex flex-col justify-center md:items-center w-full md:max-w-4xl md:mx-auto md:border-x-2 md:border-silver border-b-2'>

    <div className=" w-full flex space-x-3 p-4 border-b border-silver">
        <div>
          <img src={avatar} />
        </div>
        <div className="space-y-1">
            <span className="font-bold text-sm">{name}</span>{' '}
            <span className="text-sm text-silver">@{username}</span>

            <p>{children}</p>

            <div className="flex space-x-1 text-silver text-sm items-center">
              <HeartIcon className="w-6 stroke-1"/>
              <span>1</span>
            </div>
        </div>
    </div>
    </div>
    
    
  )
}


export function Home({ loggedInUser}) {
    const [data, setData] = useState([])


  async function getData() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers: {
        'authorization': `Bearer ${loggedInUser.accessToken}`
      }
    })
    setData(res.data)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <TweetForm loggedInUser={loggedInUser} onSuccess={getData}/>
      <div>
        {data.length && data.map(tweet => (
          <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar={avatar}>
            {tweet.text}
          </Tweet>
        ))}
      </div>
      <div className='items-center justify-center flex p-4'>

      <div className="flex space-x-1 text-2xl items-center">
             { <a href=''><HomeIcon className="w-full h-12"/></a> }
            </div>
            <div className="flex space-x-1 text-2xl items-center">
            {<a href='https://github.com/Matheus-Loubach'> <ExternalLinkIcon className="w-full h-12 mr-10 "/></a>}
            </div>
            <div className="flex space-x-1 text-2xl items-center">
           { <a href='https://small-tweet-web.vercel.app'><PauseIcon className="w-full h-12 "/></a> }
            </div>
        </div>
      <footer className='items-center justify-center flex'>
      
      <div>Feito por: <a className='text-birdBlue' href='https://www.linkedin.com/in/matheus-loubach/'>Matheus-Loubach</a></div>
      </footer>
    </>
  )
  
}