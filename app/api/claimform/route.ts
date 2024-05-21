import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type Data = {
  answer: string
}

export async function POST(req, res) {
  const data = await req.json()
  const email = data?.email
  const size = data?.size
  const amount = data?.amount

  const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.MAILUSER,
      to: process.env.MAILUSER,
      subject: `SALEFASTER - Запрос КП`,
      html: `<p>Запрос КП от пользователя с сайта SALEFASTER</p>
                    <p><strong>Email: </strong> ${email}</p>
                    <p><strong>Size: </strong> ${size}</p>
                    <p><strong>Amount: </strong> ${amount}</p>`,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ answer: 'fail' })
  }

  return NextResponse.json({ answer: 'ok' })
}
