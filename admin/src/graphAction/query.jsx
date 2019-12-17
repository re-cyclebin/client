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