import React from 'react'
import {useParams} from 'react-router-dom'
function Chat(){

	const {id} = useParams();
	return(
         <>
          <div className="container">
      {/* Page header start */}
      <div className="page-title">
        <div className="row gutters">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <h5 className="title">Chat App</h5>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
        </div>
      </div>
      {/* Page header end */}

      {/* Content wrapper start */}
      <div className="content-wrapper">

        {/* Row start */}
        <div className="row gutters">

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

            <div className="card m-0">

              {/* Row start */}
              <div className="row no-gutters">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                  <div className="users-container">
                    <div className="chat-search-box">
                      <div className="input-group">
                        <input className="form-control" placeholder="Search" />
                        <div className="input-group-btn">
                          <button type="button" className="btn btn-info">
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <ul className="users">
                      <li className="person" data-chat="person1">
                        <div className="user">
                          <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin" />
                          <span className="status busy"></span>
                        </div>
                        <p className="name-time">
                          <span className="name">Steve Bangalter</span>
                          <span className="time">15/02/2019</span>
                        </p>
                      </li>
                      {/* Add more list items here */}
                    </ul>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                  <div className="selected-user">
                    <span>To: <span className="name">Emily Russell</span></span>
                  </div>
                  <div className="chat-container">
                    <ul className="chat-box chatContainerScroll">
                      <li className="chat-left">
                        {/* Add chat content here */}
                      </li>
                      {/* Add more chat content here */}
                    </ul>
                    <div className="form-group mt-3 mb-0">
                      <textarea className="form-control" rows="3" placeholder="Type your message here..."></textarea>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row end */}
            </div>
          </div>
        </div>
        {/* Row end */}
      </div>
      {/* Content wrapper end */}
    </div>	 
         </>
		)
}

export default Chat


