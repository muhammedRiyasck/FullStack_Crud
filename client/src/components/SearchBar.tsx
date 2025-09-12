
interface searchBar{
  search:string,
  setSearch:(value:string)=>void
}

const SearchBar = ({search,setSearch}:searchBar) => {
  return (
    <div className="flex justify-center my-8">
      <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}  className=" border-2 rounded-2xl text-center font-semibold" placeholder="type name here to filter"/>
    </div>
  )
}

export default SearchBar

