import React from 'react';


export default function sortAlpha(items) {

  const sortedItems = items.sort((a, b) => {
    if (a.props.name < b.props.name) {
      return -1;
    }
    if (a.props.name > b.props.name) {
      return 1;
    }
    return 0;
  });

  return <div>{sortedItems}</div>;
}
