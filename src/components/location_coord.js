
export default function (state = null, action){
  switch (action.type){
    case '台北火車站':
      return {lat:25.047751,lng:121.517038};
    case '台北101':
      return {lat:25.033961,lng:121.564478};
    case '台北科技大學':
      return {lat:25.042244,lng:121.535481};
    case '0':
      return null;
    default:
      return null;
  }
return state;
}