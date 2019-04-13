import fetch from 'node-fetch';
import {URLSearchParams} from 'url';

const apiUrl = 'https://www.cargurus.com/Cars/inventorylisting/ajaxFetchSubsetInventoryListing.action?sourceContext=carGurusHomePageModel';
const listingBaseUrl = 'https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?#listing=';

const formatListing = ({
  id,
  carYear,
  vehicleIdentifier,
  price,
  makeName,
  trimName
}) => ({
  id,
  year: carYear,
  vin: vehicleIdentifier,
  price: `$${price.toLocaleString()}`,
  make: makeName,
  model: trimName,
  url: `${listingBaseUrl}${id}`,
});

export const fetchListings = async (formProperties) => {
  const response = await fetch(apiUrl, {
    body: new URLSearchParams(formProperties),
    method: 'POST'
  });
  const data = await response.json();
  const listings = data.listings && data.listings.map(formatListing);
  if (data.alternateSearch || !listings) {
    return [];
  }
  return listings;
};
