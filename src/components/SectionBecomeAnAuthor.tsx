import React, { FC, useState } from 'react'
import rightImgDemo from '@/images/Contact-Us-Vector.png'
import Label from '@/components/Label'
import Input from '@/shared/Input'
import Textarea from '@/shared/Textarea'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Logo from '@/shared/Logo'
import Image from 'next/image'
import { Route } from 'next'
import { toast } from 'react-toastify'
import axios from 'axios'

export interface SectionBecomeAnAuthorProps {
  className?: string
  rightImg?: string
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = '',
  // rightImg = rightImgDemo,
}) => {
  const [inputs, setInputs] = useState<{
    content: string | null
    userName: string | null
    userPhone: string | null
    userEmail: string | null
    message: string | null
  }>({ content: '', userEmail: '', userName: '', userPhone: '', message: '' })

  const handelClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // if (captcha) {
    // console.log(captcha)
    try {
      const emaildata = {
        content: inputs.content,
        userName: inputs.userName,
        userEmail: inputs.userEmail,
        message: inputs.message,
      }
      // setLoading(true)

      await axios.post('https://api-dev.desklinq.com/v1/contact', inputs)

      const response: any = await axios
        .post('https://api-dev.desklinq.com/v1/sendMail/contactUs', emaildata)
        .then((res: any) => {
          ;(() => toast.info(res.data.message))()
        })
      setInputs({
        userName: '',
        userEmail: '',
        userPhone: '',
        content: '',
        message: '',
      })

      // setCaptcha(null)

      // setLoading(false)

      // if (!loading) {
      //   setInputs({
      //     userName: '',
      //     userEmail: '',
      //     userPhone: '',
      //     content: '',
      //   })
      // }
    } catch {
      // setLoading(false)
      ;(() => toast.error('something went wrong !'))()
    }
    // }
  }
  const [selectedOption, setSelectedOption] = useState('')

  return (
    <div
      className={` relative items-center `}
      // data-nc-id="SectionBecomeAnAuthor"
    >
      <h2 className="font-semibold text-3xl sm:text-4xl my-6 sm:mt-11">
        Could not find what you are looking for ?
      </h2>
      <div className="flex flex-col lg:flex-row ">
        {/* Form Section */}
        <div className="w-full lg:w-1/2">
          {/* <Logo className="w-44" /> */}

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
                value={inputs.userName || ''}
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
                value={inputs.userEmail || ''}
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
                  value={inputs.userPhone || ''}
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
              <Label>Message : </Label>
              <select
                value={inputs.content || ''}
                className="mt-1 mx-1 w-full border border-gray-300 rounded-md shadow-sm sm:max-w-xs focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setInputs({ ...inputs, content: e.target.value })
                  setSelectedOption(e.target.value)
                }}
                required
              >
                <option value="">Select...</option>
                <option value="On Boarding">On Boarding</option>
                <option value="General Inquiry">Booking Inquiry</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="block">
              <Label>Write your message here</Label>
              <Textarea
                className="mt-1"
                value={inputs.message || ''}
                rows={6}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setInputs({ ...inputs, message: e.target.value })
                }}
                required
              />
            </label>
            {/* <div>
                  <ReCAPTCHA
                    sitekey="6LfK_3UpAAAAALqFeJTpFTwRoChGQgin_t7gNZeW"
                    onChange={setCaptcha}
                  />
                </div> */}

            <div>
              <ButtonPrimary
                type="submit"

                // loading={loading}
                // disabled={loading}
              >
                Send Message
              </ButtonPrimary>
            </div>
          </form>
        </div>
        <div className="hidden lg:block lg:w-1/2">
          <Image
            alt=""
            src={rightImgDemo}
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
}

export default SectionBecomeAnAuthor
