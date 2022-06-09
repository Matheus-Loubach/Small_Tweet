import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react';




const Input = props => (
    <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum" />
)

const validationSchema = yup.object({
    email: yup.string().required('Digite seu email').email('E-mail inválido'),
    password: yup.string().required('Digite sua senha')
})

export function Login({ signInUser }) {
    const [error, setError] = useState()
    const formik = useFormik({
        onSubmit: async values => {
            try {
                const resposta = await axios.get(`${import.meta.env.VITE_API_HOST}/login`,{
                    auth: {
                    username: values.email,
                    password: values.password
                  }
                })
                
                //dados login body
                //usuario retorno da resquest
                //tiver os dados do user/ retorna a funcao
                setError(null)
                signInUser(resposta.data)
              } catch(error) {
                setError(error.response)
                 console.log({ type: typeof error.response, errorData: error.response })
              }
               },
                initialValues: {
                 email: '',
                 password: ''
                },
                validateOnMount: true,
                validationSchema,
               })

    return (
        <div className="h-full flex justify-center">
           <div className="bg-birdBlue lg:flex-1 items-center justify-center flex text-7xl">SmallTweet</div>
            
            <div className="flex-1 flex justify-center items-center p-12 space-y-6">
                <div className="max-w-md flex-1">
                    <h1 className="text-3xl">Acesse sua conta</h1>

                    <form className="space-y-6" onSubmit={formik.handleSubmit}>

                        <div className="space-y-2">
                            <Input
                                type="text"
                                name="email"
                                placeholder="E-mail"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting}
                            />
                            {(formik.touched.email && formik.errors.email) && (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting}
                            />
                        {(formik.touched.password && formik.errors.password) && (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg"
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {formik.isSubmitting ? 'Enviando...' : 'Entrar' }
                        </button>
                    {error ? <div className='text-red-600 flex items-center justify-center bg-black rounded-full'>Email ou senha não conferem.</div> : null}
                    
                    </form>

                    <span className="text-sm text-silver text-center">
                        Não tem conta? <a className="text-birdBlue" href="/signup">Inscreva-se</a>
                    </span>
                </div>
            </div>
        </div>
    )
}
