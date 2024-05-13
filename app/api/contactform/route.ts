import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type Data = {
  answer: string
}

export async function POST(req, res) {
  const data = await req.json()
  const email = data?.email
  const message = data?.message

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
      subject: `SALEFASTER - Сообщение от клиента`,
      html: `<p>Сообщение от пользователя с сайта SALEFASTER</p>
                    <p><strong>Email: </strong> ${email}</p>
                    <p><strong>Message: </strong> ${message}</p><br />`,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ answer: 'fail' })
  }

  return NextResponse.json({ answer: 'ok' })
}
