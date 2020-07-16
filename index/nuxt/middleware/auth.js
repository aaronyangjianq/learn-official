export default function ({ route, redirect, store }) {
    if (process.server) {
        return
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const routeNameList = ['index', 'document', 'sdk', 'sdkDetail', 'demo', 'problem', 'problemDetail']
    if(routeNameList.indexOf(route.name) > -1) {
      return;
    } 
    if(!userInfo) {
        redirect('/');
    }
}