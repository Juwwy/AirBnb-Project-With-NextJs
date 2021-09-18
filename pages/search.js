import Header from "../components/Header";
import Footer from "../components/Footer"
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

const Search = ({checkData}) => { 
    const router = useRouter();
    

    const {location, startDate, endDate, noOfGuest} = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMM yy"); 

    const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuest} guest`}/>

            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays -{range}- for {noOfGuest} guests</p>

                    <h1 className="text-3xl font-semibold mt-2 mb-6">
                        Stays in {location}
                    </h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More Filters</p>
                    </div>

                    <div className="flex flex-col">
                    {checkData?.map(({img, location, title, description, star, price, total})=>(
                        <InfoCard key={img} img={img} location={location} description={description} title={title} star={star} price={price} total={total} />
                    ))}
                    </div>
                </section>
                <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <Map checkData={checkData}/>
                </section>
            </main>

            <Footer/>
        </div>
    )
}

export default Search

export async function getServerSideProps(){
    const checkData = await fetch('https://links.papareact.com/isz').then((res)=> res.json())
    return {
        props: { checkData}
    }
  
};

