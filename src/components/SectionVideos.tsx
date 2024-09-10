'use client'

import Heading from '@/shared/Heading'
import NcPlayIcon from '@/shared/NcPlayIcon'
import NcPlayIcon2 from '@/shared/NcPlayIcon2'
import Image from 'next/image'
import React, { FC, useState } from 'react'

export interface VideoType {
  id: string
  title: string
  thumbnail: string
}

export interface SectionVideosProps {
  videos?: VideoType[]
  className?: string
}

const VIDEOS_DEMO: VideoType[] = [
  {
    id: 'LDVyuSj1fFA',
    title: 'Desklinq - Workspace, on demand',
    thumbnail:
      'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y293b3JraW5nJTIwc3BhY2V8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: 'LDVyuSj1fFA',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.pexels.com/photos/5998138/pexels-photo-5998138.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'LDVyuSj1fFA',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'LDVyuSj1fFA',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.pexels.com/photos/3782317/pexels-photo-3782317.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'LDVyuSj1fFA',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

const SectionVideos: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = '',
}) => {
  const [isPlay, setIsPlay] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo]
    return (
      <div
        className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-2xl overflow-hidden border-4 border-white dark:border-neutral-900  sm:border-[10px] will-change-transform"
        title={video.title}
      >
        {isPlay ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
            >
              <NcPlayIcon />
            </div>

            <Image
              fill
              className="object-cover w-full h-full transform transition-transform group-hover:scale-105 duration-300 "
              src={video.thumbnail}
              title={video.title}
              alt={video.title}
              sizes="(max-width: 1000px) 100vw,
                (max-width: 1200px) 75vw,
                50vw"
            />
          </>
        )}
      </div>
    )
  }

  const renderSubVideo = (video: VideoType, index: number) => {
    if (index === currentVideo) return null
    return (
      <div
        className="group relative aspect-h-16 aspect-w-16 rounded-md cursor-pointer overflow-hidden sm:aspect-h-12 lg:aspect-h-9 "
        onClick={() => {
          setCurrentVideo(index)
          !isPlay && setIsPlay(true)
        }}
        title={video.title}
        key={String(index)}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <NcPlayIcon2 />
        </div>
        <Image
          fill
          className="object-cover w-full h-full transform transition-transform group-hover:scale-110 duration-300 "
          src={video.thumbnail}
          title={video.title}
          alt={video.title}
          sizes="(max-width: 300px) 100vw,
          (max-width: 1200px) 50vw,
          25vw"
        />
      </div>
    )
  }

  return (
    <div className={`nc-SectionVideos ${className}`}>
      <Heading
        desc="Check out our virtual tours videos. View more and share more new
          perspectives on just about any topic. Everyone’s welcome."
      >
        🎬 Virtual Tours
      </Heading>

      <div className="flex gap-10 flex-col relative ">
        {/* <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl bg-primary-100 bg-opacity-40 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-1/2 dark:bg-neutral-800 dark:bg-opacity-40"></div> */}
        <div className="flex-grow relative pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
          {renderMainVideo()}
        </div>
        <div className="flex-shrink-0 grid gap-2 grid-cols-4 sm:gap-6   ">
          {videos.map(renderSubVideo)}
        </div>
      </div>
    </div>
  )
}

export default SectionVideos
