import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application specific requests

export async function getAllListings(page) {
  if (page == undefined) {
    page = 1;
  }
  // 1=> (1-1)*3=0
  // 2=> (2-1)*3=3
  // 3=> (3-1)*3=6
  return await api.get(host +
    `/data/cars?sortBy=_createdOn%20desc&offset=${(page - 1) * 3}&pageSize=3`);
}

export async function getListingById(id) {
  return await api.get(host + '/data/cars/' + id);
}

export async function createListing(listing) {
  return await api.post(host + '/data/cars', listing);
}

export async function editListing(id, listing) {
  return await api.put(host + '/data/cars/' + id, listing);
}

export async function deleteListing(id) {
  return await api.del(host + '/data/cars/' + id);
}

//%3D =, %22 "
export async function getMyListings(userId) {
  return await api.get(host +
    `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function search(query) {
  return await api.get(host +
    `/data/cars?where=year%3D${query}`);
}

export async function getCollectionSize(query) {
  return await api.get(host +
    `/data/cars?count`);
}