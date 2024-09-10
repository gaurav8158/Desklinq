'use client'

import React, { FC, useState } from 'react'
import SocialsList from '@/shared/SocialsList'
import Label from '@/components/Label'
import Input from '@/shared/Input'
import Textarea from '@/shared/Textarea'
import ButtonPrimary from '@/shared/ButtonPrimary'
import userService from '@/service/user.service'
import { toast } from 'react-toastify'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
//site key- 6LfK_3UpAAAAALqFeJTpFTwRoChGQgin_t7gNZeW
//secret key- 6LfK_3UpAAAAAKLwaP8fWDKpoEIrjJdpQYPTZuJZ
export interface PageContactProps {}

const info = [
  {
    title: '🗺 ADDRESS',
    desc: 'BVR Lake Front, Veeranapallaya Main Road, Nagavara, Bangalore- 560045 Karnataka – INDIA',
  },
  {
    title: '💌 EMAIL',
    desc: 'connect@desklinq.com',
  },
  {
    title: '☎ PHONE',
    desc: '+91 828282 3361',
  },
]

const PageContact: FC<PageContactProps> = () => {
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState<{
    content: string | null
    userName: string | null
    userPhone: string | null
    userEmail: string | null
  }>({ content: '', userEmail: '', userName: '', userPhone: '' })

  const [captcha, setCaptcha] = useState<string | null>()

  const handelClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (captcha) {
      console.log(captcha)
      try {
        const emaildata = {
          content: inputs.content,
          userName: inputs.userName,
          userEmail: inputs.userEmail,
        }
        setLoading(true)

        await axios.post('https://api-dev.desklinq.com/v1/contact', inputs)

        const response: any = await axios
          .post('https://api-dev.desklinq.com/v1/sendMail/contactUs', emaildata)
          .then((res: any) => {
            ;(() => toast.info(res.data.message))()
          })

        setCaptcha(null)

        setLoading(false)

        if (!loading) {
          setInputs({
            userName: '',
            userEmail: '',
            userPhone: '',
            content: '',
          })
        }
      } catch {
        setLoading(false)
        ;(() => toast.error('something went wrong !'))()
      }
    }
  }

  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
            <div>
              <form
                className="grid grid-cols-1 gap-6"
                action="#"
                method="post"
                onSubmit={handelClick}
              >
                <label className="block">
                  <Label>Full name</Label>

                  <Input
                    placeholder="Example Doe"
                    type="text"
                    className="mt-1"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputs({ ...inputs, userName: e.target.value })
                    }
                  />
                </label>
                <label className="block">
                  <Label>Email address</Label>

                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputs({ ...inputs, userEmail: e.target.value })
                    }
                  />
                </label>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Phone Number
                  </span>
                  <div>
                    <div className="absolute pl-3 flex items-center pointer-events-none mt-[0.6rem] ">
                      <span className="text-gray-500">+91</span>
                    </div>
                    <Input
                      type="text"
                      placeholder="XXXXXXXXXX"
                      className="mt-1"
                      name="phone"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInputs({ ...inputs, userPhone: e.target.value })
                      }
                      style={{ paddingLeft: '3rem' }}
                      required
                    />
                  </div>
                </label>
                <label className="block">
                  <Label>Message</Label>

                  <Textarea
                    className="mt-1"
                    rows={6}
                    required
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setInputs({ ...inputs, content: e.target.value })
                    }
                  />
                </label>
                <div>
                  <ReCAPTCHA
                    sitekey="6LfK_3UpAAAAALqFeJTpFTwRoChGQgin_t7gNZeW"
                    onChange={setCaptcha}
                  />
                </div>

                <div>
                  <ButtonPrimary
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Send Message
                  </ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageContact
