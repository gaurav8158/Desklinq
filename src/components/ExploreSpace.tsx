import Image, { StaticImageData } from 'next/image'
import space from '../../public/images/WCHIMG.png'
import { TaxonomyType } from '@/data/types'
import CardCategory5 from './CardCategory5'
interface Space {
  title: string
  image: StaticImageData
}

const ExploreSpace: React.FC = () => {
  const spaces: Space[] = [
    { title: 'Hot Desks', image: space },
    { title: 'Meeting Rooms', image: space },
    { title: 'Office Spaces', image: space },
    { title: 'Jam Rooms', image: space },
    { title: 'Podcast Studios', image: space },
    { title: 'Influencer Studios', image: space },
  ]

  const DEMO_CATS: TaxonomyType[] = [
    {
      id: '1',
      href: '/listing-stay-map',
      name: 'Hot desk',
      desc: 'Flexible workspace for the modern professional.',
      taxonomy: 'category',
      lat: 12.9715987,
      long: 77.5945627,
      offerings: 'yes',
      cities: null,
      count: 48,
      thumbnail:
        'https://image.shutterstock.com/z/stock-vector-business-man-entrepreneur-in-a-suit-working-at-his-office-desk-flat-style-modern-vector-394829347.jpg',
    },
    {
      id: '2',
      href: '/listing-stay-map',
      name: 'Meeting rooms',
      desc: 'Inspiring spaces to collaborate and connect.',
      taxonomy: 'category',
      lat: 12.9715987,
      long: 77.5945627,
      offerings: 'yes',
      cities: null,
      count: 36,
      thumbnail:
        'https://image.shutterstock.com/z/stock-vector-bosses-and-workers-are-meeting-in-the-conference-room-396348478.jpg',
    },
    {
      id: '3',
      href: '/#',
      name: 'Co-Study',
      desc: 'Inspiring spaces to collaborate and connect.',
      taxonomy: 'category',
      lat: 12.9715987,
      long: 77.5945627,
      offerings: 'yes',
      cities: null,
      count: 1,
      thumbnail:
        'https://image.shutterstock.com/z/stock-vector-young-student-discussion-about-business-project-teamwork-analysis-business-concept-hand-drawn-in-2174842669.jpg',
    },
    {
      id: '4',
      href: '#',
      name: 'Fashion Co-Lab (Coming soon)',
      desc: 'Collaborative Spaces for Fashion Entrepreneurs',
      taxonomy: 'category',
      count: 0,
      lat: 12.9715987,
      long: 77.5945627,
      offerings: 'yes',
      cities: null,
      thumbnail:
        'https://image.shutterstock.com/z/stock-vector-cute-young-woman-standing-in-front-of-hanger-rack-and-trying-to-choose-outfit-smiling-girl-in-1471851032.jpg',
    },
    {
      id: '5',
      href: '#',
      name: 'Music Hive (Coming soon)',
      desc: 'Collaborative Space for Artists and Content Creators',
      taxonomy: 'category',
      lat: 12.9715987,
      long: 77.5945627,
      offerings: 'yes',
      cities: null,
      count: 0,
      thumbnail:
        'https://image.shutterstock.com/z/stock-vector-music-studio-control-room-and-singer-booth-behind-glass-vector-cartoon-interior-with-sound-1674385738.jpg',
    },
    {
      id: '6',
      href: '#',
      name: 'Cabin (Coming soon)',
      desc: 'Your own private haven in a bustling community',
      taxonomy: 'category',
      lat: 12.9715987,
      long: 77.5945627,
      offerings: 'yes',
      cities: null,
      count: 0,
      thumbnail:
        'https://image.shutterstock.com/z/stock-vector-a-vector-illustration-of-an-office-that-ha-s-been-set-up-at-home-isometric-home-office-308435468.jpg',
    },
    {
      id: '7',
      href: '#',
      name: 'Virtual Office (Coming soon)',
      desc: 'Professional address, virtual presence',
      taxonomy: 'category',
      lat: 12.9715987,
      long: 77.5945627,
      offerings: 'yes',
      cities: null,
      count: 0,
      thumbnail:
        'https://image.shutterstock.com/z/stock-vector-isometric-business-data-analytics-process-management-or-intelligence-dashboard-on-virtual-screen-1176756661.jpg',
    },
    {
      id: '8',
      href: '#',
      name: 'Podcast (Coming soon)',
      desc: 'This is a podcast studio',
      taxonomy: 'category',
    },
    {
      id: '9',
      href: '#',
      name: 'Studio (Coming soon)',
      desc: 'This is a studio',
      taxonomy: 'category',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full m-auto my-10 gap-4 flex-col items-center flex justify-center">
        <h3 className="md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
          Explore Spaces
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </p>{' '}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* {spaces.map((space, index) => (
          <div
            key={index}
            className="text-center flex rounded-md  flex-col items-center"
          >
            <div className="w-[300px] cursor-pointer rounded-md hover:shadow-lg h-[300px]">
              <Image
                src={space?.image}
                alt={space.title}
                className="object-cover w-full  rounded-md h-full"
              />
            </div>
            <h3 className="text-xl font-semibold mt-6">{space.title}</h3>
            <p className="text-gray-500 text-sm mb-2">
              Great for freelancers and small teams.
            </p>
          </div>
        ))} */}
        {DEMO_CATS.map((space, index) => (
          <CardCategory5 taxonomy={space} />
        ))}
      </div>
    </div>
  )
}

export default ExploreSpace
