import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer';
import Header from '../components/Header'
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

export default function Home({exploreData, cardsData}) {
//console.log(checkData);
  return (
    <div className="">
      <Head>
        <title>AirBnB Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <Header/>
     <Banner/>

  <main className="max-w-7xl mx-auto px-8 sm:px-16">
    {/* Explore Section */}
    <section className="pt-6">
    <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

    {/* Pull from a server  - API endpoints */}
    {/* {exploreData?.map((item) =>(
      <SmallCard key={item.img} img={item.img} distance={item.distance} location={item.location}/>
      
    ))} OR */}
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {exploreData?.map(({img, location, distance}) =>(
      <SmallCard key={img} img={img} distance={distance} location={location}/>
      
    ))}
    </div>
    </section>
    <section>
      <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

      <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 ml-3">
      {cardsData?.map(item =>(
      <MediumCard key={item.img} img={item.img} title={item.title} /> ))}
      </div>
    </section>

    <LargeCard
      img="https://links.papareact.com/4cj" 
      title="The Greatest Outdoors"
      description = "Wishlists curated by Airbnb."
      buttonText="Get Inspired"
      />
  </main>

  <footer>
    <Footer/> 
  </footer>

    </div>
  )
}

export async function getStaticProps(){
  const exploreData = await fetch('https://links.papareact.com/pyp').then((res)=>res.json());

  const cardsData = await fetch('https://links.papareact.com/zp1').then((res)=> res.json());
   //checkData = await fetch('https://links.papareact.com/isz').then((res)=> res.json())

  

  return {
    props:{
      exploreData, cardsData, 
    }
  }
}