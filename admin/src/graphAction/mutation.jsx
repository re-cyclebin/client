import { gql } from 'apollo-boost';

export const MUTATION_SIGNIN_ADMIN = gql`
  mutation signin ($request:String, $password:String){
    signin(request:$request, password:$password){
      user {
        _id
        username
        email
        role
      }
      token
    }
  }
`

export const MUTATION_UPDATE_LOCATION_ADMIN = gql`
  mutation updateLocation ($token:String, $id: String, $longitude:String, $latitude:String){
    updateTrashLocation (token:$token, id:$id, longitude:$longitude, latitude:$latitude){
      location{
        longitude
        latitude
      }
      _id
      avaible
      createdAt
      updatedAt
    }
  }
`

export const MUTATION_DELETE_LOCATION_ADMIN = gql`
  mutation deleteTrashCan ($token:String, $id: String) {
    deleteTrash(token:$token, id:$id) {
      msg
    }
  }
`

export const MUTATION_CREATE_NEW_TRASH = gql`
  mutation createTrashCan ($token:String, $longitude: String, $latitude:String) {
    makeTrash(token:$token, latitude:$latitude, longitude:$longitude) {
      location{
        longitude
        latitude
      }
      _id
      avaible
      createdAt
      updatedAt
      height
      weight
    }
  }
`

export const MUTATION_DELETE_HISTORY = gql`
  mutation deleteHistoryAdmin ($token: String, $id:String){
    deleteHistory (token:$token, id:$id){
      msg
    }
  }
`


export const MUTATION_CREATE_NEW_MEMBER = gql`
  mutation createNewMember ($token: String, $username: String, $role: String, $password: String, $email: String) {
    signup(token:$token, username:$username, role:$role, password: $password, email:$email){
      _id
      username
      email
      role
    }
  }
`