import { gql } from 'apollo-boost'

export const GET_ALL_TRASH_FOR_MAP = gql`
  query allTrash ($token:String){
    AllTrash(token:$token){
      location{
        latitude
        longitude
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

export const GET_USER_SIGNIN = gql`
  query userSignin ($token: String){
    UserSignin(token:$token){
      role
    }
  }
`

export const GET_ALL_HISTORY = gql`
  query getAllHistory ($token: String) {
    showAllHistory (token:$token) {
      _id
      createdAt
      updatedAt
      height
      weight
      Puller {
        _id
        email
      }
    }
  }
`

export const GET_TRASH_ID = gql`
  query TrashId ($id:String, $token:String){
    TrashId(token:$token, id:$id) {
      height
      weight
      avaible
      _id
      location{
        longitude
        latitude
      }
      status
    }
  }
`