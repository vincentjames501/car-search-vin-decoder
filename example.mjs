import {fetchListings as fetchCarGuruListings} from './carguru_fetcher.mjs';
import {fetchListings as fetchAutoTraderListings} from './autotrader_fetcher.mjs';
import {getCodes} from './bmw_vin_decoder.mjs';

const carGuruOpts = {
  zip: '94066',
  distance: 150,
  selectedEntity: 'c24539', // BMW 3 Series
  startYear: 2015,
  endYear: 2017
};

const autoTraderOpts = {
  makeCodeList: 'BMW',
  searchRadius: 100,
  seriesCodeList: '3_SERIES',
  zip: '94066',
  marketExtension: true,
  startYear: 2015,
  endYear: 2017,
  sortBy: 'relevance'
};

const desiredCodes = [
  'S5DFA', // Adaptive Cruise
  'S610A' // Heads Up Display
];

const processListing = async listing => {
  if (listing.vin) {
    console.log(`Decoding VIN: ${listing.vin}.`);
    const codes = await getCodes(listing.vin);

    const matches = desiredCodes.filter(desiredCode => codes.includes(desiredCode));
    if (matches.length === 0) {
      console.log('No matching codes.');
      return false;
    } else {
      console.log(`Car matched:`, matches);
      if (matches.length === desiredCodes.length) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
}

const processResults = async listings => {
  const results = [];
  for (const listing of listings) {
    if (await processListing(listing)) {
      results.push(listing);
    }
  }
  console.log('Done');
  return results;
}

const distinctBy = (f, coll) => {
  const matches = new Set();
  return coll.reduce((acc, item) => {
    const match = f(item);
    if (matches.has(match)) {
      return acc;
    } else {
      matches.add(match);
      return [
        ...acc,
        item
      ];
    }
  }, []);
};

const run = async () => {
  const carGuruListings = await fetchCarGuruListings(carGuruOpts);
  console.log(`Found ${carGuruListings.length} CarGuru listings.`);
  const autoTraderListings = await fetchAutoTraderListings(autoTraderOpts);
  console.log(`Found ${autoTraderListings.length} AutoTrader listings.`);
  const allListings = distinctBy(listing => listing.vin, [
    ...carGuruListings,
    ...autoTraderListings
  ]);

  console.log(`Preparing to process ${allListings.length} listings.`);
  const matchingListings = await processResults(allListings);
  console.log('\n\nSummary:');
  if (matchingListings.length > 0) {
    matchingListings.forEach(({year, make, model, price, url}) => {
      console.log(`${year} ${make} ${model} (${price}) - ${url}`);
    });
  } else {
    console.log('No matches found');
  }
};

run();
