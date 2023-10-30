"use client"

import { useEffect, useState } from "react"
import Input from "../Inputs/Input";

function SearchBox() {

    const [searching, setSearching] = useState(false);
    const [searchText, setSearchText] = useState({ value: "", error: "" });
    const [searchItems, setSearchItems] = useState([]);

    useEffect(() => {
        ////console.log(searchText)
    }, [searchText])


    return (
        <>
            <div className=" relative flex rounded-t-md shadow-sm xl:w-[30%] 2xl:w-[30%]  text-black border border-white" >
                <Input
                    value={searchText.value}
                    placeholder={"Find cuisines"}
                    onChange={setSearchText}
                    className={"rounded-l-md rounded-r-none w-full pl-12  py-3 px-4  text-white"}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                    <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </div>
                {searching && <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </span>}

                <div className="absolute hidden bottom-[-90%] min-h-[40px] w-full rounded-b-md bg-white outline-white outline-1" >

                    {
                        searchItems?.length < 1 ? <>NO search data</> : <> Yes data </>
                    }
                </div>

            </div>
        </>

    )
}
export default SearchBox