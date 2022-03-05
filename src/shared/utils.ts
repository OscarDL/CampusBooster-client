import { User } from './types/user';


export const getAuthStateWithUser = (state: RootState) => ({
  ...state.auth,
  user: state.auth.user as User
});


export const colors = {
  loader: '#3b2f92'
};

export const values = {
  languages: ['en', 'fr'],
};
