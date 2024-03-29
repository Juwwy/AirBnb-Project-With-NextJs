import Image from 'next/image';
import {GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, UsersIcon} from '@heroicons/react/solid'
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRangePicker} from 'react-date-range';
import { useRouter } from 'next/dist/client/router';

function Header({placeholder}) {
const [searchInput, setSearchInput] = useState("");
const [startDate, setStartDate] = useState(new Date());
const[endDate, setEndDate] = useState(new Date());
const [noOfGuest, setNoOfGuest] = useState(1);

const router = useRouter();

const resetInput = () =>{
    setSearchInput("");
}

const selectionRange= {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
}

const handleSelect = (ranges)=>{
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    
}

const search = () =>{
    router.push({
        pathname: '/search',
        query: {
            location: searchInput,
            startDate : startDate.toString(),
            endDate: endDate.toString(),
            noOfGuest, 
        }
    })
}

    return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10 ">
        {/* Left */}
        <div className='relative flex items-center h-10 cursor-pointer my-auto' onClick={() => router.push("/")}>
            <Image src="https://links.papareact.com/qd3" layout='fill' 
            objectFit="contain" objectPosition="left"/>
        </div>

        {/* Middle */}
        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
            <input type="text" value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} placeholder={placeholder || "search your search" } className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600"/>
            <SearchIcon className="hidden md:inline-flex  h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer
            mx-auto md:mx-2"/> 
        </div>

        {/* Right */}
        <div className="flex space-x-4 items-center justify-end">
            <p className="hidden md:inline-flex cursor-pointer text-gray-600">Become a Host</p>
            <GlobeAltIcon className="h-6 cursor-pointer"/> 
            <div className="flex border-2 rounded-full items-center space-x-2 p-2">
                <MenuIcon className="h-6 cursor-pointer"/>
                <UserCircleIcon className="h-6 cursor-pointer"/>
            </div> 
        </div>

        {searchInput && (
            <div className="flex flex-col col-span-3 mx-auto  mt-5" >
                <DateRangePicker ranges={[selectionRange]} minDate={new Date()}
                rangeColors={["#FD5B61"]} onChange={handleSelect}/>
                <div className="flex items-center border-b mb-4">
                    <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
                    <UsersIcon className="h-5"/>
                    <input type="number" value={noOfGuest} onChange={(e)=> setNoOfGuest(e.target.value)} min={1} className="w-12 pl-2 text-lg outline-none text-red-400"/> 
                </div>
                <div className="flex">
                    <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
                    <button onClick={search} className="flex-grow text-red-400">Search</button>
                </div>
            </div>
            
        )}
    </header>
    )
}

export default Header
