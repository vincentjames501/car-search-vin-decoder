import fetch from 'node-fetch';
import {URLSearchParams} from 'url';

const apiUrl = 'https://www.autotrader.com/rest/searchresults/base';
const listingBaseUrl = 'https://www.autotrader.com/cars-for-sale/vehicledetails.xhtml?listingId=';

const formatListing = ({
  id,
  year,
  make,
  model,
  vin,
  pricingDetail
}) => ({
  id,
  year,
  make,
  model,
  vin,
  price: pricingDetail.derived,
  url: `${listingBaseUrl}${id}`
});

export const fetchListings = async (formProperties, acc = [], {numRecords, firstRecord} = {
  numRecords: 100,
  firstRecord: 0
}) => {
  const response = await fetch(`${apiUrl}?${new URLSearchParams({
    ...formProperties,
    numRecords,
    firstRecord}).toString()}`, {
      method: 'GET'
    });
    const {totalResultCount, listings} = await response.json();
    const newAcc = [
      ...acc,
      ...(listings.map(formatListing))
    ];
    if (newAcc.length < totalResultCount) {
      return fetchListings(formProperties, newAcc, {
        numRecords,
        firstRecord: firstRecord + numRecords
      });
    } else {
      return newAcc;
    }
  };
