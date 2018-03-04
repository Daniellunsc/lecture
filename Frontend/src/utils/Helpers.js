export function capitalize (str = '') {
    return typeof str !== 'string'
      ? ''
      : str[0].toUpperCase() + str.slice(1)
  }

export function handleDateTime(timestamp=0){
  let data = new Date(timestamp)
  return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`    
}

export function isNotEmpty(array){

  if(Object.keys(array).length > 0){
    return true;
  }

  return false

}

{/*

  function applyUpdateInState from:
  https://github.com/ryanwaite28/udacity-readable/blob/master/frontend/src/utils/helperMethods.js

*/}

export function applyUpdateInState(updatedComponent, list) {
  let isNewComponent = true;
  let updatedList = list;
  if(updatedComponent && list) {
    updatedList = [].concat(list).map((component) => {

      if(updatedComponent.id===component.id) { 
        isNewComponent = false;
        return updatedComponent;
      } else {
        return component;
      }
    });
    
    if(isNewComponent) updatedList.push(updatedComponent);
  }
  return updatedList;
}
