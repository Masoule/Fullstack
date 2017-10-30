import React from 'react';
import { Link } from 'react-router-dom';
import UserNav from './user_nav';
import GeneralNav from './general_nav';

class Header extends React.Component {

  constructor(props){
    super(props);
  }

  logo () {

    return (
      <div className='logo-box'>
        <div className='logo'>
          <img className="logo-img"
            src={window.logo}></img>
        </div>
        <h1 className='logo-text'>
          OVOX
        </h1>
      </div>
    )
  }

  render (){
    switch (this.props.headerType) {
      case 'general':
        return (
          <div>
            {this.logo()}
            <div className='buttons'>
              <div className='general-nav'>
                <GeneralNav />
              </div>
            </div>
          </div>
        )

        case 'user':
        return (
          <div>
            {this.logo()}
            <div className='buttons'>
              <div className='user-nav'>
                <UserNav
                  currentUser={this.props.currentUser}
                  logout={this.props.logout}
                  />
              </div>
            </div>
          </div>
        )


       <Route exact path="/" render={<h1>user profile</h1>} />
       <Route exact path="/:userId" render={<h1>user profile</h1>} />
       <Route exact path="/:userId/:trackId" render={<h1>Track</h1>} />

    }
  }
}


export default Header;


//
// <div>
//
//   <div className='logo'>
//     <div className='logo-img'>
//
//     </div>
//     <h1 className='logo-text'>
//       OVOX
//     </h1>
//   </div>
//
//   <div className='buttons'>
//     {
//       (this.props.currentUser) ?  (
//         <div className='user-nav'>
//           <UserNav
//             currentUser={this.props.currentUser}
//             logout={this.props.logout}
//             />
//         </div>
//       ):(
//         <div className='general-nav'>
//           <GeneralNav />
//         </div>
//       )
//     }
//   </div>
// </div>
