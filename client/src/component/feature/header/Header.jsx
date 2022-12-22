import React, { useState } from 'react'
import "./header.css"
import { Link } from 'react-router-dom'
import {ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,} from "../../../svg"
  import {useSelector} from "react-redux"
  import { useRef } from 'react'
  import SerchMenu from './SerchMenu.jsx'
import AllMenu from './AllMenu'
import useClickOutside from '../../helpers/useClickOutside'
import UserMenu from './userMenu/useMenu'


export default function Header() {
  const {user} = useSelector((user)=>({...user}) )
  console.log(user);
  const color = "#65676b"
  const [showSearchMenu,setShowSearchMenu]=useState(false)
  const [showAllMenu,setShowAllMenu]=useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false);

  const allmenu = useRef(null)
  const usermenu = useRef(null);

  useClickOutside(allmenu,()=>{
    setShowAllMenu(false)
  });
  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });
  return (
    <header>
        <div className='header_left'>
            <Link to="/" className='header_logo'>
                <div className='circle'>
                    <Logo/>
                </div>
            </Link>
            <div className='search search1' 
            onClick={()=>{
              setShowSearchMenu(true)
            }}
            >
              <Search color={color}/>
              <input
              type="text"
              placeholder='search baby sitter'
              className='hide_input'
              ></input>
            </div>
        </div>
        {showSearchMenu && <SerchMenu color={color} setShowSearchMenu={setShowSearchMenu} /> }
          
        <div className='header_middle'>        
        <Link to="/" className="middle_icon active">
          <HomeActive />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1 ">
          <Gaming color={color} />
        </Link></div>
        <div className='header_right'>
          <Link to="/profile" className='profile_link'>
            <img src={user?.picture}/>
            <span>{user?.first_name}</span>
          </Link>
          <div className="circle_icon hover1" ref={allmenu}>
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <Menu />
          </div>

          {showAllMenu && <AllMenu />}
        </div>
          <div className='circle_icon hover1'>
            <Messenger/>
          </div>
          <div className='circle_icon hover1'>
            <Notifications/>
          </div>
          <div className="circle_icon hover1" ref={usermenu}>
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <ArrowDown />
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div>
        </div>

    </header>
  )
}
