'use client'

import React, { useState } from 'react'

export interface ContactFormProps {
  title?: string
  apiUrl?: string
}

const ClaimForm = ({ title = '', apiUrl = '/api/claimform' }: ContactFormProps) => {
  const [error, setError] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')
  const [size, setSize] = useState('Не выбрано')
  const [amount, setAmount] = useState('100 рулонов')
  const [loading, setLoading] = useState(false)

  const postData = async () => {
    try {
      setEmailSent(false)
      setLoading(true)

      const response = await fetch('/api/claimform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          size,
          amount,
        }),
      })

      const result = await response.json()
      console.log(result)

      setEmailSent(true)
      setEmail('')
      setSize('75 x 120 мм')
      setAmount('100 рулонов')
    } catch (error) {
      console.error(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const sizes = [
    '75 x 120 мм (300 шт в намотке)',
    '58 x 60 мм (400 шт в намотке)',
    '58 x 60 мм (450 шт в намотке)',
    '58 x 40 мм (700 шт в намотке)',
    '58 x 40 мм (500 шт в намотке)',
    '43 x 25 мм (1000 шт в намотке)',
    '30 x 20 мм (2000 шт в намотке)',
    '30 x 20 мм (1800 шт в намотке)',
  ]

  const amounts = [
    '100 рулонов',
    '500 рулонов',
    '1000 рулонов',
    '3000 рулонов',
    '5000 рулонов',
    '10000 рулонов',
    '15000 рулонов',
    'Более 15000 рулонов',
    'Другое количество',
  ]

  return (
    <div>
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</div>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault()
          postData()
        }}
      >
        <div className={'mr-5 mt-5'}>
          <label htmlFor="email-input">
            <span className="sr-only">Email address</span>
            <input
              autoComplete="email"
              className="w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
              id="email-input"
              name="email"
              placeholder={'Ваш email'}
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className={'mr-5 mt-5'}>
          <label htmlFor="size-input">
            <span className="sr-only">Размер</span>
            <select
              className="w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
              id="size-input"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {sizes.map((size, index) => {
                return <option key={index}>{size}</option>
              })}
            </select>
          </label>
        </div>
        <div className={'mr-5 mt-5'}>
          <label htmlFor="amount-input">
            <span className="sr-only">Количество</span>
            <select
              className="w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
              id="amount-input"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            >
              {amounts.map((amount, index) => {
                return <option key={index}>{amount}</option>
              })}
            </select>
          </label>
        </div>
        <div className={'mt-5'}>
          <button
            className={
              'mb-2 me-2 w-72 rounded-lg bg-blue-500 px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-blue-300 dark:bg-pink-500 dark:hover:bg-pink-300'
            }
            type="submit"
          >
            {!!loading && 'Отправляется...'}
            {!loading && 'Отправить'}
          </button>
        </div>
        <div className={'mt-5 text-center text-green-700'}>
          {!!emailSent && (
            <p>
              Ваш запрос отправлен! <br /> Спасибо!
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default ClaimForm
