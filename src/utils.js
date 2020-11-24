const TOKEN_NAME = 'token';

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => localStorage.getItem(TOKEN_NAME);

export const createPaginateArr = (totalPages) => {
  const tempArr = [];
  for (let i = 1; i <= totalPages; i++) {
    tempArr.push(i);
  }
  return tempArr;
};
