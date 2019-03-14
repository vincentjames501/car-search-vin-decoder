import fetch from 'node-fetch';
import FormData from 'form-data';

const listingBaseUrl = 'https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?#listing=';
const apiUrl = 'https://www.cargurus.com/Cars/inventorylisting/ajaxFetchSubsetInventoryListing.action?sourceContext=carGurusHomePageModel';

export function formatListing(listing) {
  const {
    id,
    mainPictureUrl: pictureUrl,
    price,
    mileageString: mileage,
    priceString,
    serviceProviderName: dealer,
    sellerCity: dealerCity,
    hasAccidents,
    frameDamaged,
    carYear: year,
    vehicleIdentifier: vin,
    ownerCount,
    daysOnMarket: daysListed,
    savingsRecommendation: recommendation,
    transmission,
  } = listing;

  return {
    id,
    url: listingBaseUrl + id,
    pictureUrl,
    price,
    priceString,
    mileage,
    dealer: {
      name: dealer || 'N/A',
      city: dealerCity,
      isPrivateSeller: !Boolean(dealer),
    },
    hasAccidents: hasAccidents || frameDamaged,
    year,
    vin,
    daysListed,
    recommendation,
    transmission,
  };
}

export const fetchListings = async (formProperties) => {
  const form = new FormData();
  Object.keys(formProperties).forEach((key) => {
    form.append(key, formProperties[key]);
  });
  const response = await fetch(apiUrl, {
    credentials: 'include',
    headers: {},
    body: form,
    method: 'POST',
    mode: 'cors'
  });
  const data = await response.json();
  const listings = data.listings && data.listings.map(formatListing);
  if (data.alternateSearch || !listings || listings.length === 0) {
    return [];
  }
  return listings;
};