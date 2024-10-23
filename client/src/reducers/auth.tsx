type stateType = {
  user: {
    name: string,
    email: string,
    role: string,
    token: string,
    _id: string,
    createdAt: string,
    stripe_seller: {
      charges_enabled: boolean
    }
  }
}

type actionType = {
  type: string,
  payload: any
}


const storedState = window.localStorage.getItem("auth");

let localState: stateType | null = storedState? JSON.parse(storedState) as stateType: null;


const authReducer = (state: stateType = localState || {} as stateType, action: actionType) =>{
    switch(action.type){
      case "LOGGED_IN_USER":
        return {...state, ...action.payload};
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
  }
  
  export default authReducer;