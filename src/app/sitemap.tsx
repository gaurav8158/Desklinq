import { MetadataRoute } from 'next'
// import {connectTODatabase} from '@/utils/connectMongo.js'
const { MongoClient } = require('mongodb')

const uri =
  'mongodb+srv://vidit:EQXSgLCiQKL08cZg@cluster0.eerngcr.mongodb.net/desklinq'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

interface MyType {
  url: string
  lastModified?: string | Date
  changeFrequency?: string
  priority?: number
}
export default async function sitemap() {
  try {
    await client.connect()
    console.log('Connected to the database')

    const db = client.db('desklinq')
    const offeringCollection = db.collection('offerings')

    // Fetch all documents from the offering collection
    const offerings = await offeringCollection
      .find({}, { projection: { _id: 1, property: 1 } })
      .toArray()

    // Extract _id from each document
    // const offeringIds = offerings.map((offer: any) => offer._id);
    const url = offerings.map((offering: any) => ({
      url: `https://desklinq.com/listing-stay-detail/${offering._id}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    }))

    // console.log('Offering IDs:', offeringIds);

    const sitemapEntries: MyType[] = [
      {
        url: 'https://desklinq.com/',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1.0,
      },
      {
        url: 'https://desklinq.com/listing-stay-map',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: 'https://desklinq.com/dashboard/home',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: 'https://desklinq.com/account-savelists',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: 'https://desklinq.com/auth/login',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: 'https://desklinq.com/about',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: 'https://desklinq.com/contact',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: 'https://desklinq.com/terms',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.8,
      },
      {
        url: 'https://desklinq.com/dashboard/my-properties',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.64,
      },
      {
        url: 'https://desklinq.com/dashboard/my-offerings',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.64,
      },
      {
        url: 'https://desklinq.com/dashboard/booking',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.64,
      },
      {
        url: 'https://desklinq.com/account',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.64,
      },
      {
        url: 'https://desklinq.com/mybookings',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.64,
      },
      {
        url: 'https://desklinq.com/auth/forgotpassword?callbackUrl=/',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.64,
      },
      {
        url: 'https://desklinq.com/auth/signup?callbackUrl=/',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.64,
      },
      {
        url: 'https://desklinq.com/dashboard/add-property',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.51,
      },
      {
        url: 'https://desklinq.com/auth/login?callbackUrl=/',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.51,
      },
      ...url,
    ]

    return sitemapEntries
    console.log('Offering URLs:', url)
  } catch (error) {
    return `Error:${error}`
  } finally {
    await client.close()
  }
}
