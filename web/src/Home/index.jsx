import { forwardRef, useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/outline'
import { PauseIcon } from '@heroicons/react/outline'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { TrashIcon } from '@heroicons/react/outline'
import { ChatAltIcon }  from '@heroicons/react/outline'
import { DatabaseIcon } from '@heroicons/react/outline'
import { SearchCircleIcon } from '@heroicons/react/outline'
import { EyeIcon } from '@heroicons/react/outline'
import { HashtagIcon } from '@heroicons/react/outline'
import { Formik, useFormik} from 'formik'
import axios from 'axios'
import avatar from './avatar.png'


const MAX_TWEET_CHAR = 250

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


 
  return (
    
    <>

   

    <div className='float-none inline-block fixed lg:ml-10  lg:mr-10 text-xl lg:visible invisible pl-4 text-white'>
      
    { <HashtagIcon className="lg:w-10 lg:stroke-1 lg:visible mb-10 text-birdBlue"/> }
    <div className="flex space-x-1 text-2xl items-center  hover:text-birdBlue mb-6 float">
              { <HomeIcon className="lg:w-6 lg:stroke-1 lg:visible"/> }
            <span >Página Inicial</span>
            </div>

    <div className="flex space-x-1 text-2xl items-center mb-6  hover:text-birdBlue">
              { <ExternalLinkIcon className="w-6 stroke-1"/> }
           <a href='https://www.linkedin.com/in/matheus-loubach/'>Perfil</a>
            </div>

    <div className="flex space-x-1 text-2xl items-center mb-6  hover:text-birdBlue">
              {<EyeIcon className="w-6 stroke-1"/> }
             <span>Tópicos</span>
            </div>
            <div className="flex space-x-1 text-2xl items-center mb-6  hover:text-birdBlue">
              { <DatabaseIcon className="lg:w-6 lg:stroke-1 lg:visible"/> }
            <span >Itens Salvos</span>
            </div>

    <div className="flex space-x-1 text-2xl items-center mb-6  hover:text-birdBlue">
              { <ExternalLinkIcon className="w-6 stroke-1"/> }
            <span>Moments</span>
            </div>

    <div className="flex space-x-1 text-2xl items-center mb-6  hover:text-birdBlue">
              {<PauseIcon className="w-6 stroke-1"/> }
              <a href='https://small-tweet-web.vercel.app/login' className='cursor-pointer hover:text-birdBlue'><span>Sair</span></a> 
          
            </div>
     <div className=' text-center justify-center'>Feito por: 
     <a href='https://www.linkedin.com/in/matheus-loubach/'><span className='text-birdBlue'> @Matheus-Loubach</span></a></div>
    </div>
    

      <div className="p-2 flex flex-col justify-center w-full md:max-w-4xl md:mx-auto md:border-x-2 md:border-silver md:border-b-birdBlue border-b-2">

      
      <div><h2 className="text-center justify-center flex font-bold text-lg mb-5 p-4">Bem vindo(a),(<span className='text-birdBlue'>@{loggedInUser.username}</span>)</h2></div>
        <div className="flex space-x-5 p-3">
          
          <img src={avatar} className="w-7" />
          <h1 className="font-bold text-xl">Página Inicial</h1>
        </div>
       
        <form className="mt-5 pl-12 text-lg flex flex-col" onSubmit={formik.handleSubmit}>
          <textarea
            name="text"
            value={formik.values.text}
            placeholder="O que está acontecendo?"
            className="bg-transparent outline-none disabled:opacity-50"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            />

          <div className="flex justify-end items-center space-x-3">
            <span className="text-sm">
              <span>{formik.values.text.length}</span> / <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
            </span>
            <button
              type="submit"
              className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
              disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting || formik.values.text == 0}>
              Tweet
            </button>
          </div>
        </form>
      </div></>
  )
  
}


function Tweet({id, name, username, avatar,UserOn, idTweet, onSuccess, children}) {
  
  
  const [deletedTweet, setDeletedTweet] = useState(id)

  const likeTweet = async (event) => {
    event.preventDefault()

    if (liked) {
      const res = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_HOST}/likes?tweetId=${id}`,
        headers: {
          authorization: `Bearer ${user.accessToken}`
        }
      })
      if (res.status === 200) setLiked(false)
    } else {
      const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/likes?tweetId=${id}`,
        headers: {
          authorization: `Bearer ${user.accessToken}`
        }
      })
      if (res.status === 200) setLiked(true)
    }
    fetchTweet()
  }

  async function deleteTweet() {
    const res = await axios.delete(`${import.meta.env.VITE_API_HOST}/tweet/${deletedTweet}`, {
      headers:{'authorization': `Bearer ${UserOn.accessToken}`},
    })
    setDeletedTweet(res.data.id)
    onSuccess()
  }

  return (
    <div className='flex flex-col justify-center md:items-center w-full md:max-w-4xl md:mx-auto md:border-x-2 md:border-silver border-b-2'>

    <div className=" w-full flex space-x-3 p-4 border-b border-silver">
        <div>
          <img src={avatar} />
        </div>
        <div className="space-y-1">

         <span className="font-bold text-sm hover:text-birdBlue">{name}</span>{' '}
         <span className="text-sm text-silver">@{username}</span>
           
         {idTweet === UserOn.id? <button type="button" className="" onClick={deleteTweet}>
         {<TrashIcon className="w-6 ml-2"/> }</button> : null}
    
         <p className=''>{children}</p>

        <div className='flex'>
         <div className="flex space-x-1 text-silver text-sm items-center">
              <HeartIcon className="w-6 "/>
              <span>1</span>
         </div>
         <div className="flex space-x-1 text-silver text-sm items-center">
              <ChatAltIcon className="w-6 ml-3"/>
              <span>0</span>
         </div>
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
          <Tweet
           key={tweet.id}
           name={tweet.user.name}
           id={tweet.id}
           idTweet={tweet.user.id}
           UserOn={loggedInUser}
           username={tweet.user.username} 
           onSuccess={getData}
           avatar={avatar}>
           {tweet.text}
          </Tweet>
         
        ))}
      </div>

    <footer>
      <div className='bg-black items-center justify-center flex p-4 opacity-0 pc:opacity-100'>

      <div className="pl-2 space-x-1 text-2xl items-center justify-center  hover:bg-birdBlue w-12 ml-11 mr-10">
             { <a href=''><HomeIcon className="w-8 h-12 mr-12"/></a> }
      </div>

      <div className="pl-2 space-x-1 text-2xl items-center justify-center  hover:bg-birdBlue w-12 mr-10">
            {<a href='https://github.com/Matheus-Loubach'> <ExternalLinkIcon className="w-8 h-12 mr-12 "/></a> }
      </div>
 
      <div className="pl-2 space-x-1 text-2xl items-center justify-center  hover:bg-birdBlue w-12 mr-10">
           { <a href='https://small-tweet-web.vercel.app'><PauseIcon className="w-8 h-12 "/></a> }
      </div>
     
      <div className="pl-2 space-x-1 text-2xl items-center justify-center  hover:bg-birdBlue w-12 mr-10">
           { <a href='https://www.linkedin.com/in/matheus-loubach/'><SearchCircleIcon className="w-8 h-12 "/></a> }
      </div>
      </div>
      <div className='opacity-0 pc:opacity-100 bg-black text-center justify-center'>Feito por:<a href='https://www.linkedin.com/in/matheus-loubach/'><span className='text-birdBlue'>@Matheus-Loubach</span></a></div>
    </footer>
    </>
  )
}