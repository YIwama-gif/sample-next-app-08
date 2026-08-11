'use client'

import { supabase } from '@/app/_libs/supabase'
import { useForm, SubmitHandler } from 'react-hook-form'

type SignUpForm = {
  email: string
  password: string
}

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>()

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    })

    if (error) {
      alert('登録に失敗しました')
    } else {
      reset()
      alert('確認メールを送信しました。')
    }
  }

  return (
    <div className="flex justify-center pt-60">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-100">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="name@company.com"
            disabled={isSubmitting}
            {...register('email', { required: 'メールアドレスは必須です' })}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            disabled={isSubmitting}
            {...register('password', { required: 'パスワードは必須です' })}
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isSubmitting}
          >
            登録
          </button>
        </div>
      </form>
    </div>
  )
}
