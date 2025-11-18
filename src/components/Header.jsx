import menuIcon from "../assets/icons/menu.svg"
import searchIcon from "../assets/icons/search.svg"
function Header({ onMenuClick }){
	return(
	 <div className="flex flex-row h-10 w-full justify-between item-center bg-black pl-2 pr-2 z-50">
		<img src={menuIcon} alt="" onClick={onMenuClick} className="w-8 h-8 fill-red-500"/>
		
		<div className="flex flex-row">
		<p className="font-slab mt-1 text-2xl font-semibold text-gray-50 ">AASTU </p> 
		<p className="font-signature ml-1 mt-1 font-semibold text text-gray-50 text-xl">photography</p>
		</div>
		<img src={searchIcon} alt="" className="w-8 h-8"/>
		</div>
	)
}
export default Header;
