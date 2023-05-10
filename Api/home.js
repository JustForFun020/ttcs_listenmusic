import instance from '../axios';

export const homeUrl = 'https://api-zingmp3-vercel.vercel.app/api/home';
export const top100Url = 'https://api-zingmp3-vercel.vercel.app/api/top100';

export const getHome = () =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await instance({
        url: '/home',
        method: 'GET',
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
