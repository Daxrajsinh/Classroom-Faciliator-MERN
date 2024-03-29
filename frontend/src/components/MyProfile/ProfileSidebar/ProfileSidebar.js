import React from 'react';
import './profileSidebar.css';
import '../../Sidebar/Sidebar.css';
import { Public, Stars, Work } from '@mui/icons-material';
import { NavLink } from 'react-router-dom'

export default function ProfileSidebar() {
    return (
        // <div className='profile_sidebar'>
        //     <div className="sidebar-container">
        //         <div className="sidebar-options">
        //             <div className="sidebar-option">
        //                 <NavLink className="sideLink" to="/myquestions">Questions</NavLink>
        //             </div>
        //             <div className="sidebar-option">
        //                 <NavLink className="sideLink" to="/myanswers">Answers</NavLink>
        //             </div>
                    
        //         </div>
        //     </div>
        // </div>
        <div className='sidebar' >
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <div className="link">
                            <div className="link-tag">
                                
                                <NavLink to="/myquestions">Questions</NavLink>
                            </div>
                            <div className="link-tag">
                                
                                <NavLink to="/myanswers">Answers</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
