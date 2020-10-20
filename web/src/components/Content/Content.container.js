import React from 'react';

import ContentItem from './Content.component'


function Content(props) {
  return (
    <React.Fragment>
      {
        props.data && props.data.shops.map((item, index) => {
          return <ContentItem key={index} item={item} coords={props.coords}/>
        })
      }
    </React.Fragment>
  );
}

export default Content;