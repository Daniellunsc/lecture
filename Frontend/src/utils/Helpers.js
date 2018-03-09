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

  if(array===undefined){
    return false
  }

  if(Object.keys(array).length === 0){
    return false
  }
  
  return true;
}
