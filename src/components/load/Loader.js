import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
// import "./loader.css";

const Loader = () => {
  return (
    <div className="loader center" >
      <i className="fa fa-cog fa-spin" />
        <div className="loadingmessge center">
          <br/>
          Large File might take sometime <br/>
          Please Wait... 

          <LinearProgress />
        </div>
    </div>

  );
}

export default Loader;